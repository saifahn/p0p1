import type { MtgColor, SlotDef } from '@/app/analysis/slots'

export type EligibleCardLike = {
  colors: string[]
  rarity: string
}

function colorsExactlyMatch(cardColors: string[], targetColors: MtgColor[]): boolean {
  return (
    cardColors.length === targetColors.length && targetColors.every((c) => cardColors.includes(c))
  )
}

export function eligibleCardsForSlot<T extends EligibleCardLike>(
  slot: SlotDef,
  allSosCards: T[],
): T[] {
  const rarityFiltered =
    slot.colors.length === 1 ? allSosCards.filter((c) => c.rarity === 'common') : allSosCards
  return rarityFiltered.filter((c) => colorsExactlyMatch(c.colors, slot.colors))
}
