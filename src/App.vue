<script setup lang="ts">
import { computed, reactive, type ComputedRef, type Ref } from 'vue'

import cardData from './sets/SOS-slimmed.json'
import { ref } from 'vue'
import CardChoice, { type Card } from './components/CardChoice.vue'

const cards = ref(cardData)

const commonCards = computed(() => cards.value.filter((card) => card.rarity === 'common'))

const commonUncommonCards = computed(() =>
  cards.value.filter((card) => card.rarity === 'uncommon' || card.rarity === 'common'),
)

type MapOfCards = {
  [key: string]: {
    label: string
    selected: Ref<Card | undefined>
    cards: ComputedRef<Card[]>
  }
}

type MtgColorCode = 'W' | 'U' | 'B' | 'R' | 'G'

function isCardExactlyColors(card: Card, colors: MtgColorCode[]) {
  return (
    card.colors.length === colors.length && colors.every((color) => card.colors.includes(color))
  )
}

const mapOfCards = reactive({
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
    cards: computed(() => cards.value.filter((card) => isCardExactlyColors(card, ['B', 'G']))),
  },
} satisfies MapOfCards)
</script>

<template>
  <UApp>
    <UContainer as="main" class="p-2">
      <form>
        <CardChoice
          v-for="category in Object.values(mapOfCards)"
          :key="category.label"
          :label="category.label"
          :cards="category.cards"
          :selected-card="category.selected"
          @select-card="(card) => (category.selected = card)"
        />
      </form>
    </UContainer>
  </UApp>
</template>

<style scoped></style>
