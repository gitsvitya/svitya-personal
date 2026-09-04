"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { LocalizedCompany } from "../../content/portfolio";
import { shouldHandleClientNavigation } from "../../utils/navigation";
import { useRouteTransition } from "../SiteShell/RouteTransitionContext";
import styles from "./Card.module.css";

type CardProps = {
  company: LocalizedCompany;
  href: string;
  ctaLabel: string;
};

function Card({ company, href, ctaLabel }: CardProps) {
  const { navigate } = useRouteTransition();

  function handleActivate(event: MouseEvent<HTMLAnchorElement>) {
    if (!shouldHandleClientNavigation(event)) return;

    event.preventDefault();
    navigate(href);
  }

  return (
    <Link className={styles.card} href={href} onClick={handleActivate}>
      <div className={styles.cardText}>
        <span className={styles.cardYear}>{company.year}</span>
        <span className={styles.cardCompanyName}>{company.name}</span>
        <span className={styles.cardTitle}>{company.title}</span>
        <span className={styles.cardCta}>{ctaLabel}</span>
      </div>
      <Image className={styles.logoPic} src={company.logo} alt={company.name} />
    </Link>
  );
}

export default Card;
