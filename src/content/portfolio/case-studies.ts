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
        "Работать в двух ключевых направлениях: готовить новости, аналитические статьи и обзоры о товарно-сырьевых рынках; развивать терминал Eikon с фокусом на сегменте «Горная добыча и металлургия» — информационные продукты, аналитические дашборды, рыночные котировки и новый технический функционал.",
      contribution: [
        "Готовил новости, обзоры и аналитические статьи о товарно-сырьевых рынках.",
        "Разработал несколько B2B-информационных продуктов в терминале Eikon, участвовал в создании аналитических дашбордов и инициировал добавление рыночных котировок и нового технического функционала.",
      ],
      outcome:
        "Более 1 000 опубликованных материалов с охватом свыше 20 000 читателей. Один из разработанных информационных продуктов привлёк 3 B2B-клиентов. За время работы вырос от стажёра до аналитика рынков. Часть публикаций, сохранившихся в открытом доступе, представлена в материалах ниже.",
    },
    en: {
      challenge:
        "Work in two key areas: produce news reports, analysis and market overviews on commodity markets; develop the Eikon platform with a focus on the mining and metals sector — information products, analytical dashboards, market price quotes and new technical features.",
      contribution: [
        "Wrote news reports, market overviews and analytical articles on commodity markets.",
        "Developed several B2B information products within Eikon, contributed to the creation of analytical dashboards and initiated the addition of market price quotes and new technical features.",
      ],
      outcome:
        "Published over 1,000 pieces reaching more than 20,000 readers. One of the information products attracted 3 B2B clients. Progressed from intern to market analyst during my time at the company. Some of my stories that remain publicly available are included in the materials below.",
    },
  },
  MBC: {
    ru: {
      challenge:
        "Создать с нуля проект по производству и дистрибуции авторских изделий, выстроив полный цикл работы: от разработки продуктов до продаж через интернет-магазин и доставки заказов.",
      contribution: [
        "Сформировал инфраструктуру интернет-магазина на Tilda: CRM, приём платежей и логистику.",
        "Разрабатываю авторские изделия, вывожу их на рынок и определяю дальнейшее развитие проекта.",
        "Организовал полный цикл обработки заказов и занимаюсь операционным управлением.",
        "Координирую небольшую команду на аутсорсе, которая помогает с контентом, дизайном и обработкой заказов.",
      ],
      outcome:
        "Проект запущен, на рынок выведены 10+ авторских товарных позиций. Обеспечен полный цикл обработки 100+ заказов. Сейчас концепция находится на стадии трансформации: материалы нужного качества для производства разработанных изделий больше не поставляются в Россию.",
    },
    en: {
      challenge:
        "Build a venture for producing and distributing original products from scratch, covering the full cycle from product development to sales through an online store and order delivery.",
      contribution: [
        "Built the e-commerce infrastructure on Tilda, including CRM, payments and logistics.",
        "Develop original products, bring them to market and shape the direction of the project.",
        "Established the full order-processing cycle and manage day-to-day operations.",
        "Coordinate a small outsourced team supporting content, design and order processing.",
      ],
      outcome:
        "Launched the project and brought 10+ original products to market. Managed the full processing cycle for 100+ orders. The concept is currently undergoing a transformation, as materials of the required quality for manufacturing these products are no longer supplied to Russia.",
    },
  },
  MNG: {
    ru: {
      challenge:
        "Создать iOS-приложение для поиска и создания городских пеших маршрутов, которыми пользователи делятся друг с другом.",
      contribution: [
        "Придумал и разработал концепцию проекта, сформировал его стратегию и видение.",
        "Организовал команду на аутсорсе, которая помогла с полным циклом разработки и дизайном продукта.",
        "Провёл полноценное первичное тестирование продукта на нескольких фокус-группах знакомых.",
      ],
      outcome:
        "Проект доведён до стадии MVP для iOS. В 2020 году его пришлось закрыть из-за карантина, введённого во время пандемии COVID-19.",
    },
    en: {
      challenge: "Create an iOS app where users can find, create and share urban walking routes.",
      contribution: [
        "Conceived and developed the project concept, strategy and vision.",
        "Assembled an outsourced team that supported the full product development and design cycle.",
        "Conducted comprehensive initial product testing with several focus groups from my personal network.",
      ],
      outcome:
        "Brought the iOS project to the MVP stage. It had to close in 2020 due to lockdown measures introduced during the COVID-19 pandemic.",
    },
  },
  VNV: {
    ru: {
      challenge:
        "Создать площадку, на которой рекламодатели могут привлекать аудиторию через конкурсы, розыгрыши и турниры.",
      contribution: [
        "Придумал и разработал концепцию проекта, сформировал его стратегию и видение.",
        "Подобрал дизайнеров и разработчиков и сформировал команду на аутсорсе.",
        "Отвечал за разработку продукта.",
      ],
      outcome:
        "Площадка запущена и за неполный год привлекла более 30 B2B-клиентов. Проведены не менее 10 мероприятий, включая розыгрыши и 3 киберспортивных турнира с участием более 300 игроков. Аудитория достигала около 1 000 активных пользователей в день и 7 000 в месяц, удержание на 30-й день — 16%. В 2014 году проект пришлось закрыть из-за ужесточения правил проведения конкурсов в VK.com.",
    },
    en: {
      challenge:
        "Create a platform where advertisers can attract audiences through contests, giveaways and tournaments.",
      contribution: [
        "Conceived and developed the project concept, strategy and vision.",
        "Recruited designers and developers and assembled an outsourced team.",
        "Was responsible for product development.",
      ],
      outcome:
        "Launched the platform, which attracted over 30 B2B clients in under a year. Hosted at least 10 events, including giveaways and three esports tournaments involving more than 300 players. The audience reached approximately 1,000 daily and 7,000 monthly active users, with day-30 retention of 16%. The project closed in 2014 due to stricter rules governing contests on VK.com.",
    },
  },
};
