import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, FloatingActions } from "@/components/site/Layout";
import { BookingProvider } from "@/components/site/Booking";
import { LangProvider, l, useT } from "@/lib/i18n";
import { useSettings } from "@/lib/use-settings";
import { getPublicCatalog } from "@/lib/catalog.functions";
import { hydrateCatalog } from "@/lib/catalog";

function NotFoundComponent() {
  const t = useT();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">{t(l("Sahifa topilmadi", "Страница не найдена"))}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t(l("Siz qidirgan sahifa mavjud emas yoki ko'chirilgan.", "Запрашиваемая страница не существует или была перемещена."))}</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            {t(l("Bosh sahifaga", "На главную"))}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Sahifa yuklanmadi / Страница не загрузилась</h1>
        <p className="mt-2 text-sm text-muted-foreground">Iltimos, sahifani yangilang. / Пожалуйста, обновите страницу.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Qayta urinish / Повторить
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Bosh sahifa / Главная
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MirziyoMedline University Hospital" },
      { name: "description", content: "MirziyoMedline — JCI akkreditatsiyasiga ega ko'p tarmoqli klinika, Toshkent." },
      { property: "og:site_name", content: "MirziyoMedline" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  loader: () => getPublicCatalog(),
  staleTime: 60_000,
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="uz">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}` }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  hydrateCatalog(Route.useLoaderData());
  const isAdmin = useLocation({ select: (l) => l.pathname.startsWith("/admin") });

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <BookingProvider>
          {isAdmin ? <Outlet /> : (
          <div className="min-h-screen bg-background text-foreground">
            <Announcement />
            <Header />
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <main>
              <Outlet />
            </main>
            <Footer />
            <FloatingActions />
          </div>
          )}
        </BookingProvider>
      </LangProvider>
    </QueryClientProvider>
  );
}

function Announcement() {
  const { announcement } = useSettings();
  const t = useT();
  if (!announcement) return null;
  return <div className="bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">{t(announcement)}</div>;
}
