"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { LocalizedMaterial } from "../../content/portfolio";
import type { AppTranslations } from "../../content/ui-text";
import { getDownloadFile, getDownloadFilename } from "../../utils/downloads";
import { getTransitionDuration } from "../../utils/motion";
import { shouldHandleClientNavigation } from "../../utils/navigation";
import Modal from "../Modal/Modal";
import styles from "./MaterialsGallery.module.css";

type MaterialsGalleryProps = {
  items: LocalizedMaterial[];
  text: AppTranslations;
  companyName: string;
  compact?: boolean;
};

type MaterialModalContentProps = {
  material: LocalizedMaterial;
  text: AppTranslations;
  companyName: string;
  isVisible: boolean;
  materialCount: string;
  hasNavigation: boolean;
  showPreviousMaterial: () => void;
  showNextMaterial: () => void;
  descriptionId?: string;
};

function MaterialsGallery({ items, text, companyName, compact = false }: MaterialsGalleryProps) {
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
      <div
        className={`${styles.previewGrid} ${compact ? styles.compactGrid : ""} ${items.length === 2 ? styles.pairedGrid : ""}`}
      >
        {items.map((material, index) => {
          const action = getMaterialAction(material, text);
          return (
            <article
              key={`${material.type}:${material.title}:${index}`}
              className={styles.previewItem}
            >
              <a
                className={`arrow-link ${styles.previewLink}`}
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
                    className={`${styles.previewImage} ${material.previewFit === "cover" ? styles.fillPreview : ""}`}
                    src={material.previewSrc}
                    alt={`${companyName}: ${material.title}`}
                    sizes={
                      compact
                        ? "(max-width: 640px) 96px, (max-width: 1024px) calc((100vw - 68px) / 2), 394px"
                        : "(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc((100vw - 68px) / 2), 394px"
                    }
                  />
                </span>
                <div className={styles.previewDescription}>
                  <h3 className={styles.previewTitle}>{material.title}</h3>
                  {material.metadata && (
                    <span className={styles.previewMetadata}>{material.metadata}</span>
                  )}
                  <span className={styles.previewAction}>
                    {text.detail.openMaterial}
                    <span className={`link-arrow ${styles.previewArrow}`} aria-hidden="true">
                      →
                    </span>
                  </span>
                </div>
              </a>
            </article>
          );
        })}
      </div>

      {activeMaterial && (
        <Modal
          closeModal={closeModal}
          showContent={isModalVisible}
          setShowContent={setIsModalVisible}
          closeLabel={text.modal.closeLabel}
          title={activeMaterial.title}
          titleVisible={isMaterialVisible}
        >
          <MaterialModalContent
            material={activeMaterial}
            text={text}
            companyName={companyName}
            isVisible={isMaterialVisible}
            materialCount={`${(activeIndex ?? 0) + 1} / ${items.length}`}
            hasNavigation={hasNavigation}
            showPreviousMaterial={showPreviousMaterial}
            showNextMaterial={showNextMaterial}
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
  descriptionId,
  materialCount,
  hasNavigation,
  showPreviousMaterial,
  showNextMaterial,
}: MaterialModalContentProps) {
  const actions = getMaterialActions(material, text);
  const document = material.type === "document" ? getDownloadFile(material.fileSrc) : undefined;
  const original = document?.originalSrc ? getDownloadFile(document.originalSrc) : undefined;
  const imageDownloadSrc = material.type === "document" ? material.imageDownloadSrc : undefined;
  const visibilityClass = isVisible ? styles.materialVisible : styles.materialHidden;
  const openOriginalLabel = text.detail.openOriginal;
  const originalHref = actions.openWindow.href ?? actions.openLink.href;
  const fullImage = material.fullImageSrc;
  const imageSrc = typeof fullImage === "string" ? fullImage : fullImage.src;
  const sourceDimensions = typeof fullImage === "string" ? material.previewSrc : fullImage;
  const [loadedImage, setLoadedImage] = useState<{ src: string; ratio: number } | null>(null);
  const imageRatio =
    loadedImage?.src === imageSrc
      ? loadedImage.ratio
      : sourceDimensions.width / sourceDimensions.height;

  return (
    <div className={styles.modalContent}>
      <div className={styles.imageFrame}>
        <a
          className={styles.imageLink}
          style={{ "--material-image-ratio": imageRatio } as CSSProperties}
          href={originalHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={openOriginalLabel}
          title={openOriginalLabel}
        >
          <Image
            className={`${styles.modalImage} ${visibilityClass}`}
            src={fullImage}
            alt={`${companyName}: ${material.title}`}
            width={sourceDimensions.width}
            height={sourceDimensions.height}
            sizes="(max-width: 640px) calc(100vw - 48px), 852px"
            onLoad={
              typeof fullImage === "string"
                ? (event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    if (naturalWidth > 0 && naturalHeight > 0) {
                      setLoadedImage({ src: imageSrc, ratio: naturalWidth / naturalHeight });
                    }
                  }
                : undefined
            }
          />
        </a>
      </div>
      <div className={styles.galleryNavigation}>
        {hasNavigation && (
          <button
            type="button"
            className={`arrow-link ${styles.arrowButton}`}
            onClick={showPreviousMaterial}
            aria-disabled={!isVisible}
            aria-label={text.detail.previousMaterial}
          >
            <span className="link-arrow link-arrow-back" aria-hidden="true">
              ←
            </span>
          </button>
        )}
        <span className={styles.materialCount} aria-live="polite" aria-atomic="true">
          {materialCount}
        </span>
        {hasNavigation && (
          <button
            type="button"
            className={`arrow-link ${styles.arrowButton}`}
            onClick={showNextMaterial}
            aria-disabled={!isVisible}
            aria-label={text.detail.nextMaterial}
          >
            <span className="link-arrow" aria-hidden="true">
              →
            </span>
          </button>
        )}
      </div>
      <p id={descriptionId} className={`${styles.description} ${visibilityClass}`}>
        {material.description}
      </p>
      <div
        className={`${styles.materialActions} ${visibilityClass}`}
        onFocus={(event) => {
          // Firefox can focus a partially clipped link without fully revealing it.
          event.target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
        }}
      >
        <a
          className={`button-control ${styles.materialAction}`}
          href={originalHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={`button-label ${styles.actionText}`}>{openOriginalLabel}</span>
        </a>
        {actions.download.href && (
          <a
            className={`button-control ${styles.materialAction}`}
            href={actions.download.href}
            download={actions.download.download}
          >
            <span className={`button-label ${styles.actionText}`}>{text.detail.download}</span>
          </a>
        )}
        {actions.openLink.href && actions.openLink.href !== originalHref && (
          <a
            className={`button-control ${styles.materialAction}`}
            href={actions.openLink.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={`button-label ${styles.actionText}`}>{text.detail.openLink}</span>
          </a>
        )}
        {imageDownloadSrc && (
          <a
            className={styles.originalDownloadAction}
            href={imageDownloadSrc}
            download={getDownloadFilename(imageDownloadSrc)}
          >
            {text.detail.downloadImage}
          </a>
        )}
        {original && document?.originalSrc && (
          <a
            className={styles.originalDownloadAction}
            href={document.originalSrc}
            download={original.filename}
          >
            {text.detail.downloadOriginal}
          </a>
        )}
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
      download: material.type === "document" ? getDownloadFilename(material.fileSrc) : true,
      target: undefined,
    },
    openWindow: {
      href: fileHref,
      label: text.detail.openWindow,
      download: undefined,
      target: "_blank",
    },
    openLink: {
      href: material.type === "image" ? undefined : material.url,
      label: text.detail.openLink,
      download: undefined,
      target: "_blank",
    },
  } as const;
}

export default MaterialsGallery;
