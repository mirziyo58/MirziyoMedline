import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { PublicCatalog, CatalogRow } from "./catalog";

/** Public, read-only: active catalog items and videos for the site. */
export const getPublicCatalog = createServerFn({ method: "GET" }).handler(async (): Promise<PublicCatalog> => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const sb = createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  try {
    const [c, v] = await Promise.all([
      sb.from("catalog").select("kind, slug, data, sort").limit(1000),
      sb.from("videos").select("id, kind, title, url").order("sort").limit(200),
    ]);
    return { rows: (c.data ?? []) as CatalogRow[], videos: v.data ?? [] };
  } catch {
    return { rows: [], videos: [] };
  }
});
