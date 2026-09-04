import madBurglarCatLogo from "../../images/portfolio/projects/madburglarcat/logo.png";
import mappngoLogo from "../../images/portfolio/projects/mappngo/logo.png";
import veniviLogo from "../../images/portfolio/projects/venivi/logo.png";
import type { CompanyId } from "../../types/domain";
import type { CompanyRecord } from "./types";

export const PROJECT_COMPANIES = {
  MBC: {
    id: "MBC",
    slug: "madburglarcat",
    section: "projects",
    logo: madBurglarCatLogo,
    url: "https://madburglarcat.ru/",
    linkLabel: "madburglarcat.ru",
    translations: {
      ru: {
        year: "2024 → настоящее время",
        name: "Mad Burglar Cat",
        title: "Основатель",
        about:
          "Авторский e-commerce-проект по производству и дистрибуции уникальных изделий через онлайн-платформу.",
        results:
          "Запустил проект с нуля и выстроил полный цикл обработки заказов. Формирую видение дальнейшего стратегического развития и вывожу на рынок продукты авторской разработки и изготовления. Координирую работу небольшой команды на аутсорсе, которая помогает с производством контента, разработкой дизайна и обработкой заказов.",
      },
      en: {
        year: "2024 → present",
        name: "Mad Burglar Cat",
        title: "Founder",
        about:
          "An author-driven e-commerce project focused on producing and distributing unique products via an online platform.",
        results:
          "Launched the project from scratch and built the full order processing cycle. Defined the vision for further strategic development and brought original, self-designed products to market. Coordinated a small outsourced team supporting content production, design development, and order processing.",
      },
    },
  },
  MNG: {
    id: "MNG",
    slug: "mappngo",
    section: "projects",
    logo: mappngoLogo,
    url: "https://www.mappngo.com/",
    linkLabel: "mappngo.com",
    translations: {
      ru: {
        year: "2019 → 2020",
        name: "MappNgo",
        title: "Основатель",
        about:
          "Приложение для iOS, которое помогало находить интересные городские маршруты для пеших прогулок в формате C2C.",
        results:
          "Был автором проекта: разработал концепцию, сформировал дизайн и организовал разработку. Довёл проект до стадии минимально жизнеспособного продукта (MVP), но из-за пандемии COVID-19 его пришлось закрыть.",
      },
      en: {
        year: "2019 → 2020",
        name: "MappNgo",
        title: "Founder",
        about:
          "An iOS application that helped users discover interesting urban walking routes in a C2C format.",
        results:
          "Project creator: developed the concept, designed the interface, and organized development. Brought the project to the minimum viable product (MVP) stage, but it had to be shut down due to the COVID-19 pandemic.",
      },
    },
  },
  VNV: {
    id: "VNV",
    slug: "venivi",
    section: "projects",
    logo: veniviLogo,
    url: "https://venivi.ru/",
    linkLabel: "venivi.ru",
    translations: {
      ru: {
        year: "2013 → 2014",
        name: "Venivi",
        title: "Сооснователь",
        about:
          "Конкурсная площадка, где рекламодатели проводили конкурсы и розыгрыши для привлечения аудитории.",
        results:
          "Отвечал за разработку продукта и привлечение клиентов. Проект просуществовал чуть меньше года, но за это время на площадке было проведено не менее десятка розыгрышей и локальных киберспортивных турниров, а MAU достигал 7 000 пользователей. Проект закрылся на фоне ужесточения правил проведения конкурсов в социальной сети VK.com, из группы которой поступал основной трафик.",
      },
      en: {
        year: "2013 → 2014",
        name: "Venivi",
        title: "Co-founder",
        about:
          "A promotional platform where advertisers ran contests and giveaways to attract audiences.",
        results:
          "Was responsible for product development and client acquisition. The project existed for just under a year, during which at least a dozen giveaways and local esports tournaments were held, and MAU reached 7,000 users. The project was closed following stricter contest regulations on the VK.com social network, which was the main traffic source.",
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
