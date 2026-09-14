"use client";

import { usePathname } from "next/navigation";
import { getTranslations } from "../../content/ui-text";
import { DEFAULT_LANGUAGE, type Language } from "../../types/domain";
import { parseLocalizedPath } from "../../utils/routing";
import TransitionLink from "../SiteShell/TransitionLink";
import YandexAnalytics from "../YandexAnalytics/YandexAnalytics";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage({
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  initialLanguage?: Language;
}) {
  const language = parseLocalizedPath(usePathname()).language || initialLanguage;
  const text = getTranslations(language).notFound;
  return (
    <section className={`layout-container ${styles.container}`}>
      <YandexAnalytics title={text.title} />
      <p className={styles.code}>404</p>
      <h1>{text.title}</h1>
      <p>{text.description}</p>
      <TransitionLink href={`/${language}/about`} className="button-primary">
        {text.home}
      </TransitionLink>
    </section>
  );
}
