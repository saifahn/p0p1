import { computed, type ComputedRef } from 'vue'
import submissionsData from '@/app/analysis/data/submissions-sos.json'
import sosCardData from '@/common/sets/SOS-commons-uncommons.json'
import { SLOTS, type SlotDef } from '@/app/analysis/slots'
import { getFrontFaceName } from '@/app/common/cardName'

type SeventeenLandsEntry = {
  name: string
  ever_drawn_win_rate: number | null
}

type Submission = {
  'Document ID': string
  selectedCards: string[]
  tiebreaker: string
}

export type BestPickRow = {
  slot: SlotDef
  cardName: string
  artCrop: string
  winRate: number
  pickCount: number
}

function bestForSlot(
  slot: SlotDef,
  slotIndex: number,
  submissions: Submission[],
  data: SeventeenLandsEntry[],
): BestPickRow | null {
  const counts = new Map<string, number>()
  for (const sub of submissions) {
    const cardName = sub.selectedCards[slotIndex]
    if (!cardName) continue
    counts.set(cardName, (counts.get(cardName) ?? 0) + 1)
  }
  if (counts.size === 0) return null

  let best: BestPickRow | null = null
  for (const [cardName, pickCount] of counts) {
    const wrEntry = data.find((e) => e.name === getFrontFaceName(cardName))
    if (!wrEntry) {
      throw new Error(`17lands card data for "${cardName}" was not found in the provided data`)
    }
    const cardMeta = sosCardData.find((c) => c.name === cardName)
    if (!cardMeta) {
      throw new Error(`Card "${cardName}" not found in the provided card file`)
    }
    const winRate = wrEntry.ever_drawn_win_rate ?? 0
    const candidate: BestPickRow = {
      slot,
      cardName,
      artCrop: cardMeta.image_uris.art_crop,
      winRate,
      pickCount,
    }
    if (
      !best ||
      candidate.winRate > best.winRate ||
      (candidate.winRate === best.winRate && candidate.pickCount > best.pickCount)
    ) {
      best = candidate
    }
  }
  return best
}

export function useBestPickPerSlot(seventeenLandsData: SeventeenLandsEntry[]): {
  rows: ComputedRef<BestPickRow[]>
} {
  if (!seventeenLandsData.length) {
    console.warn('SeventeenLandsData is empty')
  }
  const submissions = submissionsData as Submission[]
  const rows = computed(() => {
    const out: BestPickRow[] = []
    SLOTS.forEach((slot, i) => {
      const row = bestForSlot(slot, i, submissions, seventeenLandsData)
      if (row) out.push(row)
    })
    return out
  })
  return { rows }
}
