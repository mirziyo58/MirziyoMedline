import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, BookCta } from "@/components/site/Layout";
export const Route = createFileRoute("/karyera")({
  head: () => ({ meta: [{ title: "Karyera — MirziyoMedline" }, { name: "description", content: "Karyera — MirziyoMedline klinikasi." }, { property: "og:title", content: "Karyera — MirziyoMedline" }, { property: "og:description", content: "Karyera — MirziyoMedline klinikasi." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><PageHero title="Karyera" /><Container><p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-lg text-muted-foreground">Jamoamizga qo'shiling — bo'sh ish o'rinlari.</p><BookCta /></Container></>),
});
