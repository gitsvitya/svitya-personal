import type { StaticImageData } from "next/image";
import ciLogo from "../images/ci_logo.png";
import kalashnikovLogo from "../images/kalashnikov_logo.png";
import lukoilLogo from "../images/lukoil_logo.png";
import mappngoLogo from "../images/mappngoLogo_black.png";
import mbcLogo from "../images/mbc_logo.png";
import moexLogo from "../images/moex_logo.png";
import reutersLogo from "../images/reuters_logo.png";
import strokeOffLabel from "../images/stroke_off_label.png";
import svityaComLabel from "../images/svitya_com_label.png";
import veniviLogo from "../images/veniviLogo.png";
import type { CompanyId, CompanySection, Language } from "../types/domain";

type CompanyCopy = {
  year: string;
  name: string;
  title: string;
  about: string;
  results: string;
};

type CompanyRecord = {
  id: CompanyId;
  section: CompanySection;
  logo: string;
  url?: string;
  linkLabel?: string;
  translations: Record<Language, CompanyCopy>;
};

export type LocalizedCompany = Omit<CompanyRecord, "translations"> & CompanyCopy;

function resolveImageSrc(image: string | StaticImageData): string {
  return typeof image === "string" ? image : image.src;
}

export const COMPANIES: Record<CompanyId, CompanyRecord> = {
  CI: {
    id: "CI",
    section: "work",
    logo: resolveImageSrc(ciLogo),
    url: "https://cheminsight.ru/",
    linkLabel: "cheminsight.ru",
    translations: {
      ru: {
        year: "2025-н.в.",
        name: "ХимИнсайт",
        title: "Внештатный консультант",
        about:
          "Независимое ценовое агентство, специализирующееся на экспертной оценке рынка нефтегазохимии.",
        results:
          "Запускаю и развиваю платные B2B-информационные продукты. Моделирую и визуализирую бизнес-процессы с предложениями по их оптимизации. Организую и координирую взаимодействие между экспертами, редакторами и дизайнерами для достижения эффективных результатов.",
      },
      en: {
        year: "2025-present",
        name: "ChemInsight",
        title: "Freelance consultant",
        about:
          "An independent pricing agency specializing in expert assessment of the petrochemical market.",
        results:
          "Launching and developing paid B2B information products. Modeling and visualizing business processes with optimization proposals. Organizing and coordinating collaboration between experts, editors, and designers to achieve efficient results.",
      },
    },
  },
  NTB: {
    id: "NTB",
    section: "work",
    logo: resolveImageSrc(moexLogo),
    url: "https://namex.org/",
    linkLabel: "namex.org",
    translations: {
      ru: {
        year: "2021-2024",
        name: "Национальная товарная биржа",
        title: "Руководитель направления методологии / развития бизнеса",
        about:
          "Дочерняя структура Московской биржи, специализирующаяся на товарных направлениях.",
        results:
          "Запускал ценовые индикаторы и B2B-информационные продукты. Развивал торги на товарных аукционах. Координировал разработку и внедрение frontend-системы автоматизации обработки заявок для биржевых торгов.",
      },
      en: {
        year: "2021-2024",
        name: "National Mercantile Exchange",
        title: "Head of Methology / Business Development",
        about: "A subsidiary of the Moscow Exchange specializing in commodity markets.",
        results:
          "Launched price indicators and B2B information products. Developed trading activities on commodity auctions. Coordinated the development and implementation of a frontend system for automating bid processing for exchange trading.",
      },
    },
  },
  LRNPT: {
    id: "LRNPT",
    section: "work",
    logo: resolveImageSrc(lukoilLogo),
    url: "https://trading.lukoil.ru/",
    linkLabel: "trading.lukoil.ru",
    translations: {
      ru: {
        year: "2020-2021",
        name: "Лукойл-РНП-Трейдинг",
        title: "Ведущий специалист отдела развития бизнеса и анализа рынков",
        about:
          "Дочерняя структура Лукойла, специализирующаяся на оптовой продаже нефтепродуктов через электронные торговые площадки.",
        results:
          "Координировал маркетинговые проекты, готовил аналитические материалы. Участвовал в формировании стратегии развития новых направлений сбыта компании. Обеспечивал сопровождение коммерческой деятельности, выявлял потенциальные риски.",
      },
      en: {
        year: "2020-2021",
        name: "Lukoil-RNP-Trading",
        title: "Leading Specialist, Business Development and Market Analysis",
        about:
          "A subsidiary of Lukoil specializing in wholesale petroleum product sales via electronic trading platforms.",
        results:
          "Coordinated marketing projects and prepared analytical materials. Participated in shaping the strategy for developing new sales channels. Supported commercial operations and identified potential risks.",
      },
    },
  },
  KG: {
    id: "KG",
    section: "work",
    logo: resolveImageSrc(kalashnikovLogo),
    url: "https://kalashnikovgroup.ru/",
    linkLabel: "kalashnikovgroup.ru",
    translations: {
      ru: {
        year: "2018-2019",
        name: "Концерн Калашников",
        title: "Менеджер по маркетинговым исследованиям",
        about:
          "Флагман российской стрелковой отрасли, производитель промышленного, медицинского и специализированного оборудования.",
        results:
          "Работал с гражданскими рынками. Сформировал и развивал систему маркетинговых исследований для отдела продуктового маркетинга. Интегрировал систему бизнес-аналитики. Принимал участие в создании B2B-продуктов.",
      },
      en: {
        year: "2018-2019",
        name: "Kalashnikov Group",
        title: "Marketing Research Manager",
        about:
          "A leading company of the Russian arms industry and a manufacturer of industrial, medical, and specialized equipment.",
        results:
          "Worked with civilian markets. Built and developed a marketing research system for the product marketing department. Integrated a business analytics system. Participated in the creation of B2B products.",
      },
    },
  },
  TR: {
    id: "TR",
    section: "work",
    logo: resolveImageSrc(reutersLogo),
    url: "https://www.thomsonreuters.com/",
    linkLabel: "thomsonreuters.com",
    translations: {
      ru: {
        year: "2014-2018",
        name: "Thomson Reuters",
        title: "Аналитик рынков",
        about:
          "Международная медиагруппа, включающая в себя информационное агентство Reuters и IT-платформу Refinitiv Eikon для мониторинга и анализа товарных и финансовых рынков",
        results:
          "Прошёл путь от стажёра до аналитика товарно-сырьевых рынков (нефть и газ, металлургия), написав более тысячи материалов - новостей, разборов и аналитических статей, - которые прочитали более двадцати тысяч человек. Также занимался разработкой информационных продуктов и аналитических дашбордов. Проводил мастер-классы для клиентов.",
      },
      en: {
        year: "2014-2018",
        name: "Thomson Reuters",
        title: "Market Analyst",
        about:
          "An international media group that includes the Reuters news agency and the Refinitiv Eikon IT platform for monitoring and analyzing commodity and financial markets.",
        results:
          "Progressed from intern to commodity markets analyst (oil and gas, metallurgy), authoring over one thousand pieces - including news articles, market overviews, and analytical reports - read by more than twenty thousand people. Also involved in the development of information products and analytical dashboards. Conducted client workshops.",
      },
    },
  },
  MBC: {
    id: "MBC",
    section: "projects",
    logo: resolveImageSrc(mbcLogo),
    url: "https://madburglarcat.ru/",
    linkLabel: "madburglarcat.ru",
    translations: {
      ru: {
        year: "2024-н.в.",
        name: "Mad Burglar Cat",
        title: "Основатель",
        about:
          "Авторский e-commerce-проект по производству и дистрибуции уникальных изделий через онлайн-платформу.",
        results:
          "Запустил проект с нуля и выстроил полный цикл обработки заказов. Формирую видение дальнейшего стратегического развития и вывожу на рынок продукты авторской разработки и изготовления. Координирую работу небольшой команды на аутсорсе, которая помогает с производством контента, разработкой дизайна и обработкой заказов.",
      },
      en: {
        year: "2024-present",
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
    section: "projects",
    logo: resolveImageSrc(mappngoLogo),
    url: "https://www.mappngo.com/",
    linkLabel: "mappngo.com",
    translations: {
      ru: {
        year: "2019-2020",
        name: "MappNgo",
        title: "Основатель",
        about:
          "Приложение для iOS, которое помогало находить интересные городские маршруты для пеших прогулок в формате C2C.",
        results:
          "Был автором проекта: разработал концепцию, сформировал дизайн и организовал разработку. Довёл проект до стадии минимально жизнеспособного продукта (MVP), но из-за пандемии COVID-19 его пришлось закрыть.",
      },
      en: {
        year: "2019-2020",
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
    section: "projects",
    logo: resolveImageSrc(veniviLogo),
    url: "https://venivi.ru/",
    linkLabel: "venivi.ru",
    translations: {
      ru: {
        year: "2013-2014",
        name: "Venivi.ru",
        title: "Сооснователь",
        about:
          "Конкурсная площадка, где рекламодатели проводили конкурсы и розыгрыши для привлечения аудитории.",
        results:
          "Отвечал за разработку продукта и привлечение клиентов. Проект просуществовал чуть меньше года, но за это время на площадке было проведено не менее десятка розыгрышей и локальных киберспортивных турниров, а MAU достигал 7 000 пользователей. Проект закрылся на фоне ужесточения правил проведения конкурсов в социальной сети VK.com, из группы которой поступал основной трафик.",
      },
      en: {
        year: "2013-2014",
        name: "Venivi.ru",
        title: "Co-founder",
        about:
          "A promotional platform where advertisers ran contests and giveaways to attract audiences.",
        results:
          "Was responsible for product development and client acquisition. The project existed for just under a year, during which at least a dozen giveaways and local esports tournaments were held, and MAU reached 7,000 users. The project was closed following stricter contest regulations on the VK.com social network, which was the main traffic source.",
      },
    },
  },
  SKO: {
    id: "SKO",
    section: "activities",
    logo: resolveImageSrc(strokeOffLabel),
    translations: {
      ru: {
        year: "2021-н.в.",
        name: "Продукция Stroke Off",
        title: "Из перцев чили Каролина рипер",
        about:
          "Бренд, под которым я объединяю свою домашнюю продукцию из перцев чили, которую делаю для себя и друзей (на некоммерческой основе).",
        results:
          "В 2020 году я посадил у себя дома несколько различных сортов острого перца чили, включая одного из лидеров по жгучести - Каролину рипер. Перцы успешно выросли и начали плодоносить. По мере созревания урожая я готовлю из них различную острую продукцию под брендом Stroke Off. Особенно удачными получились перцовка и тайский сладкий соус чили.",
      },
      en: {
        year: "2021-present",
        name: "Stroke Off Products",
        title: "Made from Carolina Reaper Chili Peppers",
        about:
          "A personal brand under which I group my homemade chili-based products, made for myself and friends on a non-commercial basis.",
        results:
          "In 2020, I planted several varieties of hot chili peppers at home, including one of the hottest varieties - the Carolina Reaper. The peppers grew successfully and began to bear fruit. As the harvest ripens, I produce various spicy products under the Stroke Off brand. The most successful ones have been chili-infused vodka and Thai sweet chili sauce.",
      },
    },
  },
  SDC: {
    id: "SDC",
    section: "activities",
    logo: resolveImageSrc(svityaComLabel),
    url: "https://github.com/gitsvitya",
    linkLabel: "github.com/gitsvitya",
    translations: {
      ru: {
        year: "2019-н.в.",
        name: "Сайт Svitya.com",
        title: "А также другие разработки",
        about:
          "С 2019 года в качестве хобби разрабатываю веб-решения на React и внедряю автоматизацию в свою рабочую среду с помощью SQL, Python, Power BI и ИИ-решения.",
        results:
          "В 2019-2020 годах прошёл обучение веб-разработке и обработке данных на Python на курсах Мичиганского университета, после чего закрепил знания в Яндекс.Практикуме. В результате на свет появился этот сайт, а также несколько других учебных и авторских проектов, с которыми можно ознакомиться по ссылке на мой GitHub, указанной выше. По мере освоения новых технологий и при наличии свободного времени сайт продолжает обрастать новыми функциями и возможностями.",
      },
      en: {
        year: "2019-present",
        name: "Svitya.com Website",
        title: "And Other Projects",
        about:
          "Since 2019, as a hobby, I have been developing web solutions using React and implementing automation in my work environment with SQL, Python, Power BI, and AI-based solutions.",
        results:
          "In 2019-2020, I completed training in web development and data processing with Python through courses from the University of Michigan, and later reinforced this knowledge at Yandex.Practicum. As a result, this website was created, along with several other educational and personal projects, which can be found via the GitHub link above. As I continue to learn new technologies and when time allows, the site keeps evolving with new features and capabilities.",
      },
    },
  },
};

export function getCompaniesBySection(section: CompanySection): CompanyRecord[] {
  return Object.values(COMPANIES).filter((company) => company.section === section);
}

export function getLocalizedCompany(companyId: CompanyId, language: Language): LocalizedCompany {
  const company = COMPANIES[companyId];
  const translation = company.translations[language];

  if (!translation) {
    throw new Error(`Missing translation for company "${companyId}" and language "${language}"`);
  }

  return {
    id: company.id,
    section: company.section,
    logo: company.logo,
    url: company.url,
    linkLabel: company.linkLabel,
    ...translation,
  };
}
