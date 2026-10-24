import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, BookCta } from "@/components/site/Layout";
export const Route = createFileRoute("/klinika-haqida")({
  head: () => ({ meta: [{ title: "Klinika haqida — MirziyoMedline" }, { name: "description", content: "Klinika haqida — MirziyoMedline klinikasi." }, { property: "og:title", content: "Klinika haqida — MirziyoMedline" }, { property: "og:description", content: "Klinika haqida — MirziyoMedline klinikasi." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><PageHero title="Klinika haqida" /><Container><p className="rounded-2xl border border-border bg-card shadow-soft p-8 text-lg text-muted-foreground">MirziyoMedline — Toshkentdagi JCI xalqaro akkreditatsiyasiga ega yetakchi ko'p tarmoqli klinika. 2017 yildan beri faoliyat yuritadi.</p><BookCta /></Container></>),
});
