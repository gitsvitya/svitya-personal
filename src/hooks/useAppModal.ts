"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getLocalizedCompany } from "../content/companies";
import type { CompanyId, Language } from "../types/domain";

// Длительность закрытия совпадает с CSS-анимацией модалки:
// состояние удаляется только после завершения визуального fade-out.
const MODAL_CLOSE_DURATION = 500;

type UseAppModalResult = {
  modalOpened: boolean;
  showContent: boolean;
  setShowContent: Dispatch<SetStateAction<boolean>>;
  setModalContentCompany: Dispatch<SetStateAction<CompanyId | null>>;
  openModal: () => void;
  closeModal: () => void;
  activeModalCompany: ReturnType<typeof getLocalizedCompany> | null;
};

// Хук держит все состояние модалки в одном месте: открытие, закрытие,
// выбранную карточку и локализованный контент активной записи.
export function useAppModal(language: Language): UseAppModalResult {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContentCompany, setModalContentCompany] = useState<CompanyId | null>(null);
  const [showContent, setShowContent] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  // При открытии блокируем скролл body, чтобы фон не прокручивался
  // под модальным окном на desktop и mobile.
  const openModal = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setModalOpened(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Контент скрывается сразу, а само окно удаляется из DOM после паузы,
  // чтобы анимация закрытия успела закончиться без резкого исчезновения.
  const closeModal = useCallback(() => {
    setShowContent(false);
    closeTimeoutRef.current = window.setTimeout(() => {
      setModalOpened(false);
      setModalContentCompany(null);
      document.body.style.overflow = "";
      closeTimeoutRef.current = null;
    }, MODAL_CLOSE_DURATION);
  }, []);

  // По текущему языку и выбранному id достаем уже готовую локализованную
  // запись, чтобы компоненты не знали о внутренней структуре контента.
  const activeModalCompany = useMemo(() => {
    if (modalContentCompany === null) return null;
    return getLocalizedCompany(modalContentCompany, language);
  }, [language, modalContentCompany]);

  // При размонтировании восстанавливаем скролл и снимаем таймер,
  // чтобы не оставить побочные эффекты после ухода со страницы.
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      document.body.style.overflow = "";
    };
  }, []);

  return {
    modalOpened,
    showContent,
    setShowContent,
    setModalContentCompany,
    openModal,
    closeModal,
    activeModalCompany,
  };
}
