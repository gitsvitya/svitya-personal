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
            ru: "Образец информационного бюллетеня ХимИнсайт о рынке кормового метионина. Выходит 2 раза в месяц.",
            en: "A sample of ChemInsight’s information bulletin on the feed-grade methionine market. It is published 2 times a month.",
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
          "Независимое ценовое агентство, выпускающее данные и аналитику о рынках нефтегазохимии для корпоративных клиентов.",
        results:
          "Вывел на рынок 7 платных информационных бюллетеней с суммарным охватом 10+ B2B-клиентов. Совместно с коллегами организовал регулярный выпуск и описал процессы подготовки материалов. Продолжаю развивать продукты на основе обратной связи клиентов. Ниже представлены образцы всех 7 бюллетеней.",
      },
      en: {
        year: "2025 → present",
        name: "ChemInsight",
        title: "Independent Consultant",
        about:
          "An independent price reporting agency providing petrochemical market data and analysis to business clients.",
        results:
          "Launched 7 paid information bulletins serving 10+ B2B clients in total. Working with colleagues, established regular publication and documented production workflows. Continue to develop the products using client feedback. Samples of all 7 bulletins are available below.",
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
        about:
          "Биржа в составе группы Московской биржи. Моя зона ответственности — ценовые индикаторы, информационные продукты и развитие товарных аукционов.",
        results:
          "Запустил 10+ ценовых индикаторов для российского АПК и 2 платных информационных продукта с охватом 30+ B2B-клиентов. В период работы число участников товарных аукционов выросло с 2 до 400+, ассортимент — до 200+ товаров, число торговых базисов — до 50+. При моём участии внедрена фронтенд-система автоматизации обработки заявок на товарных аукционах; после её внедрения число заявок выросло более чем в 2 раза. Ниже представлены последние версии методик, над которыми я работал, и пример аналитического дашборда.",
      },
      en: {
        year: "2021 → 2024",
        name: "National Mercantile Exchange",
        title: "Head of Methodology",
        about:
          "Part of Moscow Exchange Group. My remit covered price indicators, information products and the development of commodity auctions.",
        results:
          "Launched 10+ agribusiness price indicators and 2 paid information products serving 30+ B2B clients. During my time at the exchange, auction participation grew from 2 to 400+ participants, the product range expanded to 200+ items and the number of delivery locations reached 50+. Contributed to the implementation of a frontend system for commodity auction bid processing; the number of bids increased more than 2-fold following its introduction. The materials below include the latest versions of methodologies I worked on and a sample analytics dashboard.",
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
        title: "Ведущий специалист отдела развития бизнеса",
        about:
          "Торговая компания группы Лукойл: оптовая и мелкооптовая продажа нефти, нефтепродуктов и нефтехимической продукции, в том числе через электронные площадки.",
        results:
          "Внедрена система, позволяющая сравнивать сделки на сопоставимых условиях и учитывать цены, логистику и другие затраты при выборе коммерческих решений.",
      },
      en: {
        year: "2020 → 2021",
        name: "Lukoil-RNP-Trading",
        title: "Leading Specialist, Business Development",
        about:
          "A Lukoil trading company handling wholesale and small-lot sales of crude oil, petroleum products and petrochemicals, including through electronic platforms.",
        results:
          "Implemented a system for comparing deals on a consistent basis, taking prices, logistics and other costs into account when making commercial decisions.",
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
          "Промышленная группа. Работал с гражданскими рынками в составе отдела продуктового маркетинга.",
        results:
          "Сформировал систему исследований и аналитики для отдела продуктового маркетинга, внедрил BI для сопоставления рыночных данных и оценки коммерческих перспектив. Участвовал в разработке новых B2B-продуктов.",
      },
      en: {
        year: "2018 → 2019",
        name: "Kalashnikov Group",
        title: "Marketing Research Manager",
        about:
          "An industrial group. Worked on civilian markets within the product marketing department.",
        results:
          "Built a research and analytics system for the product marketing department and integrated BI to compare market data and assess commercial opportunities. Contributed to the development of new B2B products.",
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
            ru: "Металлурги ждут подъёма спроса на сталь в РФ в 17 году на фоне роста экономики",
            en: "Russian steelmakers expect steel demand to rebound in 2017 as economy grows",
          },
          description: {
            ru: "Анализ спроса на сталь в России, избытка мощностей и ценовых войн. Написан мной без соавторов.",
            en: "An analysis of Russian steel demand, excess capacity and price wars. I am the sole author.",
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
            ru: "Российские металлурги раздают скидки, но не снижают цены",
            en: "Russian steelmakers offer discounts without cutting prices",
          },
          description: {
            ru: "Анализ скидок, ценовой политики металлургов и конкуренции с трейдерами. Написан мной без соавторов.",
            en: "An analysis of steelmakers' discounts, pricing and competition with traders. I am the sole author.",
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
            ru: "Новость о закрытии Порт-Хедленда и рисках для поставок железной руды. Перевёл с английского на русский текст Джеймса Ригана.",
            en: "A news report on Port Hedland's closure and risks to iron ore supplies. I translated James Regan's article from English into Russian.",
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
            ru: "Обзор возможного влияния программы реновации Москвы на спрос на сталь. Участвовал в подготовке вместе с коллегами.",
            en: "An overview of how Moscow's housing renovation programme could affect steel demand. I contributed to the report alongside colleagues.",
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
            ru: "Англоязычный обзор прогнозов цены железной руды по результатам опроса аналитиков. Подготовил вместе с коллегами.",
            en: "An English-language overview of iron ore price forecasts based on a poll of analysts. I prepared it in collaboration with colleagues.",
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
          "В период моей работы компания включала агентство Reuters и терминал Eikon для анализа товарных и финансовых рынков.",
        results:
          "1 из разработанных информационных продуктов привлёк 3 B2B-клиентов. Подготовил 1 000+ публикаций с охватом 20 000+ читателей. Вырос от стажёра до аналитика рынков. Для каждого примера публикации ниже указан мой вклад в её подготовку.",
      },
      en: {
        year: "2014 → 2018",
        name: "Thomson Reuters",
        title: "Market Analyst",
        about:
          "During my time at the company, its businesses included Reuters and the Eikon platform for commodity and financial market analysis.",
        results:
          "1 of the information products I developed attracted 3 B2B clients. Prepared 1,000+ publications reaching 20,000+ readers. Progressed from intern to market analyst. Each publication sample below specifies my contribution.",
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
