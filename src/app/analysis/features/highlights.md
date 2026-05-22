# Feature: Highlights page

Design-only spec. Implementation deferred.

**Supersedes** PLAN.md §6 (Tiebreaker section). Independent of `popularity-performance.md` — no shared definitions with the scatter quadrants even where the intent overlaps.

## Purpose

Storytelling view. Curated trophy-style highlights of the contest, distinct from the analytic Bars and Scatter tabs.

## Location

Third tab in the analysis tab set. Order: **Highlights | Bars | Scatter**. No router; uses the `UTabs` structure introduced in `wip: add tabs`.

## Vocabulary

- **Slot** — one of the 10 decision points per submission (5 mono W/U/B/R/G + 5 guilds WB/WR/UR/UG/BG). Source: `src/app/analysis/slots.ts`.
- **Pick** — a card chosen by a participant in a slot. Tiebreaker is a separate pick, excluded from the 10-slot team unless explicitly stated.
- **Team** — one card per slot (10 cards). Tiebreaker excluded.
- **Platonic team** — for each slot, the highest-WR eligible card from `SOS-commons-uncommons.json`, whether or not anyone picked it. Ceiling.
- **Crowd team** — for each slot, the most-picked card. Consensus.
- **WR** — `ever_drawn_win_rate` from `17lands-2026-05-21.json` (matches `useParticipantBars.ts`).
- **slotAvgWR** — mean WR of all eligible cards in a slot (data join: `SOS-commons-uncommons.json` × 17Lands).

## Sections

### 1. Two Teams (headline)

Side-by-side: Platonic team (left) vs Crowd team (right). 10 card thumbnails each, in slot order. Sum of WRs displayed under each team. Gap between the two totals is the implicit story ("ceiling vs reality").

Visual concern: 20 card images can dominate the page. Design compact before locking.

### 2. Best pick per slot

10 trophies, one per slot. For each slot: highest-WR card that **at least one participant picked**, with pick count.

- Tie-break on WR: prefer higher pick count.
- Every slot is required by contest rules, so empty slots are impossible.

### 3. Top 5 overpicked

Global ranked list across all picked cards.

- Score = `pickCount × (slotAvgWR − WR)`.
- Filter: `pickCount > 0`.
- Top 5 by score descending.

### 4. Top 5 missed

Mirror of §3.

- Score = `(N − pickCount) × (WR − slotAvgWR)`, where N = number of submissions.
- Filter: `pickCount < N` (cards everyone picked are not "missed").
- Top 5 by score descending.
- Expected to skew toward 0-pick cards — that's by design.

### 5. Tiebreaker (3 trophies)

Single slot, all 65 Mystical Archive cards have WR in `17lands-2026-05-21.json` (verified).

- **Most popular tiebreaker** — pick count.
- **Best tiebreaker actually picked** — highest WR among submitted tiebreakers.
- **Best tiebreaker no one picked** — highest WR in SOA with pickCount = 0.

Supersedes the PLAN.md §6 ranked-list section.

## Open

- **Section order.** Currently leaning `TT → BP → MS → OP → TB`: headline first, per-slot drill-down, positive story before negative, tiebreaker as outro. Alternatives: lead with BP (most card images), or lead with OP (scandal-first). Not yet locked.
- Two Teams visual density.
- Per-section component shape (image-card grid vs. ranked list vs. trophy strip) — not yet designed.
- Tab label: "Highlights" (taken from branch name `other-highlights`). Confirm before implementing.
