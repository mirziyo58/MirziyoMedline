import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Facebook, Globe, Headphones, Instagram, Mail, MapPin, Menu, Phone, Search, X, Youtube } from "lucide-react";
import { useSettings } from "@/lib/use-settings";
import { LOGO, SOCIAL, departments, services, specialties, type Doctor } from "@/lib/data";
import { l, useLang, useT, type L } from "@/lib/i18n";
import { useBooking } from "./Booking";
import logoMark from "@/assets/logo-mark.png";

export const top: [L, string][] = [
  [l("Klinika haqida", "О клинике"), "/klinika-haqida"], [l("Filiallar", "Филиалы"), "/filiallar"], [l("Yangiliklar", "Новости"), "/yangiliklar"],
  [l("Aksiyalar", "Акции"), "/aksiyalar"], [l("Sug'urta", "Страхование"), "/sugurta"], [l("Blog", "Блог"), "/blog"],
  [l("Rahbariyat", "Руководство"), "/rahbariyat"], [l("Karyera", "Карьера"), "/karyera"], [l("Narxlar", "Цены"), "/narxlar"],
];
const main: [L, string][] = [
  [l("Xizmatlar", "Услуги"), "/xizmatlar"], [l("Shifokorlar", "Врачи"), "/shifokorlar"], [l("Chekaplar", "Чекапы"), "/chekaplar"],
  [l("Bo'limlar", "Отделения"), "/bolimlar"], [l("Tibbiy turizm", "Медицинский туризм"), "/tibbiy-turizm"], [l("Robot-assistentli jarrohlik", "Робот-ассистированная хирургия"), "/robot-jarrohlik"],
];

function Drop({ label, to, wide, children }: { label: string; to: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className="group relative">
      <Link to={to} className="flex items-center gap-1 py-6 font-medium text-primary-deep transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>
        {label}<ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
      </Link>
      <div className={`invisible absolute left-0 top-full z-30 max-h-[70vh] translate-y-2 overflow-y-auto rounded-2xl bg-card p-5 opacity-0 border border-border shadow-lift transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${wide ? "w-[760px]" : "w-[540px]"}`}>
        <div className={`grid gap-x-6 gap-y-1 text-sm ${wide ? "grid-cols-3" : "grid-cols-2"}`}>{children}</div>
      </div>
    </div>
  );
}
const dl = "rounded-lg px-2 py-1.5 hover:bg-accent hover:text-primary";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggle = () => {
    const next = !dark; setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-label={dark ? "Light mode" : "Dark mode"}
      className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-foreground transition hover:text-primary">
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Til / Язык">
      <Globe className="h-4 w-4" />
      {(["uz", "ru"] as const).map((x) => (
        <button key={x} type="button" onClick={() => setLang(x)} aria-pressed={lang === x}
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase transition ${lang === x ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}>
          {x === "uz" ? "O'z" : "Ру"}
        </button>
      ))}
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { phone: PHONE, tel: PHONE_TEL } = useSettings();
  const t = useT();
  const [open, setOpen] = useState<string | null>(null);
  const sub: Record<string, ReactNode> = {
    "/xizmatlar": services.map((s) => <Link key={s.slug} to="/xizmatlar/$slug" params={{ slug: s.slug }} onClick={onClose} className={dl}>{t(s.title)}</Link>),
    "/shifokorlar": specialties.map((s) => <Link key={s.slug} to="/shifokorlar" search={{ spec: s.slug }} onClick={onClose} className={dl}>{t(s.name)}</Link>),
    "/bolimlar": departments.map((d) => <Link key={d.slug} to="/bolimlar/$slug" params={{ slug: d.slug }} onClick={onClose} className={dl}>{t(d.title)}</Link>),
  };
  return (
    <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t bg-card p-4 lg:hidden">
      <div className="flex items-center justify-between px-3 py-2"><LangSwitch /><a href={PHONE_TEL} className="text-sm font-semibold text-primary">{PHONE}</a></div>
      {main.map(([lb, to]) => (
        <div key={to}>
          <div className="flex items-center">
            <Link to={to} onClick={onClose} className="flex-1 rounded-lg px-3 py-2.5 font-medium hover:bg-accent">{t(lb)}</Link>
            {sub[to] && <button aria-label="Ochish" onClick={() => setOpen(open === to ? null : to)} className="grid h-10 w-10 place-items-center"><ChevronDown className={`h-4 w-4 transition ${open === to ? "rotate-180" : ""}`} /></button>}
          </div>
          {open === to && <div className="grid grid-cols-2 gap-1 px-3 pb-2 text-sm">{sub[to]}</div>}
        </div>
      ))}
      <div className="my-2 border-t" />
      <div className="grid grid-cols-2">
        {[...top, [l("Tahlil natijalari", "Результаты анализов"), "/tahlil-natijalari"] as [L, string]].map(([lb, to]) => (
          <Link key={to} to={to} onClick={onClose} className="rounded-lg px-3 py-2 text-sm hover:bg-accent">{t(lb)}</Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const { phone: PHONE, tel: PHONE_TEL } = useSettings();
  const [m, setM] = useState(false);
  const t = useT();
  const book = useBooking();
  return (
    <>
      <div className="hidden border-b border-border bg-secondary text-[13px] text-muted-foreground lg:block">
        <div className="mx-auto flex max-w-[1376px] items-center justify-between px-4 py-2">
          <div className="flex gap-5">
            {top.map(([lb, to]) => (
              <Link key={to} to={to} className="flex items-center gap-1 hover:text-primary" activeProps={{ className: "text-primary" }}>
                {t(lb)}{to === "/aksiyalar" && <span className="rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">%</span>}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <LangSwitch />
            <span className="text-muted-foreground">UZS</span>
            <Link to="/tahlil-natijalari" className="flex items-center gap-1.5 hover:text-primary">{t(l("Tahlil natijalari", "Результаты анализов"))} <span className="rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">24/7</span></Link>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 shadow-header backdrop-blur-md">
        <div className="mx-auto flex max-w-[1376px] items-center justify-between gap-4 px-4">
          <Link to="/" className="shrink-0"><span className="my-4 block"><span className="flex items-center gap-2 py-1 text-2xl font-bold tracking-tight text-primary-deep"><img src={logoMark} alt="" width={40} height={40} className="h-10 w-10 rounded-xl border border-border bg-card p-1" /><span><span className="text-primary">Mirziyo</span>Medline</span></span></span></Link>
          <nav className="hidden items-center gap-5 text-[15px] lg:flex">
            <Drop label={t(l("Xizmatlar", "Услуги"))} to="/xizmatlar">
              {services.map((s) => <Link key={s.slug} to="/xizmatlar/$slug" params={{ slug: s.slug }} className={dl}>{t(s.title)}</Link>)}
            </Drop>
            <Drop label={t(l("Shifokorlar", "Врачи"))} to="/shifokorlar" wide>
              <Link to="/shifokorlar" className={`${dl} font-semibold text-primary`}>{t(l("Barcha shifokorlar", "Все врачи"))}</Link>
              {specialties.map((s) => <Link key={s.slug} to="/shifokorlar" search={{ spec: s.slug }} className={dl}>{t(s.name)}</Link>)}
            </Drop>
            <Link to="/chekaplar" className="font-medium hover:text-primary" activeProps={{ className: "text-primary" }}>{t(l("Chekaplar", "Чекапы"))}</Link>
            <Drop label={t(l("Bo'limlar", "Отделения"))} to="/bolimlar">
              <Link to="/bolimlar" className={`${dl} font-semibold text-primary`}>{t(l("Barcha bo'limlar", "Все отделения"))}</Link>
              {departments.map((d) => <Link key={d.slug} to="/bolimlar/$slug" params={{ slug: d.slug }} className={dl}>{t(d.title)}</Link>)}
            </Drop>
            <Link to="/tibbiy-turizm" className="font-medium hover:text-primary" activeProps={{ className: "text-primary" }}>{t(l("Tibbiy turizm", "Медтуризм"))}</Link>
            <Link to="/robot-jarrohlik" className="relative font-medium hover:text-primary" activeProps={{ className: "text-primary" }}>
              {t(l("Robot-jarrohlik", "Робот-хирургия"))}
              <span className="absolute -right-5 -top-3 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">new</span>
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <a href={PHONE_TEL} className="bg-phone hidden items-center gap-2 rounded-lg px-5 py-3 transition hover:opacity-90 text-sm font-semibold text-primary-foreground xl:flex">
              <Headphones className="h-5 w-5" /> {PHONE}
            </a>
            <button onClick={() => book()} className="hidden rounded-lg bg-primary px-5 py-3 hover:bg-primary-hover transition text-sm font-semibold text-primary-foreground sm:block xl:hidden">{t(l("Yozilish", "Записаться"))}</button>
            <ThemeToggle />
            <div className="lg:hidden"><MiniLang /></div>
            <button aria-label="Menyu" onClick={() => setM(!m)} className="grid h-11 w-11 place-items-center rounded-full bg-secondary lg:hidden">{m ? <X /> : <Menu />}</button>
          </div>
        </div>
        {m && <MobileMenu onClose={() => setM(false)} />}
      </header>
    </>
  );
}

function MiniLang() {
  const { lang, setLang } = useLang();
  return <button onClick={() => setLang(lang === "uz" ? "ru" : "uz")} className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-xs font-bold uppercase">{lang === "uz" ? "Ру" : "O'z"}</button>;
}

function Col({ title, items }: { title: string; items: ReactNode[] }) {
  return (
    <div>
      <div className="font-semibold">{title}</div>
      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">{items.map((i, k) => <li key={k}>{i}</li>)}</ul>
    </div>
  );
}
const fl = "hover:text-primary";

export function Footer() {
  const { address: ADDRESS, email: EMAIL, phone: PHONE, tel: PHONE_TEL, short: SHORT } = useSettings();
  const t = useT();
  const soc = [[Instagram, SOCIAL.instagram, "Instagram"], [Facebook, SOCIAL.facebook, "Facebook"], [Youtube, SOCIAL.youtube, "YouTube"]] as const;
  return (
    <footer className="mt-20 border-t bg-card">
      <div className="mx-auto grid max-w-[1376px] gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <span className="flex items-center gap-2 py-1 text-2xl font-bold tracking-tight text-primary-deep"><img src={logoMark} alt="" width={40} height={40} className="h-10 w-10 rounded-xl border border-border bg-card p-1" /><span><span className="text-primary">Mirziyo</span>Medline</span></span>
          <a href={PHONE_TEL} className="mt-6 block text-xl font-semibold hover:text-primary">{PHONE}</a>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">{t(l("Qo'ng'iroq markazi", "Колл-центр"))} · {t(l("qisqa raqam", "короткий номер"))} <b className="text-foreground">{SHORT}</b> <span className="rounded-full bg-accent px-2 text-xs font-semibold text-primary">24/7</span></div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t(ADDRESS)}</div>
            <a href={`mailto:${EMAIL}`} className="flex gap-2 hover:text-primary"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{EMAIL}</a>
          </div>
          <div className="mt-5 text-xs leading-6 text-muted-foreground">{t(l("Ro'yxatdan o'tish guvohnomasi", "Свидетельство о регистрации"))}: №520218 / 23.05.2017<br />{t(l("Litsenziya", "Лицензия"))}: №00378 / 19.07.2018</div>
          <div className="mt-6 flex gap-3">
            {soc.map(([I, href, name]) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name} className="grid h-10 w-10 place-items-center rounded-full bg-secondary transition hover:bg-primary hover:text-primary-foreground"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <Col title={t(l("Xizmatlar", "Услуги"))} items={[...services.slice(0, 8).map((s) => <Link to="/xizmatlar/$slug" params={{ slug: s.slug }} className={fl}>{t(s.title)}</Link>), <Link to="/chekaplar" className={fl}>{t(l("Chekaplar", "Чекапы"))}</Link>]} />
        <Col title={t(l("Bo'limlar", "Отделения"))} items={[<Link to="/bolimlar" className={fl}>{t(l("Barcha bo'limlar", "Все отделения"))}</Link>, ...departments.slice(0, 8).map((d) => <Link to="/bolimlar/$slug" params={{ slug: d.slug }} className={fl}>{t(d.title)}</Link>)]} />
        <Col title={t(l("Ma'lumot", "Информация"))} items={[...top.map(([lb, to]) => <Link to={to} className={fl}>{t(lb)}</Link>), <Link to="/tibbiy-turizm" className={fl}>{t(l("Tibbiy turizm", "Медицинский туризм"))}</Link>, <Link to="/tahlil-natijalari" className={fl}>{t(l("Tahlil natijalari", "Результаты анализов"))}</Link>]} />
      </div>
      <div className="bg-secondary">
        <div className="mx-auto flex max-w-[1376px] flex-wrap justify-between gap-2 px-4 py-4 text-xs text-muted-foreground">
          <span>© 2017–2026 MirziyoMedline University Hospital · {t(l("Barcha huquqlar himoyalangan", "Все права защищены"))}</span>
          <span>JCI Gold Seal of Approval®</span>
        </div>
      </div>
    </footer>
  );
}

/** Floating call / booking buttons (no messenger bot on the site). */
export function FloatingActions() {
  const { tel: PHONE_TEL } = useSettings();
  const book = useBooking();
  const t = useT();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 400);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <a href={PHONE_TEL} aria-label={t(l("Qo'ng'iroq qilish", "Позвонить"))} className="grid h-14 w-14 place-items-center rounded-full bg-card text-primary shadow-xl ring-1 ring-border transition hover:scale-105">
        <Phone className="h-6 w-6" />
      </a>
      <button onClick={() => book()} className={`flex items-center gap-2 rounded-full bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-xl transition hover:scale-105 ${show ? "" : "sm:hidden"}`}>
        {t(l("Qabulga yozilish", "Записаться"))}
      </button>
    </div>
  );
}

export function PageHero({ title, subtitle, crumbs = [], children }: { title: L | string; subtitle?: L; crumbs?: [L, string][]; children?: ReactNode }) {
  const t = useT();
  const tt = typeof title === "string" ? title : t(title);
  return (
    <section className="page-hero border-b border-border">
    <div className="mx-auto max-w-[1376px] px-4 pb-10 pt-6 md:pb-12">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground" aria-label="breadcrumb">
        <Link to="/" className="hover:text-primary">{t(l("Bosh sahifa", "Главная"))}</Link>
        {crumbs.map(([lb, to]) => (
          <span key={to} className="flex items-center gap-1"><ChevronRight className="h-3 w-3" /><Link to={to} className="hover:text-primary">{t(lb)}</Link></span>
        ))}
        <ChevronRight className="h-3 w-3" /><span className="line-clamp-1 text-foreground">{tt}</span>
      </nav>
      <span className="mt-6 block h-1 w-10 rounded-full bg-teal" aria-hidden="true" />
      <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-primary-deep md:text-[44px]">{tt}</h1>
      {subtitle && <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{t(subtitle)}</p>}
      {children}
    </div>
    </section>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto mt-8 max-w-[1376px] px-4 ${className}`}>{children}</div>;
}

export function SectionHead({ title, sub, link, to }: { title: L; sub?: L; link?: L; to?: string }) {
  const t = useT();
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-primary-deep md:text-[32px]">{t(title)}</h2>
        {sub && <p className="mt-2 text-muted-foreground">{t(sub)}</p>}
      </div>
      {link && to && <Link to={to} className="hidden shrink-0 items-center gap-1 text-lg text-primary hover:underline sm:flex">{t(link)} <ArrowUpRight className="h-5 w-5" /></Link>}
    </div>
  );
}

export function BookCta({ title, text }: { title?: L; text?: L }) {
  const { phone: PHONE, tel: PHONE_TEL } = useSettings();
  const t = useT();
  const book = useBooking();
  return (
    <section className="bg-brand relative mt-14 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-2xl p-8 text-primary-foreground md:flex-row md:items-center md:p-10">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-card/10" />
      <div className="relative">
        <h3 className="text-2xl font-semibold md:text-3xl">{t(title ?? l("Qaysi shifokor kerakligini bilmayapsizmi?", "Не знаете, какой врач нужен?"))}</h3>
        <p className="mt-2 max-w-2xl text-lg opacity-90">{t(text ?? l("Ariza qoldiring yoki qo'ng'iroq qiling — maslahat beramiz va kerakli mutaxassisga yozib qo'yamiz.", "Оставьте заявку или позвоните — проконсультируем и запишем к нужному специалисту."))}</p>
      </div>
      <div className="relative flex flex-wrap gap-3">
        <button onClick={() => book()} className="rounded-lg bg-card px-6 py-3 text-sm font-semibold text-primary-deep transition hover:bg-secondary">{t(l("Qabulga yozilish", "Записаться на приём"))}</button>
        <a href={PHONE_TEL} className="rounded-lg border border-primary-foreground/40 px-6 py-3 transition hover:bg-primary-foreground/10 text-sm font-semibold">{PHONE}</a>
      </div>
    </section>
  );
}

export function DoctorCard({ d }: { d: Doctor }) {
  const t = useT();
  const book = useBooking();
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:shadow-lift hover:border-primary/30">
      <Link to="/shifokorlar/$id" params={{ id: d.id }} className="relative block aspect-[262/300] overflow-hidden bg-muted">
        <img src={d.photo} alt={t(d.name)} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
        {d.head && <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">{t(l("Bo'lim mudiri", "Заведующий"))}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link to="/shifokorlar/$id" params={{ id: d.id }} className="font-semibold leading-snug hover:text-primary">{t(d.name)}</Link>
        <div className="mt-1 text-sm text-primary">{t(d.spec)}</div>
        {d.exp > 0 && <div className="mt-1 text-xs text-muted-foreground">{t(l("Tajriba", "Стаж"))}: {d.exp} {t(l("yil", "лет"))}</div>}
        <div className="flex-1 pb-3" />
        <button onClick={() => book({ type: "doctor", title: l(`Qabulga yozilish: ${d.name.uz}`, `Запись к врачу: ${d.name.ru}`), hidden: { Shifokor: `${d.name.uz} (${d.spec.uz})` }, fields: [{ key: "Qulay vaqt", label: l("Qulay sana", "Удобная дата"), kind: "date" }, { key: "Izoh", label: l("Izoh (ixtiyoriy)", "Комментарий"), kind: "textarea" }] })}
          className="mt-auto w-full translate-y-0 rounded-full bg-secondary py-2 text-sm transition group-hover:bg-primary group-hover:text-primary-foreground">
          {t(l("Qabulga yozilish", "Записаться"))}
        </button>
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-border bg-card shadow-soft p-6 md:p-8 ${className}`}>{children}</div>;
}

/** Renders article paragraphs with **bold** and ### headings. */
export function Prose({ paras }: { paras: string[] }) {
  return (
    <div className="space-y-4 text-[17px] leading-relaxed text-foreground/90">
      {paras.map((p, i) => {
        if (p.startsWith("### ") || p.startsWith("## ")) return <h3 key={i} className="pt-2 text-xl font-semibold text-foreground">{p.replace(/^#+\s*/, "")}</h3>;
        const parts = p.split(/\*\*(.+?)\*\*/g);
        return <p key={i}>{parts.map((s, k) => (k % 2 ? <b key={k} className="text-foreground">{s}</b> : s))}</p>;
      })}
    </div>
  );
}

export function SearchBar({ initial = "" }: { initial?: string }) {
  const t = useT();
  const nav = useNavigate();
  const [q, setQ] = useState(initial);
  return (
    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (q.trim()) nav({ to: "/qidiruv", search: { q: q.trim() } }); }}>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(l("Shifokor, xizmat yoki bo'lim qidirish", "Поиск врачей, услуг и отделений"))} className="w-full rounded-full border bg-card py-3 pl-11 pr-5 text-sm outline-none focus:border-primary" />
      </div>
      <button className="rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground sm:px-8">{t(l("Topish", "Найти"))}</button>
    </form>
  );
}

export function ArrowBtn({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const I = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button aria-label={side === "left" ? "Oldingi" : "Keyingi"} onClick={onClick} className={`absolute top-1/3 z-10 hidden h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg md:grid ${side === "left" ? "-left-5" : "-right-5"}`}>
      <I className="h-5 w-5" />
    </button>
  );
}
