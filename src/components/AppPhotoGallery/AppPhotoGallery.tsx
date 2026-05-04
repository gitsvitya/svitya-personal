"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LocalizedCompany } from "../../content/companies";
import type { AppTranslations } from "../../content/ui-text";
import Modal from "../Modal/Modal";
import styles from "./AppPhotoGallery.module.css";

type GalleryPhoto = NonNullable<LocalizedCompany["photos"]>[number];

type AppPhotoGalleryProps = {
  photos: GalleryPhoto[];
  text: AppTranslations;
  companyName: string;
};

type PhotoModalContentProps = {
  photo: GalleryPhoto;
  text: AppTranslations;
  companyName: string;
  hasNavigation: boolean;
  onPrevious: () => void;
  onNext: () => void;
  titleId?: string;
  descriptionId?: string;
};

const MODAL_CLOSE_DURATION = 500;

function AppPhotoGallery({ photos, text, companyName }: AppPhotoGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const hasNavigation = photos.length > 1;
  const activePhoto = activePhotoIndex === null ? null : photos[activePhotoIndex];

  const closeModal = useCallback(() => {
    setShowContent(false);
    closeTimeoutRef.current = window.setTimeout(() => {
      setActivePhotoIndex(null);
      document.body.style.overflow = "";
      closeTimeoutRef.current = null;
    }, MODAL_CLOSE_DURATION);
  }, []);

  const openModal = useCallback((index: number) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActivePhotoIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const showPreviousPhoto = useCallback(() => {
    setActivePhotoIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    });
  }, [photos.length]);

  const showNextPhoto = useCallback(() => {
    setActivePhotoIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;
      return currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    });
  }, [photos.length]);

  useEffect(() => {
    function handleArrowNavigation(event: KeyboardEvent) {
      if (!activePhoto || !hasNavigation) return;
      if (event.key === "ArrowLeft") showPreviousPhoto();
      if (event.key === "ArrowRight") showNextPhoto();
    }

    document.addEventListener("keydown", handleArrowNavigation);
    return () => {
      document.removeEventListener("keydown", handleArrowNavigation);
    };
  }, [activePhoto, hasNavigation, showNextPhoto, showPreviousPhoto]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  if (photos.length === 0) return null;

  return (
    <section className={styles.gallery} aria-labelledby="company-photos-title">
      <h3 id="company-photos-title" className={styles.title}>
        {text.detail.materialsTitle}
      </h3>
      <div className={styles.previewGrid}>
        {photos.map((photo, index) => (
          <div key={photo.src} className={styles.previewItem}>
            <button
              type="button"
              className={styles.previewButton}
              onClick={() => openModal(index)}
            >
              <img
                className={styles.previewImage}
                src={photo.src}
                alt={`${companyName}: ${photo.description}`}
                loading="lazy"
              />
            </button>
            <p className={styles.previewDescription}>{photo.description}</p>
          </div>
        ))}
      </div>

      {activePhoto && (
        <Modal
          closeModal={closeModal}
          showContent={showContent}
          setShowContent={setShowContent}
          closeLabel={text.modal.closeLabel}
        >
          <PhotoModalContent
            photo={activePhoto}
            text={text}
            companyName={companyName}
            hasNavigation={hasNavigation}
            onPrevious={showPreviousPhoto}
            onNext={showNextPhoto}
          />
        </Modal>
      )}
    </section>
  );
}

function PhotoModalContent({
  photo,
  text,
  companyName,
  hasNavigation,
  onPrevious,
  onNext,
  titleId,
  descriptionId,
}: PhotoModalContentProps) {
  return (
    <div className={styles.modalContent}>
      <h2 id={titleId} className={styles.modalTitle}>
        {text.detail.materialsTitle}
      </h2>
      <div className={styles.imageFrame}>
        {hasNavigation && (
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
            onClick={onPrevious}
            aria-label={text.detail.previousPhoto}
          >
            ←
          </button>
        )}
        <img
          className={styles.modalImage}
          src={photo.src}
          alt={`${companyName}: ${photo.description}`}
        />
        {hasNavigation && (
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
            onClick={onNext}
            aria-label={text.detail.nextPhoto}
          >
            →
          </button>
        )}
      </div>
      <p id={descriptionId} className={styles.description}>
        {photo.description}
      </p>
      <a
        className={styles.downloadLink}
        href={photo.downloadSrc}
        download
      >
        {text.detail.download}
      </a>
    </div>
  );
}

export default AppPhotoGallery;
