import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container } from "@/components/site/Layout";
import { LeadForm } from "@/components/site/LeadForm";
import { bookingFields } from "@/components/site/Booking";
import { l, useT } from "@/lib/i18n";
import { useSettings } from "@/lib/use-settings";
import hospital from "@/assets/qabul-hospital.jpg";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/qabul")({
  head: () => ({ meta: [{ title: "Qabulga yozilish — MirziyoMedline" }, { name: "description", content: "MirziyoMedline shifokoriga onlayn qabulga yoziling." }, { property: "og:title", content: "Qabulga yozilish — MirziyoMedline" }, { property: "og:description", content: "MirziyoMedline shifokoriga onlayn qabulga yoziling." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Qabul,
});

function Qabul() {
  const t = useT();
  const s = useSettings();
  return (
    <>
      <PageHero title={l("Qabulga yozilish", "Запись на приём")} subtitle={l("Ma'lumotlaringizni qoldiring — siz bilan bog'lanamiz.", "Оставьте данные — мы свяжемся с вами.")} />
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card shadow-soft p-6 sm:p-8"><LeadForm type="booking" fields={bookingFields()} /></div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <img src={hospital} alt="MirziyoMedline University Hospital" className="aspect-[16/10] w-full object-cover" />
            <div className="p-6">
              <p className="text-lg font-semibold">MirziyoMedline University Hospital</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(s.address)}</p>
              <a href={s.tel} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 hover:bg-primary-hover transition text-sm font-semibold text-primary-foreground"><Phone className="h-4 w-4" />{s.phone}</a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
