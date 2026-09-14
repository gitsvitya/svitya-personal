import type { CompanyId, Language } from "../../types/domain";
import type { CaseStudy } from "./types";

// Structured versions of facts already published in the portfolio.
export const CASE_STUDIES: Partial<Record<CompanyId, Record<Language, CaseStudy>>> = {
  CI: {
    ru: {
      challenge:
        "Развивать платные B2B-информационные продукты независимого ценового агентства на рынке нефтегазохимии.",
      contribution: [
        "Занимаюсь запуском и развитием информационных продуктов.",
        "Моделирую бизнес-процессы и готовлю предложения по их оптимизации.",
        "Координирую взаимодействие экспертов, редакторов и дизайнеров.",
      ],
      outcome:
        "Продолжаю работу над продуктами и процессами агентства. Ниже представлены образцы аналитических материалов ХимИнсайт.",
    },
    en: {
      challenge:
        "Develop paid B2B information products for an independent pricing agency in the petrochemical market.",
      contribution: [
        "Launch and develop information products.",
        "Model business processes and propose improvements.",
        "Coordinate collaboration between experts, editors and designers.",
      ],
      outcome:
        "My work on the agency’s products and processes is ongoing. Sample ChemInsight analytical reports are available below.",
    },
  },
  NTB: {
    ru: {
      challenge:
        "Развивать информационные продукты и товарные аукционы Национальной товарной биржи.",
      contribution: [
        "Запускал ценовые индикаторы и B2B-информационные продукты.",
        "Развивал торги на товарных аукционах.",
        "Координировал разработку и внедрение frontend-системы обработки заявок.",
      ],
      outcome:
        "Работа охватывала запуск информационных продуктов и автоматизацию обработки заявок для биржевых торгов.",
    },
    en: {
      challenge:
        "Develop information products and commodity auctions at the National Mercantile Exchange.",
      contribution: [
        "Launched price indicators and B2B information products.",
        "Developed commodity auction trading activities.",
        "Coordinated the development and implementation of a frontend bid-processing system.",
      ],
      outcome:
        "The work covered information product launches and the automation of bid processing for exchange trading.",
    },
  },
  MBC: {
    ru: {
      challenge:
        "Создать с нуля e-commerce-проект с изделиями авторской разработки и изготовления.",
      contribution: [
        "Запустил проект и выстроил полный цикл обработки заказов.",
        "Разрабатываю продукты и определяю дальнейшее развитие проекта.",
        "Координирую небольшую команду на аутсорсе: контент, дизайн и обработку заказов.",
      ],
      outcome:
        "Проект запущен и продолжает развиваться. С изделиями можно познакомиться на сайте Mad Burglar Cat.",
    },
    en: {
      challenge:
        "Build an e-commerce project from scratch around original, self-designed products.",
      contribution: [
        "Launched the project and built the full order-processing cycle.",
        "Develop products and shape the direction of the project.",
        "Coordinate a small outsourced team working on content, design and order processing.",
      ],
      outcome:
        "The project is live and continues to develop. The products can be explored on the Mad Burglar Cat website.",
    },
  },
  TR: {
    ru: {
      challenge:
        "Освещать товарно-сырьевые рынки и развивать информационные продукты для профессиональной аудитории.",
      contribution: [
        "Прошёл путь от стажёра до аналитика рынков нефти, газа и металлургии.",
        "Готовил новости, разборы и аналитические статьи.",
        "Разрабатывал информационные продукты и аналитические дашборды, проводил мастер-классы для клиентов.",
      ],
      outcome: "Более 1 000 опубликованных материалов, которые прочитали более 20 000 человек.",
    },
    en: {
      challenge:
        "Cover commodity markets and develop information products for a professional audience.",
      contribution: [
        "Progressed from intern to analyst covering oil, gas and metals markets.",
        "Wrote news reports, explainers and analytical articles.",
        "Developed information products and analytical dashboards, and delivered client workshops.",
      ],
      outcome: "Over 1,000 published pieces, read by more than 20,000 people.",
    },
  },
  VNV: {
    ru: {
      challenge:
        "Создать площадку, на которой рекламодатели привлекают аудиторию через конкурсы и розыгрыши.",
      contribution: [
        "Отвечал за разработку продукта и привлечение клиентов.",
        "Развивал площадку, основным источником трафика которой была группа VK.com.",
      ],
      outcome:
        "За неполный год на площадке прошли не менее десяти розыгрышей и локальных киберспортивных турниров. MAU достигал 7 000 пользователей. Проект закрылся после ужесточения правил конкурсов в VK.com.",
    },
    en: {
      challenge:
        "Create a platform where advertisers can attract audiences through contests and giveaways.",
      contribution: [
        "Was responsible for product development and client acquisition.",
        "Developed a platform whose main traffic source was its VK.com group.",
      ],
      outcome:
        "In under a year, the platform hosted at least ten giveaways and local esports tournaments and reached 7,000 monthly active users. It closed following tighter contest rules on VK.com.",
    },
  },
};
