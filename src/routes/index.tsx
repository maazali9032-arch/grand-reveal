import { createFileRoute } from "@tanstack/react-router";
import { Divider, SealMonogram } from "@/components/invitation/Ornaments";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Wedding Invitations — Architectural Collection" },
      {
        name: "description",
        content:
          "A cinematic ivory and champagne-gold digital wedding invitation. Each invitation opens through its own private link.",
      },
      { property: "og:title", content: "Digital Wedding Invitations — Architectural Collection" },
      {
        property: "og:description",
        content:
          "A cinematic ivory and champagne-gold digital wedding invitation, opened through its own private link.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NeutralHome,
});

/**
 * Root is intentionally neutral — no wedding content is ever shown here.
 * Every invitation resolves only through its exact customer slug: /customer-slug
 */
function NeutralHome() {
  return (
    <main className="paper paper-grain relative flex min-h-[100svh] items-center justify-center px-6">
      <div className="damask pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative w-full max-w-lg text-center">
        <div className="mx-auto h-20 w-20 opacity-90 sm:h-24 sm:w-24">
          <SealMonogram initials="✦" className="h-full w-full" />
        </div>
        <p className="mt-10 font-serif text-[0.64rem] tracking-luxe text-ink-soft uppercase">
          Architectural Collection
        </p>
        <h1 className="mt-5 font-display text-[clamp(1.6rem,7vw,2.6rem)] leading-tight tracking-[0.1em] text-ink">
          Digital Wedding Invitations
        </h1>
        <div className="mt-7 flex justify-center">
          <Divider className="max-w-[200px]" />
        </div>
        <p className="mx-auto mt-7 max-w-sm font-serif text-[0.95rem] leading-relaxed text-ink-soft">
          Each invitation opens only through its own private link. Please use the address shared with
          you by the family.
        </p>
      </div>
    </main>
  );
}
