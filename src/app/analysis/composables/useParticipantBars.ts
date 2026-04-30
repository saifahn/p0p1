import { computed, type ComputedRef } from 'vue'
import submissionsData from '@/app/analysis/data/submissions-sos.json'
import sosCardData from '@/common/sets/SOS-commons-uncommons.json'
import { SLOTS, type SlotDef } from '@/app/analysis/slots'

type ScryfallCardTrimmed = {
  name: string
  colors: string[]
  rarity: string
  image_uris: { normal: string; art_crop: string }
}

type SeventeenLandsDataEntry = {
  name: string
  ever_drawn_win_rate: number
}

type Submission = {
  'Document ID': string
  selectedCards: string[]
  tiebreaker: string
}

export type SegmentRow = {
  slot: SlotDef
  cardName: string
  artCrop: string
  winRate: number
}

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
    throw new Error(`Card name is undefined for slot ${slot.key}`)
  }
  const cardData = data.find((entry) => entry.name === cardName)
  if (!cardData) {
    throw new Error(`Card data for "${cardName}" was not found in the provided data`)
  }
  const card: ScryfallCardTrimmed | undefined = sosCardData.find((c) => c.name === cardName)
  if (!card) {
    throw new Error(`Card "${cardName}" not found in the provided card file`)
  }

  return {
    slot,
    cardName,
    artCrop: card.image_uris.art_crop,
    winRate: cardData.ever_drawn_win_rate,
  }
}

export type ParticipantRow = {
  displayName: string
  segments: SegmentRow[]
  total: number
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
