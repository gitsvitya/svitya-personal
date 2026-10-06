import madBurglarCatLogo from "../../images/portfolio/projects/madburglarcat/logo.png";
import madBurglarCatCatalogPreview from "../../images/portfolio/projects/madburglarcat/materials/catalog-preview.png";
import madBurglarCatProductPreview from "../../images/portfolio/projects/madburglarcat/materials/everything-is-fine-preview.png";
import madBurglarCatCheckoutPreview from "../../images/portfolio/projects/madburglarcat/materials/everything-is-fine-checkout-preview.png";
import madBurglarCatSoldoutPreview from "../../images/portfolio/projects/madburglarcat/materials/soldout-preview.png";
import madBurglarCatTrademarkPreview from "../../images/portfolio/projects/madburglarcat/materials/trademark-certificate-1222341-preview.png";
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
            ru: "Каталог товаров",
            en: "Product catalog",
          },
          description: {
            ru: "Главная страница сайта, где можно выбрать изделие, перейти по ссылке для индивидуального заказа и ознакомиться с отзывами покупателей.",
            en: "The website’s main page, where visitors can choose a product, follow a link to request a custom order and read customer reviews.",
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
            ru: "Карточка товара",
            en: "Product page",
          },
          description: {
            ru: "Страница с основной информацией об изделии, характеристиками, размерной сеткой, сроками изготовления и рекомендациями по уходу. Можно выбрать размер и перейти к оформлению заказа.",
            en: "A page with key product information, specifications, a size chart, production time and care instructions. Visitors can choose a size and proceed to checkout.",
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
            ru: "Оформление заказа",
            en: "Checkout",
          },
          description: {
            ru: "Форма с параметрами заказа, данными получателя, комментарием и промокодом. Стоимость доставки автоматически рассчитывалась по тарифам СДЭК с учётом способа доставки, количества изделий и выбранного пункта выдачи или адреса. Для оплаты картой и через СБП использовался сервис ЮКасса.",
            en: "A form with order options, recipient details, a comment field and a promo code. Delivery costs were calculated automatically using CDEK tariffs, based on the delivery method, item quantity and selected pickup point or address. Card and SBP payments were processed through YooKassa.",
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
            ru: "Солдаут",
            en: "Soldout",
          },
          description: {
            ru: "Архивная страница, куда переносятся модели прошлых выпусков. Изделия представлены с пометкой SOLD и больше недоступны для заказа.",
            en: "An archive page for designs from previous releases. The items are marked SOLD and are no longer available to order.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: madBurglarCatTrademarkPreview,
              fullImageSrc: madBurglarCatTrademarkPreview,
              fileSrc: "/materials/projects/madburglarcat/trademark-certificate-1222341.pdf",
            },
            en: {
              previewSrc: madBurglarCatTrademarkPreview,
              fullImageSrc: madBurglarCatTrademarkPreview,
              fileSrc: "/materials/projects/madburglarcat/trademark-certificate-1222341.pdf",
            },
          },
          title: {
            ru: "Свидетельство на товарный знак",
            en: "Trademark certificate",
          },
          description: {
            ru: "Свидетельство Роспатента, подтверждающее регистрацию товарного знака Mad Burglar Cat.",
            en: "A Rospatent certificate confirming registration of the Mad Burglar Cat trademark. Original document in Russian.",
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
          "Авторский проект одежды и текстиля для дома с интернет-магазином. Трансформировался из формата с полноценной командой в небольшое хобби-производство.",
        results:
          "За время проекта вывел на рынок 10+ товарных позиций и обеспечил полный цикл обработки 100+ заказов. Проект трансформировался из формата с полноценной командой в небольшое хобби-производство.",
      },
      en: {
        year: "2024 → present",
        name: "Mad Burglar Cat",
        title: "Founder",
        about:
          "A personal apparel and home textiles project with an online store. Previously run with a full team, it has since transformed into small-scale hobby production.",
        results:
          "Brought 10+ products to market and managed the full processing cycle for 100+ orders over the course of the project. Previously run with a full team, the project has since transformed into small-scale hobby production.",
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
          title: { ru: "Тестовые экраны", en: "Test screens" },
          description: {
            ru: "Полный набор тестовых экранов MappNgo: регистрация и вход, поиск и создание маршрутов, профиль пользователя, карта прогулки и завершение маршрута.",
            en: "A complete set of MappNgo test screens covering sign-up and sign-in, route search and creation, user profiles, walking maps and route completion.",
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
            ru: "Шаблон наклеек",
            en: "Sticker template",
          },
          description: {
            ru: "Шаблон сувенирных наклеек, которые раздавались первым пользователям в благодарность за участие в тестировании.",
            en: "A template for souvenir stickers handed out to early users to thank them for taking part in testing.",
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
          title: { ru: "Архивная главная страница", en: "Archived website homepage" },
          description: {
            ru: "Архивная промостраница тестового MVP. Описание приложения и его функций отражает концепцию проекта до закрытия в 2020 году.",
            en: "An archived promotional page for the tested MVP, showing the app concept and features before the project closed in 2020.",
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
          title: { ru: "Архивный FAQ сайта", en: "Archived website FAQ" },
          description: {
            ru: "Архивный FAQ, подготовленный для проекта. Упоминания запуска и App Store в архивных материалах относятся к планам: приложение осталось на стадии тестирования MVP.",
            en: "An archived FAQ prepared for the project. References to launch and the App Store in archived materials describe plans; the app remained a tested MVP.",
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
          "Проект iOS-приложения для поиска, создания и обмена городскими пешими маршрутами. Доведён до тестового MVP.",
        results:
          "Разработан и протестирован MVP для iOS. До публичного запуска проект не дошёл: в 2020 году его закрыли на фоне ограничений во время пандемии COVID-19. Ниже представлены тестовые экраны и архивные материалы проекта.",
      },
      en: {
        year: "2019 → 2020",
        name: "MappNgo",
        title: "Founder",
        about:
          "An iOS app project for finding, creating and sharing urban walking routes, developed to a tested MVP.",
        results:
          "Developed and tested an iOS MVP. The project closed in 2020 amid COVID-19 restrictions before a public launch. Test screens and archived project materials are available below.",
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
            ru: "Главная страница сайта",
            en: "Website homepage",
          },
          description: {
            ru: "Главная страница сайта, на которой одновременно могли проходить несколько конкурсов с разным приоритетом. Площадка также предусматривала личный кабинет и внутреннюю валюту.",
            en: "The website homepage, where multiple contests could run simultaneously with different priorities. The platform also offered user accounts and an internal currency.",
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
            ru: "Страница конкурса",
            en: "Contest page",
          },
          description: {
            ru: "Страница с подробной инструкцией по участию, количеством участников, таймером до завершения конкурса и возможностью оставлять комментарии.",
            en: "A page with detailed entry instructions, a participant count, a countdown to the end of the contest and the option to leave comments.",
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
          "Площадка, на которой рекламодатели привлекали аудиторию через конкурсы, розыгрыши и киберспортивные турниры.",
        results:
          "За неполный год площадка привлекла 30+ B2B-клиентов. Проведено 10+ мероприятий, включая 3 киберспортивных турнира с 300+ участниками. Аудитория достигала около 1 000 DAU и 7 000 MAU; удержание на 30-й день составляло 16%. В 2014 году проект закрыли после ужесточения правил проведения конкурсов в VK.com, откуда поступал основной трафик.",
      },
      en: {
        year: "2013 → 2014",
        name: "Venivi",
        title: "Co-founder",
        about:
          "A platform where advertisers attracted audiences through contests, giveaways and esports tournaments.",
        results:
          "Attracted 30+ B2B clients in under a year. Hosted 10+ events, including 3 esports tournaments with 300+ participants. The audience reached approximately 1,000 daily and 7,000 monthly active users, with 16% day-30 retention. The project closed in 2014 after VK.com tightened contest rules, affecting its main source of traffic.",
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
