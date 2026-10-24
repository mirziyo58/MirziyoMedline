import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, BookCta } from "@/components/site/Layout";
export const Route = createFileRoute("/sugurta")({
  head: () => ({ meta: [{ title: "Sug'urta — MirziyoMedline" }, { name: "description", content: "Sug'urta — MirziyoMedline klinikasi." }, { property: "og:title", content: "Sug'urta — MirziyoMedline" }, { property: "og:description", content: "Sug'urta — MirziyoMedline klinikasi." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><PageHero title="Sug'urta" /><Container><p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-lg text-muted-foreground">Yetakchi sug'urta kompaniyalari bilan hamkorlik qilamiz.</p><BookCta /></Container></>),
});
