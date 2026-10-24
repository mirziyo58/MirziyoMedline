import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, Container } from "@/components/site/Layout";
import { newsList, promoList } from "@/lib/news-data";
import { img } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/yangiliklar/$id")({
  loader: ({ params }) => {
    const a = [...newsList, ...promoList].find((x) => x.id === params.id);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData: a }) => (a ? seo(a.title.uz, a.excerpt.uz.slice(0, 160)) : seo("Yangilik", "MirziyoMedline yangiligi")),
  component: Article,
});

function Article() {
  const a = Route.useLoaderData();
  const { lang } = useLang();
  return (
    <>
      <PageHero title={a.title} />
      <Container>
        <article className="mx-auto max-w-3xl rounded-2xl border border-border bg-card shadow-soft p-6 md:p-10">
          <div className="text-sm text-primary">{a.date[lang]}</div>
          <img src={img(a.photo)} alt={a.title[lang]} className="mt-4 w-full rounded-2xl object-cover" />
          <div className="mt-6 space-y-4 leading-relaxed">
            {a.body[lang].map((p, i) => <p key={i}>{p.replace(/\*\*/g, "")}</p>)}
          </div>
        </article>
      </Container>
    </>
  );
}
