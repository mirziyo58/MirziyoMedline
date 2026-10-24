import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, BookCta } from "@/components/site/Layout";
export const Route = createFileRoute("/narxlar")({
  head: () => ({ meta: [{ title: "Narxlar — MirziyoMedline" }, { name: "description", content: "Narxlar — MirziyoMedline klinikasi." }, { property: "og:title", content: "Narxlar — MirziyoMedline" }, { property: "og:description", content: "Narxlar — MirziyoMedline klinikasi." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><PageHero title="Narxlar" /><Container><p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-lg text-muted-foreground">Xizmatlar narxlari bo'yicha +998 (71) 203-30-03 raqamiga murojaat qiling.</p><BookCta /></Container></>),
});
