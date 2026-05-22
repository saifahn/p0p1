import type { SlotDef } from '@/app/analysis/slots'
import { eligibleCardsForSlot, type EligibleCardLike } from './eligibility'
import { getFrontFaceName } from '@/app/common/cardName'

type SeventeenLandsEntry = {
  name: string
  ever_drawn_win_rate: number | null
}

export function slotAvgWR<T extends EligibleCardLike & { name: string }>(
  slot: SlotDef,
  sosCards: ReadonlyArray<T>,
  seventeenLands: ReadonlyArray<SeventeenLandsEntry>,
): number {
  const eligible = eligibleCardsForSlot(slot, [...sosCards])
  const wrs: number[] = []
  for (const card of eligible) {
    const entry = seventeenLands.find((e) => e.name === getFrontFaceName(card.name))
    if (entry?.ever_drawn_win_rate != null) wrs.push(entry.ever_drawn_win_rate)
  }
  return wrs.length ? wrs.reduce((s, w) => s + w, 0) / wrs.length : 0
}
