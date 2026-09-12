import type { ShopFallback } from "@/lib/invitation-types";

export function BrandShowcase({ shop }: { shop?: ShopFallback }) {
  if (!shop?.name) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex h-[2.5dvh] min-h-[18px] max-h-[24px] items-center overflow-hidden bg-background/50 backdrop-blur-sm border-t border-gold/20 pointer-events-none">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            aria-hidden={i > 0}
            className="mx-8 font-display text-[0.6rem] uppercase tracking-widest text-ink-soft/70"
          >
            {shop.name}
          </span>
        ))}
      </div>
    </div>
  );
}
