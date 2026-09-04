import chemInsightLogo from "../../images/portfolio/work/cheminsight/logo.png";
import kalashnikovLogo from "../../images/portfolio/work/kalashnikov/logo.png";
import lukoilRnptLogo from "../../images/portfolio/work/lukoilrnpt/logo.png";
import namexLogo from "../../images/portfolio/work/namex/logo.png";
import thomsonReutersLogo from "../../images/portfolio/work/thomsonreuters/logo.png";
import chemInsightPolyethylenePreview from "../../images/portfolio/work/cheminsight/materials/polyethylene-preview.png";
import chemInsightPolypropylenePreview from "../../images/portfolio/work/cheminsight/materials/polypropylene-preview.png";
import chemInsightButylAlcoholsAnd2EHPreview from "../../images/portfolio/work/cheminsight/materials/butyl-alcohols-and-2-eh-preview.png";
import chemInsightFeedGradeMethioninePreview from "../../images/portfolio/work/cheminsight/materials/feed-grade-methionine-preview.png";
import chemInsightCausticSodaPreview from "../../images/portfolio/work/cheminsight/materials/caustic-soda-preview.png";
import chemInsightCausticPotashPreview from "../../images/portfolio/work/cheminsight/materials/caustic-potash-preview.png";
import chemInsightBoricAcidPreview from "../../images/portfolio/work/cheminsight/materials/boric-acid-preview.png";
import thomsonReutersArticle1Preview from "../../images/portfolio/work/thomsonreuters/materials/article-1-preview.png";
import type { CompanyId } from "../../types/domain";
import type { CompanyRecord } from "./types";

export const WORK_COMPANIES = {
  CI: {
    id: "CI",
    slug: "cheminsight",
    section: "work",
    logo: chemInsightLogo,
    url: "https://cheminsight.ru/",
    linkLabel: "cheminsight.ru",
    materials: {
      enabled: true,
      items: [
        {
          type: "document",
          previewSrc: chemInsightPolyethylenePreview,
          fileSrc: "/materials/work/cheminsight/polyethylene.pdf",
          title: {
            ru: "Полиэтилен",
            en: "Polyethylene",
          },
          description: {
            ru: "Образец аналитического материала ХимИнсайт о рынке полиэтилена.",
            en: "A sample ChemInsight analytical report on the polyethylene market.",
          },
        },
        {
          type: "document",
          previewSrc: chemInsightPolypropylenePreview,
          fileSrc: "/materials/work/cheminsight/polypropylene.pdf",
          title: {
            ru: "Полипропилен",
            en: "Polypropylene",
          },
          description: {
            ru: "Образец аналитического материала ХимИнсайт о рынке полипропилена.",
            en: "A sample ChemInsight analytical report on the polypropylene market.",
          },
        },
        {
          type: "document",
          previewSrc: chemInsightButylAlcoholsAnd2EHPreview,
          fileSrc: "/materials/work/cheminsight/butyl-alcohols-and-2-eh.pdf",
          title: {
            ru: "Бутиловые спирты и 2-ЭГ",
            en: "Butyl alcohols and 2-EH",
          },
          description: {
            ru: "Образец аналитического материала ХимИнсайт о рынке бутиловых спиртов и 2-ЭГ.",
            en: "A sample ChemInsight analytical report on the butyl alcohols and 2-EH market.",
          },
        },
        {
          type: "document",
          previewSrc: chemInsightFeedGradeMethioninePreview,
          fileSrc: "/materials/work/cheminsight/feed-grade-methionine.pdf",
          title: {
            ru: "Метионин кормовой",
            en: "Feed grade methionine",
          },
          description: {
            ru: "Образец аналитического материала ХимИнсайт о рынке кормового метионина.",
            en: "A sample ChemInsight analytical report on the feed grade methionine market.",
          },
        },
        {
          type: "document",
          previewSrc: chemInsightCausticSodaPreview,
          fileSrc: "/materials/work/cheminsight/caustic-soda.pdf",
          title: {
            ru: "Каустическая сода",
            en: "Caustic soda",
          },
          description: {
            ru: "Образец аналитического материала ХимИнсайт о рынке каустической соды.",
            en: "A sample ChemInsight analytical report on the caustic soda market.",
          },
        },
        {
          type: "document",
          previewSrc: chemInsightCausticPotashPreview,
          fileSrc: "/materials/work/cheminsight/caustic-potash.pdf",
          title: {
            ru: "Калий едкий",
            en: "Caustic potash",
          },
          description: {
            ru: "Образец аналитического материала ХимИнсайт о рынке едкого калия.",
            en: "A sample ChemInsight analytical report on the caustic potash market.",
          },
        },
        {
          type: "document",
          previewSrc: chemInsightBoricAcidPreview,
          fileSrc: "/materials/work/cheminsight/boric-acid.pdf",
          title: {
            ru: "Кислота борная",
            en: "Boric acid",
          },
          description: {
            ru: "Образец аналитического материала ХимИнсайт о рынке борной кислоты.",
            en: "A sample ChemInsight analytical report on the boric acid market.",
          },
        },
      ],
    },
    translations: {
      ru: {
        year: "2025 → настоящее время",
        name: "ХимИнсайт",
        title: "Внештатный консультант",
        about:
          "Независимое ценовое агентство, специализирующееся на экспертной оценке рынка нефтегазохимии.",
        results:
          "Запускаю и развиваю платные B2B-информационные продукты. Моделирую и визуализирую бизнес-процессы с предложениями по их оптимизации. Организую и координирую взаимодействие между экспертами, редакторами и дизайнерами для достижения эффективных результатов.",
      },
      en: {
        year: "2025 → present",
        name: "ChemInsight",
        title: "Freelance consultant",
        about:
          "An independent pricing agency specializing in expert assessment of the petrochemical market.",
        results:
          "Launching and developing paid B2B information products. Modeling and visualizing business processes with optimization proposals. Organizing and coordinating collaboration between experts, editors, and designers to achieve efficient results.",
      },
    },
  },
  NTB: {
    id: "NTB",
    slug: "namex",
    section: "work",
    logo: namexLogo,
    url: "https://namex.org/",
    linkLabel: "namex.org",
    translations: {
      ru: {
        year: "2021 → 2024",
        name: "Национальная товарная биржа",
        title: "Руководитель направления методологии / развития бизнеса",
        about: "Дочерняя структура Московской биржи, специализирующаяся на товарных направлениях.",
        results:
          "Запускал ценовые индикаторы и B2B-информационные продукты. Развивал торги на товарных аукционах. Координировал разработку и внедрение frontend-системы автоматизации обработки заявок для биржевых торгов.",
      },
      en: {
        year: "2021 → 2024",
        name: "National Mercantile Exchange",
        title: "Head of Methodology / Business Development",
        about: "A subsidiary of the Moscow Exchange specializing in commodity markets.",
        results:
          "Launched price indicators and B2B information products. Developed trading activities on commodity auctions. Coordinated the development and implementation of a frontend system for automating bid processing for exchange trading.",
      },
    },
  },
  LRNPT: {
    id: "LRNPT",
    slug: "lukoilrnpt",
    section: "work",
    logo: lukoilRnptLogo,
    url: "https://trading.lukoil.ru/",
    linkLabel: "trading.lukoil.ru",
    translations: {
      ru: {
        year: "2020 → 2021",
        name: "Лукойл-РНП-Трейдинг",
        title: "Ведущий специалист отдела развития бизнеса и анализа рынков",
        about:
          "Дочерняя структура Лукойла, специализирующаяся на оптовой продаже нефтепродуктов через электронные торговые площадки.",
        results:
          "Координировал маркетинговые проекты, готовил аналитические материалы. Участвовал в формировании стратегии развития новых направлений сбыта компании. Обеспечивал сопровождение коммерческой деятельности, выявлял потенциальные риски.",
      },
      en: {
        year: "2020 → 2021",
        name: "Lukoil-RNP-Trading",
        title: "Leading Specialist, Business Development and Market Analysis",
        about:
          "A subsidiary of Lukoil specializing in wholesale petroleum product sales via electronic trading platforms.",
        results:
          "Coordinated marketing projects and prepared analytical materials. Participated in shaping the strategy for developing new sales channels. Supported commercial operations and identified potential risks.",
      },
    },
  },
  KG: {
    id: "KG",
    slug: "kalashnikov",
    section: "work",
    logo: kalashnikovLogo,
    url: "https://kalashnikovgroup.ru/",
    linkLabel: "kalashnikovgroup.ru",
    translations: {
      ru: {
        year: "2018 → 2019",
        name: "Концерн Калашников",
        title: "Менеджер по маркетинговым исследованиям",
        about:
          "Флагман российской стрелковой отрасли, производитель промышленного, медицинского и специализированного оборудования.",
        results:
          "Работал с гражданскими рынками. Сформировал и развивал систему маркетинговых исследований для отдела продуктового маркетинга. Интегрировал систему бизнес-аналитики. Принимал участие в создании B2B-продуктов.",
      },
      en: {
        year: "2018 → 2019",
        name: "Kalashnikov Group",
        title: "Marketing Research Manager",
        about:
          "A leading company of the Russian arms industry and a manufacturer of industrial, medical, and specialized equipment.",
        results:
          "Worked with civilian markets. Built and developed a marketing research system for the product marketing department. Integrated a business analytics system. Participated in the creation of B2B products.",
      },
    },
  },
  TR: {
    id: "TR",
    slug: "thomsonreuters",
    section: "work",
    logo: thomsonReutersLogo,
    url: "https://www.thomsonreuters.com/",
    linkLabel: "thomsonreuters.com",
    materials: {
      enabled: true,
      items: [
        {
          type: "link",
          previewSrc: thomsonReutersArticle1Preview,
          url: "https://www.reuters.com/article/business/-17--idUSKBN1611FE/",
          title: {
            ru: "АНАЛИЗ-Металлурги ждут подъёма спроса на сталь в РФ в 17 году на фоне роста экономики",
            en: "ANALYSIS — Russian steelmakers expect steel demand to rebound in 2017 as economy grows",
          },
          description: {
            ru: "Статья: АНАЛИЗ-Металлурги ждут подъёма спроса на сталь в РФ в 17 году на фоне роста экономики",
            en: "Article: ANALYSIS — Russian steelmakers expect steel demand to rebound in 2017 as economy grows",
          },
        },
      ],
    },
    translations: {
      ru: {
        year: "2014 → 2018",
        name: "Thomson Reuters",
        title: "Аналитик рынков",
        about:
          "Международная медиагруппа, включающая в себя информационное агентство Reuters и IT-платформу Refinitiv Eikon для мониторинга и анализа товарных и финансовых рынков",
        results:
          "Прошёл путь от стажёра до аналитика товарно-сырьевых рынков (нефть и газ, металлургия), написав более тысячи материалов - новостей, разборов и аналитических статей, - которые прочитали более двадцати тысяч человек. Также занимался разработкой информационных продуктов и аналитических дашбордов. Проводил мастер-классы для клиентов.",
      },
      en: {
        year: "2014 → 2018",
        name: "Thomson Reuters",
        title: "Market Analyst",
        about:
          "An international media group that includes the Reuters news agency and the Refinitiv Eikon IT platform for monitoring and analyzing commodity and financial markets.",
        results:
          "Progressed from intern to commodity markets analyst (oil and gas, metallurgy), authoring over one thousand pieces - including news articles, market overviews, and analytical reports - read by more than twenty thousand people. Also involved in the development of information products and analytical dashboards. Conducted client workshops.",
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
