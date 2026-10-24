import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Building2, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, MapPin, MousePointerClick, PhoneCall, Stethoscope, Users, Activity, UserRound, Award, ShieldCheck, Microscope, HeartPulse } from "lucide-react";
import { ArrowBtn, BookCta, DoctorCard, SearchBar, SectionHead } from "@/components/site/Layout";
import { useBooking } from "@/components/site/Booking";
import { LeadForm } from "@/components/site/LeadForm";
import { useSettings } from "@/lib/use-settings";
import { BODY, HOURS, banners, checkups, departments, doctors, faq, img, partners, specBySlug, stats } from "@/lib/data";
import { newsList } from "@/lib/news-data";
import { l, useT, type L } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { siteVideos, videoEmbed } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => seo("MirziyoMedline — Toshkentdagi JCI akkreditatsiyali ko'p tarmoqli klinika", "MirziyoMedline University Hospital: 150+ shifokor, 20+ bo'lim, MRT 1.5T, robot-assistentli jarrohlik, chekaplar va 24/7 statsionar.", banners[0]),
  component: Index,
});

const cards: [L, L, string, string][] = [
  [l("Diagnostika", "Диагностика"), l("Aniq natijalar", "Точные результаты"), "13c3af33-1d52-43bc-8133-2b581fa9936e.png", "/xizmatlar/diagnostika"],
  [l("Statsionar", "Стационар"), l("Kecha-yu kunduz parvarish", "Круглосуточный уход"), "e958ee41-b998-4c28-b44f-9535a841db81.png", "/xizmatlar/statsionar"],
  [l("Chekaplar", "Чекапы"), l("Kompleks tekshiruv", "Комплексное обследование"), "a6ea29d0-a7f4-432a-a52d-37185a841311.png", "/chekaplar"],
  [l("«Sen Yashaysan»", "«Sen Yashaysan»"), l("Xayriya dasturi", "Благотворительная программа"), "0f16df1c-361e-4aa8-a238-c6818fa8f84b.png", "/bolimlar/detskaya-kardiohirurgiya"],
  [l("Fizioterapiya", "Физиотерапия"), l("Zamonaviy usullar", "Современные методы"), "bb3d8b97-4184-4b04-9e25-21cd98a8933e.png", "/xizmatlar/fizioterapiya"],
  [l("Stomatologiya", "Стоматология"), l("Eng so'nggi texnologiyalar", "Новейшие технологии"), "9c913b06-fe78-4fc0-a309-4fcd0f093b88.png", "/xizmatlar/stomatologiya"],
];
const icons = [Stethoscope, Users, Activity, UserRound, Building2, CalendarDays];

const bodyParts = [
  { id: "bosh", label: l("Bosh", "Голова"), x: 50, y: 7, docs: ["nevrolog", "otorinolaringolog", "oftalmolog", "tish-shifokori"] },
  { id: "kokrak", label: l("Ko'krak qafasi", "Грудная клетка"), x: 50, y: 25, docs: ["kardiolog", "pulmonolog", "onkolog-mammolog", "interventsion-kardiolog"] },
  { id: "qorin", label: l("Qorin", "Живот"), x: 50, y: 41, docs: ["gastroenterolog", "gepatolog", "umumiy-jarroh", "endoskopist"] },
  { id: "chanoq", label: l("Chanoq", "Таз"), x: 50, y: 54, docs: ["urolog", "ginekolog", "proktolog", "androlog"] },
  { id: "qol", label: l("Qo'llar", "Руки"), x: 22, y: 54, docs: ["ortoped-travmatolog", "revmatolog", "nevrolog"] },
  { id: "qol2", label: l("Qo'llar", "Руки"), x: 78, y: 54, docs: ["ortoped-travmatolog", "revmatolog", "nevrolog"] },
  { id: "oyoq", label: l("Tizza va oyoqlar", "Колени и ноги"), x: 41, y: 77, docs: ["ortoped-travmatolog", "qon-tomir-jarroh", "revmatolog"] },
  { id: "oyoq2", label: l("Tizza va oyoqlar", "Колени и ноги"), x: 59, y: 77, docs: ["ortoped-travmatolog", "qon-tomir-jarroh", "revmatolog"] },
];

const why: [typeof Award, L, L][] = [
  [Award, l("JCI Gold Seal", "JCI Gold Seal"), l("O'zbekistondagi xususiy klinikalar orasida yagona JCI akkreditatsiyasi (2020, 2023).", "Единственная частная клиника Узбекистана с аккредитацией JCI (2020, 2023).")],
  [Microscope, l("SIEMENS uskunalari", "Оборудование SIEMENS"), l("MRT 1.5T, MSKT, angiograf va Roche/Sysmex laboratoriyasi.", "МРТ 1.5Т, МСКТ, ангиограф и лаборатория Roche/Sysmex.")],
  [HeartPulse, l("Robot-jarrohlik", "Робот-хирургия"), l("3D vizualizatsiya va millimetr aniqligidagi kam invaziv operatsiyalar.", "Малоинвазивные операции с 3D-визуализацией и миллиметровой точностью.")],
  [ShieldCheck, l("24/7 yordam", "Помощь 24/7"), l("Statsionar, reanimatsiya va qabul bo'limi kecha-yu kunduz ishlaydi.", "Стационар, реанимация и приёмное отделение работают круглосуточно.")],
];

function Counter({ to, plus, year }: { to: number; plus?: boolean | undefined; year?: boolean | undefined }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{year ? v : v.toLocaleString("ru-RU")}{plus ? "+" : ""}</span>;
}

const scrollBy = (el: HTMLDivElement | null, dir: number) => el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });

function Index() {
  const { phone: PHONE, tel: PHONE_TEL, email: EMAIL, address: ADDRESS } = useSettings();
  const t = useT();
  const book = useBooking();
  const [slide, setSlide] = useState(0);
  const [part, setPart] = useState<(typeof bodyParts)[number] | null>(null);
  const [open, setOpen] = useState<number | null>(0);
  const docRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const featured = doctors.filter((d) => d.exp > 0).slice(0, 15);
  const popular = departments.slice(0, 5);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % banners.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto max-w-[1376px] px-4">
      <div className="mt-6"><SearchBar /></div>

      {siteVideos.filter((v) => v.kind === "background").slice(0, 1).map((v) => {
        const e = videoEmbed(v.url);
        return (
          <section key={v.id} className="relative mt-6 overflow-hidden rounded-2xl bg-muted">
            {e.type === "iframe"
              ? <iframe src={`${e.src}?autoplay=1&mute=1&loop=1&controls=0&playlist=${e.src.split("/").pop()}`} title={v.title || "Video"} allow="autoplay; encrypted-media" className="aspect-[1376/500] w-full" />
              : <video src={e.src} autoPlay muted loop playsInline className="aspect-[1376/500] w-full object-cover" />}
          </section>
        );
      })}

      {/* Banner slider */}
      <section className="relative mt-6 overflow-hidden rounded-2xl bg-muted">
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${slide * 100}%)` }}>
          {banners.map((b, i) => (
            <button key={b} onClick={() => book()} className="w-full shrink-0" aria-label={`Banner ${i + 1}`}>
              <img src={b} alt={`MirziyoMedline banner ${i + 1}`} className="aspect-[1376/344] w-full object-cover" {...(i === 0 ? {} : { loading: "lazy" as const })} />
            </button>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, i) => (
            <button key={i} aria-label={`Slayd ${i + 1}`} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? "w-8 bg-primary" : "w-2 bg-card/70"}`} />
          ))}
        </div>
        <div className="absolute bottom-4 right-4 hidden gap-2 sm:flex">
          <button aria-label="Oldingi" onClick={() => setSlide((slide - 1 + banners.length) % banners.length)} className="grid h-10 w-10 place-items-center rounded-xl bg-card"><ChevronLeft className="h-4 w-4" /></button>
          <button aria-label="Keyingi" onClick={() => setSlide((slide + 1) % banners.length)} className="grid h-10 w-10 place-items-center rounded-xl bg-card"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </section>

      {/* Service cards */}
      <section className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {cards.map(([ti, d, i, to]) => (
          <Link key={to} to={to} className="group flex flex-col rounded-2xl border border-border bg-card shadow-soft p-5 transition hover:-translate-y-0.5 hover:shadow-lift hover:border-primary/30">
            <img src={img(i)} alt={t(ti)} className="mx-auto h-24 w-24 object-contain transition group-hover:scale-110" loading="lazy" />
            <div className="mt-6 text-lg font-semibold">{t(ti)}</div>
            <div className="text-sm text-muted-foreground">{t(d)}</div>
            <span className="mt-6 rounded-lg bg-secondary py-2.5 text-center text-sm transition group-hover:bg-primary group-hover:text-primary-foreground">{t(l("Batafsil", "Подробнее"))}</span>
          </Link>
        ))}
      </section>

      {siteVideos.some((v) => v.kind === "ad") && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{t(l("Videolar", "Видео"))}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {siteVideos.filter((v) => v.kind === "ad").map((v) => {
              const e = videoEmbed(v.url);
              return (
                <div key={v.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                  {e.type === "iframe"
                    ? <iframe src={e.src} title={v.title || "Video"} allowFullScreen loading="lazy" className="aspect-video w-full" />
                    : <video src={e.src} controls preload="metadata" className="aspect-video w-full bg-muted" />}
                  {v.title && <div className="p-4 font-semibold">{v.title}</div>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* About */}
      <section className="mt-16">
        <SectionHead title={l("Klinika haqida", "О клинике")} link={l("Batafsil", "Подробнее")} to="/klinika-haqida" />
        <div className="grid gap-4 lg:grid-cols-[520px_1fr]">
          <div className="bg-brand relative overflow-hidden rounded-2xl p-8 text-primary-foreground">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-card/10" />
            <div className="absolute -bottom-16 -right-8 h-52 w-52 rounded-full bg-card/10" />
            <h3 className="relative mt-4 text-2xl font-semibold">{t(l("MirziyoMedline — sog'ligingiz bizning ustuvorligimiz", "MirziyoMedline — ваше здоровье наш приоритет"))}</h3>
            <p className="relative mt-4 leading-relaxed opacity-90">
              {t(l("MirziyoMedline — Markaziy Osiyodagi eng yirik xususiy tibbiyot markazlaridan biri. JCI xalqaro akkreditatsiyasi, 150+ yuqori malakali shifokor, SIEMENS uskunalari, robot-assistentli jarrohlik va Roche/Sysmex laboratoriyasi — hammasi bir joyda, 24/7.",
                "MirziyoMedline — один из крупнейших частных медицинских центров Центральной Азии. Аккредитация JCI, 150+ высококвалифицированных врачей, оборудование SIEMENS, робот-ассистированная хирургия и лаборатория Roche/Sysmex — всё в одном месте, 24/7."))}
            </p>
            <Link to="/klinika-haqida" className="relative mt-8 inline-block rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-foreground">{t(l("Batafsil", "Подробнее"))}</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {stats.map((s, i) => {
              const Icon = icons[i]!;
              return (
                <div key={i} className="rounded-2xl border border-border bg-card shadow-soft p-6 md:p-8">
                  <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  <div className="mt-6 text-2xl font-bold"><Counter to={s.n} plus={s.plus} year={s.year} /></div>
                  <div className="mt-2 text-sm text-muted-foreground md:text-base">{t(s.l)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {why.map(([I, ti, tx]) => (
          <div key={ti.uz} className="rounded-2xl border border-border bg-card shadow-soft p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent"><I className="h-6 w-6 text-primary" /></span>
            <div className="mt-5 text-lg font-semibold">{t(ti)}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t(tx)}</p>
          </div>
        ))}
      </section>

      {/* Popular departments */}
      <section className="mt-16">
        <SectionHead title={l("Ommabop bo'limlar", "Популярные отделения")} link={l("Barcha bo'limlar", "Все отделения")} to="/bolimlar" />
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <Link to="/bolimlar" className="bg-brand flex min-h-[186px] flex-col rounded-2xl p-8 text-primary-foreground hover:shadow-lg">
            <div className="text-xl font-semibold">{t(l("Barcha bo'limlar", "Все отделения"))}</div>
            <div className="mt-1 opacity-90">{t(l(`${departments.length} ta ixtisoslashgan bo'lim`, `${departments.length} специализированных отделений`))}</div>
            <span className="mt-auto w-fit rounded-full bg-card px-4 py-2 text-sm text-foreground">{t(l("Batafsil", "Подробнее"))}</span>
          </Link>
          {popular.slice(0, 2).map((d) => <DeptCard key={d.slug} slug={d.slug} ti={d.title} d={d.short} />)}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {popular.slice(2).map((d) => <DeptCard key={d.slug} slug={d.slug} ti={d.title} d={d.short} />)}
        </div>
      </section>

      {/* Body map */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-primary-deep md:text-[32px]">{t(l("Sizni nima bezovta qilyapti?", "Что вас беспокоит?"))}</h2>
        <p className="mt-2 text-lg text-muted-foreground">{t(l("Qaysi mutaxassisga murojaat qilishni bilish uchun tana qismini tanlang.", "Выберите часть тела, чтобы узнать, к какому специалисту обратиться."))}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-[440px_1fr]">
          <div className="relative mx-auto h-[560px] w-[300px]">
            <img src={BODY} alt="Anatomiya" className="h-full w-full object-contain" loading="lazy" />
            {bodyParts.map((p) => (
              <button key={p.id} aria-label={t(p.label)} onClick={() => setPart(p)} style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className={`absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${part?.label.uz === p.label.uz ? "bg-primary/30" : "bg-card/50"}`}>
                <span className={`h-3.5 w-3.5 animate-pulse rounded-full border-2 border-card ${part?.label.uz === p.label.uz ? "bg-primary" : "bg-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-border bg-card shadow-soft p-8">
            {part ? (
              <div className="w-full self-start">
                <div className="text-sm text-primary">{t(l("Tanlangan qism", "Выбранная часть"))}</div>
                <h3 className="mt-1 text-2xl font-semibold">{t(part.label)}</h3>
                <p className="mt-2 text-muted-foreground">{t(l("Quyidagi mutaxassislarga murojaat qilishingiz mumkin:", "Вы можете обратиться к следующим специалистам:"))}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {part.docs.map((s) => specBySlug(s)).filter((s) => !!s).map((s) => (
                    <Link key={s!.slug} to="/shifokorlar" search={{ spec: s!.slug }} className="flex items-center justify-between rounded-2xl bg-secondary p-4 hover:bg-accent hover:text-primary">
                      <span>{t(s!.name)} <span className="text-xs text-muted-foreground">({s!.count})</span></span> <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
                <button onClick={() => book()} className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">{t(l("Qabulga yozilish", "Записаться на приём"))}</button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent"><MousePointerClick className="h-7 w-7 text-primary" /></div>
                <div className="mt-6 text-xl font-semibold">{t(l("Xaritada tana qismini tanlang", "Выберите часть тела на карте"))}</div>
                <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">{t(l("Nuqtalardan birini bosing — kerakli shifokorlarni ko'rsatamiz.", "Нажмите на одну из точек — покажем нужных врачей."))}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <BookCta />

      {/* Doctors */}
      <section className="mt-16">
        <SectionHead title={l("Ishonchli shifokorlar", "Надёжные врачи")} sub={l(`${doctors.length} ta mutaxassis sizga yordam berishga tayyor`, `${doctors.length} специалистов готовы вам помочь`)} link={l("Barcha shifokorlar", "Все врачи")} to="/shifokorlar" />
        <div className="relative">
          <div ref={docRef} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
            {featured.map((d) => <div key={d.id} className="w-[calc(50%-8px)] shrink-0 snap-start md:w-[calc(25%-12px)] lg:w-[calc(20%-13px)]"><DoctorCard d={d} /></div>)}
          </div>
          <ArrowBtn side="left" onClick={() => scrollBy(docRef.current, -1)} />
          <ArrowBtn side="right" onClick={() => scrollBy(docRef.current, 1)} />
        </div>
        <div className="mt-6 text-center"><Link to="/shifokorlar" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">{t(l("Barcha shifokorlar", "Все врачи"))}</Link></div>
      </section>

      {/* Checkups */}
      <section className="mt-16">
        <SectionHead title={l("Check-up dasturlari", "Программы Check-up")} sub={l("Bir kunda kompleks tekshiruv", "Комплексное обследование за один день")} link={l("Barcha dasturlar", "Все программы")} to="/chekaplar" />
        <div className="grid gap-4 md:grid-cols-3">
          {checkups.slice(0, 3).map((c) => (
            <Link key={c.slug} to="/chekaplar" hash={c.slug} className="group flex flex-col rounded-2xl border border-border bg-card shadow-soft p-6 transition hover:shadow-lift hover:border-primary/30">
              <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{t(l("1 kun", "1 день"))}</span>
              <div className="mt-4 text-xl font-semibold">{t(c.title)}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t(c.desc)}</p>
              <div className="mt-4 text-sm">{c.consult} {t(l("konsultatsiya", "консультаций"))} · {c.lab} {t(l("tahlil", "анализов"))} · {c.instr} {t(l("diagnostika", "диагностик"))}</div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-bold text-primary">{c.price ? `${c.price} UZS` : t(l("Narxni aniqlang", "Уточните цену"))}</span>
                <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="mt-16 overflow-hidden">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary-deep md:text-[32px]">{t(l("Bizning hamkorlarimiz", "Наши партнёры"))}</h2>
        <div className="animate-marquee flex w-max gap-4">
          {[...partners, ...partners].map((p, k) => (
            <div key={k} className="grid h-32 w-52 shrink-0 place-items-center rounded-2xl border border-border bg-card shadow-soft p-5">
              <img src={p} alt="Hamkor" loading="lazy" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="mt-16">
        <SectionHead title={l("Yangiliklar va tadbirlar", "Новости и события")} link={l("Barcha yangiliklar", "Все новости")} to="/yangiliklar" />
        <div className="relative">
          <div ref={newsRef} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
            {newsList.slice(0, 8).map((n) => (
              <Link key={n.id} to="/yangiliklar/$id" params={{ id: n.id }} className="group flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft md:w-[calc(33.333%-11px)]">
                <div className="overflow-hidden"><img src={img(n.photo)} alt={t(n.title)} loading="lazy" className="aspect-[448/300] w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-xs text-primary">{t(n.date)}</div>
                  <h3 className="mt-2 line-clamp-3 font-semibold">{t(n.title)}</h3>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{t(n.excerpt)}</p>
                  <span className="mt-6 w-fit rounded-full bg-secondary px-4 py-1.5 text-sm group-hover:bg-primary group-hover:text-primary-foreground">{t(l("O'qish", "Читать"))}</span>
                </div>
              </Link>
            ))}
          </div>
          <ArrowBtn side="left" onClick={() => scrollBy(newsRef.current, -1)} />
          <ArrowBtn side="right" onClick={() => scrollBy(newsRef.current, 1)} />
        </div>
      </section>

      {/* Contacts */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-primary-deep md:text-[32px]">{t(l("Biz har doim sog'lig'ingiz haqida g'amxo'rlik qilishga tayyormiz", "Мы всегда готовы позаботиться о вашем здоровье"))}</h2>
        <p className="mt-2 text-lg text-muted-foreground">{t(l("Keling — sizni diqqat, professionallik va samimiy g'amxo'rlik kutmoqda", "Приходите — вас ждут внимание, профессионализм и искренняя забота"))}</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-[2fr_3fr]">
          <div>
            <div className="flex items-center gap-3 text-lg text-muted-foreground">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary"><MapPin className="h-5 w-5 text-primary-foreground" /></span>
              {t(ADDRESS)}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card shadow-soft p-8">
                <PhoneCall className="h-7 w-7" strokeWidth={1.5} />
                <div className="mt-10 text-xl font-semibold">{t(l("Kontaktlar", "Контакты"))}</div>
                <div className="mt-3 text-sm leading-6"><a href={PHONE_TEL} className="hover:text-primary">{PHONE}</a><br /><a href={`mailto:${EMAIL}`} className="hover:text-primary">{EMAIL}</a></div>
              </div>
              <div className="bg-brand rounded-2xl p-8 text-primary-foreground">
                <CalendarDays className="h-7 w-7" strokeWidth={1.5} />
                <div className="mt-10 text-xl font-semibold">{t(l("Ish vaqti", "Режим работы"))}</div>
                <div className="mt-3 text-sm leading-6">{HOURS.slice(0, 3).map((h) => <div key={h.uz}>{t(h)}</div>)}</div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-border bg-card shadow-soft p-6">
              <div className="mb-4 text-lg font-semibold">{t(l("Qayta qo'ng'iroq buyurtma qiling", "Заказать обратный звонок"))}</div>
              <LeadForm compact type="callback" submit={l("Menga qo'ng'iroq qiling", "Перезвоните мне")} />
            </div>
          </div>
          <iframe title="Xarita" className="h-full min-h-[400px] w-full rounded-2xl border-0" loading="lazy" src="https://www.google.com/maps?q=41.343018,69.208815&z=15&output=embed" />
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary-deep md:text-[32px]">{t(l("Ko'p beriladigan savollar", "Часто задаваемые вопросы"))}</h2>
        <div className="space-y-3">
          {faq.map(([q, a], i) => (
            <div key={q.uz} className="rounded-2xl border bg-card">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg font-medium">
                {t(q)}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary"><ChevronDown className={`h-4 w-4 transition ${open === i ? "rotate-180" : ""}`} /></span>
              </button>
              {open === i && <p className="px-5 pb-5 text-muted-foreground">{t(a)}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DeptCard({ slug, ti, d }: { slug: string; ti: L; d: L }) {
  const t = useT();
  return (
    <Link to="/bolimlar/$slug" params={{ slug }} className="group flex min-h-[186px] flex-col rounded-2xl border border-border bg-card shadow-soft p-8 transition hover:shadow-lg">
      <div className="text-xl font-semibold">{t(ti)}</div>
      <div className="mt-1 text-muted-foreground">{t(d)}</div>
      <span className="mt-auto grid h-10 w-10 place-items-center rounded-full bg-secondary transition group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="h-4 w-4" /></span>
    </Link>
  );
}
