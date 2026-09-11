import type {
  ContactPerson,
  CoupleProfile,
  GalleryImage,
  Invitation,
  InvitationResult,
  ShopFallback,
  WeddingEvent,
} from "./invitation-types";

/**
 * Public invitation data access.
 *
 * The browser talks to exactly one endpoint: the central public RPC
 * `get_public_invitation_content`. No tables, schemas, design names or
 * service credentials are ever referenced here.
 */

const SUPABASE_URL = (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) ?? "";
const SUPABASE_ANON_KEY = (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined) ?? "";

export const isConfigured = () => Boolean(SUPABASE_URL.trim() && SUPABASE_ANON_KEY.trim());

/** Safely reduce a pathname to a single usable slug segment. */
export function sanitizeSlug(raw: string | undefined | null): string | null {
  if (!raw) return null;
  let value = raw;
  try {
    value = decodeURIComponent(raw);
  } catch {
    return null;
  }
  const segments = value.split("/").filter((s) => s.trim().length > 0);
  const last = segments[segments.length - 1];
  if (!last) return null;
  const slug = last.trim();
  if (!slug || slug.includes("/") || slug.includes("\\") || slug.length > 200) return null;
  return slug;
}

const str = (v: unknown): string | undefined => {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t ? t : undefined;
};
const obj = (v: unknown): Record<string, unknown> | undefined =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : undefined;
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

const isHttp = (u: string) => /^https?:\/\//i.test(u);

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

function toIsoDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return `${match[1]}-${match[2]}-${match[3]}`;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

/** Best-effort combination of a date and a loose time string into a datetime. */
function toDateTime(date: string | undefined, time: string | undefined): string | undefined {
  const iso = toIsoDate(date);
  if (!iso) return undefined;
  if (!time) return `${iso}T00:00:00`;
  const m = time.match(/^(\d{1,2})(?::(\d{2}))?\s*([ap]\.?m\.?)?/i);
  if (!m) return `${iso}T00:00:00`;
  let hour = Number(m[1]);
  const minute = Number(m[2] ?? "0");
  const suffix = m[3]?.toLowerCase();
  if (suffix?.startsWith("p") && hour < 12) hour += 12;
  if (suffix?.startsWith("a") && hour === 12) hour = 0;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${iso}T${pad(hour)}:${pad(minute)}:00`;
}

function mapEvents(raw: unknown): WeddingEvent[] {
  const out: WeddingEvent[] = [];
  arr(raw).forEach((item, index) => {
    const e = obj(item);
    if (!e) return;
    const name = str(e["name"]) ?? str(e["title"]) ?? str(e["event_name"]);
    const date = toIsoDate(str(e["date"]) ?? str(e["event_date"]));
    if (!name || !date) return;
    const time = str(e["time"]) ?? str(e["start_time"]);
    const place = str(e["venue"]) ?? str(e["venue_name"]);
    const city = str(e["city"]);
    const mapsUrl = str(e["maps_url"]) ?? str(e["mapsUrl"]);
    const description = str(e["note"]) ?? str(e["description"]);
    out.push({
      id: str(e["id"]) ?? `${date}-${index}`,
      name,
      date,
      time: time ?? "",
      ...(description ? { description } : {}),
      ...(place ? { place: city ? `${place}, ${city}` : place } : {}),
      ...(mapsUrl && isHttp(mapsUrl) ? { mapsUrl } : {}),
    });
  });
  return out;
}

function mapGallery(raw: unknown, extras: (string | undefined)[]): GalleryImage[] {
  const images: GalleryImage[] = [];
  const push = (url: string | undefined, alt?: string, caption?: string) => {
    if (!url || !isHttp(url)) return;
    if (images.some((i) => i.url === url)) return;
    images.push({ url, ...(alt ? { alt } : {}), ...(caption ? { caption } : {}) });
  };

  for (const item of arr(raw)) {
    if (typeof item === "string") {
      push(str(item));
      continue;
    }
    const g = obj(item);
    if (!g) continue;
    push(
      str(g["url"]) ?? str(g["src"]) ?? str(g["image_url"]),
      str(g["alt"]),
      str(g["caption"]),
    );
  }
  for (const extra of extras) push(extra);
  return images;
}

function mapContacts(raw: unknown): ContactPerson[] {
  const out: ContactPerson[] = [];
  for (const item of arr(raw).slice(0, 2)) {
    const c = obj(item);
    if (!c) continue;
    const phone = str(c["phone"]);
    if (!phone) continue;
    const supplied = str(c["whatsapp_url"]);
    const whatsappUrl =
      supplied && isHttp(supplied)
        ? supplied
        : digits(phone)
          ? `https://wa.me/${digits(phone)}`
          : undefined;
    const name = str(c["name"]);
    out.push({
      phone,
      ...(name ? { name } : {}),
      ...(whatsappUrl ? { whatsappUrl } : {}),
    });
  }
  return out;
}

function mapProfile(
  name: string | undefined,
  photo: string | undefined,
  qualification: string | undefined,
  occupation: string | undefined,
  parents: string | undefined,
): CoupleProfile | undefined {
  if (!name) return undefined;
  return {
    name,
    ...(photo && isHttp(photo) ? { photoUrl: photo } : {}),
    ...(qualification ? { qualification } : {}),
    ...(occupation ? { occupation } : {}),
    ...(parents ? { parents } : {}),
  };
}

function mapInvitation(slug: string, payload: Record<string, unknown>): Invitation {
  const content = obj(payload["content"]) ?? {};
  const invitationMeta = obj(payload["invitation"]) ?? {};

  const groomName = str(content["groom_name"]) ?? "";
  const brideName = str(content["bride_name"]) ?? "";
  const weddingDate = toIsoDate(str(content["wedding_date"]));
  const startTime = str(content["start_time"]);
  const endTime = str(content["end_time"]);
  const weddingDateTime = toDateTime(weddingDate, startTime);

  const venueName = str(content["venue_name"]);
  const venueAddress = str(content["venue_address"]);
  const venueCity = str(content["city"]);
  const mapsUrl = str(content["maps_url"]);
  const venueImage = str(content["venue_image_url"]);
  const venue =
    venueName || venueAddress
      ? {
          name: venueName ?? "",
          address: venueAddress ?? "",
          ...(venueCity ? { city: venueCity } : {}),
          ...(venueImage && isHttp(venueImage) ? { imageUrl: venueImage } : {}),
          ...(mapsUrl && isHttp(mapsUrl) ? { mapsUrl } : {}),
        }
      : undefined;

  const musicEnabled = content["music_enabled"] === true;
  const musicUrl = str(content["music_url"]);
  const publicUrl = str(invitationMeta["public_url"]);

  const groom = mapProfile(
    groomName || undefined,
    str(content["groom_photo_url"]),
    str(content["groom_qualification"]),
    str(content["groom_occupation"]),
    str(content["groom_parents"]),
  );
  const bride = mapProfile(
    brideName || undefined,
    str(content["bride_photo_url"]),
    str(content["bride_qualification"]),
    str(content["bride_occupation"]),
    str(content["bride_parents"]),
  );

  return {
    slug,
    ...(publicUrl ? { publicUrl } : {}),
    groomName,
    brideName,
    ...(groom ? { groom } : {}),
    ...(bride ? { bride } : {}),
    ...(str(content["relatives"]) ? { relatives: str(content["relatives"])! } : {}),
    ...(str(content["invocation"]) ? { invocation: str(content["invocation"])! } : {}),
    ...(groom?.parents ? { groomFamily: groom.parents } : {}),
    ...(bride?.parents ? { brideFamily: bride.parents } : {}),
    ...(weddingDateTime ? { weddingDateTime } : {}),
    ...(startTime ? { startTime } : {}),
    ...(endTime ? { endTime } : {}),
    ...(weddingDate ? { weddingDate } : {}),
    events: mapEvents(content["events"]),
    ...(venue ? { venue } : {}),
    gallery: mapGallery(content["gallery"], [groom?.photoUrl, bride?.photoUrl]),
    contacts: mapContacts(content["contacts"]),
    ...(musicEnabled && musicUrl && isHttp(musicUrl) ? { musicUrl } : {}),
  };
}

function mapShop(payload: Record<string, unknown>): ShopFallback | undefined {
  const shop = obj(payload["shop"]);
  if (!shop) return undefined;
  const mapped: ShopFallback = {
    ...(str(shop["name"]) ? { name: str(shop["name"])! } : {}),
    ...(str(shop["phone"]) ? { phone: str(shop["phone"])! } : {}),
    ...(str(shop["whatsapp"]) ? { whatsapp: str(shop["whatsapp"])! } : {}),
    ...(str(shop["address"]) ? { address: str(shop["address"])! } : {}),
    ...(str(shop["city"]) ? { city: str(shop["city"])! } : {}),
    ...(str(shop["business_contact"])
      ? { businessContact: str(shop["business_contact"])! }
      : {}),
  };
  return Object.keys(mapped).length ? mapped : undefined;
}

/** Unwrap a possible `{ data: ... }` envelope, and arrays of one row. */
function normalizeEnvelope(raw: unknown): Record<string, unknown> | undefined {
  let value = raw;
  if (Array.isArray(value)) value = value[0];
  let record = obj(value);
  if (record && !("state" in record) && "data" in record) {
    const inner = record["data"];
    record = obj(Array.isArray(inner) ? inner[0] : inner) ?? record;
  }
  return record;
}

/**
 * Fetch the public invitation for a slug. Throws on network/configuration
 * failure so the UI can show a retry-friendly error state.
 */
export async function fetchPublicInvitation(slugInput: string): Promise<InvitationResult> {
  const slug = sanitizeSlug(slugInput);
  if (!slug) return { state: "not_found" };
  if (!isConfigured()) throw new Error("Invitation service is not configured.");

  const res = await fetch(
    `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/get_public_invitation_content`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ p_slug: slug }),
    },
  );

  if (!res.ok) throw new Error(`Invitation request failed (${res.status})`);

  const payload = normalizeEnvelope(await res.json());
  if (!payload) return { state: "not_found" };

  const state = str(payload["state"]);
  if (state === "live") {
    const invitation = mapInvitation(slug, payload);
    if (!invitation.groomName && !invitation.brideName) return { state: "not_found" };
    return { state: "live", invitation };
  }
  if (state === "fallback") {
    const shop = mapShop(payload);
    return shop ? { state: "fallback", shop } : { state: "fallback" };
  }
  return { state: "not_found" };
}
