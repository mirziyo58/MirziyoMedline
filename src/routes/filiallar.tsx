import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, BookCta } from "@/components/site/Layout";
export const Route = createFileRoute("/filiallar")({
  head: () => ({ meta: [{ title: "Filiallar — MirziyoMedline" }, { name: "description", content: "Filiallar — MirziyoMedline klinikasi." }, { property: "og:title", content: "Filiallar — MirziyoMedline" }, { property: "og:description", content: "Filiallar — MirziyoMedline klinikasi." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><PageHero title="Filiallar" /><Container><p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-lg text-muted-foreground">Bosh klinika: Toshkent sh., Olmazor tumani, Kichik Halqa yo'li ko'chasi, 5A-uy.</p><BookCta /></Container></>),
});
