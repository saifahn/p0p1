import { computed, type ComputedRef } from 'vue'
import submissionsData from '@/app/analysis/data/submissions-sos.json'
import sosCardsData from '@/common/sets/SOS-commons-uncommons.json'
import type { MtgColor } from '@/app/analysis/slots'
import { getFrontFaceName } from '@/app/common/cardName'
import { countPicks } from '@/app/analysis/lib/pickCount'
import type { Submission } from '../shared/types'

type SeventeenLandsScatterEntry = {
  name: string
  color: string
  url: string
  ever_drawn_win_rate: number | null
}

export type ScatterPoint = {
  name: string
  winRate: number
  pickCount: number
  colors: MtgColor[]
  imageUrl: string
}

function parseColors(color: string): MtgColor[] {
  const valid: MtgColor[] = ['W', 'U', 'B', 'R', 'G']
  return valid.filter((c) => color.includes(c))
}

export function useScatterData(seventeenLandsData: SeventeenLandsScatterEntry[]): {
  points: ComputedRef<ScatterPoint[]>
  totalParticipants: ComputedRef<number>
} {
  const submissions = submissionsData as Submission[]
  const allowedNames = new Set(sosCardsData.map((c) => getFrontFaceName(c.name)))

  const points = computed(() =>
    seventeenLandsData
      .filter(
        (entry): entry is SeventeenLandsScatterEntry & { ever_drawn_win_rate: number } =>
          entry.ever_drawn_win_rate != null,
      )
      .filter((entry) => allowedNames.has(getFrontFaceName(entry.name)))
      .map((entry) => ({
        name: entry.name,
        winRate: entry.ever_drawn_win_rate,
        pickCount: countPicks(entry.name, submissions),
        colors: parseColors(entry.color),
        imageUrl: entry.url,
      })),
  )

  const totalParticipants = computed(() => submissions.length)

  return { points, totalParticipants }
}
