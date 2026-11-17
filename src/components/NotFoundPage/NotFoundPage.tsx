"use client";

import { useContext, useLayoutEffect } from "react";
import { RouteStatusContext } from "../SiteShell/RouteStatusContext";
import { usePathname } from "next/navigation";
import { getTranslations } from "../../content/ui-text";
import { DEFAULT_LANGUAGE, type Language } from "../../types/domain";
import { parseLocalizedPath } from "../../utils/routing";
import TransitionLink from "../SiteShell/TransitionLink";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage({
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  initialLanguage?: Language;
}) {
  const pathname = usePathname();
  const reportNotFound = useContext(RouteStatusContext);
  useLayoutEffect(() => {
    reportNotFound?.(pathname);
    return () => reportNotFound?.(null);
  }, [pathname, reportNotFound]);
  const language = parseLocalizedPath(pathname).language || initialLanguage;
  const text = getTranslations(language).notFound;
  return (
    <section className={`layout-container ${styles.container}`}>
      <p className={styles.code}>404</p>
      <h1>{text.title}</h1>
      <p>{text.description}</p>
      <TransitionLink href={`/${language}/about`} className="button-control">
        <span className="button-label">{text.home}</span>
      </TransitionLink>
    </section>
  );
}
