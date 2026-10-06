import type { CompanyId, Language } from "../../types/domain";
import type { CaseStudy } from "./types";

// Based on the portfolio, supplied CVs and facts confirmed by the author.
export const CASE_STUDIES: Partial<Record<CompanyId, Record<Language, CaseStudy>>> = {
  CI: {
    ru: {
      challenge:
        "Развивать линейку платных B2B-бюллетеней о рынках нефтегазохимии: определить востребованное содержание и наладить регулярный выпуск совместно с экспертами, редакторами и дизайнерами.",
      contribution: [
        "Запускаю и развиваю бюллетени с опорой на потребности клиентов: определяю тематику, структуру выпусков и подход к выводу на рынок.",
        "Описал процессы подготовки и выпуска в BPMN для согласования этапов работы и зон ответственности команды.",
        "Координирую экспертов, редакторов, дизайнеров и подрядчиков; предлагаю улучшения рабочих процессов.",
        "Сформировал календарь выпусков, план развития бюллетеней и базу клиентов для регулярной публикации материалов и развития тематики на основе запросов B2B-клиентов.",
      ],
      outcome:
        "Вывел на рынок 7 платных информационных бюллетеней с суммарным охватом 10+ B2B-клиентов. Совместно с коллегами организовал регулярный выпуск и описал процессы подготовки материалов. Продолжаю развивать продукты на основе обратной связи клиентов. Ниже представлены образцы всех 7 бюллетеней.",
    },
    en: {
      challenge:
        "Develop a portfolio of paid B2B petrochemical market bulletins: identify the information clients need and establish regular publication with experts, editors and designers.",
      contribution: [
        "Launch and develop bulletins around client needs, defining the topics, structure and approach to market launch.",
        "Documented production and publication workflows in BPMN to align work stages and team responsibilities.",
        "Coordinate experts, editors, designers and contractors, and propose workflow improvements.",
        "Built a publication calendar, a bulletin development plan and a client database to plan releases and develop coverage around B2B client needs.",
      ],
      outcome:
        "Launched 7 paid information bulletins serving 10+ B2B clients in total. Working with colleagues, established regular publication and documented production workflows. Continue to develop the products using client feedback. Samples of all 7 bulletins are available below.",
    },
  },
  NTB: {
    ru: {
      challenge:
        "Создать ценовые ориентиры для российского АПК и платные информационные продукты для корпоративных клиентов. Развивать товарные аукционы и автоматизировать обработку клиентских заявок.",
      contribution: [
        "Руководил направлением с 1 прямым подчинённым; координировал коллег и подрядчиков.",
        "Запускал ценовые индикаторы для АПК и разрабатывал методики их расчёта.",
        "Запустил платные информационные продукты на основе исследования рынка и потребностей B2B-клиентов.",
        "Развивал товарные аукционы и координировал взаимодействие торговых и клиентских команд.",
        "Координировал разработку и внедрение фронтенд-системы автоматизации обработки заявок на товарных аукционах.",
      ],
      outcome:
        "Запустил 10+ ценовых индикаторов для российского АПК и 2 платных информационных продукта с охватом 30+ B2B-клиентов. В период работы число участников товарных аукционов выросло с 2 до 400+, ассортимент — до 200+ товаров, число торговых базисов — до 50+. При моём участии внедрена фронтенд-система автоматизации обработки заявок на товарных аукционах; после её внедрения число заявок выросло более чем в 2 раза. Ниже представлены последние версии методик, над которыми я работал, и пример аналитического дашборда.",
    },
    en: {
      challenge:
        "Create price benchmarks for Russian agribusiness and paid information products for business clients. Develop commodity auctions and automate client bid processing.",
      contribution: [
        "Led the function with 1 direct report and coordinated colleagues and contractors.",
        "Launched agribusiness price indicators and developed their calculation methodologies.",
        "Launched paid information products based on market research and B2B client needs.",
        "Developed commodity auctions and coordinated trading and client-facing teams.",
        "Coordinated the development and implementation of a frontend system to automate commodity auction bid processing.",
      ],
      outcome:
        "Launched 10+ agribusiness price indicators and 2 paid information products serving 30+ B2B clients. During my time at the exchange, auction participation grew from 2 to 400+ participants, the product range expanded to 200+ items and the number of delivery locations reached 50+. Contributed to the implementation of a frontend system for commodity auction bid processing; the number of bids increased more than 2-fold following its introduction. The materials below include the latest versions of methodologies I worked on and a sample analytics dashboard.",
    },
  },
  LRNPT: {
    ru: {
      challenge:
        "Обеспечить коммерческие решения сопоставимой аналитикой: сравнивать сделки по разным каналам продаж, цены конкурентов и условия поставки с учётом затрат.",
      contribution: [
        "Разработал и внедрил систему оценки сделок по разным каналам продаж.",
        "Сопоставлял рыночные цены и предложения конкурентов на разных торговых базисах.",
        "Анализировал условия и затраты по сделкам, готовил материалы для коммерческих решений.",
      ],
      outcome:
        "Внедрена система, позволяющая сравнивать сделки на сопоставимых условиях и учитывать цены, логистику и другие затраты при выборе коммерческих решений.",
    },
    en: {
      challenge:
        "Support commercial decisions with comparable market analysis: assess deals across sales channels, competitor prices and delivery terms while accounting for costs.",
      contribution: [
        "Developed and implemented a system for evaluating deals across sales channels.",
        "Compared market prices and competitor offers across delivery locations.",
        "Analyzed deal terms and costs and prepared analysis for commercial decisions.",
      ],
      outcome:
        "Implemented a system for comparing deals on a consistent basis, taking prices, logistics and other costs into account when making commercial decisions.",
    },
  },
  KG: {
    ru: {
      challenge:
        "Поддержать диверсификацию гражданских направлений: дать продуктовому маркетингу исследования и аналитику для оценки ниш и разработки новых B2B-продуктов.",
      contribution: [
        "Сформировал систему исследований и аналитики для отдела продуктового маркетинга.",
        "Интегрировал систему бизнес-аналитики (BI) для сопоставления рыночных данных и оценки коммерческих перспектив.",
        "Участвовал в разработке новых B2B-продуктов.",
      ],
      outcome:
        "Сформировал систему исследований и аналитики для отдела продуктового маркетинга, внедрил BI для сопоставления рыночных данных и оценки коммерческих перспектив. Участвовал в разработке новых B2B-продуктов.",
    },
    en: {
      challenge:
        "Support diversification into civilian markets by providing product marketing with research and analysis to assess opportunities and develop new B2B products.",
      contribution: [
        "Built a research and analytics system for the product marketing department.",
        "Integrated a business intelligence (BI) system to compare market data and assess commercial opportunities.",
        "Contributed to the development of new B2B products.",
      ],
      outcome:
        "Built a research and analytics system for the product marketing department and integrated BI to compare market data and assess commercial opportunities. Contributed to the development of new B2B products.",
    },
  },
  TR: {
    ru: {
      challenge:
        "Развивать информационные продукты Eikon для горной добычи и металлургии и готовить новости, обзоры и аналитику товарно-сырьевых рынков.",
      contribution: [
        "Разработал B2B-информационные продукты в Eikon; участвовал в создании аналитических дашбордов.",
        "Инициировал добавление рыночных котировок и технического функционала.",
        "Готовил новости, рыночные обзоры и аналитические статьи — самостоятельно, в соавторстве и в переводе с английского.",
        "Проводил мастер-классы для клиентов Eikon и выступал на отраслевых конференциях в роли эксперта.",
      ],
      outcome:
        "1 из разработанных информационных продуктов привлёк 3 B2B-клиентов. Подготовил 1 000+ публикаций с охватом 20 000+ читателей. Вырос от стажёра до аналитика рынков. Для каждого примера публикации ниже указан мой вклад в её подготовку.",
    },
    en: {
      challenge:
        "Develop Eikon information products for mining and metals clients while producing commodity market news, reviews and analysis.",
      contribution: [
        "Developed B2B information products within Eikon and contributed to analytics dashboards.",
        "Initiated the addition of market price quotes and technical features.",
        "Produced market news, reviews and analytical articles as an author, co-author and translator from English into Russian.",
        "Delivered workshops for Eikon clients and spoke as an industry expert at conferences.",
      ],
      outcome:
        "1 of the information products I developed attracted 3 B2B clients. Prepared 1,000+ publications reaching 20,000+ readers. Progressed from intern to market analyst. Each publication sample below specifies my contribution.",
    },
  },
  MBC: {
    ru: {
      challenge:
        "Запустить авторские изделия и организовать продажи через интернет-магазин — от разработки товара до оплаты, обработки и доставки заказа.",
      contribution: [
        "Разработал авторские изделия и вывел их на рынок.",
        "Собрал инфраструктуру интернет-магазина на Tilda: CRM, приём платежей и логистику.",
        "Организовал полный цикл обработки заказов и координировал подрядчиков по контенту и дизайну.",
      ],
      outcome:
        "За время проекта вывел на рынок 10+ товарных позиций и обеспечил полный цикл обработки 100+ заказов. Проект трансформировался из формата с полноценной командой в небольшое хобби-производство.",
    },
    en: {
      challenge:
        "Launch original products and establish online sales, covering product development, payments, order processing and delivery.",
      contribution: [
        "Designed original products and brought them to market.",
        "Built an online store on Tilda with CRM, payments and logistics.",
        "Established end-to-end order processing and coordinated content and design contractors.",
      ],
      outcome:
        "Brought 10+ products to market and managed the full processing cycle for 100+ orders over the course of the project. Previously run with a full team, the project has since transformed into small-scale hobby production.",
    },
  },
  MNG: {
    ru: {
      challenge:
        "Проверить концепцию приложения, в котором пользователи могут находить городские маршруты для прогулок и делиться собственными.",
      contribution: [
        "Сформировал концепцию продукта и основные пользовательские сценарии.",
        "Подобрал и координировал команду дизайнеров и разработчиков на аутсорсе.",
        "Организовал первичное тестирование MVP среди знакомых.",
      ],
      outcome:
        "Разработан и протестирован MVP для iOS. До публичного запуска проект не дошёл: в 2020 году его закрыли на фоне ограничений во время пандемии COVID-19. Ниже представлены тестовые экраны и архивные материалы проекта.",
    },
    en: {
      challenge:
        "Test an app concept that lets users discover urban walking routes and share their own.",
      contribution: [
        "Defined the product concept and core user journeys.",
        "Recruited and coordinated outsourced designers and developers.",
        "Organized initial MVP testing with people from my personal network.",
      ],
      outcome:
        "Developed and tested an iOS MVP. The project closed in 2020 amid COVID-19 restrictions before a public launch. Test screens and archived project materials are available below.",
    },
  },
  VNV: {
    ru: {
      challenge:
        "Создать сервис для проведения конкурсов и привлечь рекламодателей, заинтересованных в новой аудитории.",
      contribution: [
        "Сформировал концепцию сервиса и отвечал за развитие продукта.",
        "Подобрал дизайнеров и разработчиков и координировал команду на аутсорсе.",
        "Занимался привлечением клиентов и организацией мероприятий на площадке.",
      ],
      outcome:
        "За неполный год площадка привлекла 30+ B2B-клиентов. Проведено 10+ мероприятий, включая 3 киберспортивных турнира с 300+ участниками. Аудитория достигала около 1 000 DAU и 7 000 MAU; удержание на 30-й день составляло 16%. В 2014 году проект закрыли после ужесточения правил проведения конкурсов в VK.com, откуда поступал основной трафик.",
    },
    en: {
      challenge: "Build a contest platform and attract advertisers looking to reach new audiences.",
      contribution: [
        "Defined the service concept and led product development.",
        "Recruited designers and developers and coordinated an outsourced team.",
        "Worked on client acquisition and organized events on the platform.",
      ],
      outcome:
        "Attracted 30+ B2B clients in under a year. Hosted 10+ events, including 3 esports tournaments with 300+ participants. The audience reached approximately 1,000 daily and 7,000 monthly active users, with 16% day-30 retention. The project closed in 2014 after VK.com tightened contest rules, affecting its main source of traffic.",
    },
  },
};
