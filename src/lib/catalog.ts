// Applies admin-edited catalog rows (from the database) onto the site's data arrays in place,
// so every page that imports `doctors`, `departments`, `services`, `checkups` sees the latest content.
import { checkups, departments, doctors, services, specialties, type Checkup, type Dept, type Doctor, type Service, type Specialty } from "./data";

export type CatalogKind = "doctor" | "department" | "service" | "checkup";
export type CatalogRow = { kind: CatalogKind; slug: string; data: any; sort: number };
export type Video = { id: string; kind: string; title: string; url: string };
export type PublicCatalog = { rows: CatalogRow[]; videos: Video[] };

const defaults = { doctor: [...doctors], department: [...departments], service: [...services], checkup: [...checkups] };
export const defaultCatalog = defaults;

let lastKey = "";
export let siteVideos: Video[] = [];

function replace<T>(target: T[], next: T[]) {
  target.splice(0, target.length, ...next);
}

export function hydrateCatalog(c: PublicCatalog | undefined) {
  if (!c) return;
  siteVideos = c.videos;
  const key = JSON.stringify(c.rows.map((r) => [r.kind, r.slug, r.sort])) + c.rows.length + JSON.stringify(c.rows).length;
  if (key === lastKey) return;
  lastKey = key;
  const by = (k: CatalogKind) => c.rows.filter((r) => r.kind === k).sort((a, b) => a.sort - b.sort).map((r) => r.data);
  // Empty kind in DB = not imported yet → keep built-in content.
  const has = (k: CatalogKind) => c.rows.some((r) => r.kind === k);
  replace(doctors, has("doctor") ? (by("doctor") as Doctor[]) : defaults.doctor);
  replace(departments, has("department") ? (by("department") as Dept[]) : defaults.department);
  replace(services, has("service") ? (by("service") as Service[]) : defaults.service);
  replace(checkups, has("checkup") ? (by("checkup") as Checkup[]) : defaults.checkup);
  const spec = Object.values(
    doctors.reduce<Record<string, Specialty>>((acc, d) => {
      const s = acc[d.specSlug] ?? { slug: d.specSlug, name: d.spec, count: 0 };
      s.count++;
      acc[d.specSlug] = s;
      return acc;
    }, {}),
  ).sort((a, b) => a.name.uz.localeCompare(b.name.uz));
  replace(specialties, spec);
}

/** Turns a YouTube / Instagram / direct link into something embeddable. */
export function videoEmbed(url: string): { type: "iframe" | "video"; src: string } {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
  if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  return { type: "video", src: url };
}
