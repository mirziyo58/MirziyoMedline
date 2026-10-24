import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, LogOut, Moon, Pencil, Phone, Plus, RefreshCw, Send, Trash2 } from "lucide-react";
import { adminLogin, adminLogout, adminMe, adminStats, broadcast, connectBot, deleteCatalogItem, deleteLead, deleteVideo, disconnectBot, getBotStatus, listBotUsers, listCatalog, listFeedback, listLeads, listVideos, saveBotSettings, saveCatalogItem, saveSettings, saveVideo, testBot, updateFeedback, updateLead } from "@/lib/admin.functions";
import { getSettings } from "@/lib/settings.functions";
import logoMark from "@/assets/logo-mark.png";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin panel — MirziyoMedline" }, { name: "description", content: "MirziyoMedline boshqaruv paneli." }, { property: "og:title", content: "Admin panel — MirziyoMedline" }, { property: "og:description", content: "MirziyoMedline boshqaruv paneli." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" }] }),
  ssr: false,
  component: Admin,
});

const inp = "w-full rounded-xl border border-input bg-secondary px-4 py-3 text-sm outline-none focus:border-primary focus:bg-card";

function Admin() {
  const me = useServerFn(adminMe);
  const q = useQuery({ queryKey: ["admin-me"], queryFn: () => me() });
  if (q.isLoading) return <div className="grid min-h-screen place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  return q.data?.admin ? <Dashboard /> : <Login onOk={() => q.refetch()} />;
}

function Login({ onOk }: { onOk: () => void }) {
  const login = useServerFn(adminLogin);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <div className="grid min-h-screen place-items-center bg-secondary p-4">
      <form
        className="w-full max-w-sm space-y-4 rounded-3xl bg-card p-8 shadow-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          setBusy(true);
          const r = await login({ data: { login: String(f.get("login")), password: String(f.get("password")) } }).catch(() => ({ ok: false }));
          setBusy(false);
          if (r.ok) onOk();
          else setErr(true);
        }}
      >
        <div className="flex items-center gap-2 text-xl font-extrabold"><img src={logoMark} alt="" className="h-10 w-10" /><span><span className="text-primary">Mirziyo</span>Medline</span></div>
        <h1 className="text-lg font-semibold">Admin panelga kirish</h1>
        <input name="login" placeholder="Login" autoComplete="username" required className={inp} />
        <input name="password" type="password" placeholder="Parol" autoComplete="current-password" required className={inp} />
        {err && <p className="text-sm text-destructive">Login yoki parol noto'g'ri</p>}
        <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-60">{busy && <Loader2 className="h-4 w-4 animate-spin" />}Kirish</button>
      </form>
    </div>
  );
}

const statuses = { new: "Yangi", called: "Qo'ng'iroq qilindi", done: "Bajarildi", cancelled: "Bekor qilindi" } as const;
const types: Record<string, string> = { booking: "Qabul", doctor: "Shifokor", checkup: "Check-up", career: "Karyera", insurance: "Sug'urta", results: "Tahlil", tourism: "Turizm", robot: "Robot-jarrohlik", callback: "Qo'ng'iroq" };

const tabs = [
  ["stats", "Statistika"],
  ["leads", "Qabullar"],
  ["feedback", "Shikoyat / taklif"],
  ["botusers", "Bot foydalanuvchilari"],
  ["doctor", "Shifokorlar"],
  ["department", "Bo'limlar"],
  ["service", "Xizmatlar"],
  ["checkup", "Check-up"],
  ["ad", "Reklama videolari"],
  ["telegram", "Aloqa / Telegram"],
  ["background", "Fon videolari"],
] as const;
type Tab = (typeof tabs)[number][0];

function Dashboard() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("stats");
  const logout = useServerFn(adminLogout);
  return (
    <div className="min-h-screen bg-secondary">
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2 font-extrabold"><img src={logoMark} alt="" className="h-8 w-8" /><span><span className="text-primary">Mirziyo</span>Medline</span><span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs text-primary">Admin</span></div>
          <div className="flex items-center gap-2">
            <button aria-label="Mavzu" onClick={() => { const d = document.documentElement.classList.toggle("dark"); try { localStorage.setItem("theme", d ? "dark" : "light"); } catch { /* ignore */ } }} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"><Moon className="h-4 w-4" /></button>
            <a href="/" className="rounded-full px-3 py-2 text-sm text-muted-foreground hover:bg-secondary">Saytni ko'rish</a>
            <button onClick={async () => { await logout(); qc.invalidateQueries({ queryKey: ["admin-me"] }); }} className="flex items-center gap-1 rounded-full bg-secondary px-4 py-2 text-sm font-medium"><LogOut className="h-4 w-4" />Chiqish</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-4">
        <nav className="mb-5 flex flex-wrap gap-1">
          {tabs.map(([k, v]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${tab === k ? "border-primary bg-card" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{v}</button>
          ))}
        </nav>
        {tab === "stats" && <Stats />}
        {tab === "leads" && <Leads />}
        {tab === "feedback" && <Feedback />}
        {tab === "botusers" && <BotUsers />}
        {(tab === "doctor" || tab === "department" || tab === "service" || tab === "checkup") && <CatalogEditor key={tab} kind={tab} />}
        {(tab === "ad" || tab === "background") && <Videos key={tab} kind={tab} />}
        {tab === "telegram" && <div className="grid gap-4 lg:grid-cols-2"><BotPanel /><Settings /></div>}
      </main>
    </div>
  );
}

function Stats() {
  const fn = useServerFn(adminStats);
  const q = useQuery({ queryKey: ["admin-stats"], queryFn: () => fn(), refetchInterval: 30_000 });
  if (q.isLoading) return <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />;
  const d = q.data;
  const cards: [string, number | undefined][] = [
    ["Jami qabullar", d?.leads], ["Yangi qabullar", d?.newLeads], ["Shikoyatlar", d?.complaints], ["Takliflar", d?.suggestions],
    ["Shifokorlar", d?.doctors], ["Bo'limlar", d?.departments], ["Xizmatlar", d?.services], ["Check-up", d?.checkups], ["Bot foydalanuvchilari", d?.botUsers],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(([a, b]) => (
        <div key={a} className="rounded-2xl bg-card p-6 shadow-sm"><div className="text-sm text-muted-foreground">{a}</div><div className="mt-2 text-4xl font-bold text-primary">{b ?? 0}</div></div>
      ))}
    </div>
  );
}

const fbStatus = { new: "Yangi", seen: "Ko'rildi", done: "Hal qilindi" } as const;
function Feedback() {
  const list = useServerFn(listFeedback);
  const upd = useServerFn(updateFeedback);
  const q = useQuery({ queryKey: ["admin-feedback"], queryFn: () => list(), refetchInterval: 30_000 });
  const [f, setF] = useState<"all" | "complaint" | "suggestion">("all");
  const rows = (q.data ?? []).filter((r) => f === "all" || r.kind === f);
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {([["all", "Hammasi"], ["complaint", "Shikoyatlar"], ["suggestion", "Takliflar"]] as const).map(([k, v]) => (
          <button key={k} onClick={() => setF(k)} className={`rounded-full px-3 py-1.5 text-sm ${f === k ? "bg-primary text-primary-foreground" : "bg-card"}`}>{v}</button>
        ))}
      </div>
      {q.isLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />}
      {!q.isLoading && rows.length === 0 && <p className="rounded-2xl bg-card p-8 text-center text-muted-foreground">Hozircha yo'q</p>}
      {rows.map((r) => (
        <div key={r.id} className="rounded-2xl bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.kind === "complaint" ? "bg-destructive/10 text-destructive" : "bg-accent text-primary"}`}>{r.kind === "complaint" ? "Shikoyat" : "Taklif"}</span>
              <b>{r.name ?? "—"}</b>{r.phone && <span>{r.phone}</span>}
              <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })} · {r.source}</span>
            </div>
            <div className="flex gap-2">
              <select value={r.status} onChange={async (e) => { await upd({ data: { id: r.id, status: e.target.value as keyof typeof fbStatus } }); q.refetch(); }} className="rounded-xl border border-input bg-secondary px-3 py-2 text-sm">
                {Object.entries(fbStatus).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <button aria-label="O'chirish" onClick={async () => { if (confirm("O'chirasizmi?")) { await upd({ data: { id: r.id, remove: true } }); q.refetch(); } }} className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm">{r.text}</p>
        </div>
      ))}
    </div>
  );
}

function BotUsers() {
  const list = useServerFn(listBotUsers);
  const send = useServerFn(broadcast);
  const q = useQuery({ queryKey: ["admin-botusers"], queryFn: () => list() });
  const [msg, setMsg] = useState("");
  const [res, setRes] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-card p-4">
        <h3 className="mb-2 font-semibold">Barcha foydalanuvchilarga xabar yuborish</h3>
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="Xabar matni..." className={inp} />
        <button disabled={busy || !msg.trim()} onClick={async () => { if (!confirm(`${q.data?.length ?? 0} ta foydalanuvchiga yuborilsinmi?`)) return; setBusy(true); const r = await send({ data: { text: msg } }).catch(() => null); setBusy(false); setRes(r?.ok ? `Yuborildi: ${r.sent}, yetmadi: ${r.failed}` : (r?.error ?? "Xatolik")); if (r?.ok) setMsg(""); }} className="mt-2 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}Yuborish</button>
        {res && <p className="mt-2 text-sm text-muted-foreground">{res}</p>}
      </div>
      <div className="overflow-x-auto rounded-2xl bg-card">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground"><tr>{["Ism", "Username", "Telefon", "Chat ID", "Qo'shilgan", "Holat"].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {(q.data ?? []).map((u) => (
              <tr key={u.chat_id} className="border-t">
                <td className="p-3">{[u.first_name, u.last_name].filter(Boolean).join(" ") || "—"}</td>
                <td className="p-3">{u.username ? `@${u.username}` : "—"}</td>
                <td className="p-3">{u.phone ?? "—"}</td>
                <td className="p-3 font-mono text-xs">{u.chat_id}</td>
                <td className="p-3">{new Date(u.created_at).toLocaleDateString("ru-RU")}</td>
                <td className="p-3">{u.blocked ? <span className="text-destructive">Bloklagan</span> : "Faol"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!q.isLoading && !q.data?.length && <p className="p-8 text-center text-muted-foreground">Hali hech kim botga yozmagan</p>}
      </div>
    </div>
  );
}

/* ---------- catalog editor ---------- */
type FType = "text" | "num" | "bool" | "L" | "Ltext" | "Llines" | "prices" | "Lparas";
type FDef = [path: string, label: string, type: FType];
const kindFields: Record<"doctor" | "department" | "service" | "checkup", FDef[]> = {
  doctor: [["name", "F.I.Sh.", "L"], ["spec", "Mutaxassislik", "L"], ["specSlug", "Mutaxassislik kodi (lotin, masalan kardiolog)", "text"], ["dept", "Bo'lim kodi (slug)", "text"], ["exp", "Tajriba (yil)", "num"], ["photo", "Rasm havolasi (URL)", "text"], ["head", "Bo'lim boshlig'i", "bool"]],
  department: [["title", "Nomi", "L"], ["short", "Qisqa tavsif", "L"], ["text", "Matn", "Ltext"], ["offers", "Xizmatlar (har qatorda: o'zbekcha | ruscha)", "Llines"]],
  service: [["title", "Nomi", "L"], ["short", "Qisqa tavsif", "L"], ["text", "Matn (har qatorda bir paragraf: o'zbekcha | ruscha)", "Lparas"], ["features", "Afzalliklar (o'zbekcha | ruscha)", "Llines"], ["prices", "Narxlar (har qatorda: o'zbekcha | ruscha | narx)", "prices"], ["icon", "Ikonka fayli (ixtiyoriy)", "text"]],
  checkup: [["title", "Nomi", "L"], ["desc", "Tavsif", "L"], ["consult", "Konsultatsiyalar soni", "num"], ["lab", "Laboratoriya tahlillari soni", "num"], ["instr", "Instrumental tekshiruvlar soni", "num"], ["price", "Narx", "text"], ["items", "Tarkibi (o'zbekcha | ruscha)", "Llines"]],
};
type Lx = { uz: string; ru: string };
const toLines = (a: Lx[] = []) => a.map((x) => `${x.uz} | ${x.ru}`).join("\n");
const fromLines = (s: string): Lx[] => s.split("\n").map((x) => x.trim()).filter(Boolean).map((x) => { const [uz = "", ru] = x.split("|").map((y) => y.trim()); return { uz, ru: ru || uz }; });
const titleOf = (d: any) => d?.name?.uz ?? d?.title?.uz ?? "—";
const subOf = (d: any) => d?.spec?.uz ?? d?.short?.uz ?? d?.desc?.uz ?? "";

function CatalogEditor({ kind }: { kind: "doctor" | "department" | "service" | "checkup" }) {
  const list = useServerFn(listCatalog);
  const save = useServerFn(saveCatalogItem);
  const del = useServerFn(deleteCatalogItem);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-catalog", kind], queryFn: () => list({ data: { kind } }) });
  const [edit, setEdit] = useState<{ slug?: string; data: any; active: boolean } | null>(null);
  const [search, setSearch] = useState("");
  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin-catalog", kind] }); qc.invalidateQueries({ queryKey: ["admin-stats"] }); };
  const rows = (q.data?.rows ?? []).filter((r) => !search || JSON.stringify(r.data).toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Qidirish..." className="max-w-xs rounded-full border border-input bg-card px-4 py-2 text-sm" />
        <span className="text-sm text-muted-foreground">{q.data?.rows.length ?? 0} ta</span>
        <button onClick={() => setEdit({ data: kind === "doctor" ? { id: crypto.randomUUID(), exp: 0, head: false } : {}, active: true })} className="ml-auto flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" />Qo'shish</button>
      </div>
      {q.isLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />}
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((r) => (
          <div key={r.slug} className={`flex items-center gap-3 rounded-2xl bg-card p-3 ${r.active ? "" : "opacity-50"}`}>
            {kind === "doctor" && r.data?.photo && <img src={r.data.photo} alt="" className="h-14 w-14 rounded-xl object-cover" loading="lazy" />}
            <div className="min-w-0 flex-1"><div className="truncate font-semibold">{titleOf(r.data)}</div><div className="truncate text-sm text-muted-foreground">{subOf(r.data)}</div></div>
            <button aria-label="Tahrirlash" onClick={() => setEdit({ slug: r.slug, data: structuredClone(r.data), active: r.active })} className="grid h-9 w-9 place-items-center rounded-xl bg-secondary"><Pencil className="h-4 w-4" /></button>
            <button aria-label="O'chirish" onClick={async () => { if (confirm("O'chirasizmi?")) { await del({ data: { kind, slug: r.slug } }); refresh(); } }} className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      {edit && <ItemForm kind={kind} item={edit} onClose={() => setEdit(null)} onSave={async (slug, data, active) => { await save({ data: { kind, originalSlug: edit.slug, slug, data, active } }); refresh(); setEdit(null); }} />}
    </div>
  );
}

function ItemForm({ kind, item, onClose, onSave }: { kind: keyof typeof kindFields; item: { slug?: string; data: any; active: boolean }; onClose: () => void; onSave: (slug: string, data: any, active: boolean) => Promise<void> }) {
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const d = item.data;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl space-y-3 overflow-y-auto rounded-3xl bg-card p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const g = (k: string) => String(f.get(k) ?? "").trim();
          const out: any = { ...d };
          for (const [p, , t] of kindFields[kind]) {
            if (t === "L" || t === "Ltext") out[p] = { uz: g(`${p}.uz`), ru: g(`${p}.ru`) || g(`${p}.uz`) };
            else if (t === "num") out[p] = Number(g(p)) || 0;
            else if (t === "bool") out[p] = f.get(p) === "on";
            else if (t === "Llines" || t === "Lparas") out[p] = fromLines(g(p));
            else if (t === "prices") out[p] = g(p).split("\n").map((x) => x.trim()).filter(Boolean).map((x) => { const [uz = "", ru = "", price = ""] = x.split("|").map((y) => y.trim()); return [{ uz, ru: ru || uz }, price]; });
            else out[p] = g(p) || (kind === "checkup" && p === "price" ? null : "");
          }
          let slug = kind === "doctor" ? String(d.id) : g("slug");
          if (kind !== "doctor") out.slug = slug;
          if (!out.name?.uz && !out.title?.uz) return setErr("Nomini kiriting");
          if (!slug) return setErr("Kod (slug) kiriting");
          setBusy(true);
          try { await onSave(slug, out, f.get("__active") === "on"); } catch (x) { setErr("Saqlab bo'lmadi: " + (x as Error).message); } finally { setBusy(false); }
        }}
      >
        <h2 className="text-xl font-semibold">{item.slug ? "Tahrirlash" : "Yangi qo'shish"}</h2>
        {kind !== "doctor" && <label className="block"><span className="mb-1 block text-sm font-medium">Kod (URL uchun, lotin harflarda)</span><input name="slug" defaultValue={d.slug ?? ""} pattern="[a-z0-9-]+" required className={inp} /></label>}
        {kindFields[kind].map(([p, label, t]) => (
          <label key={p} className="block">
            <span className="mb-1 block text-sm font-medium">{label}</span>
            {t === "L" && <div className="grid gap-2 sm:grid-cols-2"><input name={`${p}.uz`} defaultValue={d[p]?.uz ?? ""} placeholder="O'zbekcha" className={inp} /><input name={`${p}.ru`} defaultValue={d[p]?.ru ?? ""} placeholder="Ruscha" className={inp} /></div>}
            {t === "Ltext" && <div className="grid gap-2"><textarea name={`${p}.uz`} defaultValue={d[p]?.uz ?? ""} placeholder="O'zbekcha" rows={3} className={inp} /><textarea name={`${p}.ru`} defaultValue={d[p]?.ru ?? ""} placeholder="Ruscha" rows={3} className={inp} /></div>}
            {t === "text" && <input name={p} defaultValue={d[p] ?? ""} className={inp} />}
            {t === "num" && <input name={p} type="number" min={0} defaultValue={d[p] ?? 0} className={inp} />}
            {t === "bool" && <input name={p} type="checkbox" defaultChecked={!!d[p]} className="h-5 w-5 accent-primary" />}
            {(t === "Llines" || t === "Lparas") && <textarea name={p} defaultValue={toLines(d[p])} rows={4} className={inp} />}
            {t === "prices" && <textarea name={p} defaultValue={(d[p] ?? []).map(([n, pr]: [Lx, string]) => `${n.uz} | ${n.ru} | ${pr}`).join("\n")} rows={4} className={inp} />}
          </label>
        ))}
        <label className="flex items-center gap-2 text-sm"><input name="__active" type="checkbox" defaultChecked={item.active} className="h-5 w-5 accent-primary" />Saytda ko'rsatish</label>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <div className="flex gap-2">
          <button disabled={busy} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60">{busy ? "Saqlanmoqda..." : "Saqlash"}</button>
          <button type="button" onClick={onClose} className="rounded-full bg-secondary px-6 py-3">Bekor qilish</button>
        </div>
      </form>
    </div>
  );
}

function Videos({ kind }: { kind: "ad" | "background" }) {
  const list = useServerFn(listVideos);
  const save = useServerFn(saveVideo);
  const del = useServerFn(deleteVideo);
  const q = useQuery({ queryKey: ["admin-videos"], queryFn: () => list() });
  const rows = (q.data ?? []).filter((v) => v.kind === kind);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <form
        className="space-y-3 rounded-2xl bg-card p-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const f = new FormData(form);
          setErr(null);
          try { await save({ data: { kind, title: String(f.get("title") ?? ""), url: String(f.get("url") ?? ""), active: true } }); form.reset(); q.refetch(); } catch { setErr("Havola noto'g'ri"); }
        }}
      >
        <h3 className="font-semibold">{kind === "ad" ? "Reklama videosi qo'shish" : "Fon videosi qo'shish (bosh sahifa tepasida)"}</h3>
        <p className="text-sm text-muted-foreground">YouTube havolasi yoki to'g'ridan-to'g'ri .mp4 havola kiriting.</p>
        <div className="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
          <input name="title" placeholder="Sarlavha" className={inp} />
          <input name="url" type="url" required placeholder="https://youtube.com/watch?v=..." className={inp} />
          <button className="flex items-center justify-center gap-1 rounded-full bg-primary px-5 font-semibold text-primary-foreground"><Plus className="h-4 w-4" />Qo'shish</button>
        </div>
        {err && <p className="text-sm text-destructive">{err}</p>}
      </form>
      {!q.isLoading && !rows.length && <p className="rounded-2xl bg-card p-8 text-center text-muted-foreground">Hozircha video yo'q</p>}
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((v) => (
          <div key={v.id} className="flex items-center gap-3 rounded-2xl bg-card p-3">
            <div className="min-w-0 flex-1"><div className="truncate font-semibold">{v.title || "Nomsiz"}</div><a href={v.url} target="_blank" rel="noreferrer" className="block truncate text-sm text-primary">{v.url}</a></div>
            <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={v.active} onChange={async (e) => { await save({ data: { id: v.id, kind, title: v.title, url: v.url, active: e.target.checked } }); q.refetch(); }} className="accent-primary" />Faol</label>
            <button aria-label="O'chirish" onClick={async () => { if (confirm("O'chirasizmi?")) { await del({ data: { id: v.id } }); q.refetch(); } }} className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BotPanel() {
  const status = useServerFn(getBotStatus);
  const connect = useServerFn(connectBot);
  const disconnect = useServerFn(disconnectBot);
  const saveCfg = useServerFn(saveBotSettings);
  const test = useServerFn(testBot);
  const q = useQuery({ queryKey: ["admin-bot"], queryFn: () => status() });
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const s = q.data;
  if (q.isLoading) return <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />;
  return (
    <div className="space-y-4 rounded-2xl bg-card p-6">
      <h2 className="text-xl font-semibold">Telegram bot</h2>
      {s?.connected ? (
        <div className="space-y-1 rounded-xl bg-secondary p-4 text-sm">
          <div>Holat: <b className="text-primary">Ulangan</b> {s.username && <a href={`https://t.me/${s.username}`} target="_blank" rel="noreferrer" className="text-primary">@{s.username}</a>}</div>
          <div>Token: {s.tokenHint}</div>
          <div className="break-all">Webhook: {s.webhook ?? "o'rnatilmagan"}</div>
          {s.lastError && <div className="text-destructive">Oxirgi xato: {s.lastError}</div>}
        </div>
      ) : <p className="text-sm text-muted-foreground">Bot hali ulanmagan. @BotFather'dan olgan tokenni kiriting.</p>}
      <form
        className="space-y-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const token = String(new FormData(form).get("token") ?? "");
          setBusy(true); setMsg(null);
          const r = await connect({ data: { token } }).catch(() => ({ ok: false as const, error: "Token formati noto'g'ri" }));
          setBusy(false);
          setMsg(r.ok ? `Ulandi: @${r.username}` : r.error);
          if (r.ok) { form.reset(); q.refetch(); }
        }}
      >
        <input name="token" required placeholder="123456789:AAH..." autoComplete="off" className={inp} />
        <div className="flex flex-wrap gap-2">
          <button disabled={busy} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60">{busy && <Loader2 className="h-4 w-4 animate-spin" />}{s?.connected ? "Tokenni almashtirish" : "Botni ulash"}</button>
          {s?.connected && <button type="button" onClick={async () => { if (confirm("Botni uzasizmi?")) { await disconnect(); q.refetch(); } }} className="rounded-full bg-secondary px-5 py-2.5 text-sm text-destructive">Uzish</button>}
        </div>
      </form>
      {msg && <p className="text-sm">{msg}</p>}
      <form
        className="space-y-2 border-t pt-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          await saveCfg({ data: { adminChatIds: String(f.get("ids") ?? ""), welcome: String(f.get("welcome") ?? "") } });
          setMsg("Bot sozlamalari saqlandi ✓");
          q.refetch();
        }}
      >
        <label className="block"><span className="mb-1 block text-sm font-medium">Arizalar keladigan chat ID lar (vergul bilan)</span><input name="ids" defaultValue={s?.adminChatIds ?? ""} placeholder="123456789, -100123..." className={inp} /></label>
        <p className="text-xs text-muted-foreground">Chat ID ni bilish uchun Telegram'da @userinfobot ga yozing. Guruh uchun botni guruhga qo'shing.</p>
        <label className="block"><span className="mb-1 block text-sm font-medium">Salomlashish matni</span><textarea name="welcome" defaultValue={s?.welcome ?? ""} rows={2} className={inp} /></label>
        <div className="flex gap-2">
          <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Saqlash</button>
          {s?.connected && <button type="button" onClick={async () => { const r = await test(); setMsg(r.sent ? `Test xabar ${r.sent} ta chatga yuborildi` : "Yuborilmadi — chat ID larni tekshiring va botga avval /start yozing"); }} className="rounded-full bg-secondary px-5 py-2.5 text-sm">Test xabar</button>}
        </div>
      </form>
    </div>
  );
}

function Leads() {
  const list = useServerFn(listLeads);
  const upd = useServerFn(updateLead);
  const del = useServerFn(deleteLead);
  const q = useQuery({ queryKey: ["admin-leads"], queryFn: () => list(), refetchInterval: 30_000 });
  const [filter, setFilter] = useState<string>("all");
  const rows = (q.data ?? []).filter((r) => filter === "all" || r.status === filter);
  const count = (s: string) => (q.data ?? []).filter((r) => r.status === s).length;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {[["Jami", q.data?.length ?? 0], ["Yangi", count("new")], ["Qo'ng'iroq qilindi", count("called")], ["Bajarildi", count("done")]].map(([a, b]) => (
          <div key={a} className="rounded-2xl bg-card p-4"><div className="text-sm text-muted-foreground">{a}</div><div className="text-3xl font-bold">{b}</div></div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {([["all", "Hammasi"], ...Object.entries(statuses)] as [string, string][]).map(([k, v]) => (
          <button key={k} onClick={() => setFilter(k)} className={`rounded-full px-3 py-1.5 text-sm ${filter === k ? "bg-primary text-primary-foreground" : "bg-card"}`}>{v}</button>
        ))}
        <button onClick={() => q.refetch()} className="ml-auto flex items-center gap-1 rounded-full bg-card px-3 py-1.5 text-sm"><RefreshCw className={`h-4 w-4 ${q.isFetching ? "animate-spin" : ""}`} />Yangilash</button>
      </div>
      {q.isLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />}
      {q.isError && <p className="rounded-xl bg-card p-4 text-destructive">Arizalarni yuklab bo'lmadi.</p>}
      {!q.isLoading && rows.length === 0 && <p className="rounded-2xl bg-card p-8 text-center text-muted-foreground">Hozircha ariza yo'q</p>}
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-primary">{types[r.type] ?? r.type}</span>
                  <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}</span>
                </div>
                <div className="mt-1 text-lg font-semibold">{r.name}</div>
                <a href={`tel:+${r.phone.replace(/\D/g, "")}`} className="flex items-center gap-1 text-sm text-primary"><Phone className="h-4 w-4" />{r.phone}</a>
                <ul className="mt-2 space-y-0.5 text-sm text-muted-foreground">
                  {Object.entries(r.fields).map(([k, v]) => <li key={k}><b className="text-foreground">{k}:</b> {v}</li>)}
                  {r.page && <li>Sahifa: {r.page}</li>}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <select value={r.status} onChange={async (e) => { await upd({ data: { id: r.id, status: e.target.value as keyof typeof statuses } }); q.refetch(); }} className="rounded-xl border border-input bg-secondary px-3 py-2 text-sm">
                  {Object.entries(statuses).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <button aria-label="O'chirish" onClick={async () => { if (confirm("Arizani o'chirasizmi?")) { await del({ data: { id: r.id } }); q.refetch(); } }} className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <textarea defaultValue={r.note ?? ""} placeholder="Izoh (faqat admin ko'radi)" onBlur={(e) => { if (e.target.value !== (r.note ?? "")) upd({ data: { id: r.id, note: e.target.value } }); }} rows={1} className="mt-3 w-full rounded-xl border border-input bg-secondary px-3 py-2 text-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

const settingFields: [string, string, boolean?][] = [
  ["phone", "Telefon raqam"],
  ["short", "Qisqa raqam"],
  ["email", "Email"],
  ["address_uz", "Manzil (o'zbekcha)"],
  ["address_ru", "Manzil (ruscha)"],
  ["announcement_uz", "E'lon — sayt tepasida (o'zbekcha, bo'sh qoldirsangiz ko'rinmaydi)", true],
  ["announcement_ru", "E'lon (ruscha)", true],
  ["telegram", "Telegram kanal havolasi"],
  ["instagram", "Instagram havolasi"],
];

function Settings() {
  const get = useServerFn(getSettings);
  const save = useServerFn(saveSettings);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["site-settings"], queryFn: () => get() });
  const [st, setSt] = useState<"idle" | "busy" | "ok" | "err">("idle");
  if (q.isLoading) return <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />;
  return (
    <form
      className="space-y-4 rounded-2xl bg-card p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const data = Object.fromEntries(settingFields.map(([k]) => [k, String(f.get(k) ?? "")]));
        setSt("busy");
        try { await save({ data }); await qc.invalidateQueries({ queryKey: ["site-settings"] }); setSt("ok"); } catch { setSt("err"); }
      }}
    >
      <h2 className="text-xl font-semibold">Aloqa ma'lumotlari</h2>
      {settingFields.map(([k, label, long]) => (
        <label key={k} className="block">
          <span className="mb-1.5 block text-sm font-medium">{label}</span>
          {long ? <textarea name={k} defaultValue={q.data?.[k] ?? ""} rows={2} className={inp} /> : <input name={k} defaultValue={q.data?.[k] ?? ""} className={inp} />}
        </label>
      ))}
      <button disabled={st === "busy"} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60">{st === "busy" ? "Saqlanmoqda..." : "Saqlash"}</button>
      {st === "ok" && <span className="ml-3 text-sm text-primary">Saqlandi ✓</span>}
      {st === "err" && <span className="ml-3 text-sm text-destructive">Saqlab bo'lmadi</span>}
    </form>
  );
}
