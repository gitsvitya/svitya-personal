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
          "Бренд, под которым я объединяю свою домашнюю продукцию из перцев чили, которую делаю для себя и друзей — на некоммерческой основе.",
        results:
          "В 2020 году я посадил у себя дома несколько различных сортов острого перца чили, включая одного из лидеров по жгучести — Каролину рипер. Перцы успешно выросли и начали плодоносить. По мере созревания урожая я готовлю из них различную острую продукцию под брендом Stroke Off.",
        resultsList: {
          intro: "Особенно удачно получились:",
          items: ["Перцовка", "Тайский сладкий чили", "Чили-масло"],
        },
      },
      en: {
        year: "2021 → present",
        name: "Stroke Off",
        title: "Chief chili maker",
        about:
          "A personal brand for my homemade chili-based products, made for myself and friends — on a non-commercial basis.",
        results:
          "In 2020, I planted several varieties of hot chili peppers at home, including one of the hottest varieties — the Carolina Reaper. The peppers grew successfully and began to bear fruit. As the harvest ripens, I produce various spicy products under the Stroke Off brand.",
        resultsList: {
          intro: "The highlights:",
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
        title: "На все руки мастер",
        about:
          "С 2019 года развиваю Svitya.com: делюсь опытом, рассказываю о проектах и увлечениях, пробую новые технологии. Начинал с простой страницы на HTML и CSS, позже добавил JavaScript, затем переписал сайт на React и перешёл на Next.js.",
        results:
          "Сам продумываю, как сайт будет выглядеть и работать, пишу код и готовлю контент на русском и английском. Постепенно делаю его удобнее: улучшаю навигацию, адаптирую страницы под разные устройства и проверяю изменения автоматическими тестами.",
        resultsList: {
          intro: "Как развивался сайт",
          items: [
            "2019: собрал первую версию — одну страницу на HTML и CSS.",
            "2021: добавил JavaScript, чтобы сделать сайт интерактивным.",
            "2023: переписал сайт на React.",
            "2024: добавил карточки и подробные рассказы об опыте, проектах и увлечениях.",
            "2026: перешёл на Next.js и TypeScript, обновил дизайн, добавил отдельные страницы и галереи материалов.",
          ],
        },
      },
      en: {
        year: "2019 → present",
        name: "Svitya.com",
        title: "Jack of all trades",
        about:
          "Since 2019, I’ve been developing Svitya.com to share my experience, projects and interests, and try out new technologies. I started with a simple HTML and CSS page, later added JavaScript, then rebuilt the website with React and moved to Next.js.",
        results:
          "I shape how the website looks and works, write the code and create content in Russian and English. I keep making it easier to explore by improving navigation, adapting pages to different devices and checking changes with automated tests.",
        resultsList: {
          intro: "How the website evolved",
          items: [
            "2019: I built the first version — a single HTML and CSS page.",
            "2021: I added JavaScript to make the website interactive.",
            "2023: I rebuilt the website with React.",
            "2024: I added cards and fuller stories about my experience, projects and interests.",
            "2026: I moved to Next.js and TypeScript, refreshed the design and added dedicated pages and material galleries.",
          ],
        },
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
