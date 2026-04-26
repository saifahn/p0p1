import { computed, type ComputedRef } from 'vue'
import submissionsData from '@/app/analysis/data/submissions-sos.json'
import sevenLandsData from '@/app/analysis/data/17lands-2026-04-26.json'
import sosCardData from '@/common/sets/SOS-commons-uncommons.json'
import { SLOTS, type SlotDef } from '@/app/analysis/slots'

interface SosCard {
  name: string
  colors: string[]
  rarity: string
  image_uris: { normal: string; art_crop: string }
}

interface SevenLandsEntry {
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

function frontFace(name: string): string {
  return name.split(' // ')[0] ?? name
}

const statsByFrontFace = new Map<string, number>(
  (sevenLandsData as SevenLandsEntry[]).map((c) => [frontFace(c.name), c.ever_drawn_win_rate]),
)

const cardByName = new Map<string, SosCard>(
  (sosCardData as SosCard[]).map((c) => [c.name, c]),
)

function buildSegment(cardName: string | undefined, slot: SlotDef): SegmentRow {
  if (!cardName) {
    return { slot, cardName: '—', artCrop: undefined, winRate: 0, found: false }
  }
  const wr = statsByFrontFace.get(frontFace(cardName))
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

function buildRow(submission: Submission): ParticipantRow {
  const segments = SLOTS.map((slot, i) => buildSegment(submission.selectedCards[i], slot))
  const total = segments.reduce((sum, s) => sum + s.winRate, 0)
  return { displayName: submission['Document ID'], segments, total }
}

export function useParticipantBars(): { rows: ComputedRef<ParticipantRow[]> } {
  const rows = computed(() =>
    (submissionsData as Submission[])
      .map(buildRow)
      .sort((a, b) => b.total - a.total),
  )
  return { rows }
}
