import Image from "next/image";
import type { LocalizedCompany } from "../../content/portfolio";
import type { AppTranslations } from "../../content/ui-text";
import styles from "./DetailContent.module.css";

type DetailContentProps = {
  company: LocalizedCompany | null;
  titleId?: string;
  descriptionId?: string;
  text: AppTranslations;
};

function DetailContent({ company, titleId, descriptionId, text }: DetailContentProps) {
  if (!company) return null;
  return (
    <div className={styles.detailContent}>
      <div id={descriptionId} className={styles.header}>
        <div className={styles.companyIdentity}>
          <Image
            className={styles.logo}
            src={company.logo}
            alt=""
            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 112px"
            preload
          />
          <div className={styles.companyBox}>
            <h1 id={titleId} className={styles.companyName}>
              {company.name}
            </h1>
            {company.url && (
              <a
                className={styles.link}
                href={company.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={styles.linkLabel}>{company.linkLabel}</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              </a>
            )}
          </div>
        </div>
        <p className={`${styles.paragraph} ${styles.description}`}>{company.about}</p>
        <div className={styles.metaBox}>
          <span className={styles.title}>{company.title}</span>
          <span className={styles.year}>{company.year}</span>
        </div>
      </div>
      <div className={styles.caseStudy}>
        {company.caseStudy ? (
          <>
            <section>
              <h2>{text.detail.challenge}</h2>
              <p className={styles.paragraph}>{company.caseStudy.challenge}</p>
            </section>
            <section>
              <h2>{text.detail.contribution}</h2>
              <ul className={styles.contributions}>
                {company.caseStudy.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className={styles.outcome}>
              <h2>{text.detail.outcome}</h2>
              <p className={styles.paragraph}>{company.caseStudy.outcome}</p>
            </section>
          </>
        ) : (
          <section>
            <h2>{text.detail.contribution}</h2>
            <p className={styles.paragraph}>{company.results}</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default DetailContent;
