import { createServerFn } from "@tanstack/react-start";
import { formatLead, leadSchema } from "./lead-format";


/** Saves a site form submission (visible in /admin) and sends it to the clinic's Telegram chat(s). */
export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => leadSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // bot/spam submission — silently ignore

    let stored = false;
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("leads").insert({
        type: data.type, name: data.name, phone: data.phone, lang: data.lang, page: data.page ?? null, fields: data.fields,
      });
      if (error) console.error("Lead insert failed:", error.message);
      else stored = true;
    } catch (e) {
      console.error("Lead insert error:", e);
    }

    let delivered = 0;
    try {
      const { notifyAdmins } = await import("./telegram.server");
      delivered = await notifyAdmins(formatLead(data));
    } catch (e) {
      console.error("Telegram notify error:", e);
    }

    if (!stored && delivered === 0) throw new Error("send_failed");
    return { ok: true };
  });
