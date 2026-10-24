import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, BookCta } from "@/components/site/Layout";
export const Route = createFileRoute("/tibbiy-turizm")({
  head: () => ({ meta: [{ title: "Tibbiy turizm — MirziyoMedline" }, { name: "description", content: "Tibbiy turizm — MirziyoMedline klinikasi." }, { property: "og:title", content: "Tibbiy turizm — MirziyoMedline" }, { property: "og:description", content: "Tibbiy turizm — MirziyoMedline klinikasi." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><PageHero title="Tibbiy turizm" /><Container><p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-lg text-muted-foreground">Xorijiy bemorlar uchun to'liq hamrohlik xizmati.</p><BookCta /></Container></>),
});
