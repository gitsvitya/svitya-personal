import styles from "./Section.module.css";

// Универсальный блок-секция с общими отступами/шапкой; принимает кастомные классы и содержимое.
function Section({ id, title, children, className = "", contentClassName = "" }) {
  const sectionClassName = className
    ? `${styles.section} ${className}`
    : styles.section;
  const containerClassName = contentClassName
    ? `${styles.container} ${contentClassName}`
    : styles.container;

  return (
    <section className={sectionClassName} id={id}>
      <div className={containerClassName}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </section>
  );
}

export default Section;
