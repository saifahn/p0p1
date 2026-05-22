import { computed, type ComputedRef } from 'vue'
import submissionsData from '@/app/analysis/data/submissions-sos.json'
import soaCardData from '@/common/sets/SOA-cards.json'
import { getFrontFaceName } from '@/app/common/cardName'
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

export type TiebreakerStat = {
  cardName: string
  artCrop: string
  imageUrl: string
  winRate: number
  pickCount: number
}

export type TiebreakerStats = {
  mostPopular: TiebreakerStat | null
  bestPicked: TiebreakerStat | null
  bestUnpicked: TiebreakerStat | null
}

export function useTiebreakerStats(seventeenLandsData: SeventeenLandsEntry[]): {
  stats: ComputedRef<TiebreakerStats>
} {
  const submissions = submissionsData as Submission[]
  const stats = computed<TiebreakerStats>(() => {
    let mostPopular: TiebreakerStat | null = null
    let bestPicked: TiebreakerStat | null = null
    let bestUnpicked: TiebreakerStat | null = null

    for (const card of soaCardData) {
      const wrEntry = seventeenLandsData.find((e) => e.name === getFrontFaceName(card.name))
      if (wrEntry?.ever_drawn_win_rate == null) continue
      const stat: TiebreakerStat = {
        cardName: card.name,
        artCrop: card.image_uris.art_crop,
        imageUrl: card.image_uris.normal,
        winRate: wrEntry.ever_drawn_win_rate,
        pickCount: countPicks(getFrontFaceName(card.name), submissions),
      }
      if (!mostPopular || stat.pickCount > mostPopular.pickCount) mostPopular = stat
      if (stat.pickCount > 0 && (!bestPicked || stat.winRate > bestPicked.winRate)) {
        bestPicked = stat
      }
      if (stat.pickCount === 0 && (!bestUnpicked || stat.winRate > bestUnpicked.winRate)) {
        bestUnpicked = stat
      }
    }

    return { mostPopular, bestPicked, bestUnpicked }
  })
  return { stats }
}
