import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BookCta, Container, PageHero } from "@/components/site/Layout";
import { img, services } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/xizmatlar/")({
  head: () => seo("Xizmatlar", "MirziyoMedline xizmatlari: shifokor ko'rigi, diagnostika, laboratoriya, fizioterapiya, statsionar, stomatologiya, operatsiyalar va boshqalar."),
  component: Page,
});

function Page() {
  const t = useT();
  return (
    <>
      <PageHero title={l("Xizmatlar", "Услуги")} subtitle={l("Konsultatsiyadan murakkab operatsiyagacha — barcha tibbiy xizmatlar bir klinikada.", "От консультации до сложной операции — все медицинские услуги в одной клинике.")} />
      <Container>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to="/xizmatlar/$slug" params={{ slug: s.slug }} className="group flex flex-col rounded-2xl border border-border bg-card shadow-soft p-7 transition hover:-translate-y-0.5 hover:shadow-lift hover:border-primary/30">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{t(s.title)}</h2>
                  <div className="mt-1 text-sm text-primary">{t(s.short)}</div>
                </div>
                {s.icon ? <img src={img(s.icon)} alt="" className="h-16 w-16 object-contain" loading="lazy" /> : <span className="grid h-12 w-12 place-items-center rounded-full bg-accent"><ArrowUpRight className="h-5 w-5 text-primary" /></span>}
              </div>
              <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{t(s.text[0]!)}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {s.features.slice(0, 4).map((f) => <li key={f.uz} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{t(f)}</li>)}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm">
                <span className="text-muted-foreground">{s.prices[0] ? `${t(l("dan", "от"))} ${s.prices.map((p) => Number(p[1].replace(/\s/g, ""))).sort((a, b) => a - b)[0]!.toLocaleString("ru-RU")} UZS` : t(l("Batafsil ma'lumot", "Подробнее"))}</span>
                <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
        <BookCta />
      </Container>
    </>
  );
}
