import type { CompanyId, Language } from "../../types/domain";
import type { CaseStudy } from "./types";

// Case studies based on the portfolio and the supplied CV and LinkedIn profile.
export const CASE_STUDIES: Partial<Record<CompanyId, Record<Language, CaseStudy>>> = {
  CI: {
    ru: {
      challenge:
        "Запустить платные B2B-бюллетени о рынках нефтегазохимии и выстроить их регулярный выпуск совместно с экспертами, редакторами и дизайнерами.",
      contribution: [
        "Запускаю и развиваю информационные бюллетени с опорой на спрос и потребности клиентов: определяю позиционирование, структуру и подход к выводу на рынок.",
        "Разработал и описал процессы подготовки и выпуска в BPMN с учётом особенностей разных команд и технологий.",
        "Координирую работу экспертов, редакторов и дизайнеров и готовлю предложения по оптимизации процессов.",
        "Сформировал единую рабочую среду в Miro с планом развития продуктов, календарём рассылок, бэклогом и базой клиентов.",
      ],
      outcome:
        "На рынок выведены 6 платных информационных бюллетеней с суммарным охватом более 10 B2B-клиентов. Организован регулярный выпуск, описаны процессы подготовки материалов и создана общая рабочая среда. Продолжаю развивать продукты и процессы агентства.",
    },
    en: {
      challenge:
        "Launch paid B2B bulletins covering petrochemical markets and establish regular publication with experts, editors and designers.",
      contribution: [
        "Launch and develop information bulletins based on market demand and client needs, defining their positioning, structure and go-to-market approach.",
        "Developed and documented preparation and publication workflows in BPMN, accounting for different teams and technologies.",
        "Coordinate experts, editors and designers and propose process improvements.",
        "Built a shared workspace in Miro with a product roadmap, publication schedule, backlog and client database.",
      ],
      outcome:
        "Launched 6 paid information bulletins serving more than 10 B2B clients in total. Established regular publication and a shared workspace, and documented production workflows. I continue to develop the agency’s products and processes.",
    },
  },
  NTB: {
    ru: {
      challenge:
        "Развивать ценовые индикаторы и платные информационные продукты для участников российского АПК, а также товарные аукционы Национальной товарной биржи.",
      contribution: [
        "Исследовал рынок, конкурентную среду и потребности целевой аудитории для развития новых продуктов и торговых направлений.",
        "Разрабатывал методики расчёта ценовых индикаторов и запускал новые индикаторы и платные B2B-информационные продукты.",
        "Развивал торги на товарных аукционах и координировал работу продуктовых, торговых и клиентских команд.",
        "Координировал разработку и внедрение фронтенд-системы автоматизации обработки клиентских заявок.",
      ],
      outcome:
        "Реализованы 10+ ценовых индикаторов для компаний российского АПК и запущены 2 платных информационных продукта с охватом 30+ B2B-клиентов. После внедрения системы автоматизации количество клиентских заявок на товарных аукционах выросло более чем в 2 раза.",
    },
    en: {
      challenge:
        "Develop price indicators and paid information products for Russian agribusiness, alongside commodity auctions at the National Mercantile Exchange.",
      contribution: [
        "Researched markets, competitors and audience needs to develop new products and trading activities.",
        "Developed price indicator calculation methodologies and launched new indicators and paid B2B information products.",
        "Developed commodity auction trading activities and coordinated product, trading and client-facing teams.",
        "Coordinated the development and implementation of a frontend system for automating client bid processing.",
      ],
      outcome:
        "Delivered 10+ price indicators for Russian agribusiness companies and launched 2 paid information products serving 30+ B2B clients. Client bids at commodity auctions more than doubled after the automation system was implemented.",
    },
  },
  LRNPT: {
    ru: {
      challenge:
        "Повысить качество проверки цен на сырьё для нефтепереработки и развить мелкооптовые продажи сжиженных углеводородных газов на региональных рынках.",
      contribution: [
        "Реализовал проект создания системы дополнительной верификации цен на сырьё для нефтепереработки.",
        "Разработал стратегию мелкооптовых продаж СУГ в Краснодарском крае, Московской и Ростовской областях.",
        "Готовил аналитические материалы, координировал маркетинговые проекты и сопровождал коммерческую деятельность с учётом потенциальных рисков.",
      ],
      outcome:
        "Внедрённая система дополнительной верификации цен на сырьё позволила сократить финансовые потери примерно на 5%. За год продажи СУГ на выбранных региональных рынках выросли примерно на 7%, а клиентская база — примерно на 5%.",
    },
    en: {
      challenge:
        "Improve feedstock price verification for oil refining and develop regional small-scale wholesale sales of liquefied petroleum gas (LPG).",
      contribution: [
        "Delivered a project to create an additional feedstock price verification system for oil refining.",
        "Developed an LPG sales strategy for Krasnodar Krai and the Moscow and Rostov regions.",
        "Prepared market analysis, coordinated marketing projects and supported commercial operations while assessing potential risks.",
      ],
      outcome:
        "Implemented an additional feedstock price verification system that reduced financial losses by approximately 5%. Over one year, LPG sales in the selected regional markets grew by approximately 7%, and the client base expanded by approximately 5%.",
    },
  },
  KG: {
    ru: {
      challenge:
        "Обеспечить продуктовый маркетинг данными о гражданских рынках и поддержать разработку новых B2B-продуктов.",
      contribution: [
        "Сформировал систему маркетинговых исследований и аналитики гражданских рынков и конкурентов для поиска новых продуктовых возможностей.",
        "Интегрировал систему бизнес-аналитики (BI) для поддержки решений продуктового маркетинга.",
        "Участвовал в создании линейки B2B-продуктов в категории «умный дом».",
      ],
      outcome:
        "Для продуктового маркетинга выстроена система исследований гражданских рынков и внедрена бизнес-аналитика. Принял участие в разработке линейки B2B-продуктов в категории «умный дом».",
    },
    en: {
      challenge:
        "Provide product marketing with civilian market intelligence and support the development of new B2B products.",
      contribution: [
        "Built a research and analytics system covering civilian markets and competitors to identify new product opportunities.",
        "Integrated a business intelligence (BI) system to support product marketing decisions.",
        "Contributed to the creation of a B2B smart home product line.",
      ],
      outcome:
        "Established a civilian market research system and implemented business intelligence for product marketing. Contributed to the development of a B2B smart home product line.",
    },
  },
  TR: {
    ru: {
      challenge:
        "Освещать рынки нефти, газа, металлов и удобрений для международной профессиональной аудитории, развивать информационные продукты и помогать клиентам работать с Thomson Reuters Eikon.",
      contribution: [
        "Готовил новости, обзоры и аналитические статьи о товарно-сырьевых рынках.",
        "Разработал информационный продукт для B2B-клиентов.",
        "Работал с большими массивами рыночных данных, участвовал в разработке аналитических дашбордов и инициировал улучшения платформы Eikon.",
        "Продвигал Thomson Reuters Eikon на российском рынке и проводил мастер-классы для клиентов.",
      ],
      outcome:
        "Более 1 000 опубликованных материалов с охватом свыше 20 000 читателей. Разработанный информационный продукт привлёк 3 B2B-клиентов. За время работы вырос от стажёра до аналитика рынков.",
    },
    en: {
      challenge:
        "Cover oil, gas, metals and fertilizer markets for an international professional audience, develop information products and help clients use Thomson Reuters Eikon.",
      contribution: [
        "Wrote news reports, market overviews and analytical articles on commodity markets.",
        "Developed an information product for B2B clients.",
        "Worked with large market datasets, contributed to analytical dashboards and initiated improvements to the Eikon platform.",
        "Promoted Thomson Reuters Eikon in Russia and delivered client workshops.",
      ],
      outcome:
        "Published over 1,000 pieces reaching more than 20,000 readers. The information product attracted 3 B2B clients. Progressed from intern to market analyst during my time at the company.",
    },
  },
  MBC: {
    ru: {
      challenge:
        "Создать с нуля интернет-магазин авторских изделий и организовать полный цикл работы: разработку продуктов, производство, продажи и доставку заказов.",
      contribution: [
        "Сформировал инфраструктуру интернет-магазина на Tilda: CRM, приём платежей и логистику.",
        "Разрабатываю авторские изделия, вывожу их на рынок и определяю дальнейшее развитие проекта.",
        "Организовал полный цикл обработки заказов и занимаюсь операционным управлением.",
        "Координирую небольшую команду на аутсорсе, которая помогает с контентом, дизайном и обработкой заказов.",
      ],
      outcome:
        "Интернет-магазин запущен, на рынок выведены 10+ авторских товарных позиций. Обеспечен полный цикл обработки 100+ заказов. Проект продолжает работать и развиваться.",
    },
    en: {
      challenge:
        "Build an online store for original products from scratch and organize the full cycle of product development, production, sales and delivery.",
      contribution: [
        "Built the e-commerce infrastructure on Tilda, including CRM, payments and logistics.",
        "Develop original products, bring them to market and shape the direction of the project.",
        "Established the full order-processing cycle and manage day-to-day operations.",
        "Coordinate a small outsourced team supporting content, design and order processing.",
      ],
      outcome:
        "Launched the online store and brought 10+ original SKUs to market. Managed the full processing cycle for 100+ orders. The project remains active and continues to develop.",
    },
  },
  MNG: {
    ru: {
      challenge:
        "Создать iOS-приложение для поиска и создания городских пеших маршрутов, которыми пользователи делятся друг с другом.",
      contribution: [
        "Определил продуктовую стратегию и занимался проверкой гипотез.",
        "Разработал концепцию приложения и сформировал дизайн интерфейсов.",
        "Организовал полный цикл разработки продукта и координировал команду на аутсорсе.",
      ],
      outcome:
        "Проект доведён до стадии минимально жизнеспособного продукта (MVP) для iOS. В 2020 году его пришлось закрыть из-за пандемии COVID-19.",
    },
    en: {
      challenge: "Create an iOS app where users can find, create and share urban walking routes.",
      contribution: [
        "Defined the product strategy and tested product hypotheses.",
        "Developed the app concept and designed its interfaces.",
        "Organized the full product development cycle and coordinated an outsourced team.",
      ],
      outcome:
        "Brought the iOS project to the minimum viable product (MVP) stage. It had to close in 2020 due to the COVID-19 pandemic.",
    },
  },
  VNV: {
    ru: {
      challenge:
        "Создать площадку, на которой рекламодатели привлекают аудиторию через конкурсы и розыгрыши.",
      contribution: [
        "Отвечал за разработку продукта.",
        "Привлекал рекламодателей и клиентов площадки.",
        "Развивал площадку с опорой на группу VK.com, откуда поступал основной трафик.",
      ],
      outcome:
        "За неполный год на площадке состоялись не менее 10 розыгрышей и локальных киберспортивных турниров. Аудитория достигала 7 000 активных пользователей в месяц. Проект закрыли после ужесточения правил конкурсов в VK.com.",
    },
    en: {
      challenge:
        "Create a platform where advertisers can attract audiences through contests and giveaways.",
      contribution: [
        "Was responsible for product development.",
        "Acquired advertisers and clients for the platform.",
        "Developed the platform with its VK.com group as the main traffic source.",
      ],
      outcome:
        "In under a year, the platform hosted at least 10 giveaways and local esports tournaments and reached 7,000 monthly active users. It closed following tighter contest rules on VK.com.",
    },
  },
};
