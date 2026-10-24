import { l, type L } from "./i18n";
import { doctorRows } from "./doctors-data";
import blogHeart from "@/assets/blog-heart.jpg";
import blogCheckup from "@/assets/blog-checkup.jpg";
import blogKids from "@/assets/blog-kids.jpg";
import blogBack from "@/assets/blog-back.jpg";
import hero from "@/assets/hero.jpg";
import b1 from "@/assets/banner-1.jpg";
import b2 from "@/assets/banner-2.jpg";
import b3 from "@/assets/banner-3.jpg";
import b4 from "@/assets/banner-4.jpg";
import b5 from "@/assets/banner-5.jpg";

const S = "https://netto-api.akfamedline.com/storage/public/";
export const img = (id: string) => `${S}${id}?preview=1`;
const site = (p: string, w = 1920) => `https://akfamedline.uz/_next/image?url=${encodeURIComponent(p)}&w=${w}&q=75`;
export const LOGO = site("/branding/main_logo.png", 384);
export const BODY = site("/img/3d_anatomy_body.png", 1080);
export const HERO_IMG = site("/img/home-hero-bg.jpg");
export const TOURISM_IMG = site("/img/turizm.jpg");
export const ROBOT_IMG = site("/img/robo-xirurgiya.png", 828);
export const PHONE = "+998 (77) 353-87-00";
export const PHONE_TEL = "tel:+998773538700";
export const SHORT = "1141";
export const EMAIL = "info@akfamedline.uz";
export const ADDRESS = l("Toshkent sh., Olmazor tumani, Kichik Halqa yo'li ko'chasi, 5A-uy", "г. Ташкент, Алмазарский район, ул. Кичик Халка йули, 5А");
export const HOURS: L[] = [
  l("Dushanba – Juma: 08:30 – 17:00", "Понедельник – Пятница: 08:30 – 17:00"),
  l("Shanba: 09:00 – 14:00", "Суббота: 09:00 – 14:00"),
  l("Yakshanba: dam olish kuni", "Воскресенье: выходной"),
  l("Statsionar va qabul bo'limi: 24/7", "Стационар и приёмное отделение: 24/7"),
];
export const SOCIAL = {
  instagram: "https://www.instagram.com/akfamedline/",
  facebook: "https://www.facebook.com/akfamedline",
  youtube: "https://www.youtube.com/channel/UCsblCU7BHHNuLWDXmBG1F0A",
};
export const heroImage = hero;

export function slugify(s: string) {
  return s.toLowerCase().replace(/[‘’'`«»]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* ---------------- Services ---------------- */
export type Service = { slug: string; title: L; short: L; text: L[]; features: L[]; prices: [L, string][]; icon?: string };
export const services: Service[] = [
  {
    slug: "shifokor-korigi", title: l("Shifokor ko'rigi", "Консультация врачей"), short: l("150+ mutaxassis qabuli", "Приём 150+ специалистов"),
    text: [
      l("Klinikamizda 50 dan ortiq yo'nalish bo'yicha tajribali shifokorlar qabul qiladi. Birlamchi va takroriy konsultatsiyalar, ikkinchi fikr olish va professor konsultatsiyasi imkoniyati mavjud.", "В клинике ведут приём опытные врачи более чем по 50 направлениям. Доступны первичные и повторные консультации, второе мнение и консультации профессоров."),
      l("Qabul davomida shifokor shikoyatlaringizni tinglaydi, ko'rik o'tkazadi va zarur bo'lsa, shu kunning o'zida tahlil va diagnostikaga yo'llanma beradi.", "На приёме врач выслушает жалобы, проведёт осмотр и при необходимости в тот же день направит на анализы и диагностику."),
    ],
    features: [l("50+ yo'nalish", "50+ направлений"), l("Professor konsultatsiyasi", "Консультации профессоров"), l("Onlayn konsultatsiya", "Онлайн-консультации"), l("Bir kunda tashxis", "Диагноз за один день")],
    prices: [[l("Terapevt konsultatsiyasi", "Консультация терапевта"), "290 000"], [l("Kardiolog konsultatsiyasi", "Консультация кардиолога"), "310 000"], [l("Nevrolog konsultatsiyasi", "Консультация невролога"), "310 000"], [l("Bo'lim mudiri konsultatsiyasi", "Консультация заведующего отделением"), "360 000"]],
    icon: "a6ea29d0-a7f4-432a-a52d-37185a841311.png",
  },
  {
    slug: "diagnostika", title: l("Diagnostika", "Диагностика"), short: l("Aniq natijalar", "Точные результаты"),
    text: [
      l("SIEMENS ekspert darajasidagi uskunalari: MRT 1.5T, MSKT, UZI, rentgen, mammografiya, EKG, ExoKG, Holter monitoring va endoskopiya.", "Оборудование экспертного класса SIEMENS: МРТ 1.5Т, МСКТ, УЗИ, рентген, маммография, ЭКГ, ЭхоКГ, холтер-мониторинг и эндоскопия."),
      l("Natijalar tajribali radiologlar tomonidan tahlil qilinadi va shu kunning o'zida beriladi. Kechki vaqtda (17:00–23:00) MRT va MSKT tekshiruvlari ham mavjud.", "Результаты анализируют опытные радиологи и выдают в тот же день. МРТ и МСКТ доступны и вечером (17:00–23:00)."),
    ],
    features: [l("MRT 1.5 Tesla", "МРТ 1.5 Тесла"), l("MSKT", "МСКТ"), l("Ekspert UZI", "УЗИ экспертного класса"), l("Endoskopiya", "Эндоскопия")],
    prices: [[l("MRT (bitta soha)", "МРТ (одна область)"), "900 000"], [l("MSKT (bitta soha)", "МСКТ (одна область)"), "750 000"], [l("UZI qorin bo'shlig'i", "УЗИ брюшной полости"), "250 000"], [l("EKG", "ЭКГ"), "80 000"], [l("ExoKG", "ЭхоКГ"), "320 000"]],
    icon: "13c3af33-1d52-43bc-8133-2b581fa9936e.png",
  },
  {
    slug: "laboratoriya", title: l("Laboratoriya", "Лаборатория"), short: l("Roche va Sysmex", "Roche и Sysmex"),
    text: [
      l("To'liq avtomatlashtirilgan laboratoriya: 1000 dan ortiq tahlil turi. Roche, Sysmex va Beckman Coulter analizatorlari xalqaro sifat nazorati bilan ishlaydi.", "Полностью автоматизированная лаборатория: более 1000 видов анализов. Анализаторы Roche, Sysmex и Beckman Coulter работают с международным контролем качества."),
      l("Natijalar 24/7 tayyorlanadi va telefoningizga yuboriladi. Qon olish punkti har kuni ishlaydi.", "Результаты готовятся 24/7 и отправляются на ваш телефон. Пункт забора крови работает ежедневно."),
    ],
    features: [l("1000+ tahlil", "1000+ анализов"), l("Natijalar 24/7", "Результаты 24/7"), l("Xalqaro sifat nazorati", "Международный контроль качества"), l("Uyda qon olish", "Забор крови на дому")],
    prices: [[l("Umumiy qon tahlili", "Общий анализ крови"), "60 000"], [l("Biokimyo (asosiy panel)", "Биохимия (основная панель)"), "220 000"], [l("Gormonlar paneli", "Гормональная панель"), "350 000"], [l("Vitamin D", "Витамин D"), "180 000"]],
  },
  {
    slug: "fizioterapiya", title: l("Fizioterapiya", "Физиотерапия"), short: l("Zamonaviy usullar", "Современные методы"),
    text: [
      l("Operatsiyadan keyingi reabilitatsiya, LFK, massaj, elektroterapiya, lazer va zarba-to'lqin terapiyasi. Har bir bemor uchun individual dastur tuziladi.", "Реабилитация после операций, ЛФК, массаж, электротерапия, лазерная и ударно-волновая терапия. Для каждого пациента составляется индивидуальная программа."),
    ],
    features: [l("Reabilitatsiya", "Реабилитация"), l("LFK", "ЛФК"), l("Zarba-to'lqin terapiyasi", "Ударно-волновая терапия"), l("Massaj", "Массаж")],
    prices: [[l("Fizioterapevt konsultatsiyasi", "Консультация физиотерапевта"), "290 000"], [l("Massaj seansi", "Сеанс массажа"), "150 000"], [l("LFK mashg'uloti", "Занятие ЛФК"), "120 000"], [l("Zarba-to'lqin terapiyasi", "Ударно-волновая терапия"), "300 000"]],
    icon: "bb3d8b97-4184-4b04-9e25-21cd98a8933e.png",
  },
  {
    slug: "statsionar", title: l("Statsionar davolanish", "Стационарное лечение"), short: l("Kecha-yu kunduz parvarish", "Круглосуточный уход"),
    text: [
      l("Bir va ikki o'rinli qulay palatalar, 24/7 hamshiralik parvarishi, shifokor nazorati va parhez ovqatlanish. Lyuks palatalarda hamroh uchun joy mavjud.", "Комфортные одно- и двухместные палаты, круглосуточный сестринский уход, наблюдение врача и диетическое питание. В палатах люкс есть место для сопровождающего."),
    ],
    features: [l("24/7 parvarish", "Уход 24/7"), l("Lyuks palatalar", "Палаты люкс"), l("Parhez ovqatlanish", "Диетическое питание"), l("Reanimatsiya", "Реанимация")],
    prices: [[l("Standart palata (1 kun)", "Стандартная палата (1 сутки)"), "900 000"], [l("Lyuks palata (1 kun)", "Палата люкс (1 сутки)"), "1 800 000"]],
    icon: "e958ee41-b998-4c28-b44f-9535a841db81.png",
  },
  {
    slug: "stomatologiya", title: l("Stomatologiya", "Стоматология"), short: l("Eng so'nggi texnologiyalar", "Новейшие технологии"),
    text: [l("Davolash, implantatsiya, protezlash, ortodontiya, gigiyena va estetik stomatologiya. Raqamli rentgen va mikroskop ostida davolash.", "Лечение, имплантация, протезирование, ортодонтия, гигиена и эстетическая стоматология. Цифровой рентген и лечение под микроскопом.")],
    features: [l("Implantatsiya", "Имплантация"), l("Ortodontiya", "Ортодонтия"), l("Bolalar stomatologiyasi", "Детская стоматология"), l("Oqartirish", "Отбеливание")],
    prices: [[l("Stomatolog ko'rigi", "Осмотр стоматолога"), "150 000"], [l("Plomba", "Пломба"), "400 000"], [l("Professional gigiyena", "Профессиональная гигиена"), "450 000"], [l("Implant", "Имплант"), "6 500 000"]],
    icon: "9c913b06-fe78-4fc0-a309-4fcd0f093b88.png",
  },
  {
    slug: "kosmetologiya-spa", title: l("Kosmetologiya va SPA", "Косметология и СПА"), short: l("Go'zallik va salomatlik", "Красота и здоровье"),
    text: [l("Dermatokosmetologik muolajalar, trixologiya, inyeksion kosmetologiya va SPA dasturlari tibbiy nazorat ostida.", "Дерматокосметологические процедуры, трихология, инъекционная косметология и СПА-программы под медицинским контролем.")],
    features: [l("Trixologiya", "Трихология"), l("Yuz parvarishi", "Уход за лицом"), l("Inyeksiyalar", "Инъекции"), l("SPA", "СПА")],
    prices: [[l("Dermatokosmetolog konsultatsiyasi", "Консультация дерматокосметолога"), "250 000"], [l("Yuz tozalash", "Чистка лица"), "450 000"]],
  },
  {
    slug: "operatsiyalar", title: l("Operatsiyalar", "Операции"), short: l("Robot-assistentli jarrohlik", "Робот-ассистированная хирургия"),
    text: [l("Umumiy, qon tomir, kardio, neyro, urologik va onkologik jarrohlik. 16 000 dan ortiq muvaffaqiyatli operatsiya, laparoskopik va robot-assistentli usullar.", "Общая, сосудистая, кардио-, нейро-, урологическая и онкологическая хирургия. Более 16 000 успешных операций, лапароскопические и робот-ассистированные методы.")],
    features: [l("Laparoskopiya", "Лапароскопия"), l("Robot-jarrohlik", "Робот-хирургия"), l("Kardiojarrohlik", "Кардиохирургия"), l("Neyrojarrohlik", "Нейрохирургия")],
    prices: [[l("Laparoskopik xolesistektomiya", "Лапароскопическая холецистэктомия"), "12 000 000"], [l("Koronar stentlash", "Коронарное стентирование"), "25 000 000"]],
  },
  {
    slug: "restoran", title: l("Restoran", "Ресторан"), short: l("Sog'lom ovqatlanish", "Здоровое питание"),
    text: [l("Bemorlar, ularning yaqinlari va mehmonlar uchun parhez va sog'lom taomlar restorani. Menyu dietologlar bilan birga tuzilgan.", "Ресторан диетического и здорового питания для пациентов, их близких и гостей. Меню составлено вместе с диетологами.")],
    features: [l("Parhez menyu", "Диетическое меню"), l("Palataga yetkazish", "Доставка в палату")], prices: [],
  },
  {
    slug: "konferens-zal", title: l("Konferens-zal", "Конференц-зал"), short: l("Tadbirlar uchun", "Для мероприятий"),
    text: [l("Tibbiy konferensiyalar, seminarlar va master-klasslar uchun 150 o'rinli zamonaviy zal: proyektor, ovoz tizimi va jonli efir imkoniyati.", "Современный зал на 150 мест для медицинских конференций, семинаров и мастер-классов: проектор, звук и возможность онлайн-трансляции.")],
    features: [l("150 o'rin", "150 мест"), l("Jonli efir", "Трансляции")], prices: [],
  },
];

/* ---------------- Departments ---------------- */
export type Dept = { slug: string; title: L; short: L; text: L; offers: L[] };
const D = (slug: string, title: L, short: L, text: L, offers: L[]): Dept => ({ slug, title, short, text, offers });
export const departments: Dept[] = [
  D("obshaya-hirurgiya-i-proktologiya", l("Umumiy jarrohlik va proktologiya", "Общая хирургия и проктология"), l("Jarrohlik operatsiyalari va davolash", "Хирургические операции и лечение"),
    l("Qorin bo'shlig'i a'zolari, churra, o't pufagi va to'g'ri ichak kasalliklarini laparoskopik va ochiq usulda davolash.", "Лечение заболеваний органов брюшной полости, грыж, желчного пузыря и прямой кишки лапароскопическим и открытым методом."),
    [l("Laparoskopik xolesistektomiya", "Лапароскопическая холецистэктомия"), l("Churra plastikasi", "Пластика грыж"), l("Gemorroyni davolash", "Лечение геморроя"), l("Appendektomiya", "Аппендэктомия")]),
  D("reanimaciya", l("Reanimatsiya", "Реанимация"), l("Kritik holatlar intensiv terapiyasi", "Интенсивная терапия критических состояний"),
    l("24/7 ishlaydigan intensiv terapiya bo'limi: zamonaviy monitorlar, sun'iy nafas apparatlari va tajribali reanimatologlar.", "Отделение интенсивной терапии 24/7: современные мониторы, аппараты ИВЛ и опытные реаниматологи."),
    [l("Intensiv terapiya", "Интенсивная терапия"), l("Operatsiyadan keyingi nazorat", "Послеоперационное наблюдение"), l("Sun'iy nafas", "ИВЛ")]),
  D("sosudistaya-hirurgiya", l("Qon tomir jarrohligi", "Сосудистая хирургия"), l("Qon tomir kasalliklarini davolash", "Лечение сосудистых заболеваний"),
    l("Varikoz, arteriyalar torayishi, aorta anevrizmasi va tromboz kasalliklarini zamonaviy kam invaziv usullarda davolash.", "Лечение варикоза, сужения артерий, аневризмы аорты и тромбозов современными малоинвазивными методами."),
    [l("Varikozni lazer bilan davolash", "Лазерное лечение варикоза"), l("Arteriyalarni stentlash", "Стентирование артерий"), l("Doppler UZI", "Допплер УЗИ")]),
  D("detskaya-kardiohirurgiya", l("Bolalar kardioxirurgiyasi", "Детская кардиохирургия"), l("Bolalar yuragiga operatsiyalar", "Операции на сердце у детей"),
    l("Tug'ma yurak nuqsonlarini yangi tug'ilgan chaqaloqlardan boshlab jarrohlik yo'li bilan davolash. «Sen Yashaysan» xayriya dasturi ishtirokchisi.", "Хирургическое лечение врождённых пороков сердца начиная с новорождённых. Участник благотворительной программы «Sen Yashaysan»."),
    [l("Tug'ma nuqsonlar operatsiyasi", "Операции при врождённых пороках"), l("Bolalar ExoKG", "Детская ЭхоКГ"), l("Reabilitatsiya", "Реабилитация")]),
  D("nevrologiya", l("Nevrologiya", "Неврология"), l("Asab tizimi diagnostikasi va davolash", "Диагностика и лечение нервной системы"),
    l("Bosh og'rig'i, insult, epilepsiya, bel og'rig'i va periferik nervlar kasalliklarini diagnostika qilish va davolash.", "Диагностика и лечение головной боли, инсульта, эпилепсии, болей в спине и заболеваний периферических нервов."),
    [l("Insult davolash", "Лечение инсульта"), l("EEG va ENMG", "ЭЭГ и ЭНМГ"), l("Bel og'rig'i", "Боли в спине")]),
  D("ortopediya-i-travmatologiya", l("Ortopediya va travmatologiya", "Ортопедия и травматология"), l("Suyak va bo'g'imlar davolash", "Лечение костей и суставов"),
    l("Bo'g'imlarni endoprotezlash, artroskopiya, sinishlar va sport jarohatlarini davolash.", "Эндопротезирование суставов, артроскопия, лечение переломов и спортивных травм."),
    [l("Tizza va son endoprotezi", "Эндопротез колена и бедра"), l("Artroskopiya", "Артроскопия"), l("Sport jarohatlari", "Спортивные травмы")]),
  D("kardiologiya", l("Kardiologiya", "Кардиология"), l("Yurak salomatligi", "Здоровье сердца"),
    l("Gipertoniya, aritmiya, yurak yetishmovchiligi va ishemik kasallikni diagnostika qilish va davolash.", "Диагностика и лечение гипертонии, аритмии, сердечной недостаточности и ишемической болезни."),
    [l("EKG va ExoKG", "ЭКГ и ЭхоКГ"), l("Holter monitoring", "Холтер-мониторинг"), l("Stress-test", "Стресс-тест")]),
  D("intervencionnaya-kardiologiya", l("Intervension kardiologiya", "Интервенционная кардиология"), l("Stentlash va angioplastika", "Стентирование и ангиопластика"),
    l("Koronarografiya, stentlash va angioplastika — yurak tomirlariga kesmasiz aralashuvlar 24/7.", "Коронарография, стентирование и ангиопластика — вмешательства на сосудах сердца без разрезов 24/7."),
    [l("Koronarografiya", "Коронарография"), l("Stentlash", "Стентирование"), l("Aritmiyalar ablatsiyasi", "Абляция аритмий")]),
  D("spinalnaya-neyroxirurgiya", l("Orqa miya neyroxirurgiyasi", "Спинальная нейрохирургия"), l("Umurtqa operatsiyalari", "Операции на позвоночнике"),
    l("Umurtqa churrasi, stenoz va umurtqa jarohatlarini mikrojarrohlik va endoskopik usullarda davolash.", "Лечение грыж, стенозов и травм позвоночника микрохирургическими и эндоскопическими методами."),
    [l("Umurtqa churrasini olib tashlash", "Удаление грыжи диска"), l("Endoskopik jarrohlik", "Эндоскопическая хирургия"), l("Stabilizatsiya", "Стабилизация")]),
  D("otolaringologiya", l("Otolaringologiya", "Отоларингология"), l("Quloq, tomoq, burun", "Ухо, горло, нос"),
    l("Kattalar va bolalarda LOR kasalliklarini davolash: adenoid, tonzillit, sinusit, burun to'sig'i operatsiyalari.", "Лечение ЛОР-заболеваний у взрослых и детей: аденоиды, тонзиллит, синусит, операции на носовой перегородке."),
    [l("Adenotomiya", "Аденотомия"), l("Septoplastika", "Септопластика"), l("Endoskopik sinus jarrohligi", "Эндоскопическая хирургия пазух")]),
  D("uzi", l("UTT (UZI)", "УЗИ"), l("Ekspert darajadagi UZI", "УЗИ экспертного класса"),
    l("Barcha a'zolarni ekspert darajadagi apparatlarda UZI tekshiruvi, homiladorlik skriningi va dopplerografiya.", "УЗИ всех органов на аппаратах экспертного класса, скрининг беременности и допплерография."),
    [l("Qorin bo'shlig'i UZI", "УЗИ брюшной полости"), l("Qalqonsimon bez UZI", "УЗИ щитовидной железы"), l("Dopplerografiya", "Допплерография")]),
  D("obshaya-onkologiya", l("Umumiy onkologiya", "Общая онкология"), l("Saraton diagnostikasi va davolash", "Диагностика и лечение рака"),
    l("O'smalarni erta aniqlash, jarrohlik, kimyoterapiya va nur terapiyasi — multidisiplinar konsilium asosida.", "Ранняя диагностика опухолей, хирургия, химио- и лучевая терапия на основе мультидисциплинарного консилиума."),
    [l("Onkoskrining", "Онкоскрининг"), l("Kimyoterapiya", "Химиотерапия"), l("Onkojarrohlik", "Онкохирургия")]),
  D("oftalmologiya", l("Oftalmologiya", "Офтальмология"), l("Ko'z salomatligi", "Здоровье глаз"),
    l("Ko'rishni tekshirish, katarakta, glaukoma va to'r parda kasalliklarini zamonaviy uskunalarda davolash.", "Проверка зрения, лечение катаракты, глаукомы и заболеваний сетчатки на современном оборудовании."),
    [l("Katarakta operatsiyasi", "Операция катаракты"), l("Glaukoma davolash", "Лечение глаукомы"), l("Ko'z tubini tekshirish", "Осмотр глазного дна")]),
  D("vzroslaya-kardiohirurgiya", l("Kattalar kardioxirurgiyasi", "Взрослая кардиохирургия"), l("Ochiq yurak operatsiyalari", "Операции на открытом сердце"),
    l("Aorto-koronar shuntlash, klapanlarni almashtirish va aorta operatsiyalari.", "Аортокоронарное шунтирование, протезирование клапанов и операции на аорте."),
    [l("AKSh", "АКШ"), l("Klapan protezlash", "Протезирование клапанов"), l("Aorta jarrohligi", "Хирургия аорты")]),
  D("kardioreanimaciya", l("Kardioreanimatsiya", "Кардиореанимация"), l("Yurak bemorlari intensiv terapiyasi", "Интенсивная терапия кардиобольных"),
    l("Yurak operatsiyalaridan keyin va o'tkir yurak holatlarida kecha-yu kunduz intensiv kuzatuv.", "Круглосуточное интенсивное наблюдение после операций на сердце и при острых сердечных состояниях."),
    [l("24/7 monitoring", "Мониторинг 24/7"), l("O'tkir infarkt", "Острый инфаркт")]),
  D("anesteziologiya", l("Anesteziologiya", "Анестезиология"), l("Xavfsiz og'riqsizlantirish", "Безопасное обезболивание"),
    l("Har qanday operatsiya uchun umumiy, spinal va mahalliy anesteziya — zamonaviy monitoring ostida.", "Общая, спинальная и местная анестезия для любых операций под современным мониторингом."),
    [l("Umumiy anesteziya", "Общая анестезия"), l("Spinal anesteziya", "Спинальная анестезия"), l("Sedatsiya", "Седация")]),
  D("urologiya", l("Urologiya", "Урология"), l("Siydik tizimi kasalliklari", "Заболевания мочевой системы"),
    l("Buyrak toshlari, prostata kasalliklari va urologik o'smalarni endoskopik va robot-assistentli usullarda davolash.", "Лечение камней почек, заболеваний простаты и урологических опухолей эндоскопическими и робот-ассистированными методами."),
    [l("Toshlarni lazer bilan maydalash", "Лазерное дробление камней"), l("Prostata TUR", "ТУР простаты"), l("Robot-urologiya", "Робот-урология")]),
  D("ginekologiya", l("Ginekologiya", "Гинекология"), l("Ayollar salomatligi", "Женское здоровье"),
    l("Ginekologik kasalliklarni diagnostika qilish, laparoskopik operatsiyalar va homiladorlikni kuzatish.", "Диагностика гинекологических заболеваний, лапароскопические операции и ведение беременности."),
    [l("Laparoskopiya", "Лапароскопия"), l("Gisteroskopiya", "Гистероскопия"), l("Homiladorlikni kuzatish", "Ведение беременности")]),
  D("onkologiya-golovi-i-shei", l("Bosh va bo'yin onkologiyasi", "Онкология головы и шеи"), l("Bosh va bo'yin o'smalari", "Опухоли головы и шеи"),
    l("Qalqonsimon bez, so'lak bezlari, hiqildoq va og'iz bo'shlig'i o'smalarini jarrohlik yo'li bilan davolash.", "Хирургическое лечение опухолей щитовидной железы, слюнных желёз, гортани и полости рта."),
    [l("Tireoidektomiya", "Тиреоидэктомия"), l("Biopsiya", "Биопсия")]),
  D("obshaya-terapiya", l("Umumiy terapiya", "Общая терапия"), l("Ichki kasalliklar", "Внутренние болезни"),
    l("Ichki a'zolar kasalliklarini kompleks davolash, surunkali kasalliklarni kuzatish va profilaktika.", "Комплексное лечение заболеваний внутренних органов, наблюдение хронических больных и профилактика."),
    [l("Terapevt ko'rigi", "Осмотр терапевта"), l("Kapelnitsa va muolajalar", "Капельницы и процедуры"), l("Profilaktika", "Профилактика")]),
];
export const deptBySlug = (s: string) => departments.find((d) => d.slug === s);

/* ---------------- Doctors ---------------- */
export type Doctor = { id: string; photo: string; name: L; spec: L; specSlug: string; dept: string; exp: number; head: boolean };
export const doctors: Doctor[] = doctorRows.map(([id, photo, nu, nr, su, sr, ss, dept, exp, head]) => ({
  id, photo: img(photo), name: l(nu, nr), spec: l(su, sr), specSlug: ss, dept, exp, head: head === 1,
}));
export type Specialty = { slug: string; name: L; count: number };
export const specialties: Specialty[] = Object.values(
  doctors.reduce<Record<string, Specialty>>((acc, d) => {
    const s = acc[d.specSlug] ?? { slug: d.specSlug, name: d.spec, count: 0 };
    s.count++;
    acc[d.specSlug] = s;
    return acc;
  }, {}),
).sort((a, b) => a.name.uz.localeCompare(b.name.uz));
export const specBySlug = (s: string) => specialties.find((x) => x.slug === s);

/* ---------------- Checkups ---------------- */
export type Checkup = { slug: string; title: L; desc: L; consult: number; lab: number; instr: number; price: string | null; items: L[] };
export const checkups: Checkup[] = [
  { slug: "male", title: l("«Erkaklar salomatligi» Check-up", "Check-up «Мужское здоровье»"), desc: l("Erkaklar salomatligi va asosiy xavf omillarining kompleks diagnostikasi.", "Комплексная диагностика мужского здоровья и основных факторов риска."), consult: 5, lab: 26, instr: 7, price: "5 650 000",
    items: [l("Urolog, kardiolog, terapevt ko'rigi", "Осмотр уролога, кардиолога, терапевта"), l("PSA va testosteron", "ПСА и тестостерон"), l("UZI prostata va qorin bo'shlig'i", "УЗИ простаты и брюшной полости"), l("EKG va ExoKG", "ЭКГ и ЭхоКГ")] },
  { slug: "female", title: l("«Ayollar salomatligi» Check-up", "Check-up «Женское здоровье»"), desc: l("Ayollar salomatligi, gormonal holat va xavf omillarini kompleks baholash.", "Комплексная оценка женского здоровья, гормонального статуса и факторов риска."), consult: 6, lab: 25, instr: 8, price: "6 690 000",
    items: [l("Ginekolog, mammolog, endokrinolog ko'rigi", "Осмотр гинеколога, маммолога, эндокринолога"), l("Gormonlar paneli", "Гормональная панель"), l("Mammografiya yoki sut bezlari UZI", "Маммография или УЗИ молочных желёз"), l("PAP-test", "ПАП-тест")] },
  { slug: "children", title: l("«Bolalar salomatligi» Check-up", "Check-up «Детское здоровье»"), desc: l("Bolaning sog'lig'i, o'sishi va rivojlanishini kompleks baholash.", "Комплексная оценка здоровья, роста и развития ребёнка."), consult: 3, lab: 12, instr: 1, price: "2 738 000",
    items: [l("Pediatr, nevrolog, LOR ko'rigi", "Осмотр педиатра, невролога, ЛОР"), l("Umumiy qon va siydik tahlili", "Общий анализ крови и мочи"), l("UZI", "УЗИ")] },
  { slug: "cardiology", title: l("Kardio Check-up", "Кардио Check-up"), desc: l("Yurak-qon tomir salomatligini kompleks baholash.", "Комплексная оценка сердечно-сосудистого здоровья."), consult: 2, lab: 18, instr: 2, price: null,
    items: [l("Kardiolog konsultatsiyasi", "Консультация кардиолога"), l("Lipid profili", "Липидный профиль"), l("EKG va ExoKG", "ЭКГ и ЭхоКГ")] },
  { slug: "gastroenterology", title: l("«Gastroenterologiya» Check-up", "Check-up «Гастроэнтерология»"), desc: l("Oshqozon-ichak trakti a'zolarining kompleks diagnostikasi.", "Комплексная диагностика органов ЖКТ."), consult: 2, lab: 9, instr: 2, price: null,
    items: [l("Gastroenterolog ko'rigi", "Осмотр гастроэнтеролога"), l("Gastroskopiya", "Гастроскопия"), l("Qorin bo'shlig'i UZI", "УЗИ брюшной полости")] },
  { slug: "urology", title: l("«Urologiya» Check-up", "Check-up «Урология»"), desc: l("Siydik-tanosil tizimi va buyrak faoliyatining asosiy diagnostikasi.", "Базовая диагностика мочеполовой системы и функции почек."), consult: 2, lab: 5, instr: 1, price: null,
    items: [l("Urolog ko'rigi", "Осмотр уролога"), l("Buyrak UZI", "УЗИ почек")] },
  { slug: "gynecology", title: l("«Ginekologiya» Check-up", "Check-up «Гинекология»"), desc: l("Ayollar reproduktiv salomatligining profilaktik diagnostikasi.", "Профилактическая диагностика репродуктивного здоровья женщины."), consult: 2, lab: 4, instr: 1, price: null,
    items: [l("Ginekolog ko'rigi", "Осмотр гинеколога"), l("Kichik chanoq UZI", "УЗИ малого таза")] },
  { slug: "endocrinology", title: l("«Endokrinologiya» Check-up", "Check-up «Эндокринология»"), desc: l("Endokrin va metabolik salomatlikni kompleks baholash.", "Комплексная оценка эндокринного и метаболического здоровья."), consult: 2, lab: 19, instr: 1, price: null,
    items: [l("Endokrinolog ko'rigi", "Осмотр эндокринолога"), l("Gormonlar", "Гормоны"), l("Qalqonsimon bez UZI", "УЗИ щитовидной железы")] },
  { slug: "thyroid", title: l("«Qalqonsimon bez» Check-up", "Check-up «Щитовидная железа»"), desc: l("Qalqonsimon bez tuzilishi va faoliyatini baholash.", "Оценка структуры и функции щитовидной железы."), consult: 2, lab: 5, instr: 1, price: null,
    items: [l("TTG, T3, T4", "ТТГ, Т3, Т4"), l("Qalqonsimon bez UZI", "УЗИ щитовидной железы")] },
  { slug: "diabetes", title: l("«Diabet» Check-up", "Check-up «Диабет»"), desc: l("Qondagi shakar, uglevod almashinuvi va diabet xavf omillarini baholash.", "Оценка уровня сахара, углеводного обмена и факторов риска диабета."), consult: 2, lab: 9, instr: 0, price: null,
    items: [l("Glyukoza va HbA1c", "Глюкоза и HbA1c"), l("Endokrinolog ko'rigi", "Осмотр эндокринолога")] },
];

export const banners = [b1, b2, b3, b4, b5];
export const partners = ["079d7056-fd8d-4f22-b528-b0684dd62115.png", "1e46c4b0-5da1-4f4e-939b-190c3c780409.webp", "65a3dc1a-bd90-4ffe-b32f-a89528ed18ec.png", "74e8c641-e314-48a1-8771-e7173efb06bf.jpg", "2b85992f-cc9f-46e4-be89-8b1342f2b531.jpg", "ab46a3db-d84a-44ba-b592-3342d5eaaa09.png", "5d9166da-02de-4991-803e-eef73abea6e6.png", "2d0e1765-d480-4ce3-a69d-83020093acbc.png", "9c2fb9f3-064d-4b26-9b5c-4a5f0965686b.jpg", "911ba72f-c6f1-4f4f-98a8-c0916329f042.png"].map(img);

export const faq: [L, L][] = [
  [l("Klinika ish vaqti va manzili qanday?", "Какой график работы и адрес клиники?"), l("Dushanba – juma: 08:30–17:00, shanba: 09:00–14:00, yakshanba: dam olish kuni. Statsionar va qabul bo'limi 24/7 ishlaydi. Manzil: Toshkent sh., Olmazor tumani, Kichik Halqa yo'li ko'chasi, 5A-uy.", "Пн – Пт: 08:30–17:00, Сб: 09:00–14:00, Вс: выходной. Стационар и приёмное отделение работают 24/7. Адрес: г. Ташкент, Алмазарский район, ул. Кичик Халка йули, 5А.")],
  [l("Klinikada laboratoriya va diagnostika xizmatlari mavjudmi?", "Есть ли в клинике лаборатория и диагностика?"), l("Ha. SIEMENS uskunalari (MRT 1.5T, MSKT), UZI, rentgen hamda Roche va Sysmex laboratoriyasi bir joyda.", "Да. Оборудование SIEMENS (МРТ 1.5Т, МСКТ), УЗИ, рентген и лаборатория Roche и Sysmex — в одном месте.")],
  [l("Qabul uchun qanday hujjatlar kerak?", "Какие документы нужны для приёма?"), l("Shaxsni tasdiqlovchi hujjat (pasport yoki ID-karta) va mavjud bo'lsa, oldingi tekshiruv natijalari.", "Документ, удостоверяющий личность (паспорт или ID-карта), и при наличии — результаты прошлых обследований.")],
  [l("Klinikada qanday mutaxassislar mavjud?", "Какие специалисты работают в клинике?"), l("150+ shifokor: kardiologlar, nevrologlar, jarrohlar, pediatrlar, ginekologlar va boshqa mutaxassislar, 20+ bo'lim.", "150+ врачей: кардиологи, неврологи, хирурги, педиатры, гинекологи и другие специалисты, 20+ отделений.")],
  [l("To'lov qanday amalga oshiriladi?", "Как производится оплата?"), l("Naqd pul, Uzcard, Humo, Visa, Mastercard va onlayn to'lov orqali. Sug'urta polislari ham qabul qilinadi.", "Наличными, Uzcard, Humo, Visa, Mastercard и онлайн. Также принимаются страховые полисы.")],
  [l("Qabulga qanday yozilish mumkin?", "Как записаться на приём?"), l("1141 qisqa raqamiga yoki +998 (77) 353-87-00 ga qo'ng'iroq qiling yoki saytdagi «Qabulga yozilish» formasini to'ldiring — operator 15 daqiqa ichida bog'lanadi.", "Позвоните на короткий номер 1141 или +998 (77) 353-87-00, либо заполните форму «Записаться на приём» на сайте — оператор свяжется в течение 15 минут.")],
];

export const branches = [
  { slug: "main", title: l("MirziyoMedline University Hospital", "MirziyoMedline University Hospital"), city: l("Toshkent, Olmazor", "Ташкент, Алмазар"), address: ADDRESS, hours: l("24/7", "24/7"), photo: HERO_IMG,
    text: l("Bosh klinika: 20+ bo'lim, statsionar, reanimatsiya, operatsion bloklar, diagnostika markazi va laboratoriya bir binoda.", "Главная клиника: 20+ отделений, стационар, реанимация, операционные блоки, диагностический центр и лаборатория в одном здании."), map: "https://www.google.com/maps?q=41.343018,69.208815&z=15&output=embed" },
  { slug: "boulevard", title: l("MirziyoMedline Boulevard", "MirziyoMedline Boulevard"), city: l("Tashkent City Boulevard, Toshkent", "Tashkent City Boulevard, Ташкент"), address: l("Toshkent sh., Tashkent City, Boulevard", "г. Ташкент, Tashkent City, Boulevard"), hours: l("09:00 – 20:00", "09:00 – 20:00"), photo: site("/img/branch-boulevard.jpg"),
    text: l("Reproduktiv, preventiv va Anti-Age tibbiyotini birlashtirgan reproduktiv salomatlik va uzoq umr markazi.", "Центр репродуктивного здоровья и долголетия, объединяющий репродуктивную, превентивную и Anti-Age медицину."), map: "https://www.google.com/maps?q=Tashkent+City+Boulevard&output=embed" },
  { slug: "airtom", title: l("MirziyoMedline Airtom", "MirziyoMedline Airtom"), city: l("Termiz", "Термез"), address: l("Surxondaryo viloyati, Termiz sh.", "Сурхандарьинская обл., г. Термез"), hours: l("08:00 – 20:00", "08:00 – 20:00"), photo: site("/img/branch-airitom.jpg"),
    text: l("Diagnostika, ambulator davolash, tibbiy muolajalar va jarrohlik yo'nalishini birlashtirgan zamonaviy filial.", "Современный филиал, объединяющий диагностику, амбулаторное лечение, процедуры и хирургию."), map: "https://www.google.com/maps?q=Termez&output=embed" },
];

export const vacancies: { title: L; type: L; req: L }[] = [
  { title: l("Kardiolog", "Кардиолог"), type: l("To'liq stavka", "Полная занятость"), req: l("Kamida 5 yil tajriba", "Опыт от 5 лет") },
  { title: l("Anesteziolog-reanimatolog", "Анестезиолог-реаниматолог"), type: l("Smenali grafik", "Сменный график"), req: l("Sertifikat, 3+ yil tajriba", "Сертификат, опыт от 3 лет") },
  { title: l("Hamshira (statsionar)", "Медсестра (стационар)"), type: l("Smenali grafik", "Сменный график"), req: l("Tibbiy kollej diplomi", "Диплом медколледжа") },
  { title: l("Laborant", "Лаборант"), type: l("To'liq stavka", "Полная занятость"), req: l("Laboratoriya tajribasi", "Опыт работы в лаборатории") },
  { title: l("Call-markaz operatori", "Оператор колл-центра"), type: l("Smenali grafik", "Сменный график"), req: l("O'zbek va rus tillari", "Узбекский и русский языки") },
  { title: l("Xalqaro bemorlar koordinatori", "Координатор международных пациентов"), type: l("To'liq stavka", "Полная занятость"), req: l("Ingliz va rus tillari", "Английский и русский языки") },
];

export const insurers = ["Apex Insurance", "Gross Insurance", "Kapital Sug'urta", "Uzbekinvest", "Alfa Invest", "Ingo Uzbekistan", "Alskom", "Euroasia Insurance", "Trust Insurance", "Kafolat"];

/* ---------------- Blog ---------------- */
export type BlogPost = { slug: string; cover: string; cat: L; read: number; title: L; excerpt: L; body: L[] };
export const blog: BlogPost[] = [
  { slug: "yurak-salomatligi-7-qoida", cover: blogHeart, cat: l("Kardiologiya", "Кардиология"), read: 5,
    title: l("Yurak salomatligi uchun 7 ta oddiy qoida", "7 простых правил для здоровья сердца"),
    excerpt: l("Kardiolog maslahatlari: ovqatlanish, harakat, uyqu va muntazam tekshiruv.", "Советы кардиолога: питание, движение, сон и регулярные обследования."),
    body: [
      l("Yurak-qon tomir kasalliklari bugun dunyoda o'limning asosiy sababi hisoblanadi. Biroq ularning ko'pchiligini oddiy odatlar yordamida oldini olish mumkin.", "Сердечно-сосудистые заболевания — главная причина смертности в мире. Но большинство из них можно предотвратить простыми привычками."),
      l("1. Kuniga kamida 30 daqiqa yuring. 2. Tuz iste'molini kuniga 5 grammgacha kamaytiring. 3. Ko'proq sabzavot, meva va baliq iste'mol qiling. 4. Chekishni tashlang.", "1. Ходите не менее 30 минут в день. 2. Сократите соль до 5 граммов в сутки. 3. Ешьте больше овощей, фруктов и рыбы. 4. Откажитесь от курения."),
      l("5. Kuniga 7–8 soat uxlang. 6. Qon bosimi va xolesterinni nazorat qiling. 7. 40 yoshdan keyin har yili kardiolog ko'rigidan o'ting.", "5. Спите 7–8 часов. 6. Контролируйте давление и холестерин. 7. После 40 лет ежегодно проходите осмотр кардиолога."),
      l("Ko'krak qafasidagi og'riq, hansirash yoki yurak urishining notekisligini sezsangiz, shifokorga murojaat qilishni kechiktirmang.", "Если вы чувствуете боль в груди, одышку или перебои в сердце — не откладывайте визит к врачу."),
    ] },
  { slug: "chekap-nima", cover: blogCheckup, cat: l("Profilaktika", "Профилактика"), read: 4,
    title: l("Chekap nima va uni qachon o'tish kerak?", "Что такое чекап и когда его проходить?"),
    excerpt: l("Profilaktik tekshiruvlarning ahamiyati va to'g'ri dasturni tanlash.", "Зачем нужны профилактические обследования и как выбрать программу."),
    body: [
      l("Chekap — bu bir kunda o'tkaziladigan kompleks tekshiruv dasturi: mutaxassislar ko'rigi, laboratoriya tahlillari va instrumental diagnostika.", "Чекап — это комплексная программа обследования за один день: осмотры специалистов, лабораторные анализы и инструментальная диагностика."),
      l("Ko'pgina kasalliklar dastlabki bosqichda hech qanday belgi bermaydi. Muntazam chekap ularni erta aniqlash va oson davolash imkonini beradi.", "Многие болезни на ранних стадиях протекают бессимптомно. Регулярный чекап позволяет выявить их рано и вылечить легче."),
      l("30 yoshdan keyin har 1–2 yilda, 40 yoshdan keyin esa har yili chekap o'tish tavsiya etiladi. Dasturni yosh, jins va oilaviy kasalliklarni hisobga olib tanlang.", "После 30 лет чекап рекомендуется раз в 1–2 года, после 40 — ежегодно. Выбирайте программу с учётом возраста, пола и наследственности."),
    ] },
  { slug: "bolalarda-allergiya", cover: blogKids, cat: l("Pediatriya", "Педиатрия"), read: 4,
    title: l("Bolalarda allergiya: belgilari va davolash", "Аллергия у детей: признаки и лечение"),
    excerpt: l("Allergolog va pediatr tavsiyalari ota-onalar uchun.", "Рекомендации аллерголога и педиатра для родителей."),
    body: [
      l("Allergiya — immun tizimining zararsiz moddalarga ortiqcha reaksiyasi. Bolalarda u ko'pincha teri toshmasi, burun bitishi, yo'tal yoki ko'z qizarishi bilan namoyon bo'ladi.", "Аллергия — избыточная реакция иммунитета на безвредные вещества. У детей она чаще проявляется сыпью, заложенностью носа, кашлем или покраснением глаз."),
      l("Asosiy allergenlar: chang, gul changi, uy hayvonlari, ba'zi oziq-ovqatlar (sut, tuxum, yong'oq). Allergen testlari sababni aniq aniqlashga yordam beradi.", "Основные аллергены: пыль, пыльца, домашние животные, некоторые продукты (молоко, яйца, орехи). Аллерготесты помогают точно выявить причину."),
      l("Davolash allergenni cheklash, dori vositalari va kerak bo'lsa, allergen-spesifik immunoterapiyani o'z ichiga oladi. O'z-o'zini davolamang — pediatrga murojaat qiling.", "Лечение включает исключение аллергена, препараты и при необходимости АСИТ. Не занимайтесь самолечением — обратитесь к педиатру."),
    ] },
  { slug: "bel-ogrigi", cover: blogBack, cat: l("Nevrologiya", "Неврология"), read: 5,
    title: l("Bel og'rig'i: qachon shifokorga murojaat qilish kerak", "Боль в спине: когда идти к врачу"),
    excerpt: l("Nevrolog va neyroxirurg fikri: xavfli belgilar va zamonaviy davolash.", "Мнение невролога и нейрохирурга: тревожные признаки и современное лечение."),
    body: [
      l("Bel og'rig'i kattalarning 80% ida hayoti davomida kamida bir marta uchraydi. Ko'p hollarda u mushaklar zo'riqishi bilan bog'liq va 2–4 haftada o'tib ketadi.", "Боль в спине хотя бы раз в жизни бывает у 80% взрослых. Чаще всего она связана с перенапряжением мышц и проходит за 2–4 недели."),
      l("Xavfli belgilar: oyoqqa tarqaluvchi og'riq, oyoqlarda uvishish yoki kuchsizlik, siydik chiqarishning buzilishi, isitma. Bunday hollarda zudlik bilan shifokorga murojaat qiling.", "Тревожные признаки: боль, отдающая в ногу, онемение или слабость в ногах, нарушение мочеиспускания, температура. В этих случаях срочно обратитесь к врачу."),
      l("Davolash uchun fizioterapiya, LFK, dori vositalari va zarur bo'lsa, kam invaziv neyrojarrohlik qo'llaniladi. MRT tekshiruvi tashxisni aniqlashtiradi.", "Для лечения применяются физиотерапия, ЛФК, препараты и при необходимости малоинвазивная нейрохирургия. МРТ уточняет диагноз."),
    ] },
];

/* ---------------- Price list ---------------- */
export type PriceItem = { name: L; price: string; dur?: string };
export const priceCats: { key: string; title: L; items: PriceItem[] }[] = [
  { key: "consult", title: l("Konsultatsiyalar", "Консультации"), items: [
    { name: l("Fizioterapevt konsultatsiyasi", "Консультация физиотерапевта"), price: "290 000", dur: "30" },
    { name: l("Bosh va bo'yin onkologi konsultatsiyasi", "Консультация онколога головы и шеи"), price: "240 000", dur: "30" },
    { name: l("Intervension kardiolog konsultatsiyasi", "Консультация интервенционного кардиолога"), price: "310 000", dur: "30" },
    { name: l("Onkolog onlayn konsultatsiyasi", "Онлайн-консультация онколога"), price: "220 000", dur: "30" },
    { name: l("Aritmolog konsultatsiyasi", "Консультация аритмолога"), price: "220 000", dur: "30" },
    { name: l("Kattalar kardiojarrohligi konsultatsiyasi", "Консультация взрослого кардиохирурга"), price: "280 000", dur: "30" },
    { name: l("Jarroh konsultatsiyasi", "Консультация хирурга"), price: "240 000", dur: "30" },
    { name: l("Onkolog-mammolog konsultatsiyasi", "Консультация онколога-маммолога"), price: "250 000", dur: "30" },
    { name: l("Onkolog konsultatsiyasi", "Консультация онколога"), price: "240 000", dur: "30" },
    { name: l("Gastroenterolog konsultatsiyasi", "Консультация гастроэнтеролога"), price: "310 000", dur: "30" },
    { name: l("Gepatolog konsultatsiyasi", "Консультация гепатолога"), price: "310 000", dur: "30" },
    { name: l("Pulmonolog konsultatsiyasi", "Консультация пульмонолога"), price: "280 000", dur: "30" },
    { name: l("Nefrolog konsultatsiyasi", "Консультация нефролога"), price: "290 000", dur: "30" },
    { name: l("Urolog konsultatsiyasi", "Консультация уролога"), price: "290 000", dur: "30" },
    { name: l("Urologiya bo'limi mudiri konsultatsiyasi", "Консультация заведующего урологией"), price: "360 000", dur: "30" },
    { name: l("Ginekolog konsultatsiyasi", "Консультация гинеколога"), price: "290 000", dur: "30" },
    { name: l("Ginekologiya bo'limi mudiri konsultatsiyasi", "Консультация заведующего гинекологией"), price: "360 000", dur: "30" },
    { name: l("Endokrinolog konsultatsiyasi", "Консультация эндокринолога"), price: "310 000", dur: "30" },
    { name: l("Pediatr konsultatsiyasi", "Консультация педиатра"), price: "290 000", dur: "30" },
  ] },
  { key: "diag", title: l("Diagnostika", "Диагностика"), items: [
    { name: l("MRT (bitta soha)", "МРТ (одна область)"), price: "900 000" },
    { name: l("MSKT (bitta soha)", "МСКТ (одна область)"), price: "750 000" },
    { name: l("Mammografiya", "Маммография"), price: "280 000" },
    { name: l("UZI qorin bo'shlig'i", "УЗИ брюшной полости"), price: "250 000" },
    { name: l("UZI qalqonsimon bez", "УЗИ щитовидной железы"), price: "180 000" },
    { name: l("EKG", "ЭКГ"), price: "80 000" },
    { name: l("ExoKG", "ЭхоКГ"), price: "320 000" },
    { name: l("Holter monitoring (24 soat)", "Холтер-мониторинг (24 часа)"), price: "350 000" },
    { name: l("Gastroskopiya", "Гастроскопия"), price: "450 000" },
  ] },
  { key: "lab", title: l("Laboratoriya", "Лаборатория"), items: [
    { name: l("Umumiy qon tahlili", "Общий анализ крови"), price: "60 000" },
    { name: l("Umumiy siydik tahlili", "Общий анализ мочи"), price: "45 000" },
    { name: l("Biokimyo (asosiy panel)", "Биохимия (основная панель)"), price: "220 000" },
    { name: l("Lipid profili", "Липидный профиль"), price: "150 000" },
    { name: l("Glyukoza", "Глюкоза"), price: "30 000" },
    { name: l("HbA1c", "HbA1c"), price: "120 000" },
    { name: l("TTG", "ТТГ"), price: "95 000" },
    { name: l("Vitamin D", "Витамин D"), price: "180 000" },
  ] },
];

export const stats = [
  { n: 1793326, l: l("ko'rsatilgan tibbiy xizmatlar", "оказанных медицинских услуг") },
  { n: 270626, l: l("shifokor maslahatlari", "консультаций врачей") },
  { n: 16025, l: l("o'tkazilgan operatsiyalar", "проведённых операций") },
  { n: 150, l: l("malakali shifokorlar", "квалифицированных врачей"), plus: true },
  { n: 20, l: l("bo'lim", "отделений"), plus: true },
  { n: 2017, l: l("klinika tashkil etilgan yil", "год основания клиники"), year: true },
];
