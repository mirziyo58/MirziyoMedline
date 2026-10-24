import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, BookCta } from "@/components/site/Layout";
export const Route = createFileRoute("/robot-jarrohlik")({
  head: () => ({ meta: [{ title: "Robot-assistentli jarrohlik — MirziyoMedline" }, { name: "description", content: "Robot-assistentli jarrohlik — MirziyoMedline klinikasi." }, { property: "og:title", content: "Robot-assistentli jarrohlik — MirziyoMedline" }, { property: "og:description", content: "Robot-assistentli jarrohlik — MirziyoMedline klinikasi." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><PageHero title="Robot-assistentli jarrohlik" /><Container><p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-lg text-muted-foreground">Eng zamonaviy robot-assistentli jarrohlik operatsiyalari.</p><BookCta /></Container></>),
});
