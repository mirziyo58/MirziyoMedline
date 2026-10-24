import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Container } from "@/components/site/Layout";
import { newsList } from "@/lib/news-data";
import { img } from "@/lib/data";
import { l, useT } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/yangiliklar/")({
  head: () => seo("Yangiliklar", "MirziyoMedline klinikasining so'nggi yangiliklari va tadbirlari."),
  component: News,
});

function News() {
  const t = useT();
  return (
    <>
      <PageHero title={l("Yangiliklar", "Новости")} />
      <Container>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map((n) => (
            <Link key={n.id} to="/yangiliklar/$id" params={{ id: n.id }} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <img src={img(n.photo)} alt={t(n.title)} loading="lazy" className="aspect-[448/300] w-full object-cover" />
              <div className="p-6">
                <div className="text-xs text-primary">{t(n.date)}</div>
                <h3 className="mt-2 line-clamp-3 font-semibold group-hover:text-primary">{t(n.title)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
