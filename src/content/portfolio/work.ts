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
            ru: "Образец еженедельного бюллетеня ХимИнсайт о рынке полиэтилена.",
            en: "A sample of ChemInsight’s weekly polyethylene market bulletin. PDF in Russian.",
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
            ru: "Образец еженедельного бюллетеня ХимИнсайт о рынке полипропилена.",
            en: "A sample of ChemInsight’s weekly polypropylene market bulletin. PDF in Russian.",
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
            ru: "Образец еженедельного бюллетеня ХимИнсайт о рынке бутиловых спиртов и 2-этилгексанола (2-ЭГ).",
            en: "A sample of ChemInsight’s weekly market bulletin on butyl alcohols and 2-ethylhexanol (2-EH). PDF in Russian.",
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
            en: "Feed-grade methionine",
          },
          description: {
            ru: "Образец бюллетеня ХимИнсайт о рынке кормового метионина. Выходит 2 раза в месяц.",
            en: "A sample of ChemInsight’s feed-grade methionine market bulletin, published 2 times a month. PDF in Russian.",
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
            ru: "Образец ежемесячного бюллетеня ХимИнсайт о рынке каустической соды.",
            en: "A sample of ChemInsight’s monthly caustic soda market bulletin. PDF in Russian.",
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
            ru: "Образец ежемесячного бюллетеня ХимИнсайт о рынке едкого калия.",
            en: "A sample of ChemInsight’s monthly caustic potash market bulletin. PDF in Russian.",
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
            ru: "Образец ежемесячного бюллетеня ХимИнсайт о рынке борной кислоты.",
            en: "A sample of ChemInsight’s monthly boric acid market bulletin. PDF in Russian.",
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
          "Независимое ценовое агентство. Публикует данные о ценах и аналитику рынков нефтегазохимии для компаний отрасли.",
        results:
          "Запустил 7 платных бюллетеней для 10+ B2B-клиентов в общей сложности. Вместе с коллегами наладил регулярный выпуск. Продолжаю развивать бюллетени с учётом отзывов клиентов. Ниже — образцы всех 7 бюллетеней.",
      },
      en: {
        year: "2025 → present",
        name: "ChemInsight",
        title: "Independent Consultant",
        about:
          "An independent price reporting agency that publishes petrochemical market prices and analysis for businesses in the industry.",
        results:
          "I have launched 7 paid bulletins serving 10+ B2B clients in total. Together with colleagues, I established regular publication. I continue to develop the bulletins using client feedback. Samples of all 7 bulletins are below.",
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
            en: "Regional agricultural price indices",
          },
          description: {
            ru: "Как рассчитываются региональные внебиржевые ценовые индексы пшеницы, кукурузы, ячменя и сахара.",
            en: "Calculation methods for regional wheat, corn, barley and sugar price indices outside exchange trading. PDF in Russian.",
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
            en: "CPT Novorossiysk wheat price index",
          },
          description: {
            ru: "Методика расчёта индекса пшеницы с поставкой на условиях CPT Новороссийск по итогам товарных аукционов.",
            en: "The calculation method for the wheat price index on CPT Novorossiysk delivery terms, using commodity auction data. PDF in Russian.",
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
            en: "Exchange-traded sugar price index",
          },
          description: {
            ru: "Как рассчитывается биржевой индекс сахара в Центральном федеральном округе по данным спот-рынка.",
            en: "The calculation method for the exchange-traded sugar price index in Russia’s Central Federal District, using spot market data. PDF in Russian.",
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
            en: "Daily sugar price index outside exchange trading",
          },
          description: {
            ru: "Методика расчёта ежедневного внебиржевого индекса сахара в Центральном федеральном округе.",
            en: "The calculation method for the daily sugar price index outside exchange trading in Russia’s Central Federal District. PDF in Russian.",
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
            ru: "Пример дашборда индексов НТБ",
            en: "Sample NME price index dashboard",
          },
          description: {
            ru: "Пример экрана с экспортными, биржевыми и внебиржевыми ценовыми индексами агропродукции.",
            en: "A sample dashboard showing export, exchange-traded and off-exchange agricultural price indices. PDF in Russian.",
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
          "Товарная биржа в группе Московской биржи. Организует торги сельхозпродукцией и рассчитывает ценовые индексы.",
        results:
          "Запустил 10+ ценовых индикаторов и 2 платных информационных продукта для 30+ B2B-клиентов. За время моей работы число участников аукционов выросло с 2 до 400+, ассортимент — до 200+ товаров, число торговых базисов (мест поставки) — до 50+. После внедрения системы обработки заявок их число выросло более чем в 2 раза. Ниже — версии методик, над которыми я работал, и пример дашборда с ценовыми индексами.",
      },
      en: {
        year: "2021 → 2024",
        name: "National Mercantile Exchange",
        title: "Head of Methodology",
        about:
          "A commodity exchange within Moscow Exchange Group. It organizes agricultural commodity trading and calculates price indices.",
        results:
          "I launched 10+ price indicators and 2 paid information products serving 30+ B2B clients. During my time at the exchange, auction participation grew from 2 to 400+, the product range reached 200+ items and delivery locations reached 50+. After the bid processing system was introduced, the number of bids increased more than 2-fold. Below are versions of the methodologies I worked on and a sample dashboard of price indices.",
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
          "Торговая компания группы Лукойл. Продаёт нефть, нефтепродукты и нефтехимическую продукцию оптом и мелкими партиями, в том числе через электронные площадки.",
        results:
          "Внедрил систему, которая позволяет сравнивать сделки с учётом цены, логистики и других затрат. Она приводит разные условия продаж к сопоставимому виду и помогает принимать коммерческие решения.",
      },
      en: {
        year: "2020 → 2021",
        name: "Lukoil-RNP-Trading",
        title: "Leading Specialist, Business Development",
        about:
          "A Lukoil trading company. It sells crude oil, petroleum products and petrochemicals wholesale and in smaller quantities, including through electronic platforms.",
        results:
          "I implemented a system that makes deals comparable by accounting for prices, logistics and other costs. It provides a consistent basis for evaluating different sales terms and making commercial decisions.",
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
          "Российская промышленная группа. Выпускает промышленное, медицинское и специализированное оборудование, а также охотничье и спортивное оружие.",
        results:
          "У отдела появилась система исследований и аналитики, включая BI для сравнения рыночных данных и оценки перспектив новых продуктов. Эту работу я совмещал с участием в разработке B2B-продуктов.",
      },
      en: {
        year: "2018 → 2019",
        name: "Kalashnikov Group",
        title: "Marketing Research Manager",
        about:
          "A Russian industrial group. It produces industrial, medical and specialized equipment, as well as hunting and sporting firearms.",
        results:
          "The team gained a research and analytics system, including BI for comparing market data and assessing product opportunities. Alongside this work, I contributed to developing new B2B products.",
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
            ru: "Металлурги ждут подъёма спроса на сталь в РФ в 2017 году на фоне роста экономики",
            en: "Russian steelmakers expect steel demand to rebound in 2017 as economy grows",
          },
          description: {
            ru: "Статья о спросе на сталь в России, избытке мощностей и ценовых войнах. Написал её без соавторов.",
            en: "An article on Russian steel demand, excess capacity and price wars. I wrote it without co-authors. PDF in Russian.",
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
            ru: "Статья о скидках металлургов, их ценовой политике и конкуренции с трейдерами. Написал её без соавторов.",
            en: "An article on steelmakers’ discounts, pricing and competition with traders. I wrote it without co-authors. PDF in Russian.",
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
            en: "Iron ore ships leave Australia’s Port Hedland as Cyclone Joyce approaches",
          },
          description: {
            ru: "Новость о закрытии порта Порт-Хедленд и рисках для поставок железной руды. Перевёл текст Джеймса Ригана с английского на русский.",
            en: "A news report on the closure of Port Hedland and risks to iron ore supplies. I translated James Regan’s article from English into Russian. PDF in Russian.",
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
            en: "Moscow’s controversial renovation plan promises lucrative contracts for steelmakers",
          },
          description: {
            ru: "Материал о том, как программа реновации Москвы могла повлиять на спрос на сталь. Участвовал в его подготовке вместе с коллегами.",
            en: "A report on how Moscow’s housing renovation program could affect steel demand. I contributed alongside colleagues. PDF in Russian.",
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
            ru: "Опубликованный в 2016 году прогноз цены железной руды на 2017 год по результатам опроса аналитиков. Подготовил материал вместе с коллегами. Текст на английском.",
            en: "A forecast for 2017 iron ore prices, published in 2016 and based on a poll of analysts. I prepared it with colleagues. PDF in English.",
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
          "Международная информационная компания. В тот период в неё входили агентство Reuters и терминал Eikon для анализа товарных и финансовых рынков.",
        results:
          "Разработанные мной информационные продукты привлекли в общей сложности 3 B2B-клиентов. Подготовил 1 000+ публикаций с охватом 20 000+ читателей и вырос от стажёра до аналитика рынков. Под примерами ниже указано, где я был автором, где работал вместе с коллегами, а где переводил текст.",
      },
      en: {
        year: "2014 → 2018",
        name: "Thomson Reuters",
        title: "Market Analyst",
        about:
          "An international information company. At the time, its businesses included Reuters and Eikon, a platform for analyzing commodity and financial markets.",
        results:
          "The information products I developed attracted 3 B2B clients in total. I prepared 1,000+ publications reaching 20,000+ readers and progressed from intern to market analyst. The examples below explain my role in each piece: author, contributor or translator.",
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
