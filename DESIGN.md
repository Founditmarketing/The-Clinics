# theCLINICS — design system (Harmony 2 cool-blue edition)

This is the working design system for the site. It commits to a cool-blue glassmorphic aesthetic
inspired by the cinematic Harmony 2 reference. The earlier warm-earth direction was retired
because it was not the reference the brand wanted.

## Aesthetic lane

**Cinematic civic healthcare.** Not editorial-magazine. Not corporate-hospital. Not pastel-wellness.
Cool icy backdrop with frosted glass surfaces, deep navy authority moments, and one committed
sky/cyan accent that carries every primary action. Warm imagery (real clinic photo, patient
faces) anchors the cool palette so it never reads cold.

Named anchors: Apple iCloud surface treatments, NHS digital service manual, Linear's brand
gradients, modern medical device UI (think Eko, Hello Heart, Forward), MoMA wayfinding clarity.

## Color strategy

**Committed.** One saturated sky/cyan does the load-bearing accent work; deep forest navy carries
authority. Soft cool ivory is the surface; glass is the texture.

### Tokens (CSS custom properties, see `index.css`)

| Token              | Hex / value           | Role                                                   |
| ------------------ | --------------------- | ------------------------------------------------------ |
| `--ivory`          | `#ecf4fb`             | Default body backdrop.                                 |
| `--ivory-deep`     | `#dfeaf7`             | Recessed surface, secondary panels.                    |
| `--ivory-warm`     | `#d4e3f3`             | Slightly warmer pull-down surface.                     |
| `--bone`           | `#f8fbfe`             | Pure white-ish on dark surfaces.                       |
| `--sand`           | `#c9daee`             | Soft separator panel.                                  |
| `--forest`         | `#1565c9`             | Primary brand blue, button bg, headings on light.      |
| `--forest-deep`    | `#07172d`             | Deep navy authority surface (footer, mission, CTA).    |
| `--forest-soft`    | `#3d8fd9`             | Lighter brand blue.                                    |
| `--sage`           | `#5c92c4`             | Muted blue-gray (compatible with sand).                |
| `--sage-light`     | `#a8cff0`             | Soft blue-gray on dark surfaces.                       |
| `--sage-pale`      | `#cfe8fb`             | Very pale icy blue.                                    |
| `--terracotta` *   | `#38bdf8` (sky)       | Committed accent. Hover, signal CTAs, live dot, em.    |
| `--terracotta-deep`| `#0284c7`             | Deeper accent for buttons / underlines.                |
| `--terracotta-pale`| `#bae6fd`             | Soft accent for chips and badges.                      |
| `--gold`           | `#38bdf8`             | Aliased to sky for legacy gold callouts.               |
| `--gold-pale`      | `#e0f2fe`             | Light label text on dark surfaces.                     |
| `--ink`            | `#071524`             | Default text.                                          |
| `--ink-soft`       | `#1e3a55`             | Secondary text.                                        |
| `--ink-mute`       | `#5a6e82`             | Tertiary text, captions.                               |
| `--line`           | rgba(21,101,201,0.11) | Hairlines.                                             |
| `--line-strong`    | rgba(21,101,201,0.20) | Strong dividers.                                       |

(*) The `--terracotta` token name is preserved from the older system so we do not have to chase
every reference, but it now resolves to a sky/cyan blue. New code should reach for the semantic
token (`--terracotta-deep` for primary signal, etc.) rather than the literal hex.

### Glass tokens

| Token                    | Value                                 |
| ------------------------ | ------------------------------------- |
| `--glass-bg`             | `rgba(255,255,255,0.44)`              |
| `--glass-bg-strong`      | `rgba(255,255,255,0.62)`              |
| `--glass-border`         | `rgba(255,255,255,0.58)`              |
| `--glass-blur`           | `blur(22px) saturate(165%)`           |
| `--glass-inner`          | `inset 0 1px 0 rgba(255,255,255,0.68)`|
| `--glass-shadow`         | `0 14px 46px rgba(7,46,88,0.13)`      |
| `--glass-dark-bg`        | `rgba(7,28,52,0.52)`                  |

Helper classes:
- `.hh-glass-surface` (paper glass)
- `.hh-glass-soft` (lighter)
- `.hh-glass-dark` (dark navy glass)

## Typography

- **Display + headings** — `Fraunces` 400 with ss01/ss03. Used as the editorial display face.
- **Body + UI** — `Inter` 300/400/500/600/700.
- **Numerals + mono utility** — `JetBrains Mono` 400/500. Live timestamps, phone numbers, lab
  labels, eyebrows.

Note that Fraunces and Inter are both on the impeccable skill's reflex-reject list. We are using
them deliberately because the Harmony 2 source used them, and identity preservation wins over
greenfield font selection. If we re-greenfield later, candidates would be General Sans + Boska
(Fontshare, free for commercial).

### Scale

Modular, fluid. Headlines use `clamp()` between 2rem and 7vw. Body line-length capped 60–72ch.

## Layout

- **Asymmetric editorial grids** for hero, mission, location.
- **Sticky glass nav** with backdrop-filter blur.
- **Container width** 1280px max for content; deep navy panels can full-bleed.
- **Card discipline** — when cards are used (services, providers, FAQ), they are glass surfaces,
  never the icon-above-heading template.

## Motion

Ease-out cubic, no bounce.

- Page-load: word-rise mask reveal on hero headline, staggered fade-up on hero CTAs/stats.
- Scroll reveal via `<Reveal>` (IntersectionObserver). One staggered cascade per section.
- Live status: `pulse-dot` on open status badge.
- Cursor dot follower (sky cyan, mix-blend multiply, grows on interactive elements).
- Drift on background orbs.
- All animations respect `prefers-reduced-motion`.

## Components

The canonical patterns:

1. **Eyebrow** — `eyebrow` class. Mono caps with sky tint chip.
2. **Display headline** — `font-display` Fraunces, `clamp(2rem, ...)`.
3. **Italic emphasis word** — `.hh-em { color: var(--terracotta-deep); font-style: italic; }`.
4. **Glass card** — `.hh-glass-surface` paper card with backdrop blur.
5. **Live status chip** — `.tag.tag-live` with pulsing dot.
6. **Primary CTA** — `.btn .btn-primary` (forest blue) for cool authority.
7. **Signal CTA** — `.btn .btn-terracotta` (sky cyan gradient) for the action that converts.
8. **Ghost CTA** — `.btn .btn-ghost` (paper glass).
9. **Provider card** — arched portrait, name, mono role, italic specialty.
10. **Service row** — editorial table with editorial numerals + tagline + expect strip.

## Conversion plumbing

- Phone visible at all times (header, every page CTA, mobile bottom bar).
- Live status (open / closed + closing-in countdown) on header top bar.
- Insurance checker on Home + Services (typeahead, instant verdict).
- AI symptom checker → recommended provider → one-tap book.
- Booking flow as 4-step glass modal with auto-populated fields.
- Provider modal with one-tap "Book with [first name]".
- MapLibre real map for the single Alexandria, LA location.
- HIPAA reassurance copy near every form.

## Anti-patterns banned in this codebase

- Center-stack hero with icon + title + paragraph + button.
- Three identical card grids with rounded-corner icon above each heading.
- Display-serif italic drop caps on body paragraphs.
- Gradient text.
- Glassmorphism abused as decorative chrome (it is structural here).
- Side-stripe colored borders.
- Hero-metric template (giant number + small label + supporting stats + gradient accent stack).
- Stock photo of three diverse smiling models.
- "Schedule your appointment today!" exhortations.
- Em dashes in copy. (Use commas, colons, semicolons, periods, parentheses.)

## Out of scope (intentionally)

- Hero video. We do not have one and stock 4K healthcare video reads as cliché. We use a single
  high-quality clinic exterior photo with a glass overlay instead.
- Multi-location chrome. We have one location.
- Internal product UX (the patient portal lives on eClinicalWorks).
