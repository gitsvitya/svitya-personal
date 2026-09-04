import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

function Section({ id, title, children, className = "", contentClassName = "" }: SectionProps) {
  const sectionClassName = className ? `${styles.section} ${className}` : styles.section;
  const containerClassName = contentClassName
    ? `layout-container ${styles.container} ${contentClassName}`
    : `layout-container ${styles.container}`;

  return (
    <section className={sectionClassName} id={id}>
      <div className={containerClassName}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
      </div>
    </section>
  );
}

export default Section;
