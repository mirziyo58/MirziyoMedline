import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, BookCta } from "@/components/site/Layout";
export const Route = createFileRoute("/tahlil-natijalari")({
  head: () => ({ meta: [{ title: "Tahlil natijalari — MirziyoMedline" }, { name: "description", content: "Tahlil natijalari — MirziyoMedline klinikasi." }, { property: "og:title", content: "Tahlil natijalari — MirziyoMedline" }, { property: "og:description", content: "Tahlil natijalari — MirziyoMedline klinikasi." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><PageHero title="Tahlil natijalari" /><Container><p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-lg text-muted-foreground">Tahlil natijalarini olish uchun call-markazga murojaat qiling.</p><BookCta /></Container></>),
});
