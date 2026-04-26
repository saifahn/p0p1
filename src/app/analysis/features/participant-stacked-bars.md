# Feature: Per-participant horizontal stacked bars

Design-only spec. Implementation deferred.

**Replaces** PLAN.md §5 (aggregate color/rarity stacked bars).

## Purpose

Rank participants by total pick quality (sum of GIH WR across their 10 picks). Show which slots drove their score.

## Chart type

Horizontal stacked bars, hand-rolled HTML/CSS (flexbox). No SVG, no chart library.

## Axes

- **y** — participant (~20 rows, one bar each).
- **x** — sum of GIH WR across the participant's 10 slot picks.

## Bar structure

- One bar per participant; bar = flex container.
- 10 segments per bar in slot order:
  1. W
  2. U
  3. B
  4. R
  5. G
  6. Silverquill (W/B)
  7. Lorehold (W/R)
  8. Prismari (U/R)
  9. Quandrix (U/G)
  10. Witherbloom (B/G)
- Each segment = `<div>` with `flex: <WR>`. Segment width ∝ that slot pick's GIH WR.

## Segment rendering

**No flat color fills.** Each segment uses:

- `background-image` = the picked card's `art_crop` (already in card JSON).
- Overlay: mana symbol(s) identifying the slot.
  - 1 symbol for mono slots (W/U/B/R/G).
  - 2 symbols for guild slots (e.g. {W}{B} for Silverquill).
  - Source: [`mana-font`](https://www.npmjs.com/package/mana-font) npm package.
- Overlay: first few letters of card name (CSS `text-overflow: ellipsis`) if width permits.

### Narrow-segment fallback

Below a width threshold, drop the card-name text and keep only the mana symbol(s). Tooltip still carries full info.

## Tooltip

- Nuxt UI `UPopover` per segment, **tap-to-open / outside-to-close**.
- Content: slot name + full card name + WR (e.g. "Silverquill — Lorehold Apprentice — 56.2%").

## Total

- Sum of the 10 segment WRs (e.g. `5.42`) displayed to the right of each bar.

## Sort

- Bars sorted by total WR, **descending**.

## Naming

- Participants rendered by their submitted display name (no anonymization).

## Tiebreaker

- Excluded from the bar. Tiebreaker has its own section per PLAN.md §6.

## Open (impl-time)

- Exact narrow-segment width threshold (px or %?) for the text-drop fallback.
- Popover positioning when a segment is near the row edges.
- Whether to lazy-load `art_crop` images for off-screen rows.
