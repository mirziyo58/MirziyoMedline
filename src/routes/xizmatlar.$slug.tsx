import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { BookCta, Container, PageHero } from "@/components/site/Layout";
import { LeadForm } from "@/components/site/LeadForm";
import { bookingFields } from "@/components/site/Booking";
import { img, services } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/xizmatlar/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData: s }) => (s ? seo(s.title.uz, `${s.title.uz} — ${s.short.uz}. ${s.text[0]?.uz ?? ""}`.slice(0, 160)) : seo("Xizmat", "MirziyoMedline xizmati")),
  component: Page,
});

function Page() {
  const s = Route.useLoaderData();
  const t = useT();
  return (
    <>
      <PageHero title={s.title} subtitle={s.short} crumbs={[[l("Xizmatlar", "Услуги"), "/xizmatlar"]]} />
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card shadow-soft p-6 md:p-8">
              <div className="flex items-start gap-6">
                <div className="flex-1 space-y-4 text-lg leading-relaxed text-muted-foreground">{s.text.map((p) => <p key={p.uz}>{t(p)}</p>)}</div>
                {s.icon && <img src={img(s.icon)} alt="" className="hidden h-32 w-32 object-contain md:block" />}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.features.map((f) => <div key={f.uz} className="flex items-center gap-2 rounded-2xl bg-secondary p-4 font-medium"><CheckCircle2 className="h-5 w-5 text-primary" />{t(f)}</div>)}
              </div>
            </div>
            {s.prices.length > 0 && (
              <div className="rounded-2xl border border-border bg-card shadow-soft p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{t(l("Narxlar", "Цены"))}</h2>
                  <Link to="/narxlar" className="text-sm text-primary hover:underline">{t(l("To'liq narxlar ro'yxati", "Полный прайс-лист"))}</Link>
                </div>
                <div className="mt-4 divide-y">
                  {s.prices.map(([n, p]) => (
                    <div key={n.uz} className="flex items-center justify-between gap-4 py-3.5">
                      <span>{t(n)}</span><span className="shrink-0 font-semibold">{p} {t(l("so'm", "сум"))}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">{t(l("Narxlar O'zbekiston Respublikasi fuqarolari uchun amal qiladi.", "Цены действительны для граждан Республики Узбекистан."))}</p>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-3">
              {services.filter((x) => x.slug !== s.slug).slice(0, 3).map((x) => (
                <Link key={x.slug} to="/xizmatlar/$slug" params={{ slug: x.slug }} className="rounded-2xl border border-border bg-card shadow-soft p-6 transition hover:shadow-lg">
                  <div className="font-semibold">{t(x.title)}</div><div className="mt-1 text-sm text-muted-foreground">{t(x.short)}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="h-fit rounded-2xl border border-border bg-card shadow-soft p-6 lg:sticky lg:top-24">
            <div className="text-lg font-semibold">{t(l("Xizmatga yozilish", "Записаться на услугу"))}</div>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">{t(l("Ariza qoldiring — operator siz bilan bog'lanadi.", "Оставьте заявку — оператор свяжется с вами."))}</p>
            <LeadForm compact type="booking" hidden={{ Xizmat: s.title.uz }} fields={bookingFields().slice(1)} />
          </div>
        </div>
        <BookCta />
      </Container>
    </>
  );
}
