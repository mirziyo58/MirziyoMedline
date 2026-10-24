import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BookCta, Container, DoctorCard, PageHero } from "@/components/site/Layout";
import { departments, doctors, specBySlug, specialties } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { seo } from "@/lib/seo";

type S = { spec?: string | undefined; dept?: string | undefined };
export const Route = createFileRoute("/shifokorlar/")({
  validateSearch: (s: Record<string, unknown>): S => ({
    spec: typeof s["spec"] === "string" ? s["spec"] : undefined,
    dept: typeof s["dept"] === "string" ? s["dept"] : undefined,
  }),
  head: () => seo("Shifokorlar", "MirziyoMedline klinikasining 110+ malakali shifokorlari: kardiologlar, nevrologlar, jarrohlar, pediatrlar va boshqalar. Onlayn qabulga yoziling."),
  component: Page,
});

const PER = 20;
function Page() {
  const t = useT();
  const { spec, dept } = Route.useSearch();
  const [q, setQ] = useState("");
  const [n, setN] = useState(PER);
  const [sort, setSort] = useState<"default" | "exp">("default");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const r = doctors.filter((d) => (!spec || d.specSlug === spec) && (!dept || d.dept === dept) && (!s || `${d.name.uz} ${d.name.ru} ${d.spec.uz} ${d.spec.ru}`.toLowerCase().includes(s)));
    return sort === "exp" ? [...r].sort((a, b) => b.exp - a.exp) : r;
  }, [spec, dept, q, sort]);
  const sp = spec ? specBySlug(spec) : undefined;
  const dp = dept ? departments.find((d) => d.slug === dept) : undefined;
  const title = sp ? sp.name : dp ? dp.title : l("Shifokorlar", "Врачи");

  return (
    <>
      <PageHero title={title} crumbs={sp || dp ? [[l("Shifokorlar", "Врачи"), "/shifokorlar"]] : []}
        subtitle={l(`${doctors.length} ta yuqori malakali mutaxassis. Shifokorni tanlang va onlayn qabulga yoziling.`, `${doctors.length} высококвалифицированных специалистов. Выберите врача и запишитесь онлайн.`)} />
      <Container>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-border bg-card shadow-soft p-5 lg:sticky lg:top-24">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => { setQ(e.target.value); setN(PER); }} placeholder={t(l("Ism yoki mutaxassislik", "Имя или специальность"))} className="w-full rounded-xl border bg-secondary py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary" />
            </div>
            <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t(l("Mutaxassislik", "Специальность"))}</div>
            <div className="mt-2 max-h-[55vh] space-y-0.5 overflow-y-auto pr-1 text-sm">
              <Link to="/shifokorlar" search={{}} onClick={() => setN(PER)} className={`flex justify-between rounded-lg px-2 py-1.5 ${!spec && !dept ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>{t(l("Barchasi", "Все"))} <span>{doctors.length}</span></Link>
              {specialties.map((s) => (
                <Link key={s.slug} to="/shifokorlar" search={{ spec: s.slug }} onClick={() => setN(PER)} className={`flex justify-between gap-2 rounded-lg px-2 py-1.5 ${s.slug === spec ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                  <span>{t(s.name)}</span><span className="opacity-70">{s.count}</span>
                </Link>
              ))}
            </div>
          </aside>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-muted-foreground">{t(l("Topildi", "Найдено"))}: <b className="text-foreground">{list.length}</b></div>
              <select value={sort} onChange={(e) => setSort(e.target.value as "default" | "exp")} className="rounded-full border bg-card px-4 py-2 text-sm">
                <option value="default">{t(l("Standart tartib", "По умолчанию"))}</option>
                <option value="exp">{t(l("Tajriba bo'yicha", "По стажу"))}</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {list.slice(0, n).map((d) => <DoctorCard key={d.id} d={d} />)}
            </div>
            {list.length === 0 && <p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-muted-foreground">{t(l("Hech narsa topilmadi. Boshqa so'z bilan qidirib ko'ring.", "Ничего не найдено. Попробуйте другой запрос."))}</p>}
            {list.length > n && (
              <div className="mt-8 text-center">
                <button onClick={() => setN(n + PER)} className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground">{t(l("Yana ko'rsatish", "Показать ещё"))} ({list.length - n})</button>
              </div>
            )}
          </div>
        </div>
        <BookCta />
      </Container>
    </>
  );
}
