import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Users } from "lucide-react";
import { BookCta, Container, PageHero } from "@/components/site/Layout";
import { departments, doctors } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/bolimlar/")({
  head: () => seo("Bo'limlar", "MirziyoMedline klinikasining 20 ta ixtisoslashgan bo'limi: kardiologiya, nevrologiya, jarrohlik, onkologiya, urologiya, ginekologiya va boshqalar."),
  component: Page,
});

function Page() {
  const t = useT();
  return (
    <>
      <PageHero title={l("Bo'limlar", "Отделения")} subtitle={l("Har bir bo'lim zamonaviy uskunalar va tajribali mutaxassislar bilan jihozlangan.", "Каждое отделение оснащено современным оборудованием и укомплектовано опытными специалистами.")} />
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {departments.map((d) => {
            const n = doctors.filter((x) => x.dept === d.slug).length;
            return (
              <Link key={d.slug} to="/bolimlar/$slug" params={{ slug: d.slug }} className="group flex min-h-[200px] flex-col rounded-2xl border border-border bg-card shadow-soft p-6 transition hover:-translate-y-0.5 hover:shadow-lift hover:border-primary/30">
                <div className="text-lg font-semibold">{t(d.title)}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t(d.short)}</div>
                <div className="mt-auto flex items-center justify-between pt-6">
                  {n > 0 ? <span className="flex items-center gap-1.5 text-sm text-primary"><Users className="h-4 w-4" />{n} {t(l("shifokor", "врачей"))}</span> : <span />}
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary transition group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </Link>
            );
          })}
        </div>
        <BookCta />
      </Container>
    </>
  );
}
