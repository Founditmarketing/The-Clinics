# theCLINICS — design system

This is the working design system for the site. It commits to choices. It avoids the 2026 editorial-typographic reflex (Fraunces + Inter + italic drop cap + small mono labels) by intent — that aesthetic is currently saturated and would smell of "AI made that" out of the gate.

## Aesthetic lane

**Civic-modern healthcare.** Think the visual confidence of a well-funded city hospital wayfinding system, the precision of a Swiss specimen page, the warmth of an analog wall clock in a small-town doctor's office. Not editorial-magazine. Not pastel-wellness. Not corporate-hospital.

Named anchors: **Klim Söhne specimen pages** (typographic confidence, no italic display drama), **NHS digital service manual** (calm, systematic, public-good clarity), **MoMA wayfinding** (committed black + sparingly-used signal color), **Mayo Clinic patient education materials** (authoritative without being cold).

## Color strategy

**Committed.** One saturated color load-bearing across 30–60% of the surface. The color is voice, not decoration.

### Palette — OKLCH, tinted toward forest

The brand color is a deep, slightly cool forest green. It carries authority without sliding into corporate navy. Every neutral is tinted toward it; nothing is pure black or white.

| Token              | OKLCH                       | Hex (approx) | Role                                                    |
| ------------------ | --------------------------- | ------------ | ------------------------------------------------------- |
| `--paper`          | oklch(98% 0.005 145)        | `#F8F8F4`    | Default surface. Cool ivory tinted toward green.        |
| `--paper-deep`     | oklch(95% 0.008 145)        | `#EFF0EA`    | Recessed surface, secondary panels.                     |
| `--ink`            | oklch(20% 0.015 160)        | `#1C2620`    | Default text. Near-black tinted toward forest.          |
| `--ink-soft`       | oklch(40% 0.012 160)        | `#4A554F`    | Secondary text.                                         |
| `--ink-mute`       | oklch(60% 0.008 160)        | `#7C857F`    | Tertiary text, captions.                                |
| `--rule`           | oklch(85% 0.01 160)         | `#D2D8D3`    | Hairlines, dividers.                                    |
| `--rule-strong`    | oklch(75% 0.012 160)        | `#B0B7B1`    | Strong dividers.                                        |
| `--forest`         | oklch(35% 0.06 155)         | `#2F4A3B`    | Primary brand. Buttons, headings on paper.              |
| `--forest-deep`    | oklch(22% 0.05 155)         | `#1A2C22`    | Footer surface, dark-mode hero.                         |
| `--signal`         | oklch(63% 0.18 35)          | `#C2552E`    | Single accent for CTAs, status, emphasis. Used sparingly. |
| `--signal-soft`    | oklch(88% 0.06 35)          | `#F0DAC9`    | Background tint, badges.                                |
| `--alert`          | oklch(60% 0.22 25)          | `#C7341F`    | True alert (911, error). Distinct from signal.          |

The `--signal` orange-red is borrowed from medical signage, not from "warm-and-friendly stock photography." It says "this is the action" without screaming.

### Where each color does work

- `--paper` and `--paper-deep`: most of the site by area.
- `--ink` and friends: typography.
- `--forest`: dark sections (mission, footer), primary buttons, headings.
- `--signal`: every primary CTA, the live-status pulse, urgency indicators, ONE thing per fold.
- `--alert`: 911 emergency states only.

Banned: gradients in text, generic teal "medical accent," pastel pink, neon, glassmorphism.

## Typography

**Two families. Both deliberate. Neither on the reflex-reject list.**

- **Display + headings — `Söhne Breit` / `Tiempos Headline`.** Open licensing tier we use on the public site is **`Reckless Neue`** by Displaay (or **`Editorial New`** by Pangram Pangram as the open-source-friendly fallback). Neither is on the saturated 2026 list. The voice is editorial-but-grounded — slab-leaning serif with confident apertures, not Fraunces' florid italics.
- **Body + UI — `Söhne` (Klim).** Licensed for production. Open-source fallback: **`General Sans`** (Indian Type Foundry) — humanist, slightly warm, pairs cleanly with the display serif.
- **Numerals + mono utility — `Söhne Mono` / `JetBrains Mono`.** Used ONLY for live-status timestamps, phone numbers, and lab-strip labels. Never decorative.

**Important fallback note.** If Söhne / Reckless licensing isn't in scope for the build, use **General Sans** + **Editorial New** from Pangram Pangram (both have open-source CDN distribution). Both deliver the same voice. Avoid Fraunces, Inter, DM Sans, Plus Jakarta, Newsreader, Lora, Cormorant — the reflex-reject list.

### Scale

Modular, fluid, ratio 1.333.

| Step | clamp                              |
| ---- | ---------------------------------- |
| h0   | clamp(3.5rem, 9vw, 7.5rem)         |
| h1   | clamp(2.5rem, 6vw, 5rem)           |
| h2   | clamp(1.875rem, 4vw, 3rem)         |
| h3   | clamp(1.375rem, 2.5vw, 1.875rem)   |
| body | clamp(1rem, 1.05vw, 1.0625rem)     |
| meta | 0.75rem                            |

Body line length capped 65–72ch. Body line-height 1.55. Headings line-height 0.95–1.05.

### Italics

Used minimally and only for specific roles: pull quotes, the patient testimonial wall. Not for display headlines. Not for drop caps. We avoid the italic-Fraunces reflex deliberately.

## Layout

- **Asymmetric editorial grid + structured wayfinding.** The home page tells a story; deeper pages are wayfinding.
- **Container pattern.** Max width 1200px on most pages, 1440px on the home hero. NEVER center-stack everything.
- **Card discipline.** Cards are used only when they're the best affordance. The Services index does NOT use a uniform card grid. Provider cards use editorial-portrait staggering. Booking confirmation is inline, not a modal.
- **Spacing rhythm.** Sections breathe at `py-24 / py-32`. Inside sections, related items group tighter (`gap-2` to `gap-5`); unrelated items separate further (`gap-12+`).

## Imagery

This is healthcare for real Cenla families. The visitor expects to see faces.

**Required imagery on the production site:**

1. The clinic exterior or interior (we have `/largeclinicshospitalpic.jpeg`).
2. Real provider headshots wherever available (we have 3: Buck, McBride, Beurlot).
3. For providers without headshots, use a typographic plate (large monogram on `--paper-deep`) — never a stock face. This communicates "we don't fake it."
4. Diagnostic equipment in clinical context (EKG, ultrasound). Stock is acceptable here if curated; we'll seed with specific Unsplash IDs.

Forbidden imagery:
- Generic "doctor pointing at clipboard" stock.
- Three smiling people who clearly don't know each other.
- Hands forming a heart.
- Pastel illustrations of organs.

## Motion

Minimal, purposeful, ease-out-quart. No bounce. No elastic.

- Hero word-rise (already shipped on home).
- Live-status pulse dot (always on).
- Section reveal on scroll (one staggered group per section, ~120ms cascade).
- Page transitions: a quick fade through `--paper`. No slide.
- Section-pinning, parallax, scroll-jacking: forbidden.

## Components

These component patterns are the canonical forms. Use them across pages instead of reinventing.

1. **Section header.** Small label (mono caps, `--ink-mute`) + display headline + optional eyebrow rule. Left-aligned. NEVER centered.
2. **Stat number.** Display serif, large, weight 400, set in `--forest` on paper or `--paper` on forest. Optional `--signal` highlight on ONE digit.
3. **Provider card.** Arched portrait or typographic plate, name in display, role in mono caps `--signal`, specialty in italic body.
4. **Service tile.** No icon-above-heading. Number in editorial italic + display title + meta strip.
5. **Live-status chip.** Small mono caps + pulse dot + dynamic text. Never inside a colored pill except in the dark top bar.
6. **CTA primary.** `--forest` button, paper text, no shadow ring, rounded-full.
7. **CTA signal.** `--signal` button, paper text, used for ONE action per fold.
8. **CTA ghost.** Underline-grow text link, no border.

## Voice & UX writing

- "Built for Cenla" not "Built for our community."
- "Same-roof answers" not "Comprehensive care."
- "Open until 5p" not "We're available during business hours."
- Numbers, not adjectives. "7 providers" beats "experienced team."
- Never em dashes. Never `--` in copy.

## Anti-patterns — banned in this codebase

- Center-stack hero with icon + title + paragraph + button.
- Three identical cards in a row with rounded-corner icon above each heading.
- Display serif italic drop cap on a body paragraph.
- Gradient text.
- Glassmorphism.
- Side-stripe colored borders on alerts or list items.
- Hero-metric template (giant number + small label + supporting stats + gradient accent).
- Stock photo of three diverse smiling models.
- "Schedule your appointment today!" exhortations.

## Where the home page currently sits

Most patterns are correct. Specific items to revise as part of the world-class pass:

- **Type stack** swap: replace Fraunces + Inter with Editorial New + General Sans (or licensed Söhne / Reckless if they're available).
- **Symptom-checker icon over heading**: kill the rounded-corner three-dot icon at the top of the panel; replace with an editorial label rail.
- **Booking section "stats grid"** at bottom of home (`< 1 min / 24h / 0`): kill it, this is the hero-metric template.
- **Insurance ticker**: ticker-as-strip is fine; the gold ✦ separator can stay; switch carrier names to a defensible Louisiana set (BCBS LA, Vantage Health, Peoples Health, Aetna, UHC, Humana, Tricare, Medicare, Medicaid).

Other pages are not yet polished and will be brought up to this system in the world-class pass.
