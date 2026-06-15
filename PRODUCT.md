# Product

## Register

brand

## Users

A single site that serves every professional evaluation context the user is in. The same page is opened by:

- Brazilian B2B founders and ops leads comparing automation vendors — they want to know "can this person fix my process?" within a few seconds.
- Recruiters and remote clients who arrived via LinkedIn, a referral, or a freelance platform (Workana, 99freelas, Toptal-style) — they want signals of senior-level full-stack + integrations + AI craft.
- Technical peers and potential collaborators who care about how the work was built, not just what was delivered.
- The user themselves, sending the URL as a "here's me" link from a CV, a freelance profile, or a cold outreach.

The visitor is rarely there to browse. They are there to form a snap judgment: senior operator or not, do their numbers and projects look real, and is the contact path obvious. The site is a hub, not a destination.

## Product Purpose

Bruno Martins' professional identity as a senior full-stack engineer and automation specialist. The site exists to convert professional curiosity into one of: an email, a WhatsApp message, a LinkedIn connection, a GitHub follow, or a freelance-platform click-through.

Success is not pageviews. It is the visitor leaving with a clear sense of "this person ships automation systems that reduce manual work, the proof is on the page, and reaching out is one click away." The product is the proof. The portfolio is the resume. The contact section is the close.

The work on display is concrete: WhatsApp lead qualification with a 3.2× lift, 14 hours/week of financial reconciliation automated to zero, a 40-tenant B2B portal at 99.95% uptime, and a 12-system integration hub with 5-day onboarding for new connections. Every claim is paired with a number or a stack tag.

## Brand Personality

**Operacional, direto, confiante.**

Operational. Direct. Confident.

The site reads like a senior on-call engineer talking, not a marketing department. Portuguese-Brazilian primary; technical English only where the term of art is English (full-stack, edge functions, RBAC). No second-person hype, no urgency theatre, no 3-tier pricing. The "Conversar" CTA is a coral button with a mailto, not a modal with a "Let's schedule a call" form.

Voice rules: a metric beats an adjective, a project name beats a tagline, a real stack list beats "various technologies". The copy should make a peer nod and a decision-maker call.

## Anti-references

Explicitly not this:

- **Generic SaaS-cream agency landing page.** Beige background, three identical feature cards, gradient hero, 3-tier pricing, testimonial carousel, "trusted by 10,000+ companies" footer. The 2023-era B2B template; the most common AI-generated reflex.
- **Late-2010s dev portfolio cliché.** Centered stock-photo headshot, "About Me" timeline, Bootstrap skills bars, list of logos for tools touched, "Download CV" button. Outdated, undifferentiated, signals junior.
- **Cyberpunk / "hacker terminal" cliché.** Matrix-green-on-black, ASCII art, monospace everything, "BREACH DETECTED" copy, fake warning bars. Cheap-looking and reeks of costume.

The Instrument Serif italic accent is in the same font family that floods the editorial-magazine lane; the surrounding palette, 3D scene, and metric-forward copy are the things that keep this from drifting into that lane. Maintain that tension on purpose.

## Design Principles

1. **Practice what you preach.** The site is the deliverable. If the user automates processes, the site itself is observably well-built: a real WebGL scene running at 60fps, an actual automation map with rendered connections, code-quality SSR with explicit error boundaries. No lorem ipsum, no template placeholders.
2. **Show evidence, not adjectives.** "−87% tempo de resposta" beats "rápido e eficiente". "14h/sem recuperadas" beats "aumenta a produtividade". Every project card has at least two numbers; every capability has a concrete deliverable. If a claim can't carry a number, cut it.
3. **Operate in plain sight.** The 3D hero scene and the automation map are not decoration — they are diagrams of the user's actual mental model (webhook / API / form → queue / router → AI / DB / CRM → cliente). The 11 nodes / 14 routes label in the hero card is a literal inventory. Visitors should be able to point at the screen and say "this is what you build".
4. **Direct copy, no fluff.** Match the existing voice: "Sem proposta de 30 slides. Sem reunião só para marcar reunião. Resposta em até 24h, em português direto." Short sentences, no second-person hype, no urgency theatre, no "Let's chat" filler. The contact section is a mailto link, not a form.
5. **One Brazilian voice, not two translated languages.** Primary PT-BR throughout. Technical English only where the term of art is English and the Brazilian version would be a translation of a translation. A senior client reading "Postgres" with no Portuguese gloss is correct, not a gap.
6. **Identity preservation over reflex-rejection.** The current type stack (Space Grotesk display, Inter body, JetBrains Mono for code, Instrument Serif for italic emphasis) and the "control room" palette (graphite base, electric cyan, acid lime, hot coral) are committed choices, not defaults to be second-guessed. Variants and additions respect what's shipping.

## Accessibility & Inclusion

- **WCAG 2.2 AA minimum**, with verified color contrast. Body text ≥4.5:1 against its background; large text ≥3:1; UI controls ≥3:1 against adjacent colors. Audit the muted-foreground ramp against both `--background` and `--card`; the existing 0.72 lightness on a 0.17 background is the typical weak spot to verify.
- **Reduced motion is honored everywhere.** The WebGL hero scene already detects `prefers-reduced-motion`; the same respect applies to scroll-driven motion in the About section (parallax on the portrait) and the marquee ticker. No motion-gated content visibility.
- **Keyboard navigation with visible focus** on every interactive element: nav links, the "Conversar" CTA, the contact mailto, the GitHub/LinkedIn footer icons, all project cards. Focus rings should ride the same cyan/ring token as the rest of the design.
- **Touch targets ≥ 44×44px** on mobile for the nav, CTAs, and footer social icons.
- **The 3D hero scene and the automation map are `aria-hidden`** (already true). Decorative imagery, decorative type glow, decorative grid backgrounds carry no information for assistive tech.
- **Language:** `<html lang="pt-BR">` on the live shell (currently `en` — flag and fix). Page copy is PT-BR; technical terms stay in English only when the term of art is English.
