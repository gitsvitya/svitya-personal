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
            },
            en: {
              previewSrc: madBurglarCatCatalogPreview,
              fullImageSrc: madBurglarCatCatalogPreview,
              fileSrc: "/materials/projects/madburglarcat/catalog.pdf",
            },
          },
          title: {
            ru: "Каталог товаров",
            en: "Product catalog",
          },
          description: {
            ru: "Каталог изделий, ссылка для индивидуального заказа и отзывы покупателей.",
            en: "A product catalog, a link for custom orders and customer reviews. PDF in Russian.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: madBurglarCatProductPreview,
              fullImageSrc: madBurglarCatProductPreview,
              fileSrc: "/materials/projects/madburglarcat/everything-is-fine.pdf",
            },
            en: {
              previewSrc: madBurglarCatProductPreview,
              fullImageSrc: madBurglarCatProductPreview,
              fileSrc: "/materials/projects/madburglarcat/everything-is-fine.pdf",
            },
          },
          title: {
            ru: "Карточка товара",
            en: "Product page",
          },
          description: {
            ru: "Страница изделия с описанием, размерной сеткой, сроком изготовления и рекомендациями по уходу. Здесь можно выбрать размер и перейти к заказу.",
            en: "A product page with a description, size chart, production time and care instructions, plus size selection and a link to checkout. PDF in Russian.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: madBurglarCatCheckoutPreview,
              fullImageSrc: madBurglarCatCheckoutPreview,
              fileSrc: "/materials/projects/madburglarcat/everything-is-fine-checkout.pdf",
            },
            en: {
              previewSrc: madBurglarCatCheckoutPreview,
              fullImageSrc: madBurglarCatCheckoutPreview,
              fileSrc: "/materials/projects/madburglarcat/everything-is-fine-checkout.pdf",
            },
          },
          title: {
            ru: "Оформление заказа",
            en: "Checkout",
          },
          description: {
            ru: "Пример оформления заказа: параметры изделия, данные получателя, комментарий и промокод. Доставка рассчитывалась по тарифам СДЭК с учётом способа доставки, количества изделий и адреса или пункта выдачи. Оплата картой и через Систему быстрых платежей (СБП) проходила через ЮКассу.",
            en: "A checkout example with product options, recipient details, a comment field and a promo code. Delivery costs were calculated using CDEK rates, based on the delivery method, number of items and address or pickup point. YooKassa handled card payments and payments through Russia’s Faster Payments System (SBP). PDF in Russian.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: madBurglarCatSoldoutPreview,
              fullImageSrc: madBurglarCatSoldoutPreview,
              fileSrc: "/materials/projects/madburglarcat/soldout.pdf",
            },
            en: {
              previewSrc: madBurglarCatSoldoutPreview,
              fullImageSrc: madBurglarCatSoldoutPreview,
              fileSrc: "/materials/projects/madburglarcat/soldout.pdf",
            },
          },
          title: {
            ru: "Прошлые выпуски",
            en: "Past releases",
          },
          description: {
            ru: "Архив моделей прошлых выпусков. Изделия с пометкой SOLD больше недоступны для заказа.",
            en: "An archive of designs from past releases. Items marked SOLD are no longer available to order. PDF in Russian.",
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
            ru: "Свидетельство Роспатента о регистрации товарного знака Mad Burglar Cat.",
            en: "The Rospatent certificate for the Mad Burglar Cat trademark registration. PDF in Russian.",
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
          "Мой проект одежды и текстиля для дома с интернет-магазином. Сначала над ним работала полноценная команда, а сейчас это небольшое хобби-производство.",
        results:
          "За время проекта запустил 10+ товарных позиций и организовал обработку 100+ заказов — от оформления до отправки покупателям.",
      },
      en: {
        year: "2024 → present",
        name: "Mad Burglar Cat",
        title: "Founder",
        about:
          "My clothing and home textiles project, with an online store. We initially worked with a full team. The project now continues on a small scale as a hobby.",
        results:
          "Over the course of the project, I launched 10+ products and organized the processing of 100+ orders, from checkout to dispatch.",
      },
    },
  },
  MNG: {
    id: "MNG",
    slug: "mappngo",
    section: "projects",
    logo: mappngoLogo,
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
            ru: "Экраны MappNgo: от регистрации и поиска маршрута до создания собственной прогулки и её завершения.",
            en: "MappNgo screens, from signing up and finding a route to creating a walk and completing it.",
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
            ru: "Сувенирные наклейки для знакомых, которые участвовали в тестировании MVP.",
            en: "Souvenir stickers for people I knew who took part in MVP testing.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: mappngoHomepageRuPreview,
              fullImageSrc: mappngoHomepageRuPreview,
              fileSrc: "/materials/projects/mappngo/homepage-ru.pdf",
            },
            en: {
              previewSrc: mappngoHomepageEnPreview,
              fullImageSrc: mappngoHomepageEnPreview,
              fileSrc: "/materials/projects/mappngo/homepage-en.pdf",
            },
          },
          title: { ru: "Архивная главная страница", en: "Archived website homepage" },
          description: {
            ru: "Архивная страница с описанием идеи и функций MappNgo. В ней есть формулировка о доступности приложения в App Store, которая расходится с фактической историей проекта: MVP тестировали среди знакомых, публичного запуска не было.",
            en: "An archived page describing the MappNgo concept and features. Its wording about App Store availability differs from the project’s actual history: the MVP was tested with people we knew and never launched publicly.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: mappngoFaqRuPreview,
              fullImageSrc: mappngoFaqRuPreview,
              fileSrc: "/materials/projects/mappngo/faq-ru.pdf",
            },
            en: {
              previewSrc: mappngoFaqEnPreview,
              fullImageSrc: mappngoFaqEnPreview,
              fileSrc: "/materials/projects/mappngo/faq-en.pdf",
            },
          },
          title: { ru: "Архивные вопросы и ответы", en: "Archived questions and answers" },
          description: {
            ru: "Архивные вопросы и ответы о MappNgo. Приложение планировалось выпустить только в App Store, но до публичного запуска проект не дошёл.",
            en: "Archived questions and answers about MappNgo. The app was planned for release exclusively on the App Store, but the project closed before a public launch.",
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
          "Проект приложения для iOS, в котором можно находить городские маршруты для прогулок, создавать свои и делиться ими.",
        results:
          "Команда разработала MVP для iOS, и мы протестировали его среди знакомых. До публичного запуска проект не дошёл: в 2020 году он закрылся на фоне ограничений COVID-19. Ниже — тестовые экраны и архивные материалы.",
      },
      en: {
        year: "2019 → 2020",
        name: "MappNgo",
        title: "Founder",
        about:
          "An iOS app project for discovering city walks, creating routes and sharing them with others.",
        results:
          "The team developed an iOS MVP, which we tested with people we knew. The project closed in 2020 amid COVID-19 restrictions, before a public launch. Test screens and archived materials are below.",
      },
    },
  },
  VNV: {
    id: "VNV",
    slug: "venivi",
    section: "projects",
    logo: veniviLogo,
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
            ru: "Архивный экран главной страницы с несколькими конкурсами. Здесь также видны вход в личный кабинет и баланс внутренних монет.",
            en: "An archived homepage showing several contests, account sign-in and an internal coin balance. PDF in Russian.",
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
            ru: "Архивный экран конкурса: правила участия, число участников, время до завершения и комментарии.",
            en: "An archived contest page with entry instructions, a participant count, a countdown and comments. PDF in Russian.",
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
          "Площадка, где рекламодатели привлекали аудиторию с помощью конкурсов, розыгрышей и киберспортивных турниров.",
        results:
          "За неполный год площадка привлекла 30+ B2B-клиентов. Мы провели 10+ мероприятий, включая 3 киберспортивных турнира, на которых суммарно было 300+ участников. Число активных пользователей достигало примерно 1 000 в день и 7 000 в месяц; удержание на 30-й день составляло 16%. В 2014 году проект закрылся после ужесточения правил конкурсов в VK.com, откуда приходил основной трафик.",
      },
      en: {
        year: "2013 → 2014",
        name: "Venivi",
        title: "Co-founder",
        about:
          "A platform where advertisers reached new audiences through contests, giveaways and esports tournaments.",
        results:
          "In under a year, the platform attracted 30+ B2B clients. We ran 10+ events, including 3 esports tournaments with 300+ participants combined. The audience reached around 1,000 daily and 7,000 monthly active users, with 16% day-30 retention. The project closed in 2014 after VK.com tightened contest rules, affecting our main source of traffic.",
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
