# Results Visualization Plan

## Goal

Visualize ~20 participants' picks (10 cards + 1 tiebreaker) from the SOS set challenge. Compare group behavior vs. 17Lands performance data.

## Output

- New page in Vue app (e.g. `/results`).
- Data loaded from static local JSON (no live Firestore).

## Data inputs

- `submissions.json` — one-time export from Firestore `submissions-sos`. Shape: `[{ name, selectedCards: string[10], tiebreaker }]`.
- `17lands.json` — manual export from 17Lands. Per-card performance + metadata (name, color, rarity, url, pick_count, avg_pick, ever_drawn_win_rate, etc.).

## Page sections (top → bottom)

1. **Header** — N submissions, set name.
2. **Top picks overall** — ranked card grid w/ images, "picked by X/N". Headline.
3. **Per-slot breakdown** — one row per slot (W/U/B/R/G + 5 guilds). Top 2–3 cards per slot w/ %.
4. **Popularity vs. performance** — scatter, x = 17Lands GIH WR, y = group pick rate. Quadrant labels.
5. **Color / rarity distribution** — stacked bars, aggregate picks by WUBRG + by rarity. _Superseded by `features/participant-stacked-bars.md`._
6. **Tiebreaker** — own section, ranked Mystical Archive picks.
7. _(optional)_ **Outliers** — most contrarian / most consensus submission.

## Data flow

Static JSON imports → composable joins submissions ↔ 17Lands by card name + computes stats → dumb render components per section.

## Charts

Sections 2, 3, 5, 6 = hand-rolled Tailwind/SVG. Section 4 scatter = small chart lib OR ~40 lines of hand-rolled SVG. No Nuxt UI chart primitives exist.

## Scatter (section 4) detail

Axes: x = 17Lands GIH WR, y = group pick rate (0..N).

```
 group pick rate
  N/N   ┤                              ● Top pick everyone knows
        │    GROUP DARLINGS            CONSENSUS GOOD
        │    (underrated?)       ●
        │                    ●
        │         ●                    ●
        │                         ●         ●
        │   ●          ●
        │              ●    ●    ●
        │        ●                  ●
        │  ●   ●    ●        ●    ●    ●
        │ ●  ●   ●  ●   ●  ●   ● ●  ●
        │ GROUP MISSED                NOBODY WANTED
    0   ┤·····●··●··●·●●·●···●···●·●·●·····●·· (0-pick cards, faint)
        └─────┬─────────┬─────────┬─────────┬──
            48%       53%       58%       63%      GIH win rate
```

Quadrants:

- Top-right: group + data both love → consensus good (boring anchor).
- Top-left: group loved, data cold → darlings / sentimental / genuinely underrated.
- Bottom-right: data good, group ignored → "what you missed".
- Bottom-left: mostly empty by design.
- y=0 row faint: long tail of unpicked cards, shows win-rate distribution.

Design choices:

- Color dots by MTG color (WUBRG) — cheap visual richness, surfaces "group leans green" patterns.
- Label top ~5 per quadrant only; hover for rest (avoid clutter of ~80+ picked cards).
- Optional: size = 17Lands pick_count. Probably skip v1.
- v2 idea: small multiples, one scatter per slot (10 mini plots) — more honest (comparing within-slot) but more complex.

## Open questions

- Route: add router, or replace current form page (game over)?
- Slot order: is `selectedCards` ordered by slot, or infer slot from colors?
- Name matching submissions ↔ 17Lands: assume exact (Scryfall-sourced), assert at dev time.
- Show participant names (who picked what), or aggregates only?
- Scatter: show 0-pick cards (most of the set) as faint dots, or filter to ≥1-pick only?
