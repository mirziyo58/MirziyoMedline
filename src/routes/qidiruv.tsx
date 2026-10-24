import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Container, SearchBar } from "@/components/site/Layout";
import { doctors, departments, services } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/qidiruv")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? s["q"] : "" }),
  head: () => seo("Qidiruv", "MirziyoMedline saytida shifokor, xizmat va bo'limlarni qidiring."),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const t = useT();
  const s = q.toLowerCase();
  const m = (x: { uz: string; ru: string }) => !!s && (x.uz.toLowerCase().includes(s) || x.ru.toLowerCase().includes(s));
  const docs = doctors.filter((d) => m(d.name) || m(d.spec));
  const deps = departments.filter((d) => m(d.title));
  const servs = services.filter((d) => m(d.title));
  const empty = !docs.length && !deps.length && !servs.length;
  const item = "block rounded-2xl bg-card p-4 hover:text-primary";
  return (
    <>
      <PageHero title={l("Qidiruv", "Поиск")} />
      <Container>
        <div className="max-w-2xl"><SearchBar key={q} initial={q} /></div>
        <div className="mt-8 grid gap-3">
          {docs.map((d) => <Link key={d.id} to="/shifokorlar/$id" params={{ id: d.id }} className={item}>{t(d.name)} — <span className="text-muted-foreground">{t(d.spec)}</span></Link>)}
          {deps.map((d) => <Link key={d.slug} to="/bolimlar/$slug" params={{ slug: d.slug }} className={item}>{t(d.title)}</Link>)}
          {servs.map((d) => <Link key={d.slug} to="/xizmatlar/$slug" params={{ slug: d.slug }} className={item}>{t(d.title)}</Link>)}
          {empty && <p className="text-muted-foreground">{t(l("Hech narsa topilmadi", "Ничего не найдено"))}</p>}
        </div>
      </Container>
    </>
  );
}
