import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { Divider, SealMonogram } from "@/components/invitation/Ornaments";
import { STRINGS } from "@/lib/i18n";
import type { ShopFallback } from "@/lib/invitation-types";
import { fetchPublicInvitation, sanitizeSlug } from "@/lib/public-invitation";

export const Route = createFileRoute("/$slug")({
  head: () => ({
    meta: [
      { title: "Wedding Invitation" },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content: "A private cinematic wedding invitation, opened through its own link.",
      },
      { property: "og:title", content: "Wedding Invitation" },
      {
        property: "og:description",
        content: "A private cinematic wedding invitation, opened through its own link.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvitationRoute,
});

const t = STRINGS.en;

function Screen({
  heading,
  note,
  children,
}: {
  heading: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="paper paper-grain relative flex min-h-[100svh] items-center justify-center px-6 py-20">
      <div className="damask pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative w-full max-w-md text-center">
        <div className="mx-auto h-16 w-16 opacity-90 sm:h-20 sm:w-20">
          <SealMonogram initials="✦" className="h-full w-full" />
        </div>
        <h1 className="mt-10 font-display text-[clamp(1.4rem,5.8vw,2.1rem)] leading-tight tracking-[0.12em] text-ink">
          {heading}
        </h1>
        <div className="mt-6 flex justify-center">
          <Divider className="max-w-[180px]" />
        </div>
        {note && (
          <p className="mt-6 font-serif text-[0.95rem] leading-relaxed text-ink-soft">{note}</p>
        )}
        {children}
      </div>
    </main>
  );
}

/** Fallback state — only the allowed shop fields may ever appear here. */
function FallbackScreen({ shop }: { shop?: ShopFallback | undefined }) {
  const lines = [shop?.name, shop?.phone, shop?.whatsapp, shop?.address, shop?.city, shop?.businessContact]
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean);

  return (
    <Screen heading={t.unavailableTitle} note={t.unavailableNote}>
      {lines.length > 0 && (
        <div className="mt-9 space-y-2 font-serif text-[0.9rem] text-ink-soft">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}
    </Screen>
  );
}

function InvitationRoute() {
  const { slug } = Route.useParams();
  const safeSlug = sanitizeSlug(slug);

  const query = useQuery({
    queryKey: ["public-invitation", safeSlug],
    enabled: Boolean(safeSlug),
    retry: 1,
    staleTime: 60_000,
    queryFn: () => fetchPublicInvitation(safeSlug!),
  });

  if (!safeSlug) return <Screen heading={t.notFoundTitle} note={t.notFoundNote} />;

  if (query.isPending) {
    return (
      <Screen heading={t.loading}>
        <span className="mx-auto mt-8 block h-10 w-px animate-pulse bg-[linear-gradient(to_bottom,transparent,var(--gold))]" />
      </Screen>
    );
  }

  if (query.isError) {
    return (
      <Screen heading={t.errorTitle} note={t.errorNote}>
        <button
          type="button"
          onClick={() => void query.refetch()}
          className="mt-9 inline-flex items-center gap-3 border border-[oklch(0.78_0.06_80/0.7)] px-8 py-3.5 font-serif text-[0.7rem] tracking-luxe text-gold-deep uppercase transition-colors hover:bg-[oklch(0.86_0.048_82/0.35)]"
        >
          {t.retry}
        </button>
      </Screen>
    );
  }

  const result = query.data;
  if (!result || result.state === "not_found") {
    return <Screen heading={t.notFoundTitle} note={t.notFoundNote} />;
  }
  if (result.state === "fallback") return <FallbackScreen shop={result.shop} />;

  return <InvitationExperience invitation={result.invitation} />;
}
