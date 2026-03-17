import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

// Универсальная секция инкапсулирует общий layout-контейнер,
// id-якорь и опциональный заголовок раздела.
function Section({
  id,
  title,
  children,
  className = "",
  contentClassName = "",
}: SectionProps) {
  // Классы собираем заранее, чтобы JSX ниже оставался декларативным и коротким.
  const sectionClassName = className ? `${styles.section} ${className}` : styles.section;
  const containerClassName = contentClassName
    ? `layout-container ${styles.container} ${contentClassName}`
    : `layout-container ${styles.container}`;

  return (
    <section className={sectionClassName} id={id}>
      <div className={containerClassName}>
        {/* Заголовок нужен не всем секциям: например, блок "about" рендерит собственный h1. */}
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </section>
  );
}

export default Section;
