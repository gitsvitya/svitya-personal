import type { CompanyId, Language } from "../../types/domain";
import type { CaseStudy } from "./types";

export const CASE_STUDIES: Partial<Record<CompanyId, Record<Language, CaseStudy>>> = {
  CI: {
    ru: {
      challenge:
        "Запускать платные бюллетени о рынках нефтегазохимии, которые отвечают запросам клиентов, и вместе с экспертами, редакторами и дизайнерами наладить их регулярный выпуск.",
      contribution: [
        "Определяю темы бюллетеней, их структуру и подход к запуску, опираясь на потребности клиентов.",
        "Описал подготовку и выпуск в схемах BPMN: какие этапы проходит материал и кто за них отвечает.",
        "Координирую экспертов, редакторов, дизайнеров и подрядчиков; предлагаю, как улучшить рабочие процессы.",
        "Составил календарь выпусков и план развития бюллетеней, собрал базу клиентов. Эти инструменты помогают планировать публикации и развивать тематику с учётом запросов клиентов.",
      ],
      outcome:
        "Запустил 7 платных бюллетеней для 10+ B2B-клиентов в общей сложности. Вместе с коллегами наладил регулярный выпуск. Продолжаю развивать бюллетени с учётом отзывов клиентов. Ниже — образцы всех 7 бюллетеней.",
    },
    en: {
      challenge:
        "Launch paid petrochemical market bulletins that meet client needs, and work with experts, editors and designers to establish regular publication.",
      contribution: [
        "I choose the topics, structure and approach to launching each bulletin based on client needs.",
        "I mapped the production and publication process in BPMN diagrams, showing each stage and who is responsible for it.",
        "I coordinate experts, editors, designers and contractors, and suggest improvements to how we work.",
        "I created a publication calendar, a development plan and a client database to help plan releases and develop coverage around client needs.",
      ],
      outcome:
        "I have launched 7 paid bulletins serving 10+ B2B clients in total. Together with colleagues, I established regular publication. I continue to develop the bulletins using client feedback. Samples of all 7 bulletins are below.",
    },
  },
  NTB: {
    ru: {
      challenge:
        "Создать ценовые ориентиры для российского агропромышленного комплекса и запустить платные информационные продукты для компаний, а также развивать товарные аукционы и автоматизировать обработку заявок.",
      contribution: [
        "Руководил направлением. В прямом подчинении был 1 человек; также координировал коллег и подрядчиков.",
        "Запускал ценовые индикаторы — ориентиры рыночных цен — и разрабатывал методики их расчёта.",
        "Изучал рынок и потребности клиентов, на этой основе запускал платные информационные продукты.",
        "Развивал товарные аукционы и координировал работу торговых и клиентских команд.",
        "Координировал разработку и внедрение системы обработки заявок на товарных аукционах.",
      ],
      outcome:
        "Запустил 10+ ценовых индикаторов и 2 платных информационных продукта для 30+ B2B-клиентов. За время моей работы число участников аукционов выросло с 2 до 400+, ассортимент — до 200+ товаров, число торговых базисов (мест поставки) — до 50+. После внедрения системы обработки заявок их число выросло более чем в 2 раза. Ниже — версии методик, над которыми я работал, и пример дашборда с ценовыми индексами.",
    },
    en: {
      challenge:
        "Create price benchmarks for Russian agribusiness and launch paid information products for companies, while also developing commodity auctions and automating bid processing.",
      contribution: [
        "I led methodology work with 1 direct report and coordinated colleagues and contractors.",
        "I launched price indicators to provide market benchmarks and developed the methods used to calculate them.",
        "I researched the market and client needs, then used that research to launch paid information products.",
        "I developed commodity auctions and coordinated trading and client-facing teams.",
        "I coordinated the development and implementation of a system to automate auction bid processing.",
      ],
      outcome:
        "I launched 10+ price indicators and 2 paid information products serving 30+ B2B clients. During my time at the exchange, auction participation grew from 2 to 400+, the product range reached 200+ items and delivery locations reached 50+. After the bid processing system was introduced, the number of bids increased more than 2-fold. Below are versions of the methodologies I worked on and a sample dashboard of price indices.",
    },
  },
  LRNPT: {
    ru: {
      challenge:
        "Разработать и внедрить систему, которая поможет сравнивать сделки по разным каналам продаж и условиям поставки с учётом цены, логистики и других затрат.",
      contribution: [
        "Разработал и внедрил систему оценки сделок по разным каналам продаж и базисам поставки.",
        "Сравнивал рыночные цены и предложения конкурентов с учётом места и условий поставки.",
        "Анализировал условия сделок и затраты, готовил материалы для оценки сделок.",
      ],
      outcome:
        "Внедрил систему, которая позволяет сравнивать сделки с учётом цены, логистики и других затрат. Она приводит разные условия продаж к сопоставимому виду и помогает принимать коммерческие решения.",
    },
    en: {
      challenge:
        "Develop and implement a system to compare deals across different sales channels and delivery terms, taking prices, logistics and other costs into account.",
      contribution: [
        "I developed and implemented a deal evaluation system covering different sales channels and delivery locations.",
        "I compared market prices and competitor offers, taking delivery locations and terms into account.",
        "I analyzed deal terms and costs and prepared information to support commercial decisions.",
      ],
      outcome:
        "I implemented a system that makes deals comparable by accounting for prices, logistics and other costs. It provides a consistent basis for evaluating different sales terms and making commercial decisions.",
    },
  },
  KG: {
    ru: {
      challenge:
        "Наладить исследования и аналитику для отдела продуктового маркетинга, чтобы оценивать перспективы гражданских рынков и участвовать в разработке новых продуктов для бизнеса.",
      contribution: [
        "Выстроил систему исследований и аналитики для отдела продуктового маркетинга.",
        "Внедрил систему бизнес-аналитики (BI) для сравнения рыночных данных и оценки коммерческих перспектив.",
        "Участвовал в разработке новых B2B-продуктов.",
      ],
      outcome:
        "У отдела появилась система исследований и аналитики, включая BI для сравнения рыночных данных и оценки перспектив новых продуктов. Эту работу я совмещал с участием в разработке B2B-продуктов.",
    },
    en: {
      challenge:
        "Set up research and analysis for the product marketing team to assess opportunities in civilian markets and support the development of new products for business clients.",
      contribution: [
        "I built a research and analytics system for the product marketing team.",
        "I introduced a business intelligence (BI) system to compare market data and assess commercial opportunities.",
        "I contributed to the development of new B2B products.",
      ],
      outcome:
        "The team gained a research and analytics system, including BI for comparing market data and assessing product opportunities. Alongside this work, I contributed to developing new B2B products.",
    },
  },
  TR: {
    ru: {
      challenge:
        "Разрабатывать информационные продукты в Eikon для горнодобывающей отрасли и металлургии, а также готовить новости и аналитику товарно-сырьевых рынков.",
      contribution: [
        "Разрабатывал информационные продукты в Eikon и участвовал в создании аналитических дашбордов — экранов с рыночными данными и графиками.",
        "Инициировал добавление новых рыночных котировок и функций в Eikon.",
        "Готовил новости, обзоры и аналитические статьи: писал сам, работал с соавторами и переводил материалы с английского на русский.",
        "Проводил мастер-классы для клиентов Eikon и выступал на отраслевых конференциях как эксперт.",
      ],
      outcome:
        "Разработанные мной информационные продукты привлекли в общей сложности 3 B2B-клиентов. Подготовил 1 000+ публикаций с охватом 20 000+ читателей и вырос от стажёра до аналитика рынков. Под примерами ниже указано, где я был автором, где работал вместе с коллегами, а где переводил текст.",
    },
    en: {
      challenge:
        "Develop Eikon information products for mining and metals clients, and produce commodity market news and analysis.",
      contribution: [
        "I developed Eikon information products and helped create analytics dashboards showing market data and charts.",
        "I initiated the addition of new market price quotes and features in Eikon.",
        "I prepared news, market reviews and analysis as an author, co-author and translator from English into Russian.",
        "I ran workshops for Eikon clients and spoke as an industry expert at conferences.",
      ],
      outcome:
        "The information products I developed attracted 3 B2B clients in total. I prepared 1,000+ publications reaching 20,000+ readers and progressed from intern to market analyst. The examples below explain my role in each piece: author, contributor or translator.",
    },
  },
  MBC: {
    ru: {
      challenge:
        "Создать собственные изделия и наладить продажи через интернет — от разработки товара до оплаты и доставки заказа.",
      contribution: [
        "Разрабатывал авторские изделия и запускал их в продажу.",
        "Собрал магазин на Tilda, подключил CRM для работы с клиентами, приём платежей и доставку.",
        "Организовал обработку заказов от оформления до отправки и координировал подрядчиков по контенту и дизайну.",
      ],
      outcome:
        "За время проекта запустил 10+ товарных позиций и организовал обработку 100+ заказов — от оформления до отправки покупателям.",
    },
    en: {
      challenge:
        "Create original products and set up online sales, covering product development, payment and delivery.",
      contribution: [
        "I developed original products and brought them to market.",
        "I built the store on Tilda, added a CRM for managing customer relationships and set up payments and delivery.",
        "I organized order processing from checkout to dispatch and coordinated content and design contractors.",
      ],
      outcome:
        "Over the course of the project, I launched 10+ products and organized the processing of 100+ orders, from checkout to dispatch.",
    },
  },
  MNG: {
    ru: {
      challenge:
        "Проверить идею приложения для городских прогулок, в котором можно находить интересные маршруты, создавать свои и делиться ими.",
      contribution: [
        "Разработал концепцию приложения и основные сценарии его использования.",
        "Подобрал дизайнеров и разработчиков на аутсорсе и координировал их работу.",
        "Организовал тестирование MVP среди знакомых.",
      ],
      outcome:
        "Команда разработала MVP для iOS, и мы протестировали его среди знакомых. До публичного запуска проект не дошёл: в 2020 году он закрылся на фоне ограничений COVID-19. Ниже — тестовые экраны и архивные материалы.",
    },
    en: {
      challenge:
        "Test an app idea for finding interesting city walks, creating routes and sharing them with others.",
      contribution: [
        "I defined the app concept and the main ways people would use it.",
        "I brought in outsourced designers and developers and coordinated their work.",
        "I organized MVP testing with people I knew.",
      ],
      outcome:
        "The team developed an iOS MVP, which we tested with people we knew. The project closed in 2020 amid COVID-19 restrictions, before a public launch. Test screens and archived materials are below.",
    },
  },
  VNV: {
    ru: {
      challenge:
        "Создать площадку для конкурсов и развивать её, привлекая рекламодателей, которым интересно выходить на новую аудиторию.",
      contribution: [
        "Разработал концепцию сервиса и занимался развитием продукта.",
        "Подобрал дизайнеров и разработчиков на аутсорсе и координировал их работу.",
        "Привлекал клиентов и организовывал мероприятия на площадке.",
      ],
      outcome:
        "За неполный год площадка привлекла 30+ B2B-клиентов. Мы провели 10+ мероприятий, включая 3 киберспортивных турнира, на которых суммарно было 300+ участников. Число активных пользователей достигало примерно 1 000 в день и 7 000 в месяц; удержание на 30-й день составляло 16%. В 2014 году проект закрылся после ужесточения правил конкурсов в VK.com, откуда приходил основной трафик.",
    },
    en: {
      challenge:
        "Build and develop a contest platform while attracting advertisers looking to reach new audiences.",
      contribution: [
        "I developed the service concept and worked on product development.",
        "I brought in outsourced designers and developers and coordinated their work.",
        "I attracted clients and organized events on the platform.",
      ],
      outcome:
        "In under a year, the platform attracted 30+ B2B clients. We ran 10+ events, including 3 esports tournaments with 300+ participants combined. The audience reached around 1,000 daily and 7,000 monthly active users, with 16% day-30 retention. The project closed in 2014 after VK.com tightened contest rules, affecting our main source of traffic.",
    },
  },
};
