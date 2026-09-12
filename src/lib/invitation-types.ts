export type Lang = "en" | "hi" | "te";

/**
 * Copy may arrive either as a plain string (public invitation content) or as a
 * translated bundle (UI-authored copy). `en` is the fallback.
 */
export type Localized = string | { en: string; hi?: string; te?: string };

export type WeddingEvent = {
  id: string;
  name: Localized;
  /** ISO date (YYYY-MM-DD) — the day this event belongs to. */
  date: string;
  time: Localized;
  description?: Localized;
  /** Optional per-event location note (proper noun, never translated). */
  place?: string;
  mapsUrl?: string;
};

export type Venue = {
  /** Proper noun — never translated. */
  name: string;
  address: string;
  city?: string;
  /** Absolute image URL. Omit/empty => image area is removed entirely. */
  imageUrl?: string;
  mapsUrl?: string;
};

/** A single invitation contact person (max two are rendered). */
export type ContactPerson = {
  name?: string;
  phone: string;
  whatsappUrl?: string;
};

export type GalleryImage = {
  url: string;
  alt?: string;
  caption?: string;
};

export type CoupleProfile = {
  name: string;
  photoUrl?: string;
  qualification?: string;
  occupation?: string;
  parents?: string;
};

export type Invitation = {
  slug: string;
  /** Canonical public URL, exactly as returned by the platform. */
  publicUrl?: string;
  /** Proper nouns — never translated. */
  groomName: string;
  brideName: string;
  groom?: CoupleProfile;
  bride?: CoupleProfile;
  relatives?: string;
  /** Religious/ceremonial opening line. */
  invocation?: string;
  /** Optional family lines. */
  groomFamily?: Localized;
  brideFamily?: Localized;
  /** Main invitation message. */
  message?: Localized;
  /** Short line above the names. */
  overline?: Localized;
  /** ISO date (YYYY-MM-DD) of the ceremony. */
  weddingDate?: string;
  /** ISO datetime of the ceremony — countdown target (when resolvable). */
  weddingDateTime?: string;
  /** Pretty date line. */
  dateLabel?: Localized;
  /** Ceremony window. */
  startTime?: string;
  endTime?: string;
  events: WeddingEvent[];
  venue?: Venue;
  gallery: GalleryImage[];
  contacts: ContactPerson[];
  /** Optional background music (only when enabled by the platform). */
  musicUrl?: string;
};

/** Allowed shop data for the `fallback` state. Never mixed with invitation content. */
export type ShopFallback = {
  name?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  businessContact?: string;
};

export type InvitationResult =
  | { state: "live"; invitation: Invitation; shop?: ShopFallback }
  | { state: "fallback"; shop?: ShopFallback }
  | { state: "not_found" };

export function tr(value: Localized | undefined, lang: Lang): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.en;
}
