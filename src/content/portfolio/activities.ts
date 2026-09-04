import strokeOffLogo from "../../images/portfolio/activities/strokeoff/logo.png";
import svityaComLogo from "../../images/portfolio/activities/svityacom/logo.png";
import strokeOffFirstBatchPreview from "../../images/portfolio/activities/strokeoff/materials/first-batch-preview.png";
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
          type: "image",
          previewSrc: strokeOffFirstBatchPreview,
          fullImageSrc: "/materials/activities/strokeoff/first-batch.png",
          title: {
            ru: "Первая партия перцовки Stroke Off",
            en: "The first batch of Stroke Off pepper vodka",
          },
          description: {
            ru: "Фотография первой партии перцовки, приготовленной из перцев чили под брендом Stroke Off.",
            en: "A photo of the first batch of chili-infused vodka made under the Stroke Off brand.",
          },
        },
      ],
    },
    translations: {
      ru: {
        year: "2021 → настоящее время",
        name: "Продукция Stroke Off",
        title: "Из перцев чили Каролина рипер",
        about:
          "Бренд, под которым я объединяю свою домашнюю продукцию из перцев чили, которую делаю для себя и друзей (на некоммерческой основе).",
        results:
          "В 2020 году я посадил у себя дома несколько различных сортов острого перца чили, включая одного из лидеров по жгучести - Каролину рипер. Перцы успешно выросли и начали плодоносить. По мере созревания урожая я готовлю из них различную острую продукцию под брендом Stroke Off. Особенно удачными получились перцовка и тайский сладкий соус чили.",
      },
      en: {
        year: "2021 → present",
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
    slug: "svityacom",
    section: "activities",
    logo: svityaComLogo,
    url: "https://github.com/gitsvitya",
    linkLabel: "github.com/gitsvitya",
    translations: {
      ru: {
        year: "2019 → настоящее время",
        name: "Сайт Svitya.com",
        title: "А также другие разработки",
        about:
          "С 2019 года в качестве хобби разрабатываю веб-решения на React и внедряю автоматизацию в свою рабочую среду с помощью SQL, Python, Power BI и ИИ-решений.",
        results:
          "В 2019-2020 годах прошёл обучение веб-разработке и обработке данных на Python на курсах Мичиганского университета, после чего закрепил знания в Яндекс.Практикуме. В результате на свет появился этот сайт, а также несколько других учебных и авторских проектов, с которыми можно ознакомиться по ссылке на мой GitHub, указанной выше. По мере освоения новых технологий и при наличии свободного времени сайт продолжает обрастать новыми функциями и возможностями.",
      },
      en: {
        year: "2019 → present",
        name: "Svitya.com Website",
        title: "And Other Projects",
        about:
          "Since 2019, as a hobby, I have been developing web solutions using React and implementing automation in my work environment with SQL, Python, Power BI, and AI-based solutions.",
        results:
          "In 2019-2020, I completed training in web development and data processing with Python through courses from the University of Michigan, and later reinforced this knowledge at Yandex.Practicum. As a result, this website was created, along with several other educational and personal projects, which can be found via the GitHub link above. As I continue to learn new technologies and when time allows, the site keeps evolving with new features and capabilities.",
      },
    },
  },
} satisfies Partial<Record<CompanyId, CompanyRecord>>;
