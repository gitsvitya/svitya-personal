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
            ru: "Я и первая полноценная партия моей перцовки.",
            en: "Me with my first full batch of chili-infused vodka.",
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
            ru: "Коты, чили и яркие узоры — этикетка моей перцовки.",
            en: "Cats, chili peppers and bright patterns on my vodka label.",
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
          "Моё домашнее хобби: выращиваю перцы чили и готовлю из них острое для себя и друзей.",
        results:
          "В 2020 году посадил дома несколько сортов чили, в том числе Carolina Reaper. Из урожая делаю соусы, чили-масло и перцовку. С 2021 года у этого хобби есть имя — Stroke Off.",
        resultsList: {
          intro: "Что готовлю",
          items: ["Перцовка", "Тайский сладкий соус чили", "Чили-масло"],
        },
      },
      en: {
        year: "2021 → present",
        name: "Stroke Off",
        title: "Chief Chili Maker",
        about:
          "My hobby at home: growing chili peppers and making spicy food and drinks for myself and friends.",
        results:
          "In 2020, I started growing several chili varieties at home, including Carolina Reaper. I use the harvest to make sauces, chili oil and chili-infused vodka. Since 2021, this hobby has had a name: Stroke Off.",
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
          "Этот сайт — моё портфолио и практический проект по веб-разработке. С 2019 года он вырос из простой страницы в двуязычный сайт на Next.js.",
        results:
          "Занимаюсь текстами, интерфейсом и разработкой сайта на русском и английском. Использую React, Next.js и TypeScript: улучшаю навигацию, адаптирую страницы под разные устройства и проверяю изменения автоматическими тестами.",
        resultsList: {
          intro: "Как развивался сайт",
          items: [
            "2019: сделал первую страницу на HTML и CSS.",
            "2021: добавил интерактивность с помощью JavaScript.",
            "2023: переписал сайт на React.",
            "2024: добавил карточки и подробные истории о работе, проектах и увлечениях.",
            "2026: перешёл на Next.js и TypeScript, обновил дизайн, добавил отдельные страницы и галереи материалов.",
          ],
        },
      },
      en: {
        year: "2019 → present",
        name: "Svitya.com",
        title: "Website Creator and Developer",
        about:
          "My personal portfolio and web development project. Since 2019, it has grown from a simple page into a bilingual Next.js site.",
        results:
          "I work on the content, interface and development in Russian and English. I use React, Next.js and TypeScript to improve navigation, make pages work across different devices and check changes with automated tests.",
        resultsList: {
          intro: "How the website evolved",
          items: [
            "2019: I built the first page with HTML and CSS.",
            "2021: I added interactive features with JavaScript.",
            "2023: I rebuilt the site with React.",
            "2024: I added cards and detailed stories about my work, projects and interests.",
            "2026: I moved to Next.js and TypeScript, refreshed the design and added dedicated pages and material galleries.",
          ],
        },
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
