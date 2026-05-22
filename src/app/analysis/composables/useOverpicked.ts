import { computed, type ComputedRef } from 'vue'
import submissionsData from '@/app/analysis/data/submissions-sos.json'
import sosCardData from '@/common/sets/SOS-commons-uncommons.json'
import { SLOTS, type SlotDef } from '@/app/analysis/slots'
import { getFrontFaceName } from '@/app/common/cardName'
import { eligibleCardsForSlot } from '@/app/analysis/lib/eligibility'
import { slotAvgWR } from '@/app/analysis/lib/slotStats'
import { countPicks } from '@/app/analysis/lib/pickCount'

type SeventeenLandsEntry = {
  name: string
  ever_drawn_win_rate: number | null
}

type Submission = {
  'Document ID': string
  selectedCards: string[]
  tiebreaker: string
}

export type ScoredPick = {
  slot: SlotDef
  cardName: string
  artCrop: string
  imageUrl: string
  winRate: number
  pickCount: number
  slotAvg: number
  score: number
}

const TOP_N = 5

export function useOverpicked(seventeenLandsData: SeventeenLandsEntry[]): {
  rows: ComputedRef<ScoredPick[]>
} {
  const submissions = submissionsData as Submission[]
  const rows = computed<ScoredPick[]>(() => {
    const out: ScoredPick[] = []
    for (const slot of SLOTS) {
      const avg = slotAvgWR(slot, sosCardData, seventeenLandsData)
      const eligible = eligibleCardsForSlot(slot, sosCardData)
      for (const card of eligible) {
        const pickCount = countPicks(getFrontFaceName(card.name), submissions)
        if (pickCount === 0) continue
        const wrEntry = seventeenLandsData.find((e) => e.name === getFrontFaceName(card.name))
        const winRate = wrEntry?.ever_drawn_win_rate ?? 0
        const score = pickCount * (avg - winRate)
        out.push({
          slot,
          cardName: card.name,
          artCrop: card.image_uris.art_crop,
          imageUrl: card.image_uris.normal,
          winRate,
          pickCount,
          slotAvg: avg,
          score,
        })
      }
    }
    out.sort((a, b) => b.score - a.score)
    return out.slice(0, TOP_N)
  })
  return { rows }
}
