---
name: Bruno Martins — Operating Surface
description: A senior engineer's professional hub, instrumented and direct, in graphite + electric cyan + acid lime + hot coral.
colors:
  graphite: "oklch(0.17 0.012 250)"
  slate-deep: "oklch(0.12 0.012 250)"
  card: "oklch(0.21 0.014 250)"
  popover: "oklch(0.19 0.014 250)"
  steel: "oklch(0.26 0.018 250)"
  border: "oklch(0.3 0.018 250)"
  input: "oklch(0.28 0.016 250)"
  muted: "oklch(0.24 0.014 250)"
  foreground: "oklch(0.97 0.005 250)"
  muted-foreground: "oklch(0.72 0.018 250)"
  cyan: "oklch(0.82 0.16 210)"
  cyan-glow: "oklch(0.88 0.18 205)"
  lime: "oklch(0.88 0.22 130)"
  coral: "oklch(0.72 0.21 25)"
  destructive: "oklch(0.7 0.22 25)"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.1em"
    textTransform: "uppercase"
  serif-emphasis:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontStyle: "italic"
    fontWeight: 400
    letterSpacing: "-0.01em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  "2xl": "16px"
  "3xl": "20px"
spacing:
  section-y: "112px"
  card-pad: "28px"
  cap-pad: "32px"
  chip-pad: "4px 10px"
components:
  button-coral-cta:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-foreground:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-ghost-outline:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  nav-cta:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  eyebrow-label:
    textColor: "{colors.cyan}"
    typography: "{typography.label}"
  card-soft:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.2xl}"
    padding: "28px"
  card-soft-hover:
    backgroundColor: "{colors.steel}"
    rounded: "{rounded.2xl}"
    padding: "28px"
  ring-focus:
    borderColor: "{colors.cyan}"
---

# Design System: Bruno Martins — Operating Surface

## 1. Overview

**Creative North Star: "The Engineer's Operating Surface"**

The site is the engineer's working environment, not a brochure. Cool graphite surfaces carry the working content; signal lights (electric cyan, acid lime, hot coral) are the only color sources and each one means something. Cyan is *signal in* and *system identity* — the wireframe 3D scene reads in cyan, primary links run in cyan, focus rings land on cyan. Lime is *signal live* — a pulse dot beside a label, a metric callout on a project card, the latency tag on the portrait. Coral is *the action* — a single CTA per page, glowing on a quiet surface, never decorative. Everything else is graphite, steel, and near-white ink.

Composition is dense and confident. The single page is a long scroll, each section one dominant idea: hero with 3D scene, capability grid, project cards with real metrics, four-step process, contact, footer. Type runs in two voices: Space Grotesk in semibold for displays, Inter for body, JetBrains Mono for technical labels, and Instrument Serif italic for short emphatic accents ("automações", "construir") that keep the technical surface from feeling cold. The accent is the *single piece of editorial warmth* in an otherwise operational system — it is what keeps the page from drifting into the cyberpunk / Matrix-green / all-mono trap.

**Key Characteristics:**
- Cool dark surface (graphite + slate-deep + card) carries 90% of the visual weight; signal colors carry the rest.
- Type is technical by default (mono labels, small caps, wide tracking) with one italic serif word or short phrase per major heading as deliberate contrast.
- Every project card carries at least two metrics, never adjectives; the design enforces "show evidence, not adjectives".
- The CTA is a single coral button per page. No "Learn more", no secondary CTAs, no "Let's chat" filler.
- The 3D hero scene (wireframe torus-knot + packets on orbital nodes + parallax particles) is the literal mental model of the user's work: inputs at the edge, services at the core, cliente at the exit. Decoration is a diagram.

## 2. Colors

The palette is a deliberate **signal-first** system: a deep cool graphite surface, a single near-white ink, and three named signal lights that each carry a fixed meaning. Values in `colors.*` are normative; canonical OKLCH appears in the source `src/styles.css` `:root` block.

### Primary
- **Signal Cyan** (`oklch(0.82 0.16 210)`): the brand color and the dominant accent. Used for: nav status dot, primary links, focus rings, the wireframe 3D scene, the automation map edges, project icons on hover, eyebrow rules on every section, and the `--ring` token. Approximate hex: `#22d3ee`.
- **Signal Cyan — Glow** (`oklch(0.88 0.18 205)`): the brighter cyan used for halos and packet trails in the 3D scene and for text glow on the heading accent ("automações"). Approximate hex: `#67e8f9`.

### Secondary
- **Acid Lime** (`oklch(0.88 0.22 130)`): the live-state accent. Used only for: pulse dots next to live status ("Disponível · Q2 2026", "online · operando"), the underline under "entregam resultado." in the hero, the metric numbers on project cards, the `● rec` indicator on the portrait, and the in-svg "core" nodes on the automation map. Approximate hex: `#a3e635`.

### Tertiary
- **Hot Coral** (`oklch(0.72 0.21 25)`): the action color. Used only for: the primary CTA ("Conversar" in the nav, the mailto in the contact section), the destructive token, the soft glow blob behind the contact section, and the latency tag in the About section. Approximate hex: `#fb7185`.

### Neutral
- **Graphite** (`oklch(0.17 0.012 250)`): the deepest surface, body background. Approximate hex: `#1f242b`.
- **Slate-Deep** (`oklch(0.12 0.012 250)`): the deepest layer, used for the 3D scene backdrop, the About photo frame, and the project/section-2 backdrop. Approximate hex: `#181b21`.
- **Card** (`oklch(0.21 0.014 250)`): the lifted surface, used for cards, the nav backdrop, and the project screenshot frames. Approximate hex: `#262a31`.
- **Steel** (`oklch(0.26 0.018 250)`): the secondary surface, used for inputs, ghost buttons, capability cells on hover, and the embedded scene frame. Approximate hex: `#2e333a`.
- **Muted Foreground** (`oklch(0.72 0.018 250)`): the body-text-on-background color. Used for paragraph copy, eyebrow descriptions, footer text, and label metadata. **The contrast-audit hot spot**: confirm ≥4.5:1 against every surface it appears on (background, card, steel, slate-deep); the lightness is high but the chroma is low and contrast against slate-deep is the weakest pair.
- **Foreground** (`oklch(0.97 0.005 250)`): the headline / display ink. Used for the hero h1, section h2s, project titles, and the inverse button. Approximate hex: `#f3f4f6`.
- **Border** (`oklch(0.3 0.018 250)`): the 1px hairlines between cells, sections, and the "automation_grid.live" frame. The grid-as-divider pattern (capability / process / facts grids) uses a `bg-border` wrapper with `gap-px` so this color renders as the cell divider.

### Named Rules

**The Three Signals Rule.** Cyan, lime, and coral each have one meaning. Cyan = system identity, links, focus. Lime = live / now / available. Coral = the action, the CTA. A signal used for a different purpose is a layout bug.

**The One Coral Per Page Rule.** Coral appears once per major viewport — the nav CTA in the upper fold, the contact CTA in the lower fold. Two coral CTAs in the same viewport is failure; coral loses its signal weight.

**The 4.5:1 Rule.** Body text must hit 4.5:1 against its surface. Headline text (≥18px or bold ≥14px) can run at 3:1. The current muted-foreground ramp is the most common failure point on a dark surface; verify it on every surface it appears on, not just the body background.

## 3. Typography

**Display Font:** Space Grotesk (with Inter, system-ui, sans-serif fallback) — semibold 600, letter-spacing -0.025em.
**Body Font:** Inter (with system-ui, sans-serif fallback) — regular 400, with `font-feature-settings: "ss01", "cv11"` for refined glyphs.
**Label / Mono Font:** JetBrains Mono (with ui-monospace, monospace fallback) — uppercase, 11–12px, letter-spacing 0.08–0.1em.
**Italic Emphasis Font:** Instrument Serif (with Times New Roman, serif fallback) — italic 400, letter-spacing -0.01em, used for one or two short words per major heading.

**Character:** A technical pairing with one editorial accent. Space Grotesk reads as engineered (geometric, slightly condensed, no nonsense). Inter is the workhorse. JetBrains Mono carries the *labels* — every section eyebrow, every metric tag, every status indicator, every URL fragment. Instrument Serif italic is the contrast move: a single word or short phrase ("automações", "construir", "operação") that signals editorial intent without making the page feel like a magazine.

### Hierarchy
- **Display** (Space Grotesk 600, `clamp(3rem, 6vw, 4.5rem)`, line-height 1.02, letter-spacing -0.025em): hero h1, contact h2. The largest voice; one per section.
- **Headline** (Space Grotesk 600, `clamp(2.25rem, 4.5vw, 3rem)`, line-height 1.05, letter-spacing -0.02em): section h2. Used for "O que entrego, na prática.", "Provas, não promessas.", "Do problema ao sistema rodando.", "Engenheiro de software com cabeça de operação."
- **Title** (Space Grotesk 600, 1.5rem, line-height 1.2): card h3, project titles, capability titles.
- **Body** (Inter 400, 1rem / 1.125rem, line-height 1.6): paragraph copy. Cap line length at 65–75ch on prose blocks (most are 60–66ch in the current build).
- **Label** (JetBrains Mono 400, 11–12px, letter-spacing 0.08–0.1em, uppercase): every section eyebrow ("Capacidades", "Projetos · Selecionados", "Como trabalho", "Sobre · Bruno Martins"), every metric tag (`tempo de resposta`, `recuperadas`, `rec`), every status dot, every URL fragment. This is the technical surface of the page.
- **Italic Emphasis** (Instrument Serif 400 italic, 1em+): a single short word or phrase inside a display or headline. Never runs longer than ~6 words. The "single editorial accent" rule: at most one per heading.

### Named Rules

**The Mono Eyebrow Rule.** Every section above a heading gets a mono uppercase eyebrow in cyan with a 32px hairline rule before the text. Don't use sans, don't use sentence case, don't add a period. The eyebrow IS the kicker; do not also add a separate kicker line.

**The Italic-Quota Rule.** A heading gets at most one Instrument Serif italic phrase. The phrase must be a short noun or verb in PT-BR; never a full clause, never English, never more than six words.

**The 6rem Cap Rule.** Display headlines stop at 6rem (`clamp()` max). Anything above that is shouting. The current hero h1 caps at 4.5rem and should not exceed 6rem on the largest viewport.

## 4. Elevation

The system is **glow-first, not shadow-stacked**. Surfaces are flat and light-emitting; depth is conveyed by signal lights, not by a stack of paper cards. A coral button glows; a focused input grows a cyan ring; a project card on hover grows a cyan halo. Drop shadows are minimal — a single soft 60px -30px under cards (`--shadow-card`) gives them a sense of being mounted on the graphite surface, not floating above it.

This is the opposite of the SaaS-cream landing page, where depth comes from layered shadows and rounded cards stacked on a beige background. The "control room" reading only works if the surface itself is the dominant element, and shadows don't get in the way.

### Shadow Vocabulary
- **Card Mount** (`0 1px 0 0 oklch(1 0 0 / 5%) inset, 0 30px 60px -30px oklch(0 0 0 / 60%)`): the soft drop under cards, with a 1px inset highlight along the top edge. The only shadow on a resting card.
- **Cyan Signal Glow** (`0 0 0 1px color-mix(in oklab, var(--cyan) 25%, transparent), 0 20px 60px -20px color-mix(in oklab, var(--cyan) 45%, transparent)`): the glow on project cards on hover. Cyan ring + soft cyan drop; signals "this card is interactive".
- **Coral CTA Glow** (`0 10px 40px -10px color-mix(in oklab, var(--coral) 55%, transparent)`): the glow under coral buttons. The CTA is the only element on the page with a directional warm shadow.
- **Background Blobs** (cyan / lime / coral blurred 120–140px circles at 8–10% opacity): large, soft, off-screen. Used in the hero, About, and Contact sections to give the surface a sense of light source without committing to a literal backdrop.

### Named Rules

**The Flat-At-Rest Rule.** Surfaces are flat. Cards have one soft drop shadow at rest (the card mount). Hover adds a cyan glow; focus adds a cyan ring; the CTA is the only element with a permanent directional glow.

**The No-Stacked-Shadow Rule.** Never stack two drop shadows on the same element. Two shadows = confusion about the elevation surface.

**The No-Frosted-Glass Rule.** `backdrop-filter: blur(...)` is reserved for the fixed nav (`bg-background/70 backdrop-blur-xl`). Decorative glass cards (the SaaS-template tell) are forbidden.

## 5. Components

### Buttons
- **Shape:** 6px radius (`--radius-md`).
- **Coral CTA** (backgroundColor `var(--coral)`, text `var(--graphite)`, padding 12–14px 16–24px, `--shadow-glow-coral` glow on hover): the only coral button on the page. Used for the nav "Conversar" CTA and the contact mailto CTA. Hover scales 1.02; the arrow shifts up-and-right.
- **Foreground Primary** (backgroundColor `var(--foreground)`, text `var(--background)`, padding 12px 20px): the "Ver projetos" button in the hero. Inverts the surface to stand out without adding a glow.
- **Ghost Outline** (border 1px `var(--border)`, backgroundColor `var(--steel)` / 60%, padding 12px 20px): the "Conversar sobre um projeto" and "WhatsApp" buttons. Hover shifts the border to cyan and the text to cyan.
- **Focus:** 2px cyan ring (`--ring`), never removed. Visible on every interactive element, including the mono text links in the nav and footer.

### Chips / Tags
- **Style:** 1px border `var(--border)`, backgroundColor `var(--slate-deep)`, font-mono 10–11px uppercase, tracking-widest, padding 4–6px 8–10px, radius `var(--radius-sm)` (4px).
- **Use:** stack tags on project cards, status chips on the About section, eyebrow labels on each section, and the "11 nodes · 14 routes" metadata in the hero scene card.

### Cards / Containers
- **Corner Style:** 16px (`--radius-2xl`).
- **Background:** `var(--card)` (default) or `var(--steel)` (hover).
- **Border:** 1px `var(--border)`.
- **Shadow:** `--shadow-card` at rest; `--shadow-glow-cyan` on hover for project cards.
- **Internal Padding:** 28px (`p-7`) for project cards; 32px (`p-8`) for capability cells; 16px (`p-4`) for the hero scene frame.
- **Cell Grids:** Capability / process / facts grids use a 1px `bg-border` wrapper with `gap-px` so each cell shares a 1px hairline as its divider (the *grid-as-divider* pattern). No double borders, no nested cards.

### Inputs / Fields
- **Style:** 1px border `var(--input)`, backgroundColor `var(--input)` (faint, blends with surface), radius `var(--radius-md)`.
- **Focus:** 2px cyan ring; no glow, no scale.

### Navigation
- **Style:** fixed, full width, 1px `var(--border/40)` bottom border, `bg-background/70` + `backdrop-blur-xl` (the only legitimate use of backdrop blur on the page).
- **Logo:** 8×8 steel square with a 2×2 cyan dot inside, label `bruno` + `.martins` (the `.martins` in cyan).
- **Links:** muted-foreground default, foreground hover. No underline, no transition other than color.
- **CTA:** the coral "Conversar" button (see Buttons).
- **Mobile:** nav links hidden below `md` breakpoint; the coral CTA stays.

### Signature Components

**The Status Dot.** A 1.5×1.5px dot, lime or cyan, with the `pulse-dot` keyframe (1.6s ease-in-out infinite). Used to indicate "live", "available", "online" — never decoration. Always paired with a mono label.

**The Mono Eyebrow.** A horizontal hairline (`<span class="h-px w-8 bg-[var(--cyan)]" />`) + uppercase mono text in cyan. The rule that says "the next section is technical". One per section header; no more.

**The Hero Scene Card.** The wireframe 3D scene in a 16/11 frame: a "file header" with a lime pulse dot + filename + "11 nodes · 14 routes" metadata, the 3D canvas, and a "footer" with `in · webhook / api / form` (cyan) and `out · cliente` (coral). The card itself is a diagram of the user's mental model.

**The Automation Map.** A static SVG diagram (in `src/components/AutomationMap.tsx`) showing webhook / api / form → queue / router → ai / db / crm → cliente. Curved cyan edges with a `dash-flow` keyframe (4–6s linear infinite) and pulsing nodes in the signal colors. Decoration IS a diagram.

**The Portrait Frame.** The 1024×1024 photo in `src/assets/bruno-portrait.jpg`, set in a steel frame with a 15% grayscale, a coral-and-cyan mix-blend overlay, and three floating mono tags ("online · operando" / "latency < 24h resposta" / "bruno_martins.jpg · ● rec"). The tags are the camera UI that the page is "shot from".

## 6. Do's and Don'ts

### Do
- **Do** keep type tight and confident: Space Grotesk display, Inter body, JetBrains Mono labels, Instrument Serif italic for one short phrase per heading. Cap displays at 6rem.
- **Do** show evidence on every project card: at least two metrics, real stack tags, no adjectives in place of numbers. "−87% tempo de resposta" beats "rápido e eficiente".
- **Do** use signal colors for their fixed meaning: cyan = system identity / links / focus, lime = live / now, coral = the CTA. Cyan-on-hover for project cards, lime for live dots, coral only on the action.
- **Do** use the grid-as-divider pattern (`bg-border` wrapper + `gap-px` + `bg-card` cells) for capability / process / facts grids. 1px shared hairlines, no nested cards.
- **Do** honor reduced motion: the WebGL hero scene must detect `prefers-reduced-motion` (already true) and the same applies to scroll-driven parallax in About, the marquee ticker, and the entrance staggers in motion/react.
- **Do** keep the CTA to one coral button per major viewport. The nav has one; the contact section has one. They are the same action and the same color.
- **Do** keep `<html lang>` aligned with the copy. Currently `en` in `src/routes/__root.tsx`; should be `pt-BR` to match the page.
- **Do** verify body text hits 4.5:1 against every surface it appears on. The current `--muted-foreground` (`oklch(0.72 0.018 250)`) is the most common failure point; verify on background, card, steel, and slate-deep.

### Don't
- **Don't** use border-left or border-right greater than 1px as a colored stripe on cards, list items, or callouts. Use full borders, background tints, leading numbers/icons, or nothing.
- **Don't** use gradient text. `background-clip: text` with a gradient is decorative, never meaningful. Emphasis goes through weight, size, or italic.
- **Don't** use glassmorphism as decoration. `backdrop-filter: blur(...)` is reserved for the fixed nav; never on cards or content blocks.
- **Don't** add an uppercase tracked eyebrow above every section heading AND a separate kicker. One mono eyebrow with a 32px hairline rule is the system; adding more is AI scaffolding.
- **Don't** add numbered section markers (01 / 02 / 03) to every section. They earn their place only on the Process section, which is a real 4-step sequence; using them as eyebrows on About, Capabilities, or Contact is grammar, not voice.
- **Don't** ship the SaaS-cream agency landing page. No beige, no 3-tier pricing, no testimonial carousel, no gradient hero. The surface is graphite; the page is a control surface.
- **Don't** ship the late-2010s dev portfolio: no centered stock photo + Bootstrap skills bars + chronological "About Me" timeline. The user is a senior operator; the page shows the work.
- **Don't** ship the cyberpunk / Matrix terminal cliché: no full green-on-black, no ASCII art, no fake warning bars. Mono labels are present, but they are accent, not the entire visual.
- **Don't** allow text to overflow its container. Headline words + large clamp + narrow grids cause overflow on tablet/mobile. Test every heading at every breakpoint.
- **Don't** add the SaaS hero-metric template (big number + small label + supporting stats + gradient accent) anywhere outside the existing process / project cards, where the metrics are real numbers tied to specific work.
- **Don't** ship identical card grids with icon + heading + text repeated. The capability grid varies row layouts at the lg breakpoint; the project grid is 2-col with metrics, not a row of equal cards.

## Portfolio refinement — September 2026

The opening now leads with Bruno's name, a concise professional proposition and two clear paths: selected projects and LinkedIn. Projects precede the biography. Four alternating project stories use conceptual architecture artwork, existing outcomes and direct links to the corresponding case studies. Artwork is explicitly labelled as a representation, not a product screenshot.

Motion has three levels: a brief masked title entrance; a lazy-loaded Three.js assembly with pointer response and scroll parallax; and restrained project diagrams, link feedback and reading progress. WebGL rendering stops outside the viewport and in hidden tabs, limits pixel ratio to 1.6 and disposes GPU resources on unmount. CSS diagram loops pause offscreen. A global pause control and the system reduced-motion preference disable animations and parallax; the content remains readable before hydration and a static graphic replaces unavailable WebGL.

Navigation uses a mobile disclosure with Escape handling, visible keyboard focus and 44px controls. Section targets clear the fixed header. Contact copy addresses clients, teams and recruiters. The obsolete quarterly availability label is removed.

The existing fonts and signal palette are retained. Home project stories replace the previous repeated cards. New headings use sentence case, short captions and less glow; sections use different compositions. These decisions supersede the repeated eyebrow and uniform card conventions above.

## Featured work and demonstrations — September 2026 revision

The home selection is INTTAX Fiscal, INTTAX Reforma Tributária, Robô Paris and Game Day Nexus. SaaS-SIEG remains in the detailed project collection. The Reforma Tributária case is based on the owner's supplied project summary: a platform for accounting and tax offices to deliver consulting, supported by comparable scenarios, calculation evidence and the Argos assistant. No financial return, AI accuracy, latency or production pgvector claim is invented for this case.

Each featured project has a four-stage interactive demonstration with semantic step buttons, local playback controls and a global motion preference. Audit documents converge into the processing engine and produce an evidence report. Reforma moves from the fiscal base to scenarios, impacts and consulting. Banking shows collection and organization by company. Nexus shows scoped access, permissions and isolated clubs. Figures are illustrative, without client records. Both timers and repeating effects stop offscreen and when the document is hidden; reduced-motion mode retains manual stage navigation.
