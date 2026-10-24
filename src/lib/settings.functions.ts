import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

/** Public site settings (phone, email, address, announcement) editable from /admin. */
export const getSettings = createServerFn({ method: "GET" }).handler(async () => {
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
  const { data } = await sb.from("site_settings").select("key, value");
  return Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) as Record<string, string>;
});
