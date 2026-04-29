# Feature: Popularity vs Performance scatter

Design-only spec. Implementation deferred.

## Purpose

Compare the group's pick behaviour against 17Lands GIH win rate. Surface:

- **Group Darlings** — group loved, data cold (sentimental / underrated).
- **Group Missed** — data good, group ignored (what you missed).
- **Consensus** — group + data both love (boring anchor).
- **Nobody Wanted** — neither (long tail).

Corresponds to PLAN.md §4.

## Chart type

Scatter, hand-rolled inline SVG (~40 lines). No chart library.

## Axes

- **x** — 17Lands GIH win rate (~48–63%).
- **y** — group pick count (0..N participants).

## Data join

- `submissions.json` × `17lands.json` joined by card name.
- Assert exact name match at load (Scryfall-sourced both sides; surface mismatches as a dev-time error).
- For every card in `17lands.json`, compute `pickCount` = number of submissions containing the card in `selectedCards` or `tiebreaker`.

## Dots

- Color by MTG color (WUBRG); multicolor = split halves (two-tone dot).
- **No mana symbols on dots** — too small to read at scatter scale. Mana info lives in the popover.
- All cards plotted including 0-pick (v1).
- 0-pick row at y=0 rendered faint (~30% opacity) to suppress long tail.
- v2 toggle (post-implementation): "filter to ≥1-pick" — add after seeing v1 in browser.

## Quadrants

- Divider lines at `median(x)` and `median(y)`.
- Labels in each quadrant: **Consensus**, **Group Darlings**, **Group Missed**, **Nobody Wanted**.

## Labels

- Top ~5 cards per quadrant labeled inline (by pick count for top quadrants, by WR for bottom-right).
- Remaining cards labeled on tap via popover.

## Tooltips

- Nuxt UI `UPopover`, **tap-to-open / outside-to-close** (mobile-first; works identically on desktop click).
- Popover content:
  - Card image (`image_uris.normal`).
  - Card name.
  - GIH WR (e.g. `56.2%`).
  - Pick count (e.g. `7/20`).

## Open (impl-time)

- Exact popover positioning when dot is near chart edges.
- Whether to dim non-hovered dots when one popover is open.
