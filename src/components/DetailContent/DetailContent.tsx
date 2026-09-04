import Image from "next/image";
import type { LocalizedCompany } from "../../content/portfolio";
import styles from "./DetailContent.module.css";

type DetailContentProps = {
  company: LocalizedCompany | null;
  titleId?: string;
  descriptionId?: string;
};

function DetailContent({ company, titleId, descriptionId }: DetailContentProps) {
  if (!company) return null;
  return (
    <div className={styles.detailContent}>
      <div id={descriptionId} className={styles.headerGrid}>
        <div className={styles.companyBox}>
          <h2 id={titleId} className={styles.companyName}>
            {company.name}
          </h2>
          <div className={styles.descriptionLinkBox}>
            <p className={styles.paragraph}>{company.about}</p>
            {company.url && (
              <a
                className={styles.link}
                href={company.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {company.linkLabel}
              </a>
            )}
          </div>
          <div className={styles.metaBox}>
            <span className={styles.title}>{company.title}</span>
            <span className={styles.year}>{company.year}</span>
          </div>
        </div>
        <Image className={styles.logo} src={company.logo} alt={company.name} />
      </div>
      <p className={styles.paragraph}>{company.results}</p>
    </div>
  );
}

export default DetailContent;
