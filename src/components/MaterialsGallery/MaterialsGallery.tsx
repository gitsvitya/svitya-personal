"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LocalizedMaterial } from "../../content/portfolio";
import type { AppTranslations } from "../../content/ui-text";
import Modal from "../Modal/Modal";
import styles from "./MaterialsGallery.module.css";

type MaterialsGalleryProps = {
  items: LocalizedMaterial[];
  text: AppTranslations;
  companyName: string;
};

type MaterialModalContentProps = {
  material: LocalizedMaterial;
  text: AppTranslations;
  companyName: string;
  isVisible: boolean;
  titleId?: string;
  descriptionId?: string;
};

const MODAL_CLOSE_DURATION = 500;
const MATERIAL_SWITCH_DURATION = 350;

function MaterialsGallery({ items, text, companyName }: MaterialsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMaterialVisible, setIsMaterialVisible] = useState(true);
  const closeTimeoutRef = useRef<number | null>(null);
  const switchTimeoutRef = useRef<number | null>(null);
  const previousBodyOverflowRef = useRef("");
  const hasNavigation = items.length > 1;
  const activeMaterial = activeIndex === null ? null : items[activeIndex];

  const switchMaterial = useCallback(
    (getNextIndex: (currentIndex: number) => number) => {
      if (switchTimeoutRef.current || activeIndex === null) return;

      setIsMaterialVisible(false);
      switchTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex((currentIndex) =>
          currentIndex === null ? currentIndex : getNextIndex(currentIndex)
        );
        setIsMaterialVisible(true);
        switchTimeoutRef.current = null;
      }, MATERIAL_SWITCH_DURATION);
    },
    [activeIndex]
  );

  const showPreviousMaterial = useCallback(() => {
    switchMaterial((currentIndex) => (currentIndex === 0 ? items.length - 1 : currentIndex - 1));
  }, [items.length, switchMaterial]);

  const showNextMaterial = useCallback(() => {
    switchMaterial((currentIndex) => (currentIndex === items.length - 1 ? 0 : currentIndex + 1));
  }, [items.length, switchMaterial]);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setIsMaterialVisible(false);

    if (switchTimeoutRef.current) {
      window.clearTimeout(switchTimeoutRef.current);
      switchTimeoutRef.current = null;
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex(null);
      document.body.style.overflow = previousBodyOverflowRef.current;
      closeTimeoutRef.current = null;
    }, MODAL_CLOSE_DURATION);
  }, []);

  const openModal = useCallback((index: number) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    previousBodyOverflowRef.current = document.body.style.overflow;
    setActiveIndex(index);
    setIsMaterialVisible(true);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    function handleArrowNavigation(event: KeyboardEvent) {
      if (!activeMaterial || !hasNavigation) return;
      if (event.key === "ArrowLeft") showPreviousMaterial();
      if (event.key === "ArrowRight") showNextMaterial();
    }

    document.addEventListener("keydown", handleArrowNavigation);
    return () => document.removeEventListener("keydown", handleArrowNavigation);
  }, [activeMaterial, hasNavigation, showNextMaterial, showPreviousMaterial]);

  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) window.clearTimeout(switchTimeoutRef.current);
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
      document.body.style.overflow = previousBodyOverflowRef.current;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className={styles.gallery} aria-labelledby="company-materials-title">
      <h3 id="company-materials-title" className={styles.title}>
        {text.detail.materialsTitle}
      </h3>
      <div className={styles.previewGrid}>
        {items.map((material, index) => (
          <div key={`${material.type}:${material.title}:${index}`} className={styles.previewItem}>
            <button type="button" className={styles.previewButton} onClick={() => openModal(index)}>
              <Image
                className={styles.previewImage}
                src={material.previewSrc}
                alt={`${companyName}: ${material.title}`}
              />
            </button>
            <h4 className={styles.previewTitle}>{material.title}</h4>
          </div>
        ))}
      </div>

      {activeMaterial && (
        <Modal
          closeModal={closeModal}
          showContent={isModalVisible}
          setShowContent={setIsModalVisible}
          closeLabel={text.modal.closeLabel}
          overlayControls={
            hasNavigation ? (
              <>
                <button
                  type="button"
                  className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
                  onClick={showPreviousMaterial}
                  disabled={!isMaterialVisible}
                  aria-label={text.detail.previousMaterial}
                />
                <button
                  type="button"
                  className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
                  onClick={showNextMaterial}
                  disabled={!isMaterialVisible}
                  aria-label={text.detail.nextMaterial}
                />
              </>
            ) : undefined
          }
        >
          <MaterialModalContent
            material={activeMaterial}
            text={text}
            companyName={companyName}
            isVisible={isMaterialVisible}
          />
        </Modal>
      )}
    </section>
  );
}

function MaterialModalContent({
  material,
  text,
  companyName,
  isVisible,
  titleId,
  descriptionId,
}: MaterialModalContentProps) {
  const action = getMaterialAction(material, text);
  const visibilityClass = isVisible ? styles.materialVisible : styles.materialHidden;

  return (
    <div className={styles.modalContent}>
      <h2 id={titleId} className={styles.modalTitle}>
        {material.title}
      </h2>
      <div className={styles.imageFrame}>
        <Image
          className={`${styles.modalImage} ${visibilityClass}`}
          src={material.previewSrc}
          alt={`${companyName}: ${material.title}`}
        />
      </div>
      <p id={descriptionId} className={`${styles.description} ${visibilityClass}`}>
        {material.description}
      </p>
      <a
        className={`${styles.materialAction} ${action.className} ${visibilityClass}`}
        href={action.href}
        download={action.download}
        target={action.target}
        rel={action.target ? "noopener noreferrer" : undefined}
        aria-label={action.label}
        title={action.label}
      />
    </div>
  );
}

function getMaterialAction(material: LocalizedMaterial, text: AppTranslations) {
  switch (material.type) {
    case "document":
      return {
        href: material.fileSrc,
        label: text.detail.download,
        className: styles.downloadAction,
        download: true,
        target: undefined,
      } as const;
    case "image":
      return {
        href: material.fullImageSrc,
        label: text.detail.openImage,
        className: styles.openImageAction,
        download: undefined,
        target: "_blank",
      } as const;
    case "link":
      return {
        href: material.url,
        label: text.detail.openLink,
        className: styles.openLinkAction,
        download: undefined,
        target: "_blank",
      } as const;
  }
}

export default MaterialsGallery;
