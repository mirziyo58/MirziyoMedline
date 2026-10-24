import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, BookCta } from "@/components/site/Layout";
export const Route = createFileRoute("/rahbariyat")({
  head: () => ({ meta: [{ title: "Rahbariyat — MirziyoMedline" }, { name: "description", content: "Rahbariyat — MirziyoMedline klinikasi." }, { property: "og:title", content: "Rahbariyat — MirziyoMedline" }, { property: "og:description", content: "Rahbariyat — MirziyoMedline klinikasi." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><PageHero title="Rahbariyat" /><Container><p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-lg text-muted-foreground">Klinika rahbariyati.</p><BookCta /></Container></>),
});
