<script setup lang="ts">
import { computed, type ComputedRef, type Ref, ref } from 'vue'

import cardData from '@/sets/SOS-slimmed.json'
import CardChoice, { type Card } from './CardChoice.vue'
import { useSubmission } from './useSubmission'

const cards = ref(cardData)

const commonCards = computed(() => cards.value.filter((card) => card.rarity === 'common'))

const commonUncommonCards = computed(() =>
  cards.value.filter((card) => card.rarity === 'uncommon' || card.rarity === 'common'),
)

export type MapOfCards = {
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
    cards: computed(() => cards.value.filter((card) => isCardExactlyColors(card, ['B', 'G']))),
  },
} satisfies MapOfCards)

const displayName = ref('')

const { handleSubmit, isSubmitting } = useSubmission(displayName, mapOfCards)
</script>

<template>
  <UForm @submit.prevent="handleSubmit">
    <UFormField label="Display name" class="mb-4" required orientation="horizontal" size="xl">
      <UInput placeholder="Enter a name" v-model="displayName" />
    </UFormField>

    <CardChoice
      v-for="category in Object.values(mapOfCards)"
      :key="category.label"
      :label="category.label"
      :cards="category.cards"
      :selected-card="category.selected"
      @select-card="(card) => (category.selected = card)"
    />
    <UButton :loading="isSubmitting" size="xl" block type="submit"> Submit </UButton>
  </UForm>
</template>
