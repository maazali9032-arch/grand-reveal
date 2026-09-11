# Grand Reveal Invitations

LUXURY ARCHITECTURAL WEDDING INVITATION

Build a premium, cinematic, single-page digital wedding invitation with a luxurious ivory, cream and champagne-gold aesthetic.

The experience should feel like opening an expensive handcrafted wedding invitation and gradually entering an elegant grand architectural setting.

Opening

Start with a full-screen luxury ivory invitation envelope.

Use subtle:

 embossed patterns

 fine ornamental detailing

 paper texture

 raised borders

 realistic shadows

 soft champagne highlights

At the center, place an elegant ornamental circular seal/monogram.

As the guest scrolls, the envelope should physically open. The flap lifts with depth and perspective, the seal separates, and warm golden light appears from inside.

Avoid simple fade animations. Make the opening feel physical and cinematic.

Architectural Reveal

The opened invitation should transition into a grand symmetrical architectural interior dominated by a large ornate arch.

Use an elegant ivory, beige and muted gold palette with:

 carved architectural details

 columns

 ornamental arches

 intricate borders

 soft warm lighting

 subtle depth and shadows

The center should remain visually clean for the wedding information.

Reveal:

[GROOM NAME]
&
[BRIDE NAME]

followed by a refined wedding message and date.

Use sophisticated editorial serif typography with an elegant script/italic accent.

Scroll Flow

The whole invitation should behave as one continuous cinematic journey:

Envelope → Opening → Architectural Reveal → Couple → Countdown → Schedule → Venue → RSVP → Contact → Final

Scrolling downward progressively reveals each stage, with smooth parallax, scale, masking, depth and opacity transitions.

Scrolling upward should naturally reverse the experience.

Do not make it feel like a normal website made from unrelated rectangular sections.

Countdown

Create an elegant countdown section with:

DAYS / HOURS / MINUTES / SECONDS

Use refined typography and thin ornamental framing rather than modern dashboard-style cards.

The countdown must be calculated dynamically from the wedding date.

Wedding Schedule

Create a sophisticated editorial timeline for the wedding events.

Each event should show:

 event name

 date/day

 time

 optional description

Use delicate ornamental dividers and a refined vertical composition.

Multiple wedding days should be supported. If only one day exists, don't show unnecessary day navigation.

Venue

Create a beautiful venue presentation containing:

 venue name

 address

 optional venue image

 elegant architectural/decorative treatment

Get Directions button

The button should open the configured Google Maps URL.

If the venue image is unavailable, remove the image area completely.

RSVP

Create an elegant RSVP moment with:

WILL BE THERE

REGRETFULLY DECLINE

RSVP is animation-only. Do not store responses, guest counts or RSVP analytics.

After clicking, show a subtle visual confirmation.

Contact & Social

Support optional:

 phone

 WhatsApp

 Instagram

 Facebook

 YouTube

Only display icons/links that actually have data.

Music

Support optional background music with a small elegant play/pause control.

Never autoplay before the guest interacts with the invitation.

Languages

Add a discreet language switcher for:

English | हिंदी | తెలుగు

Switch languages without page reload or scroll reset.

Do not translate names, venue names or other proper nouns.

Final Branding

Near the bottom, place a very small transparent/semi-transparent horizontal Shop branding strip.

Keep the invitation artwork visible through it. It should feel like a subtle signature, not an advertisement.

ZAR Integration

Keep the wedding content data-driven and ready to connect to the ZAR invitation data.

The invitation must resolve through its exact customer slug:

/customer-slug

Root / must show a neutral design state.

Invalid or expired invitations must never display another wedding.

Support invitation lifecycle using active_from and active_until.

Use sample environment values only and create .env.example; never expose real credentials.

Responsive Design

Make it genuinely mobile-first and responsive at:

360px / 390px / 430px / tablet / desktop / large desktop

The architectural composition should intelligently recompose on mobile rather than simply shrink.

No horizontal scrolling, clipped ornaments, overlapping typography or inaccessible controls.

Final Quality

The finished product should feel like a luxury physical wedding invitation transformed into an interactive cinematic experience.

Prioritize:

 Premium visual design

 Smooth physical/cinematic transitions

 Strong architectural composition

 Elegant typography

 Mobile experience

 Clean data-driven implementation

Do not make it look like a generic wedding template, SaaS website, or collection of UI cards.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a5c3d1ba-3254-4305-9f8d-d64a0f1da6db).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
