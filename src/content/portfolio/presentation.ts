import type { CompanyId, Language } from "../../types/domain";
import type { PortfolioPresentation } from "./types";

// Copy from the current Figma design, reviewed on 16 November 2026.
export const PORTFOLIO_PRESENTATION: Record<CompanyId, Record<Language, PortfolioPresentation>> = {
  CI: {
    ru: {
      catalogDescription: "Аналитические бюллетени о рынках нефтегазохимии.",
      catalogOutcome: "7 платных бюллетеней · 10+ B2B-клиентов",
      heroSummary: "Запустил 7 платных бюллетеней для 10+ B2B-клиентов.",
    },
    en: {
      catalogDescription: "Market intelligence bulletins for the petrochemical industry.",
      catalogOutcome: "7 paid bulletins · 10+ B2B clients",
      heroSummary: "Launched 7 paid market bulletins for 10+ B2B clients.",
    },
  },
  NTB: {
    ru: {
      catalogDescription: "Ценовые индикаторы и информационные продукты для агрорынка.",
      catalogOutcome: "10+ индикаторов · 2 продукта · 30+ B2B-клиентов",
      heroSummary: "Запустил 10+ ценовых индикаторов и 2 платных продукта для 30+ B2B-клиентов.",
      metrics: [
        {
          value: "10+",
          label: "ценовых индикаторов",
        },
        {
          value: "2",
          label: "платных продукта",
        },
        {
          value: "30+",
          label: "B2B-клиентов",
        },
      ],
    },
    en: {
      catalogDescription: "Price benchmarks and information products for agricultural markets.",
      catalogOutcome: "10+ benchmarks · 2 products · 30+ B2B clients",
      heroSummary: "Launched 10+ price benchmarks and 2 paid products for 30+ B2B clients.",
      metrics: [
        {
          value: "10+",
          label: "price benchmarks",
        },
        {
          value: "2",
          label: "paid products",
        },
        {
          value: "30+",
          label: "B2B clients",
        },
      ],
    },
  },
  LRNPT: {
    ru: {
      catalogDescription: "Сравнение сделок по цене, логистике и условиям поставки.",
      catalogOutcome: "Система оценки сделок для коммерческих решений",
      heroSummary: "Внедрил систему сравнения сделок с учётом цены, логистики и других затрат.",
    },
    en: {
      catalogDescription: "Comparing deals by price, logistics and delivery terms.",
      catalogOutcome: "A deal evaluation system for commercial decisions",
      heroSummary:
        "Implemented a system for comparing deals across prices, logistics and other costs.",
    },
  },
  KG: {
    ru: {
      catalogDescription: "Исследования рынков и BI для оценки новых B2B-продуктов.",
      catalogOutcome: "Система исследований и аналитики для продуктового маркетинга",
      heroSummary: "Выстроил систему исследований и внедрил BI для продуктового маркетинга.",
    },
    en: {
      catalogDescription: "Market research and BI to assess new B2B products.",
      catalogOutcome: "A research and analytics system for product marketing",
      heroSummary: "Built a research system and introduced BI for product marketing.",
    },
  },
  TR: {
    ru: {
      catalogDescription: "Информационные продукты Eikon, новости и аналитика рынков.",
      catalogOutcome: "1\u00a0000+ публикаций · 20\u00a0000+ читателей",
      heroSummary: "Подготовил 1\u00a0000+ публикаций с охватом 20\u00a0000+ читателей.",
    },
    en: {
      catalogDescription: "Eikon information products, market news and analysis.",
      catalogOutcome: "1,000+ publications · 20,000+ readers",
      heroSummary: "Prepared 1,000+ publications reaching 20,000+ readers.",
    },
  },
  MBC: {
    ru: {
      catalogDescription: "Одежда и домашний текстиль: от разработки до интернет-продаж.",
      catalogOutcome: "10+ товарных позиций · 100+ заказов",
      heroSummary: "Запустил 10+ товарных позиций и организовал обработку 100+ заказов.",
      status: "На стадии трансформации",
    },
    en: {
      catalogDescription: "Clothing and home textiles, from product design to online sales.",
      catalogOutcome: "10+ products · 100+ orders",
      heroSummary: "Launched 10+ products and organized fulfilment for 100+ orders.",
      status: "In transition",
    },
  },
  MNG: {
    ru: {
      catalogDescription: "Приложение для поиска и создания городских прогулочных маршрутов.",
      catalogOutcome: "MVP для iOS · тестирование среди ограниченного круга тестеров",
      heroSummary:
        "С командой разработал MVP для iOS и организовал тестирование среди ограниченного круга тестеров.",
      status: "Архив · без публичного запуска",
    },
    en: {
      catalogDescription: "An app for discovering and creating city walking routes.",
      catalogOutcome: "iOS MVP · tested with a limited group of testers",
      heroSummary:
        "Developed an iOS MVP with the team and organized testing with a limited group of testers.",
      status: "Archived · no public launch",
    },
  },
  VNV: {
    ru: {
      catalogDescription: "Платформа конкурсов, розыгрышей и киберспортивных турниров.",
      catalogOutcome: "30+ B2B-клиентов · 10+ мероприятий",
      heroSummary: "Платформа привлекла 30+ B2B-клиентов; с командой провели 10+ мероприятий.",
      status: "Архив · завершён в 2014",
    },
    en: {
      catalogDescription: "A platform for contests, giveaways and esports tournaments.",
      catalogOutcome: "30+ B2B clients · 10+ events",
      heroSummary: "The platform attracted 30+ B2B clients; our team held 10+ events.",
      status: "Archived · ended in 2014",
    },
  },
  SKO: {
    ru: {
      catalogDescription: "Выращиваю чили и готовлю острое для себя и друзей.",
      catalogOutcome: "Соусы, чили-масло и перцовка из домашнего урожая",
      heroSummary: "Выращиваю перцы чили и делаю из урожая соусы, чили-масло и перцовку.",
      status: "Домашнее хобби",
    },
    en: {
      catalogDescription: "Growing chillies and making spicy treats for friends and myself.",
      catalogOutcome: "Sauces, chilli oil and pepper vodka from homegrown chillies",
      heroSummary: "I grow chillies and turn the harvest into sauces, chilli oil and pepper vodka.",
      status: "Home hobby",
    },
  },
  SDC: {
    ru: {
      catalogDescription: "Личное портфолио и практический проект по веб-разработке.",
      catalogOutcome: "Двуязычный сайт на Next.js и TypeScript",
      heroSummary: "Развил простую страницу в двуязычное портфолио на Next.js и TypeScript.",
      status: "Личный сайт",
    },
    en: {
      catalogDescription: "My portfolio and a hands-on web development project.",
      catalogOutcome: "A bilingual website built with Next.js and TypeScript",
      heroSummary:
        "Developed a simple page into a bilingual portfolio built with Next.js and TypeScript.",
      status: "Personal website",
    },
  },
};
