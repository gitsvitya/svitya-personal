"use client";

import { useCallback, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { getLocalizedCompany } from "../content/companies";
import type { CompanyId, Language } from "../types/domain";

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

export function useAppModal(language: Language): UseAppModalResult {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContentCompany, setModalContentCompany] = useState<CompanyId | null>(null);
  const [showContent, setShowContent] = useState(false);

  const openModal = useCallback(() => {
    setModalOpened(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setShowContent(false);
    window.setTimeout(() => {
      setModalOpened(false);
      setModalContentCompany(null);
      document.body.style.overflow = "";
    }, MODAL_CLOSE_DURATION);
  }, []);

  const activeModalCompany = useMemo(() => {
    if (modalContentCompany === null) return null;
    return getLocalizedCompany(modalContentCompany, language);
  }, [language, modalContentCompany]);

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
