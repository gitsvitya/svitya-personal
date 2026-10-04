"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LocalizedMaterial } from "../../content/portfolio";
import type { AppTranslations } from "../../content/ui-text";
import { getTransitionDuration } from "../../utils/motion";
import { shouldHandleClientNavigation } from "../../utils/navigation";
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
  materialCount?: string;
  titleId?: string;
  descriptionId?: string;
};

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
      if (
        switchTimeoutRef.current ||
        activeIndex === null ||
        !isModalVisible ||
        !isMaterialVisible
      ) {
        return;
      }

      setIsMaterialVisible(false);
      switchTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex((currentIndex) =>
          currentIndex === null ? currentIndex : getNextIndex(currentIndex)
        );
        setIsMaterialVisible(true);
        switchTimeoutRef.current = null;
      }, getTransitionDuration("fast"));
    },
    [activeIndex, isMaterialVisible, isModalVisible]
  );

  const showPreviousMaterial = useCallback(() => {
    switchMaterial((currentIndex) => (currentIndex === 0 ? items.length - 1 : currentIndex - 1));
  }, [items.length, switchMaterial]);

  const showNextMaterial = useCallback(() => {
    switchMaterial((currentIndex) => (currentIndex === items.length - 1 ? 0 : currentIndex + 1));
  }, [items.length, switchMaterial]);

  const closeModal = useCallback(() => {
    if (closeTimeoutRef.current) return;

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
    }, getTransitionDuration("slow"));
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
      if (!activeMaterial || !hasNavigation || !isModalVisible || !isMaterialVisible) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousMaterial();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextMaterial();
      }
    }

    document.addEventListener("keydown", handleArrowNavigation);
    return () => document.removeEventListener("keydown", handleArrowNavigation);
  }, [
    activeMaterial,
    hasNavigation,
    isMaterialVisible,
    isModalVisible,
    showNextMaterial,
    showPreviousMaterial,
  ]);

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
      <h2 id="company-materials-title" className={styles.title}>
        {text.detail.materialsTitle}
      </h2>
      <div className={styles.previewGrid}>
        {items.map((material, index) => {
          const action = getMaterialAction(material, text);
          return (
            <h3 key={`${material.type}:${material.title}:${index}`} className={styles.previewItem}>
              <a
                className={styles.previewLink}
                href={action.href}
                download={action.download}
                target={action.target}
                rel={action.target ? "noopener noreferrer" : undefined}
                aria-label={`${companyName}: ${material.title}`}
                onClick={(event) => {
                  if (!shouldHandleClientNavigation(event)) return;
                  event.preventDefault();
                  // Keep a reliable return target in Safari as well as keyboard navigation.
                  event.currentTarget.focus({ preventScroll: true });
                  openModal(index);
                }}
              >
                <span className={styles.previewFrame}>
                  <Image
                    className={styles.previewImage}
                    src={material.previewSrc}
                    alt={`${companyName}: ${material.title}`}
                    sizes="(max-width: 360px) calc(100vw - 32px), (max-width: 768px) calc((100vw - 48px) / 2), (max-width: 1024px) calc((100vw - 80px) / 3), 300px"
                  />
                </span>
                <span className={styles.previewTitle}>
                  <span className={styles.previewTitleText}>{material.title}</span>
                  <span className={styles.previewArrow} aria-hidden="true">
                    →
                  </span>
                </span>
              </a>
            </h3>
          );
        })}
      </div>

      {activeMaterial && (
        <Modal
          className={styles.materialModal}
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
                  aria-disabled={!isMaterialVisible}
                  aria-label={text.detail.previousMaterial}
                />
                <button
                  type="button"
                  className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
                  onClick={showNextMaterial}
                  aria-disabled={!isMaterialVisible}
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
            materialCount={
              hasNavigation
                ? `${(activeIndex ?? 0) + 1} ${text.detail.materialOf} ${items.length}`
                : undefined
            }
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
  materialCount,
}: MaterialModalContentProps) {
  const actions = getMaterialActions(material, text);
  const visibilityClass = isVisible ? styles.materialVisible : styles.materialHidden;

  return (
    <div className={styles.modalContent}>
      <h2 id={titleId} className={styles.modalTitle}>
        {material.title}
      </h2>
      <div className={styles.imageFrame}>
        <Image
          className={`${styles.modalImage} ${visibilityClass}`}
          src={material.fullImageSrc}
          alt={`${companyName}: ${material.title}`}
          sizes={
            materialCount
              ? "(max-width: 640px) calc(100vw - 136px), 400px"
              : "(max-width: 640px) calc(100vw - 64px), 400px"
          }
        />
      </div>
      {materialCount && (
        <span className={styles.materialCount} aria-live="polite" aria-atomic="true">
          {materialCount}
        </span>
      )}
      <p id={descriptionId} className={`${styles.description} ${visibilityClass}`}>
        {material.description}
      </p>
      <div className={`${styles.materialActions} ${visibilityClass}`}>
        {Object.entries(actions).map(([key, action]) => {
          const className = `button-control ${styles.materialAction} ${action.className}`;
          const label = <span className={`button-label ${styles.actionText}`}>{action.label}</span>;

          return action.href ? (
            <a
              key={key}
              className={className}
              href={action.href}
              download={action.download}
              target={action.target}
              rel={action.target ? "noopener noreferrer" : undefined}
              onFocus={(event) => {
                event.currentTarget.scrollIntoView({
                  block: "nearest",
                  inline: "nearest",
                  behavior: "instant",
                });
              }}
            >
              {label}
            </a>
          ) : (
            <button key={key} type="button" className={className} disabled>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getMaterialAction(material: LocalizedMaterial, text: AppTranslations) {
  const actions = getMaterialActions(material, text);
  switch (material.type) {
    case "document":
      return actions.download;
    case "image":
      return actions.openWindow;
    case "link":
      return actions.openLink;
  }
}

function getMaterialActions(material: LocalizedMaterial, text: AppTranslations) {
  const fileHref =
    material.type === "document"
      ? material.fileSrc
      : material.type === "image"
        ? typeof material.fullImageSrc === "string"
          ? material.fullImageSrc
          : material.fullImageSrc.src
        : undefined;

  return {
    download: {
      href: fileHref,
      label: text.detail.download,
      className: styles.downloadAction,
      download: true,
      target: undefined,
    },
    openWindow: {
      href: fileHref,
      label: text.detail.openWindow,
      className: styles.openWindowAction,
      download: undefined,
      target: "_blank",
    },
    openLink: {
      href: material.type === "image" ? undefined : material.url,
      label: text.detail.openLink,
      className: styles.openLinkAction,
      download: undefined,
      target: "_blank",
    },
  } as const;
}

export default MaterialsGallery;
