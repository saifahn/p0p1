import { computed, type ComputedRef } from 'vue'
import submissionsData from '@/app/analysis/data/submissions-sos.json'
import sosCardData from '@/common/sets/SOS-commons-uncommons.json'
import { SLOTS, type SlotDef } from '@/app/analysis/slots'
import { getFrontFaceName } from '@/app/common/cardName'
import { eligibleCardsForSlot } from '@/app/analysis/lib/eligibility'
import type { SeventeenLandsEntry, Submission } from '../shared/types'

export type TeamSlot = {
  slot: SlotDef
  cardName: string
  artCrop: string
  winRate: number
}

export type Team = {
  slots: TeamSlot[]
  total: number
}

function wrFor(cardName: string, data: SeventeenLandsEntry[]): number | null {
  const entry = data.find((e) => e.name === getFrontFaceName(cardName))
  return entry?.ever_drawn_win_rate ?? null
}

function cardMetaFor(cardName: string) {
  const card = sosCardData.find((c) => c.name === cardName)
  if (!card) throw new Error(`Card "${cardName}" not found in the provided card file`)
  return card
}

function buildPlatonic(data: SeventeenLandsEntry[]): Team {
  const slots: TeamSlot[] = []
  for (const slot of SLOTS) {
    const eligible = eligibleCardsForSlot(slot, sosCardData)
    let best: { card: (typeof sosCardData)[number]; wr: number } | null = null
    for (const card of eligible) {
      const wr = wrFor(card.name, data)
      if (wr == null) continue
      if (!best || wr > best.wr) best = { card, wr }
    }
    if (!best) continue
    slots.push({
      slot,
      cardName: best.card.name,
      artCrop: best.card.image_uris.art_crop,
      winRate: best.wr,
    })
  }
  return { slots, total: slots.reduce((s, x) => s + x.winRate, 0) }
}

function buildCrowd(submissions: Submission[], data: SeventeenLandsEntry[]): Team {
  const slots: TeamSlot[] = []
  SLOTS.forEach((slot, i) => {
    const counts = new Map<string, number>()
    for (const sub of submissions) {
      const cardName = sub.selectedCards[i]
      if (!cardName) continue
      counts.set(cardName, (counts.get(cardName) ?? 0) + 1)
    }
    if (counts.size === 0) return
    let modal: { name: string; count: number } | null = null
    for (const [name, count] of counts) {
      if (!modal || count > modal.count) modal = { name, count }
    }
    if (!modal) return
    const wr = wrFor(modal.name, data) ?? 0
    const meta = cardMetaFor(modal.name)
    slots.push({ slot, cardName: modal.name, artCrop: meta.image_uris.art_crop, winRate: wr })
  })
  return { slots, total: slots.reduce((s, x) => s + x.winRate, 0) }
}

export function useTwoTeams(seventeenLandsData: SeventeenLandsEntry[]): {
  platonic: ComputedRef<Team>
  crowd: ComputedRef<Team>
} {
  if (!seventeenLandsData.length) {
    console.warn('SeventeenLandsData is empty')
  }
  const submissions = submissionsData as Submission[]
  const platonic = computed(() => buildPlatonic(seventeenLandsData))
  const crowd = computed(() => buildCrowd(submissions, seventeenLandsData))
  return { platonic, crowd }
}
