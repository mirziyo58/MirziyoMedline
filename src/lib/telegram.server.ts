// Direct Telegram Bot API helpers (token is entered by the admin and stored in bot_config).
export async function tg(token: string, method: string, body: Record<string, unknown> = {}) {
  const r = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = (await r.json().catch(() => ({}))) as { ok?: boolean; result?: any; description?: string };
  if (!j.ok) console.error(`Telegram ${method} failed [${r.status}]: ${j.description ?? ""}`);
  return j;
}

export async function getBotConfig() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("bot_config").select("*").eq("id", 1).maybeSingle();
  return data;
}

export function chatIds(s: string | null | undefined) {
  return (s ?? "").split(/[\s,;]+/).map((x) => x.trim()).filter(Boolean);
}

/** Sends an HTML message to every admin chat configured in the panel. */
export async function notifyAdmins(text: string) {
  const cfg = await getBotConfig();
  if (!cfg?.token) return 0;
  let n = 0;
  for (const chat_id of chatIds(cfg.admin_chat_ids)) {
    const r = await tg(cfg.token, "sendMessage", { chat_id, text, parse_mode: "HTML", disable_web_page_preview: true });
    if (r.ok) n++;
  }
  return n;
}

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
