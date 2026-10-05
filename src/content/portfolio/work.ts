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
import namexRegionalOtcIndicesPreview from "../../images/portfolio/work/namex/materials/otc-regional-agricultural-indices-preview.png";
import namexWheatCptIndexPreview from "../../images/portfolio/work/namex/materials/wheat-cpt-novorossiysk-index-preview.png";
import namexExchangeSugarIndexPreview from "../../images/portfolio/work/namex/materials/exchange-sugar-cfd-index-preview.png";
import namexDailyOtcSugarIndexPreview from "../../images/portfolio/work/namex/materials/daily-otc-sugar-cfd-index-preview.png";
import namexAgriculturalIndicesPreview from "../../images/portfolio/work/namex/materials/agricultural-indices-2024-07-15-preview.png";
import thomsonReutersSteelDemandPreview from "../../images/portfolio/work/thomsonreuters/materials/russian-steel-demand-2017-preview.png";
import thomsonReutersSteelDiscountsPreview from "../../images/portfolio/work/thomsonreuters/materials/russian-steel-discounts-preview.png";
import thomsonReutersPortHedlandPreview from "../../images/portfolio/work/thomsonreuters/materials/port-hedland-cyclone-joyce-preview.png";
import thomsonReutersRenovationPreview from "../../images/portfolio/work/thomsonreuters/materials/moscow-renovation-steel-preview.png";
import thomsonReutersIronOrePreview from "../../images/portfolio/work/thomsonreuters/materials/iron-ore-price-forecast-2017-preview.png";
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
          assets: {
            ru: {
              previewSrc: chemInsightPolyethylenePreview,
              fullImageSrc: chemInsightPolyethylenePreview,
              fileSrc: "/materials/work/cheminsight/polyethylene.pdf",
            },
            en: {
              previewSrc: chemInsightPolyethylenePreview,
              fullImageSrc: chemInsightPolyethylenePreview,
              fileSrc: "/materials/work/cheminsight/polyethylene.pdf",
            },
          },
          title: {
            ru: "Полиэтилен",
            en: "Polyethylene",
          },
          description: {
            ru: "Образец еженедельного информационного бюллетеня ХимИнсайт о рынке полиэтилена.",
            en: "A sample of ChemInsight’s weekly information bulletin on the polyethylene market.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: chemInsightPolypropylenePreview,
              fullImageSrc: chemInsightPolypropylenePreview,
              fileSrc: "/materials/work/cheminsight/polypropylene.pdf",
            },
            en: {
              previewSrc: chemInsightPolypropylenePreview,
              fullImageSrc: chemInsightPolypropylenePreview,
              fileSrc: "/materials/work/cheminsight/polypropylene.pdf",
            },
          },
          title: {
            ru: "Полипропилен",
            en: "Polypropylene",
          },
          description: {
            ru: "Образец еженедельного информационного бюллетеня ХимИнсайт о рынке полипропилена.",
            en: "A sample of ChemInsight’s weekly information bulletin on the polypropylene market.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: chemInsightButylAlcoholsAnd2EHPreview,
              fullImageSrc: chemInsightButylAlcoholsAnd2EHPreview,
              fileSrc: "/materials/work/cheminsight/butyl-alcohols-and-2-eh.pdf",
            },
            en: {
              previewSrc: chemInsightButylAlcoholsAnd2EHPreview,
              fullImageSrc: chemInsightButylAlcoholsAnd2EHPreview,
              fileSrc: "/materials/work/cheminsight/butyl-alcohols-and-2-eh.pdf",
            },
          },
          title: {
            ru: "Бутиловые спирты и 2-ЭГ",
            en: "Butyl alcohols and 2-EH",
          },
          description: {
            ru: "Образец еженедельного информационного бюллетеня ХимИнсайт о рынке бутиловых спиртов и 2-ЭГ.",
            en: "A sample of ChemInsight’s weekly information bulletin on the butyl alcohols and 2-EH market.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: chemInsightFeedGradeMethioninePreview,
              fullImageSrc: chemInsightFeedGradeMethioninePreview,
              fileSrc: "/materials/work/cheminsight/feed-grade-methionine.pdf",
            },
            en: {
              previewSrc: chemInsightFeedGradeMethioninePreview,
              fullImageSrc: chemInsightFeedGradeMethioninePreview,
              fileSrc: "/materials/work/cheminsight/feed-grade-methionine.pdf",
            },
          },
          title: {
            ru: "Метионин кормовой",
            en: "Feed grade methionine",
          },
          description: {
            ru: "Образец информационного бюллетеня ХимИнсайт о рынке кормового метионина. Выходит два раза в месяц.",
            en: "A sample of ChemInsight’s information bulletin on the feed-grade methionine market. It is published twice a month.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: chemInsightCausticSodaPreview,
              fullImageSrc: chemInsightCausticSodaPreview,
              fileSrc: "/materials/work/cheminsight/caustic-soda.pdf",
            },
            en: {
              previewSrc: chemInsightCausticSodaPreview,
              fullImageSrc: chemInsightCausticSodaPreview,
              fileSrc: "/materials/work/cheminsight/caustic-soda.pdf",
            },
          },
          title: {
            ru: "Каустическая сода",
            en: "Caustic soda",
          },
          description: {
            ru: "Образец ежемесячного информационного бюллетеня ХимИнсайт о рынке каустической соды.",
            en: "A sample of ChemInsight’s monthly information bulletin on the caustic soda market.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: chemInsightCausticPotashPreview,
              fullImageSrc: chemInsightCausticPotashPreview,
              fileSrc: "/materials/work/cheminsight/caustic-potash.pdf",
            },
            en: {
              previewSrc: chemInsightCausticPotashPreview,
              fullImageSrc: chemInsightCausticPotashPreview,
              fileSrc: "/materials/work/cheminsight/caustic-potash.pdf",
            },
          },
          title: {
            ru: "Калий едкий",
            en: "Caustic potash",
          },
          description: {
            ru: "Образец ежемесячного информационного бюллетеня ХимИнсайт о рынке едкого калия.",
            en: "A sample of ChemInsight’s monthly information bulletin on the caustic potash market.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: chemInsightBoricAcidPreview,
              fullImageSrc: chemInsightBoricAcidPreview,
              fileSrc: "/materials/work/cheminsight/boric-acid.pdf",
            },
            en: {
              previewSrc: chemInsightBoricAcidPreview,
              fullImageSrc: chemInsightBoricAcidPreview,
              fileSrc: "/materials/work/cheminsight/boric-acid.pdf",
            },
          },
          title: {
            ru: "Кислота борная",
            en: "Boric acid",
          },
          description: {
            ru: "Образец ежемесячного информационного бюллетеня ХимИнсайт о рынке борной кислоты.",
            en: "A sample of ChemInsight’s monthly information bulletin on the boric acid market.",
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
    materials: {
      enabled: true,
      items: [
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: namexRegionalOtcIndicesPreview,
              fullImageSrc: namexRegionalOtcIndicesPreview,
              fileSrc: "/materials/work/namex/otc-regional-agricultural-indices.pdf",
            },
            en: {
              previewSrc: namexRegionalOtcIndicesPreview,
              fullImageSrc: namexRegionalOtcIndicesPreview,
              fileSrc: "/materials/work/namex/otc-regional-agricultural-indices.pdf",
            },
          },
          title: {
            ru: "Методика региональных внебиржевых индексов агропродукции",
            en: "Regional OTC agricultural indices methodology",
          },
          description: {
            ru: "Методика расчёта региональных индексов пшеницы, кукурузы, ячменя и сахара на условиях EXW и FCA.",
            en: "Methodology for regional wheat, corn, barley and sugar indices on EXW and FCA terms.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: namexWheatCptIndexPreview,
              fullImageSrc: namexWheatCptIndexPreview,
              fileSrc: "/materials/work/namex/wheat-cpt-novorossiysk-index.pdf",
            },
            en: {
              previewSrc: namexWheatCptIndexPreview,
              fullImageSrc: namexWheatCptIndexPreview,
              fileSrc: "/materials/work/namex/wheat-cpt-novorossiysk-index.pdf",
            },
          },
          title: {
            ru: "Методика индекса пшеницы CPT Новороссийск",
            en: "CPT Novorossiysk wheat index methodology",
          },
          description: {
            ru: "Методика расчёта ценового индекса пшеницы на условиях CPT Новороссийск по итогам товарных аукционов.",
            en: "Methodology for the CPT Novorossiysk wheat price index based on commodity auctions.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: namexExchangeSugarIndexPreview,
              fullImageSrc: namexExchangeSugarIndexPreview,
              fileSrc: "/materials/work/namex/exchange-sugar-cfd-index.pdf",
            },
            en: {
              previewSrc: namexExchangeSugarIndexPreview,
              fullImageSrc: namexExchangeSugarIndexPreview,
              fileSrc: "/materials/work/namex/exchange-sugar-cfd-index.pdf",
            },
          },
          title: {
            ru: "Методика биржевого индекса сахара в ЦФО",
            en: "Central Federal District exchange-traded sugar index methodology",
          },
          description: {
            ru: "Методика расчёта биржевого индекса сахара в Центральном федеральном округе по данным спот-рынка.",
            en: "Methodology for the exchange-traded sugar index in the Central Federal District using spot market data.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: namexDailyOtcSugarIndexPreview,
              fullImageSrc: namexDailyOtcSugarIndexPreview,
              fileSrc: "/materials/work/namex/daily-otc-sugar-cfd-index.pdf",
            },
            en: {
              previewSrc: namexDailyOtcSugarIndexPreview,
              fullImageSrc: namexDailyOtcSugarIndexPreview,
              fileSrc: "/materials/work/namex/daily-otc-sugar-cfd-index.pdf",
            },
          },
          title: {
            ru: "Методика ежедневного внебиржевого индекса сахара в ЦФО",
            en: "Central Federal District daily OTC sugar index methodology",
          },
          description: {
            ru: "Методика расчёта ежедневного внебиржевого индекса сахара в Центральном федеральном округе на условиях EXW и FCA.",
            en: "Methodology for the daily OTC sugar index in the Central Federal District on EXW and FCA terms.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: namexAgriculturalIndicesPreview,
              fullImageSrc: namexAgriculturalIndicesPreview,
              fileSrc: "/materials/work/namex/agricultural-indices-2024-07-15.pdf",
            },
            en: {
              previewSrc: namexAgriculturalIndicesPreview,
              fullImageSrc: namexAgriculturalIndicesPreview,
              fileSrc: "/materials/work/namex/agricultural-indices-2024-07-15.pdf",
            },
          },
          title: {
            ru: "Пример аналитического дашборда индексов НТБ",
            en: "Sample analytics dashboard for NME indices",
          },
          description: {
            ru: "Пример аналитического дашборда НТБ с экспортными, биржевыми и внебиржевыми индексами агропродукции.",
            en: "A sample NME analytics dashboard showing export, exchange-traded and OTC agricultural price indices.",
          },
        },
      ],
    },
    translations: {
      ru: {
        year: "2021 → 2024",
        name: "Национальная товарная биржа",
        title: "Руководитель направления методологии",
        about: "Дочерняя структура Московской биржи, специализирующаяся на товарных направлениях.",
        results:
          "Запускал ценовые индикаторы и B2B-информационные продукты. Развивал торги на товарных аукционах. Координировал разработку и внедрение frontend-системы автоматизации обработки заявок для биржевых торгов.",
      },
      en: {
        year: "2021 → 2024",
        name: "National Mercantile Exchange",
        title: "Head of Methodology",
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
          type: "document",
          assets: {
            ru: {
              previewSrc: thomsonReutersSteelDemandPreview,
              fullImageSrc: thomsonReutersSteelDemandPreview,
              fileSrc: "/materials/work/thomsonreuters/russian-steel-demand-2017.pdf",
              url: "https://www.reuters.com/article/business/-17--idUSKBN1611FE/",
            },
            en: {
              previewSrc: thomsonReutersSteelDemandPreview,
              fullImageSrc: thomsonReutersSteelDemandPreview,
              fileSrc: "/materials/work/thomsonreuters/russian-steel-demand-2017.pdf",
              url: "https://www.reuters.com/article/business/-17--idUSKBN1611FE/",
            },
          },
          title: {
            ru: "АНАЛИЗ-Металлурги ждут подъёма спроса на сталь в РФ в 17 году на фоне роста экономики",
            en: "ANALYSIS — Russian steelmakers expect steel demand to rebound in 2017 as economy grows",
          },
          description: {
            ru: "Аналитическая статья о спросе на сталь в России, избытке мощностей и ценовых войнах. Reuters, 22 февраля 2017 года.",
            en: "An analysis of Russian steel demand, excess capacity, and price wars. Reuters, February 22, 2017.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: thomsonReutersSteelDiscountsPreview,
              fullImageSrc: thomsonReutersSteelDiscountsPreview,
              fileSrc: "/materials/work/thomsonreuters/russian-steel-discounts.pdf",
              url: "https://forbes.kz/news/newsid_139809",
            },
            en: {
              previewSrc: thomsonReutersSteelDiscountsPreview,
              fullImageSrc: thomsonReutersSteelDiscountsPreview,
              fileSrc: "/materials/work/thomsonreuters/russian-steel-discounts.pdf",
              url: "https://forbes.kz/news/newsid_139809",
            },
          },
          title: {
            ru: "АНАЛИЗ-Российские металлурги раздают скидки, но не снижают цены",
            en: "ANALYSIS — Russian steelmakers offer discounts without cutting prices",
          },
          description: {
            ru: "Аналитическая статья о скидках, ценовой политике металлургов и конкуренции с трейдерами. Forbes Kazakhstan, 31 марта 2017 года.",
            en: "An analysis of steelmakers' discounts, pricing, and competition with traders. Forbes Kazakhstan, March 31, 2017.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: thomsonReutersPortHedlandPreview,
              fullImageSrc: thomsonReutersPortHedlandPreview,
              fileSrc: "/materials/work/thomsonreuters/port-hedland-cyclone-joyce.pdf",
              url: "https://jp.reuters.com/article/markets/--idUSL8N1P63ZK/",
            },
            en: {
              previewSrc: thomsonReutersPortHedlandPreview,
              fullImageSrc: thomsonReutersPortHedlandPreview,
              fileSrc: "/materials/work/thomsonreuters/port-hedland-cyclone-joyce.pdf",
              url: "https://jp.reuters.com/article/markets/--idUSL8N1P63ZK/",
            },
          },
          title: {
            ru: "Рудовозы уходят из австралийского Порт-Хедленда из-за урагана Джойс",
            en: "Iron ore ships leave Australia's Port Hedland as Cyclone Joyce approaches",
          },
          description: {
            ru: "Новость о закрытии Порт-Хедленда и рисках для поставок железной руды. Перевод Виктора Строкова. Reuters, 11 января 2018 года.",
            en: "A report on Port Hedland's closure and risks to iron ore supplies. Translated into Russian by Viktor Strokov. Reuters, January 11, 2018.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: thomsonReutersRenovationPreview,
              fullImageSrc: thomsonReutersRenovationPreview,
              fileSrc: "/materials/work/thomsonreuters/moscow-renovation-steel.pdf",
              url: "https://forbes.kz/news/newsid_146758",
            },
            en: {
              previewSrc: thomsonReutersRenovationPreview,
              fullImageSrc: thomsonReutersRenovationPreview,
              fileSrc: "/materials/work/thomsonreuters/moscow-renovation-steel.pdf",
              url: "https://forbes.kz/news/newsid_146758",
            },
          },
          title: {
            ru: "Вызвавший протесты план реновации в Москве сулит выгодные контракты металлургам",
            en: "Moscow's controversial renovation plan promises lucrative contracts for steelmakers",
          },
          description: {
            ru: "Материал о спросе на сталь в рамках московской реновации, подготовленный при моём участии. Forbes Kazakhstan, 9 июня 2017 года.",
            en: "A report on steel demand from Moscow's housing renovation programme, with my reporting contribution. Forbes Kazakhstan, June 9, 2017.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: thomsonReutersIronOrePreview,
              fullImageSrc: thomsonReutersIronOrePreview,
              fileSrc: "/materials/work/thomsonreuters/iron-ore-price-forecast-2017.pdf",
              url: "https://www.reuters.com/article/markets/currencies/iron-ore-price-to-average-55t-in-2017-idUSKBN1441B7/",
            },
            en: {
              previewSrc: thomsonReutersIronOrePreview,
              fullImageSrc: thomsonReutersIronOrePreview,
              fileSrc: "/materials/work/thomsonreuters/iron-ore-price-forecast-2017.pdf",
              url: "https://www.reuters.com/article/markets/currencies/iron-ore-price-to-average-55t-in-2017-idUSKBN1441B7/",
            },
          },
          title: {
            ru: "Средняя цена железной руды в 2017 году составит $55 за тонну",
            en: "Iron ore price to average $55/t in 2017",
          },
          description: {
            ru: "Прогноз цены железной руды на 2017 год по результатам опроса Reuters. Англоязычная публикация, 15 декабря 2016 года.",
            en: "An iron ore price forecast for 2017 based on a Reuters poll. Published in English on December 15, 2016.",
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
          "Международная медиагруппа, в период моей работы включавшая информационное агентство Reuters и платформу Thomson Reuters Eikon для мониторинга и анализа товарных и финансовых рынков.",
        results:
          "Прошёл путь от стажёра до аналитика товарно-сырьевых рынков (нефть и газ, металлургия), написав более тысячи материалов - новостей, разборов и аналитических статей, - которые прочитали более двадцати тысяч человек. Также занимался разработкой информационных продуктов и аналитических дашбордов. Проводил мастер-классы для клиентов.",
      },
      en: {
        year: "2014 → 2018",
        name: "Thomson Reuters",
        title: "Market Analyst",
        about:
          "An international media group that, during my time there, included the Reuters news agency and the Thomson Reuters Eikon platform for monitoring and analyzing commodity and financial markets.",
        results:
          "Progressed from intern to commodity markets analyst (oil and gas, metallurgy), authoring over one thousand pieces - including news articles, market overviews, and analytical reports - read by more than twenty thousand people. Also involved in the development of information products and analytical dashboards. Conducted client workshops.",
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
