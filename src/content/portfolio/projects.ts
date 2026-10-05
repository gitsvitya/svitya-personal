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
          "Приложение для iOS, которое помогало находить интересные городские маршруты для пеших прогулок в форматах B2C и C2C.",
        results:
          "Придумал и разработал концепцию проекта, сформировал его стратегию и видение. Организовал команду на аутсорсе для полного цикла разработки и дизайна продукта. Провёл полноценное первичное тестирование на нескольких фокус-группах знакомых. Довёл проект до стадии MVP для iOS, но в 2020 году его пришлось закрыть из-за карантина, введённого во время пандемии COVID-19.",
      },
      en: {
        year: "2019 → 2020",
        name: "MappNgo",
        title: "Founder",
        about:
          "An iOS application that helped users discover interesting urban walking routes in B2C and C2C formats.",
        results:
          "Conceived and developed the project concept, strategy and vision. Assembled an outsourced team to support the full product development and design cycle. Conducted comprehensive initial product testing with several focus groups from my personal network. Brought the iOS project to the MVP stage, but it had to close in 2020 due to lockdown measures introduced during the COVID-19 pandemic.",
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
