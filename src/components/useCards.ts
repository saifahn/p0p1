import cuCardData from '@/sets/SOS-commons-uncommons.json'
import soaCardData from '@/sets/SOA-cards.json'
import { computed, type Ref, type ComputedRef, ref } from 'vue'
import type { Card } from './CardChoice.vue'

type MtgColorCode = 'W' | 'U' | 'B' | 'R' | 'G'

function isCardExactlyColors(card: Card, colors: MtgColorCode[]) {
  return (
    card.colors.length === colors.length && colors.every((color) => card.colors.includes(color))
  )
}

export type MapOfCards = {
  [key: string]: {
    label: string
    selected: Ref<Card | undefined>
    cards: ComputedRef<Card[]>
  }
}

export function useCards() {
  const commonUncommonCards = ref(cuCardData)
  const mysticalArchiveCards = ref(soaCardData)

  const commonCards = computed(() =>
    commonUncommonCards.value.filter((card) => card.rarity === 'common'),
  )

  const mapOfCards = ref({
    whiteCommons: {
      label: 'White Common',
      selected: ref(),
      cards: computed(() => commonCards.value.filter((card) => isCardExactlyColors(card, ['W']))),
    },
    blueCommons: {
      label: 'Blue Common',
      selected: ref(),
      cards: computed(() => commonCards.value.filter((card) => isCardExactlyColors(card, ['U']))),
    },
    blackCommons: {
      label: 'Black Common',
      selected: ref(),
      cards: computed(() => commonCards.value.filter((card) => isCardExactlyColors(card, ['B']))),
    },
    redCommons: {
      label: 'Red Common',
      selected: ref(),
      cards: computed(() => commonCards.value.filter((card) => isCardExactlyColors(card, ['R']))),
    },
    greenCommons: {
      label: 'Green Common',
      selected: ref(),
      cards: computed(() => commonCards.value.filter((card) => isCardExactlyColors(card, ['G']))),
    },
    wbCards: {
      label: 'Silverquill Card',
      selected: ref(),
      cards: computed(() =>
        commonUncommonCards.value.filter((card) => isCardExactlyColors(card, ['W', 'B'])),
      ),
    },
    wrCards: {
      label: 'Lorehold Card',
      selected: ref(),
      cards: computed(() =>
        commonUncommonCards.value.filter((card) => isCardExactlyColors(card, ['W', 'R'])),
      ),
    },
    urCards: {
      label: 'Prismari Card',
      selected: ref(),
      cards: computed(() =>
        commonUncommonCards.value.filter((card) => isCardExactlyColors(card, ['U', 'R'])),
      ),
    },
    ugCards: {
      label: 'Quandrix Card',
      selected: ref(),
      cards: computed(() =>
        commonUncommonCards.value.filter((card) => isCardExactlyColors(card, ['U', 'G'])),
      ),
    },
    gbCards: {
      label: 'Witherbloom Card',
      selected: ref(),
      cards: computed(() =>
        commonUncommonCards.value.filter((card) => isCardExactlyColors(card, ['B', 'G'])),
      ),
    },
  } satisfies MapOfCards)

  return { mapOfCards, mysticalArchiveCards }
}
