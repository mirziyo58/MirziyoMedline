import { createServerFn } from "@tanstack/react-start";
import { getRequest, useSession } from "@tanstack/react-start/server";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { z } from "zod";

type AdminSession = { admin?: boolean };

function sessionConfig() {
  return {
    password: process.env["ADMIN_SESSION_SECRET"]!,
    name: "mm-admin",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

const same = (a: string, b: string) =>
  timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());

async function requireAdmin() {
  const s = await useSession<AdminSession>(sessionConfig());
  if (!s.data.admin) throw new Error("unauthorized");
}

async function db() {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

const fail = (e: { message: string } | null) => {
  if (e) throw new Error(e.message);
};

/* ---------- auth ---------- */
export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ login: z.string().max(100), password: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const L = process.env["ADMIN_LOGIN"] ?? "";
    const P = process.env["ADMIN_PASSWORD"] ?? "";
    const ok = !!L && !!P && same(data.login.trim(), L) && same(data.password, P);
    if (!ok) return { ok: false as const };
    const s = await useSession<AdminSession>(sessionConfig());
    await s.update({ admin: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const s = await useSession<AdminSession>(sessionConfig());
  await s.clear();
  return { ok: true };
});

export const adminMe = createServerFn({ method: "GET" }).handler(async () => {
  const s = await useSession<AdminSession>(sessionConfig());
  return { admin: !!s.data.admin };
});

/* ---------- stats ---------- */
export const adminStats = createServerFn({ method: "GET" }).handler(async () => {
  const sb = await db();
  const count = async (t: "leads" | "feedback" | "bot_users" | "catalog", f?: [string, string][]) => {
    let q = sb.from(t).select("*", { count: "exact", head: true });
    for (const [k, v] of f ?? []) q = q.eq(k, v);
    return (await q).count ?? 0;
  };
  const { defaultCatalog } = await import("./catalog");
  const cat = async (k: "doctor" | "department" | "service" | "checkup") => (await count("catalog", [["kind", k]])) || defaultCatalog[k].length;
  return {
    leads: await count("leads"),
    newLeads: await count("leads", [["status", "new"]]),
    complaints: await count("feedback", [["kind", "complaint"]]),
    suggestions: await count("feedback", [["kind", "suggestion"]]),
    botUsers: await count("bot_users"),
    doctors: await cat("doctor"),
    departments: await cat("department"),
    services: await cat("service"),
    checkups: await cat("checkup"),
  };
});

/* ---------- leads (qabullar) ---------- */
export const listLeads = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await (await db()).from("leads").select("*").order("created_at", { ascending: false }).limit(500);
  fail(error);
  return (data ?? []).map((r) => ({ ...r, fields: (r.fields ?? {}) as Record<string, string> }));
});

export const updateLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), status: z.enum(["new", "called", "done", "cancelled"]).optional(), note: z.string().max(1000).optional() }).parse(d))
  .handler(async ({ data }) => {
    const patch: { status?: string; note?: string } = {};
    if (data.status) patch.status = data.status;
    if (data.note !== undefined) patch.note = data.note;
    const { error } = await (await db()).from("leads").update(patch).eq("id", data.id);
    fail(error);
    return { ok: true };
  });

export const deleteLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { error } = await (await db()).from("leads").delete().eq("id", data.id);
    fail(error);
    return { ok: true };
  });

/* ---------- feedback (shikoyat / taklif) ---------- */
export const listFeedback = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await (await db()).from("feedback").select("*").order("created_at", { ascending: false }).limit(500);
  fail(error);
  return data ?? [];
});

export const updateFeedback = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), status: z.enum(["new", "seen", "done"]).optional(), remove: z.boolean().optional() }).parse(d))
  .handler(async ({ data }) => {
    const sb = await db();
    const { error } = data.remove ? await sb.from("feedback").delete().eq("id", data.id) : await sb.from("feedback").update({ status: data.status ?? "seen" }).eq("id", data.id);
    fail(error);
    return { ok: true };
  });

/* ---------- bot users ---------- */
export const listBotUsers = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await (await db()).from("bot_users").select("chat_id, first_name, last_name, username, phone, lang, blocked, created_at, last_seen").order("created_at", { ascending: false }).limit(1000);
  fail(error);
  return data ?? [];
});

export const broadcast = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ text: z.string().trim().min(1).max(3500) }).parse(d))
  .handler(async ({ data }) => {
    const sb = await db();
    const { getBotConfig, tg } = await import("./telegram.server");
    const cfg = await getBotConfig();
    if (!cfg?.token) return { ok: false as const, sent: 0, failed: 0, error: "Bot ulanmagan" };
    const { data: users } = await sb.from("bot_users").select("chat_id").eq("blocked", false).limit(5000);
    let sent = 0, failed = 0;
    for (const u of users ?? []) {
      const r = await tg(cfg.token, "sendMessage", { chat_id: u.chat_id, text: data.text });
      if (r.ok) sent++;
      else {
        failed++;
        await sb.from("bot_users").update({ blocked: true }).eq("chat_id", u.chat_id);
      }
    }
    return { ok: true as const, sent, failed, error: null };
  });

/* ---------- catalog (doctors, departments, services, checkups) ---------- */
const kindSchema = z.enum(["doctor", "department", "service", "checkup"]);

export const listCatalog = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ kind: kindSchema }).parse(d))
  .handler(async ({ data }) => {
    const sb = await db();
    const { data: rows, error } = await sb.from("catalog").select("id, slug, data, sort, active").eq("kind", data.kind).order("sort");
    fail(error);
    if (rows && rows.length) return { imported: true, rows };
    const { defaultCatalog } = await import("./catalog");
    const key = (x: any) => (data.kind === "doctor" ? x.id : x.slug) as string;
    return { imported: false, rows: (defaultCatalog[data.kind] as any[]).map((x, i) => ({ id: "", slug: key(x), data: x, sort: i, active: true })) };
  });

/** Copies the built-in site content for a section into the database so it becomes editable. */
async function ensureImported(sb: Awaited<ReturnType<typeof db>>, kind: z.infer<typeof kindSchema>) {
  const { count } = await sb.from("catalog").select("*", { count: "exact", head: true }).eq("kind", kind);
  if (count) return;
  const { defaultCatalog } = await import("./catalog");
  const rows = (defaultCatalog[kind] as any[]).map((x, i) => ({ kind, slug: kind === "doctor" ? x.id : x.slug, data: x, sort: i }));
  if (rows.length) fail((await sb.from("catalog").insert(rows)).error);
}

export const saveCatalogItem = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ kind: kindSchema, originalSlug: z.string().max(200).optional(), slug: z.string().trim().min(1).max(200), data: z.record(z.string(), z.unknown()), sort: z.number().int().optional(), active: z.boolean().optional() }).parse(d),
  )
  .handler(async ({ data }) => {
    const sb = await db();
    await ensureImported(sb, data.kind);
    const row: Record<string, unknown> = { kind: data.kind, slug: data.slug, data: data.data };
    if (data.sort !== undefined) row["sort"] = data.sort;
    if (data.active !== undefined) row["active"] = data.active;
    if (data.originalSlug) {
      const { error } = await sb.from("catalog").update(row as never).eq("kind", data.kind).eq("slug", data.originalSlug);
      fail(error);
    } else {
      const { data: max } = await sb.from("catalog").select("sort").eq("kind", data.kind).order("sort", { ascending: false }).limit(1);
      row["sort"] = (max?.[0]?.sort ?? 0) + 1;
      const { error } = await sb.from("catalog").insert(row as never);
      fail(error);
    }
    return { ok: true };
  });

export const deleteCatalogItem = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ kind: kindSchema, slug: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const sb = await db();
    await ensureImported(sb, data.kind);
    fail((await sb.from("catalog").delete().eq("kind", data.kind).eq("slug", data.slug)).error);
    return { ok: true };
  });

/* ---------- videos ---------- */
export const listVideos = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await (await db()).from("videos").select("*").order("sort").order("created_at");
  fail(error);
  return data ?? [];
});

export const saveVideo = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid().optional(), kind: z.enum(["ad", "background"]), title: z.string().trim().max(200), url: z.string().trim().url().max(1000), active: z.boolean() }).parse(d))
  .handler(async ({ data }) => {
    const sb = await db();
    const { id, ...row } = data;
    const { error } = id ? await sb.from("videos").update(row).eq("id", id) : await sb.from("videos").insert(row);
    fail(error);
    return { ok: true };
  });

export const deleteVideo = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    fail((await (await db()).from("videos").delete().eq("id", data.id)).error);
    return { ok: true };
  });

/* ---------- settings + telegram bot ---------- */
export const saveSettings = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.record(z.string().max(60), z.string().max(2000)).parse(d))
  .handler(async ({ data }) => {
    const rows = Object.entries(data).map(([key, value]) => ({ key, value: value.trim(), updated_at: new Date().toISOString() }));
    fail((await (await db()).from("site_settings").upsert(rows)).error);
    return { ok: true };
  });

export const getBotStatus = createServerFn({ method: "GET" }).handler(async () => {
  const sb = await db();
  const { data: cfg } = await sb.from("bot_config").select("*").eq("id", 1).maybeSingle();
  let webhook: string | null = null;
  let pending = 0;
  let lastError: string | null = null;
  if (cfg?.token) {
    const { tg } = await import("./telegram.server");
    const r = await tg(cfg.token, "getWebhookInfo");
    webhook = r.result?.url || null;
    pending = r.result?.pending_update_count ?? 0;
    lastError = r.result?.last_error_message ?? null;
  }
  return {
    connected: !!cfg?.token,
    tokenHint: cfg?.token ? `••••${cfg.token.slice(-4)}` : null,
    username: cfg?.bot_username ?? null,
    adminChatIds: cfg?.admin_chat_ids ?? "",
    welcome: cfg?.welcome_uz ?? "",
    webhook,
    pending,
    lastError,
  };
});

export const connectBot = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ token: z.string().trim().regex(/^\d{5,}:[\w-]{20,}$/, "token") }).parse(d))
  .handler(async ({ data }) => {
    const sb = await db();
    const { tg } = await import("./telegram.server");
    const me = await tg(data.token, "getMe");
    if (!me.ok) return { ok: false as const, error: "Token noto'g'ri — BotFather bergan tokenni tekshiring" };
    const secret = randomBytes(24).toString("hex");
    const origin = new URL(getRequest().url).origin;
    const url = `${origin}/api/public/telegram`;
    const wh = await tg(data.token, "setWebhook", { url, secret_token: secret, allowed_updates: ["message", "callback_query"], drop_pending_updates: true });
    if (!wh.ok) return { ok: false as const, error: `Webhook o'rnatilmadi: ${wh.description ?? ""}` };
    await tg(data.token, "setMyCommands", { commands: [{ command: "start", description: "Bosh menyu" }] });
    fail((await sb.from("bot_config").update({ token: data.token, webhook_secret: secret, bot_username: me.result?.username ?? null, updated_at: new Date().toISOString() }).eq("id", 1)).error);
    return { ok: true as const, username: me.result?.username as string, url };
  });

export const disconnectBot = createServerFn({ method: "POST" }).handler(async () => {
  const sb = await db();
  const { getBotConfig, tg } = await import("./telegram.server");
  const cfg = await getBotConfig();
  if (cfg?.token) await tg(cfg.token, "deleteWebhook");
  fail((await sb.from("bot_config").update({ token: null, webhook_secret: null, bot_username: null }).eq("id", 1)).error);
  return { ok: true };
});

export const saveBotSettings = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ adminChatIds: z.string().max(500), welcome: z.string().trim().min(1).max(1000) }).parse(d))
  .handler(async ({ data }) => {
    fail((await (await db()).from("bot_config").update({ admin_chat_ids: data.adminChatIds.trim(), welcome_uz: data.welcome }).eq("id", 1)).error);
    return { ok: true };
  });

export const testBot = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const { notifyAdmins } = await import("./telegram.server");
  const n = await notifyAdmins("✅ Test: MirziyoMedline admin paneli bot bilan bog'langan.");
  return { sent: n };
});
