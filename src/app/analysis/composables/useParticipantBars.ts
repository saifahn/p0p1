import { computed, type ComputedRef } from 'vue'
import submissionsData from '@/app/analysis/data/submissions-sos.json'
import sosCardData from '@/common/sets/SOS-commons-uncommons.json'
import { SLOTS, type SlotDef } from '@/app/analysis/slots'

interface SosCard {
  name: string
  colors: string[]
  rarity: string
  image_uris: { normal: string; art_crop: string }
}

interface SeventeenLandsDataEntry {
  name: string
  ever_drawn_win_rate: number
}

interface Submission {
  'Document ID': string
  selectedCards: string[]
  tiebreaker: string
}

export interface SegmentRow {
  slot: SlotDef
  cardName: string
  artCrop: string | undefined
  winRate: number
  found: boolean
}

export interface ParticipantRow {
  displayName: string
  segments: SegmentRow[]
  total: number
}

const cardByName = new Map<string, SosCard>((sosCardData as SosCard[]).map((c) => [c.name, c]))

function buildSegment({
  cardName,
  slot,
  data,
}: {
  cardName: string | undefined
  slot: SlotDef
  data: SeventeenLandsDataEntry[]
}): SegmentRow {
  if (!cardName) {
    return { slot, cardName: '—', artCrop: undefined, winRate: 0, found: false }
  }
  const cardData = data.find((entry) => entry.name === cardName)
  const wr = cardData?.ever_drawn_win_rate
  // TODO: return undefined or null if the card is not found
  const sosCard = cardByName.get(cardName)
  const found = wr !== undefined
  return {
    slot,
    cardName,
    artCrop: sosCard?.image_uris.art_crop,
    winRate: wr ?? 0,
    found,
  }
}

function buildRow(submission: Submission, data: SeventeenLandsDataEntry[]): ParticipantRow {
  const segments = SLOTS.map((slot, i) =>
    buildSegment({ cardName: submission.selectedCards[i], slot, data }),
  )
  const total = segments.reduce((sum, s) => sum + s.winRate, 0)
  return { displayName: submission['Document ID'], segments, total }
}

export function useParticipantBars(seventeenLandsData: SeventeenLandsDataEntry[]): {
  rows: ComputedRef<ParticipantRow[]>
} {
  if (!seventeenLandsData.length) {
    console.warn('SeventeenLandsData is empty')
  }
  const rows = computed(() =>
    submissionsData
      .map((submission) => buildRow(submission, seventeenLandsData))
      .sort((a, b) => b.total - a.total),
  )
  return { rows }
}
