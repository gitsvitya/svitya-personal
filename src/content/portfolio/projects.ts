import madBurglarCatLogo from "../../images/portfolio/projects/madburglarcat/logo.png";
import madBurglarCatCatalogPreview from "../../images/portfolio/projects/madburglarcat/materials/catalog-preview.png";
import madBurglarCatProductPreview from "../../images/portfolio/projects/madburglarcat/materials/everything-is-fine-preview.png";
import madBurglarCatCheckoutPreview from "../../images/portfolio/projects/madburglarcat/materials/everything-is-fine-checkout-preview.png";
import madBurglarCatSoldoutPreview from "../../images/portfolio/projects/madburglarcat/materials/soldout-preview.png";
import mappngoLogo from "../../images/portfolio/projects/mappngo/logo.png";
import mappngoScreensPreview from "../../images/portfolio/projects/mappngo/materials/final-test-screens-preview.png";
import mappngoScreensEnPreview from "../../images/portfolio/projects/mappngo/materials/final-test-screens-en-preview.png";
import mappngoStickerPreview from "../../images/portfolio/projects/mappngo/materials/souvenir-sticker-preview.png";
import mappngoHomepageRuPreview from "../../images/portfolio/projects/mappngo/materials/homepage-ru-preview.png";
import mappngoHomepageEnPreview from "../../images/portfolio/projects/mappngo/materials/homepage-en-preview.png";
import mappngoFaqRuPreview from "../../images/portfolio/projects/mappngo/materials/faq-ru-preview.png";
import mappngoFaqEnPreview from "../../images/portfolio/projects/mappngo/materials/faq-en-preview.png";
import veniviLogo from "../../images/portfolio/projects/venivi/logo.png";
import veniviHomepagePreview from "../../images/portfolio/projects/venivi/materials/retro-homepage-preview.png";
import veniviContestPreview from "../../images/portfolio/projects/venivi/materials/contest-xbox-one-preview.png";
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
    materials: {
      enabled: true,
      items: [
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: madBurglarCatCatalogPreview,
              fullImageSrc: madBurglarCatCatalogPreview,
              fileSrc: "/materials/projects/madburglarcat/catalog.pdf",
              url: "https://madburglarcat.ru/catalog",
            },
            en: {
              previewSrc: madBurglarCatCatalogPreview,
              fullImageSrc: madBurglarCatCatalogPreview,
              fileSrc: "/materials/projects/madburglarcat/catalog.pdf",
              url: "https://madburglarcat.ru/catalog",
            },
          },
          title: {
            ru: "Каталог Mad Burglar Cat",
            en: "Mad Burglar Cat catalog",
          },
          description: {
            ru: "Каталог Mad Burglar Cat: авторские футболки, патчи и стикерпаки, изготовление по индивидуальному заказу и фотографии покупателей.",
            en: "The Mad Burglar Cat catalog: original T-shirts, patches and sticker packs, custom production and customer photos.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: madBurglarCatProductPreview,
              fullImageSrc: madBurglarCatProductPreview,
              fileSrc: "/materials/projects/madburglarcat/everything-is-fine.pdf",
              url: "https://madburglarcat.ru/tproduct/384035579442-mbc-ts-x-vsyo-horosho",
            },
            en: {
              previewSrc: madBurglarCatProductPreview,
              fullImageSrc: madBurglarCatProductPreview,
              fileSrc: "/materials/projects/madburglarcat/everything-is-fine.pdf",
              url: "https://madburglarcat.ru/tproduct/384035579442-mbc-ts-x-vsyo-horosho",
            },
          },
          title: {
            ru: "MBC TS x Всё Хорошо — карточка товара",
            en: "MBC TS x Everything Is Fine — product page",
          },
          description: {
            ru: "Карточка футболки «MBC TS x Всё Хорошо»: фотографии, цена, выбор размера, характеристики, сроки изготовления и рекомендации по уходу.",
            en: "The MBC TS x Everything Is Fine T-shirt product page: photos, price, size selection, specifications, production time and care instructions.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: madBurglarCatCheckoutPreview,
              fullImageSrc: madBurglarCatCheckoutPreview,
              fileSrc: "/materials/projects/madburglarcat/everything-is-fine-checkout.pdf",
              url: "https://madburglarcat.ru/tproduct/384035579442-mbc-ts-x-vsyo-horosho#order",
            },
            en: {
              previewSrc: madBurglarCatCheckoutPreview,
              fullImageSrc: madBurglarCatCheckoutPreview,
              fileSrc: "/materials/projects/madburglarcat/everything-is-fine-checkout.pdf",
              url: "https://madburglarcat.ru/tproduct/384035579442-mbc-ts-x-vsyo-horosho#order",
            },
          },
          title: {
            ru: "MBC TS x Всё Хорошо — оформление заказа",
            en: "MBC TS x Everything Is Fine — checkout",
          },
          description: {
            ru: "Форма заказа «MBC TS x Всё Хорошо» с доставкой СДЭК в Москву и картой пунктов выдачи. На сайте форма открывается через кнопку «Купить» в карточке товара.",
            en: "The MBC TS x Everything Is Fine checkout form with CDEK delivery to Moscow and a pickup point map. On the website, use the Buy button on the product page to open the form.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: madBurglarCatSoldoutPreview,
              fullImageSrc: madBurglarCatSoldoutPreview,
              fileSrc: "/materials/projects/madburglarcat/soldout.pdf",
              url: "https://madburglarcat.ru/soldout",
            },
            en: {
              previewSrc: madBurglarCatSoldoutPreview,
              fullImageSrc: madBurglarCatSoldoutPreview,
              fileSrc: "/materials/projects/madburglarcat/soldout.pdf",
              url: "https://madburglarcat.ru/soldout",
            },
          },
          title: {
            ru: "Солдаут Mad Burglar Cat",
            en: "Mad Burglar Cat Soldout",
          },
          description: {
            ru: "Раздел «Солдаут» Mad Burglar Cat: полотенца из прошлых коллекций с отметками SOLD и «Нет в наличии».",
            en: "The Mad Burglar Cat Soldout archive: towels from past collections marked SOLD and out of stock.",
          },
        },
      ],
    },
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
    materials: {
      enabled: true,
      items: [
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: mappngoScreensPreview,
              fullImageSrc: mappngoScreensPreview,
              fileSrc: "/materials/projects/mappngo/final-test-screens.pdf",
            },
            en: {
              previewSrc: mappngoScreensEnPreview,
              fullImageSrc: mappngoScreensEnPreview,
              fileSrc: "/materials/projects/mappngo/final-test-screens-en.pdf",
            },
          },
          title: { ru: "Итоговые тестовые экраны MappNgo", en: "MappNgo final test screens" },
          description: {
            ru: "29 тестовых экранов MappNgo на русском языке: регистрация и вход, поиск и создание маршрутов, профиль пользователя, карта прогулки и завершение маршрута.",
            en: "29 MappNgo test screens in English covering sign-up and sign-in, route search and creation, user profiles, walking maps and route completion.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: mappngoStickerPreview,
              fullImageSrc: mappngoStickerPreview,
              fileSrc: "/materials/projects/mappngo/souvenir-sticker.pdf",
            },
            en: {
              previewSrc: mappngoStickerPreview,
              fullImageSrc: mappngoStickerPreview,
              fileSrc: "/materials/projects/mappngo/souvenir-sticker.pdf",
            },
          },
          title: {
            ru: "Шаблон сувенирной наклейки MappNgo",
            en: "MappNgo souvenir sticker template",
          },
          description: {
            ru: "Макет сувенирной наклейки MappNgo с логотипом, стилизованным маршрутом и адресом mappngo.com.",
            en: "A MappNgo souvenir sticker design featuring the logo, a stylized route and mappngo.com.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: mappngoHomepageRuPreview,
              fullImageSrc: mappngoHomepageRuPreview,
              fileSrc: "/materials/projects/mappngo/homepage-ru.pdf",
              url: "https://www.mappngo.com/",
            },
            en: {
              previewSrc: mappngoHomepageEnPreview,
              fullImageSrc: mappngoHomepageEnPreview,
              fileSrc: "/materials/projects/mappngo/homepage-en.pdf",
              url: "https://www.mappngo.com/en/",
            },
          },
          title: { ru: "Главная страница MappNgo", en: "MappNgo homepage" },
          description: {
            ru: "Русская версия главной страницы MappNgo: описание проекта, команда, история закрытия приложения и обзор его функций.",
            en: "The English MappNgo homepage: project overview, team, app closure and features.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: mappngoFaqRuPreview,
              fullImageSrc: mappngoFaqRuPreview,
              fileSrc: "/materials/projects/mappngo/faq-ru.pdf",
              url: "https://www.mappngo.com/faq/",
            },
            en: {
              previewSrc: mappngoFaqEnPreview,
              fullImageSrc: mappngoFaqEnPreview,
              fileSrc: "/materials/projects/mappngo/faq-en.pdf",
              url: "https://www.mappngo.com/en/faq/",
            },
          },
          title: { ru: "FAQ MappNgo", en: "MappNgo FAQ" },
          description: {
            ru: "Русская версия FAQ MappNgo: использование приложения, категории мест, поиск и создание маршрутов, избранное и навигация.",
            en: "The English MappNgo FAQ: using the app, place categories, finding and creating route guides, favorites and navigation.",
          },
        },
      ],
    },
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
    materials: {
      enabled: true,
      items: [
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: veniviHomepagePreview,
              fullImageSrc: veniviHomepagePreview,
              fileSrc: "/materials/projects/venivi/retro-homepage.pdf",
            },
            en: {
              previewSrc: veniviHomepagePreview,
              fullImageSrc: veniviHomepagePreview,
              fileSrc: "/materials/projects/venivi/retro-homepage.pdf",
            },
          },
          title: {
            ru: "Ретро-главная страница Venivi",
            en: "Venivi retro homepage",
          },
          description: {
            ru: "Архивная главная страница Venivi: конкурсы с Xbox One, iPhone 5s и Beats Studio, таймер розыгрыша и вход через социальные сети.",
            en: "The Venivi retro homepage: Xbox One, iPhone 5s and Beats Studio contests, a giveaway countdown and social sign-in.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: veniviContestPreview,
              fullImageSrc: veniviContestPreview,
              fileSrc: "/materials/projects/venivi/contest-xbox-one.pdf",
            },
            en: {
              previewSrc: veniviContestPreview,
              fullImageSrc: veniviContestPreview,
              fileSrc: "/materials/projects/venivi/contest-xbox-one.pdf",
            },
          },
          title: {
            ru: "Venivi — конкурс Xbox One",
            en: "Venivi — Xbox One contest",
          },
          description: {
            ru: "Архивная страница розыгрыша Xbox One: описание приза, условия участия, таймер, пошаговая инструкция и форма комментариев.",
            en: "The Venivi Xbox One contest page: prize details, entry rules, a countdown, participation steps and a comment form.",
          },
        },
      ],
    },
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
          "Was responsible for product development and client acquisition. The project existed for just under a year, during which at least ten giveaways and local esports tournaments were held, and MAU reached 7,000 users. The project was closed following stricter contest regulations on the VK.com social network, which was the main traffic source.",
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
