import strokeOffLogo from "../../images/portfolio/activities/strokeoff/logo-v2.png";
import svityaComLogo from "../../images/portfolio/activities/svityacom/logo.png";
import strokeOffFirstBatchPreview from "../../images/portfolio/activities/strokeoff/materials/first-batch-preview.png";
import strokeOffLabelPreview from "../../images/portfolio/activities/strokeoff/materials/pepper-vodka-label-preview.png";
import type { CompanyId } from "../../types/domain";
import type { CompanyRecord } from "./types";

export const ACTIVITY_COMPANIES = {
  SKO: {
    id: "SKO",
    slug: "strokeoff",
    section: "activities",
    logo: strokeOffLogo,
    materials: {
      enabled: true,
      items: [
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: strokeOffFirstBatchPreview,
              fullImageSrc: strokeOffFirstBatchPreview,
              fileSrc: "/materials/activities/strokeoff/first-batch.pdf",
            },
            en: {
              previewSrc: strokeOffFirstBatchPreview,
              fullImageSrc: strokeOffFirstBatchPreview,
              fileSrc: "/materials/activities/strokeoff/first-batch.pdf",
            },
          },
          title: {
            ru: "Первая партия перцовки",
            en: "First batch of chili-infused vodka",
          },
          description: {
            ru: "Здесь я позирую на фоне первой полноценной партии перцовки.",
            en: "Here I’m posing with my first full batch of chili-infused vodka.",
          },
        },
        {
          type: "document",
          assets: {
            ru: {
              previewSrc: strokeOffLabelPreview,
              fullImageSrc: strokeOffLabelPreview,
              fileSrc: "/materials/activities/strokeoff/pepper-vodka-label.pdf",
            },
            en: {
              previewSrc: strokeOffLabelPreview,
              fullImageSrc: strokeOffLabelPreview,
              fileSrc: "/materials/activities/strokeoff/pepper-vodka-label.pdf",
            },
          },
          title: {
            ru: "Этикетка перцовки",
            en: "Chili-infused vodka label",
          },
          description: {
            ru: "Этикетка перцовки со всем необходимым: котами и вайбами родины чили.",
            en: "A chili-infused vodka label with all the essentials: cats and vibes from chili’s homeland.",
          },
        },
      ],
    },
    translations: {
      ru: {
        year: "2021 → настоящее время",
        name: "Stroke Off",
        title: "Главный чиливар",
        about:
          "Домашнее хобби: выращивание перцев чили и приготовление острой продукции для себя и друзей на некоммерческой основе.",
        results:
          "В 2020 году посадил дома несколько сортов чили, включая Каролину рипер. Из выращенных перцев готовлю соусы, чили-масло и перцовку; с 2021 года объединяю их под названием Stroke Off.",
        resultsList: {
          intro: "Что готовлю",
          items: ["Перцовка", "Тайский сладкий чили", "Чили-масло"],
        },
      },
      en: {
        year: "2021 → present",
        name: "Stroke Off",
        title: "Chief Chili Maker",
        about:
          "A non-commercial hobby: growing chili peppers and making spicy products for myself and friends.",
        results:
          "Started growing several chili varieties at home in 2020, including Carolina Reaper. Use the harvest to make sauces, chili oil and chili-infused vodka, brought together under the Stroke Off name since 2021.",
        resultsList: {
          intro: "What I make",
          items: ["Chili-infused vodka", "Thai sweet chili sauce", "Chili oil"],
        },
      },
    },
  },
  SDC: {
    id: "SDC",
    slug: "svityacom",
    section: "activities",
    logo: svityaComLogo,
    url: "https://github.com/gitsvitya",
    linkLabel: "github.com/gitsvitya",
    translations: {
      ru: {
        year: "2019 → настоящее время",
        name: "Svitya.com",
        title: "Автор и разработчик сайта",
        about:
          "Личный сайт-портфолио и практический проект по веб-разработке. С 2019 года развиваю его от простой страницы до двуязычного сайта на Next.js.",
        results:
          "Отвечаю за содержание, интерфейс и разработку сайта на русском и английском. Работаю с React, Next.js и TypeScript: развиваю навигацию, адаптирую страницы под разные устройства и проверяю изменения автоматическими тестами.",
        resultsList: {
          intro: "Как развивался сайт",
          items: [
            "2019: первая страница на HTML и CSS.",
            "2021: добавил интерактивность на JavaScript.",
            "2023: переписал сайт на React.",
            "2024: добавил карточки и подробные описания опыта, проектов и увлечений.",
            "2026: перешёл на Next.js и TypeScript, обновил дизайн, добавил отдельные страницы и галереи материалов.",
          ],
        },
      },
      en: {
        year: "2019 → present",
        name: "Svitya.com",
        title: "Website Creator and Developer",
        about:
          "My personal portfolio and a practical web development project. Since 2019, it has evolved from a simple page into a bilingual Next.js website.",
        results:
          "Responsible for content, interface design and development in Russian and English. Work with React, Next.js and TypeScript to improve navigation, adapt pages to different devices and check changes with automated tests.",
        resultsList: {
          intro: "How the website evolved",
          items: [
            "2019: built the first page with HTML and CSS.",
            "2021: added JavaScript interactions.",
            "2023: rebuilt the website with React.",
            "2024: added cards and detailed descriptions of work, projects and interests.",
            "2026: moved to Next.js and TypeScript, refreshed the design and added dedicated pages and material galleries.",
          ],
        },
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
