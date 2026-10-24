import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";

const B = {
  book: "📝 Qabulga yozilish",
  fb: "💬 Shikoyat / taklif",
  contact: "📞 Aloqa",
  doctors: "👨‍⚕️ Shifokorlar",
  cancel: "❌ Bekor qilish",
  complaint: "😟 Shikoyat",
  suggestion: "💡 Taklif",
};
const mainKb = { keyboard: [[{ text: B.book }], [{ text: B.fb }, { text: B.contact }], [{ text: B.doctors }]], resize_keyboard: true };
const cancelKb = { keyboard: [[{ text: B.cancel }]], resize_keyboard: true };
const phoneKb = { keyboard: [[{ text: "📱 Raqamni yuborish", request_contact: true }], [{ text: B.cancel }]], resize_keyboard: true };

type State = { step?: string; name?: string; phone?: string; kind?: string };

export const Route = createFileRoute("/api/public/telegram")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { supabaseAdmin: sb } = await import("@/integrations/supabase/client.server");
        const { tg, notifyAdmins, esc } = await import("@/lib/telegram.server");
        const { data: cfg } = await sb.from("bot_config").select("*").eq("id", 1).maybeSingle();
        const got = request.headers.get("x-telegram-bot-api-secret-token") ?? "";
        const want = cfg?.webhook_secret ?? "";
        const h = (s: string) => createHash("sha256").update(s).digest();
        if (!cfg?.token || !want || !timingSafeEqual(h(got), h(want))) return new Response("forbidden", { status: 401 });
        const token = cfg.token;

        let upd: any;
        try {
          upd = await request.json();
        } catch {
          return new Response("ok");
        }
        const msg = upd?.message;
        if (!msg?.chat?.id || msg.chat.type !== "private") return new Response("ok");
        const chat_id = Number(msg.chat.id);
        const from = msg.from ?? {};
        const text: string = String(msg.text ?? "").slice(0, 2000).trim();
        const send = (t: string, kb: unknown = mainKb) => tg(token, "sendMessage", { chat_id, text: t, reply_markup: kb, parse_mode: "HTML" });

        const { data: user } = await sb.from("bot_users").select("state, phone").eq("chat_id", chat_id).maybeSingle();
        await sb.from("bot_users").upsert({
          chat_id, first_name: from.first_name ?? null, last_name: from.last_name ?? null, username: from.username ?? null,
          last_seen: new Date().toISOString(), blocked: false, ...(user ? {} : { state: {} }),
        });
        let st: State = (user?.state as State) ?? {};
        const setState = (s: State) => sb.from("bot_users").update({ state: s }).eq("chat_id", chat_id);

        try {
          if (text === "/start" || text.startsWith("/start ") || text === B.cancel) {
            await setState({});
            await send(text === B.cancel ? "Bekor qilindi. Bosh menyu:" : esc(cfg.welcome_uz));
          } else if (text === B.contact) {
            const { data: s } = await sb.from("site_settings").select("key, value");
            const m: any = Object.fromEntries((s ?? []).map((r) => [r.key, r.value]));
            await send(`📞 <b>${esc(m.phone ?? "")}</b>${m.short ? `\n☎️ Qisqa raqam: <b>${esc(m.short)}</b>` : ""}\n✉️ ${esc(m.email ?? "")}\n📍 ${esc(m.address_uz ?? "")}`);
          } else if (text === B.doctors) {
            const { data: d } = await sb.from("catalog").select("data").eq("kind", "doctor").eq("active", true).order("sort").limit(30);
            let list = (d ?? []).map((r: any) => `• ${esc(r.data?.name?.uz ?? "")} — ${esc(r.data?.spec?.uz ?? "")}`);
            if (!list.length) {
              const { doctors } = await import("@/lib/data");
              list = doctors.slice(0, 30).map((x) => `• ${esc(x.name.uz)} — ${esc(x.spec.uz)}`);
            }
            await send(`👨‍⚕️ <b>Shifokorlarimiz</b>\n\n${list.join("\n")}\n\nQabulga yozilish uchun «${B.book}» tugmasini bosing.`);
          } else if (text === B.book) {
            await setState({ step: "book_name" });
            await send("Ismingiz va familiyangizni yozing:", cancelKb);
          } else if (text === B.fb) {
            await setState({ step: "fb_kind" });
            await send("Nima yubormoqchisiz?", { keyboard: [[{ text: B.complaint }, { text: B.suggestion }], [{ text: B.cancel }]], resize_keyboard: true });
          } else if (st.step === "book_name") {
            if (text.length < 2) return await send("Iltimos, ismingizni yozing:", cancelKb), new Response("ok");
            st = { step: "book_phone", name: text.slice(0, 100) };
            await setState(st);
            await send("Telefon raqamingizni yuboring (tugma orqali yoki yozib):", phoneKb);
          } else if (st.step === "book_phone") {
            const phone = String(msg.contact?.phone_number ?? text).slice(0, 30);
            if (phone.replace(/\D/g, "").length < 9) return await send("Telefon raqam noto'g'ri. Qaytadan yuboring:", phoneKb), new Response("ok");
            st = { ...st, step: "book_note", phone };
            await setState(st);
            await sb.from("bot_users").update({ phone }).eq("chat_id", chat_id);
            await send("Qaysi shifokor yoki qanday muammo bilan murojaat qilyapsiz? (qisqacha yozing)", cancelKb);
          } else if (st.step === "book_note") {
            await sb.from("leads").insert({ type: "booking", name: st.name ?? "—", phone: st.phone ?? "—", lang: "uz", source: "bot", page: "Telegram bot", fields: { Izoh: text.slice(0, 800), Telegram: from.username ? `@${from.username}` : String(chat_id) } });
            await setState({});
            await send("✅ Arizangiz qabul qilindi! Tez orada operatorimiz siz bilan bog'lanadi.");
            await notifyAdmins(`🆕 <b>Botdan qabul</b>\n👤 ${esc(st.name ?? "")}\n📞 ${esc(st.phone ?? "")}\n📝 ${esc(text)}${from.username ? `\n✈️ @${esc(from.username)}` : ""}`);
          } else if (st.step === "fb_kind" && (text === B.complaint || text === B.suggestion)) {
            await setState({ step: "fb_text", kind: text === B.complaint ? "complaint" : "suggestion" });
            await send("Fikringizni batafsil yozing:", cancelKb);
          } else if (st.step === "fb_text" && text) {
            const kind = st.kind === "suggestion" ? "suggestion" : "complaint";
            await sb.from("feedback").insert({ kind, text, name: [from.first_name, from.last_name].filter(Boolean).join(" ") || null, phone: user?.phone ?? null, chat_id, source: "bot" });
            await setState({});
            await send("🙏 Rahmat! Fikringiz rahbariyatga yetkazildi.");
            await notifyAdmins(`${kind === "complaint" ? "😟 <b>Yangi shikoyat</b>" : "💡 <b>Yangi taklif</b>"}\n👤 ${esc(from.first_name ?? "")}${from.username ? ` (@${esc(from.username)})` : ""}\n\n${esc(text)}`);
          } else {
            await send("Quyidagi menyudan tanlang:");
          }
        } catch (e) {
          console.error("Bot handler error:", e);
        }
        return new Response("ok");
      },
    },
  },
});
