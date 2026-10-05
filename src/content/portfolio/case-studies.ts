import type { CompanyId, Language } from "../../types/domain";
import type { CaseStudy } from "./types";

// Case studies based on the portfolio and the supplied CV and LinkedIn profile.
export const CASE_STUDIES: Partial<Record<CompanyId, Record<Language, CaseStudy>>> = {
  CI: {
    ru: {
      challenge:
        "Запускать платные B2B-бюллетени о рынках нефтегазохимии и налаживать их регулярный выпуск совместно с экспертами, редакторами и дизайнерами. Поддерживать общение с клиентами, чтобы выявлять их потребности в информационных бюллетенях.",
      contribution: [
        "Запускаю и развиваю информационные бюллетени с опорой на спрос и потребности клиентов: определяю позиционирование, структуру и подход к выводу на рынок.",
        "Разработал и описал процессы подготовки и выпуска в BPMN с учётом особенностей разных команд и технологий.",
        "Координирую работу экспертов, редакторов и дизайнеров и готовлю предложения по оптимизации процессов.",
      ],
      outcome:
        "В моей зоне ответственности на рынок выведены 6 платных информационных бюллетеней с суммарным охватом более 10 B2B-клиентов. Совместно с экспертами, редакторами и дизайнерами организован регулярный выпуск и описаны процессы подготовки материалов. Продолжаю развивать бюллетени и процессы с учётом потребностей, выявленных в общении с клиентами. С образцами бюллетеней можно ознакомиться в материалах ниже.",
    },
    en: {
      challenge:
        "Launch paid B2B bulletins covering petrochemical markets and establish regular publication with experts, editors and designers. Maintain contact with clients to understand their needs for information bulletins.",
      contribution: [
        "Launch and develop information bulletins based on market demand and client needs, defining their positioning, structure and go-to-market approach.",
        "Developed and documented preparation and publication workflows in BPMN, accounting for different teams and technologies.",
        "Coordinate experts, editors and designers and propose process improvements.",
      ],
      outcome:
        "I launched 6 paid information bulletins within my area of responsibility, serving more than 10 B2B clients in total. Working with experts, editors and designers, I established regular publication and documented production workflows. I continue to develop the bulletins and improve processes based on needs identified through conversations with clients. Samples of the bulletins are available in the materials below.",
    },
  },
  NTB: {
    ru: {
      challenge:
        "Запускать ценовые индикаторы для российского АПК и платные информационные B2B-продукты. Развивать направление торгов на товарных аукционах.",
      contribution: [
        "Запускал ценовые индексы для АПК и разрабатывал методики их расчёта.",
        "Запускал платные информационные B2B-продукты с опорой на потребности клиентов и результаты исследования рынка.",
        "Развивал направление торгов на товарных аукционах и координировал работу продуктовых, торговых и клиентских команд.",
        "Координировал разработку и внедрение фронтенд-системы автоматизации обработки клиентских заявок.",
      ],
      outcome:
        "Запущены 10+ ценовых индикаторов для российского АПК и 2 платных информационных продукта с охватом 30+ B2B-клиентов. Количество участников товарных аукционов выросло с 2 до 400+, количество товаров — до 200+, торговых базисов — до 50+. При моём участии запущена фронтенд-система автоматизации обработки клиентских заявок. После её внедрения количество заявок на товарных аукционах выросло более чем в 2 раза. В материалах ниже представлены последние версии методик, над которыми я работал.",
    },
    en: {
      challenge:
        "Launch price indicators for Russian agribusiness and paid B2B information products. Develop commodity auction trading.",
      contribution: [
        "Launched price indices for agribusiness and developed their calculation methodologies.",
        "Launched paid B2B information products based on client needs and market research.",
        "Developed commodity auction trading and coordinated product, trading and client-facing teams.",
        "Coordinated the development and implementation of a frontend system to automate client bid processing.",
      ],
      outcome:
        "I launched 10+ price indicators for Russian agribusiness and 2 paid information products serving 30+ B2B clients. The number of commodity auction participants grew from 2 to 400+, with the range of products expanding to 200+ and the number of delivery locations to 50+. I contributed to the launch of a frontend system for automating client bid processing. Following its implementation, the number of commodity auction bids more than doubled. The materials below include the latest versions of the methodologies I worked on.",
    },
  },
  LRNPT: {
    ru: {
      challenge:
        "В составе отдела развития бизнеса и анализа рынков создать систему оценки сделок по разным каналам продаж. Она должна помогать сравнивать цены с предложениями конкурентов на разных торговых базисах и оценивать эффективность каждой сделки с учётом её условий и затрат.",
      contribution: [
        "Выстроил систему оценки сделок по разным каналам продаж.",
        "Анализировал рыночные цены и предложения конкурентов, сравнивая их на разных торговых базисах.",
        "Оценивал условия, затраты и эффективность сделок и готовил аналитику для принятия коммерческих решений.",
      ],
      outcome:
        "Внедрённая система помогла лучше понимать рынок и сравнивать сделки на сопоставимых условиях. Это позволило принимать более обоснованные коммерческие решения, выбирать выгодные условия сделок и нарастить выручку примерно на 5% за первый год.",
    },
    en: {
      challenge:
        "As part of the Business Development and Market Analysis department, build a system for evaluating deals across sales channels. It should make it easy to compare prices with competitors’ offers across delivery locations and assess each deal’s performance, taking its terms and costs into account.",
      contribution: [
        "Built a system for evaluating deals across sales channels.",
        "Analyzed market prices and competitors’ offers across delivery locations.",
        "Evaluated deal terms, costs and performance, and prepared analysis to support commercial decisions.",
      ],
      outcome:
        "The system improved market understanding and made it easier to compare deals on a consistent basis. This helped make more informed commercial decisions, secure better deal terms and increase revenue by approximately 5% in the first year.",
    },
  },
  KG: {
    ru: {
      challenge:
        "В рамках стратегии диверсификации гражданских направлений компании обеспечить продуктовый маркетинг исследованиями и аналитикой для выбора перспективных ниш и разработки новых B2B-продуктов.",
      contribution: [
        "Сформировал систему маркетинговых исследований и аналитики гражданских рынков для поиска новых продуктовых возможностей.",
        "Интегрировал систему бизнес-аналитики (BI) для поддержки решений продуктового маркетинга.",
        "Участвовал в создании линейки B2B-продуктов в категории «умный дом».",
      ],
      outcome:
        "Выстроена система исследований гражданских рынков и внедрена бизнес-аналитика для оценки перспективных продуктовых ниш. Принял участие в разработке линейки B2B-продуктов в категории «умный дом».",
    },
    en: {
      challenge:
        "As part of the company’s strategy to diversify its civilian business areas, provide product marketing with research and analysis to identify promising niches and support the development of new B2B products.",
      contribution: [
        "Built a research and analytics system covering civilian markets to identify new product opportunities.",
        "Integrated a business intelligence (BI) system to support product marketing decisions.",
        "Contributed to the creation of a B2B smart home product line.",
      ],
      outcome:
        "Established a civilian market research system and implemented business intelligence to assess promising product niches. Contributed to the development of a B2B smart home product line.",
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
