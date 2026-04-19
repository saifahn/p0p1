<script setup lang="ts">
import { computed, type ComputedRef, type Ref } from 'vue'

import cardData from './sets/SOS-slimmed.json'
import { ref } from 'vue'
import CardChoice, { type Card } from './components/CardChoice.vue'
import { handleSubmission } from './handleSubmission'

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

const isSubmitting = ref(false)

const toast = useToast()

function showSuccessToast() {
  toast.add({ title: 'Your card choices were successfully submitted!', color: 'success' })
}

function showErrorToast(description: string) {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description,
    color: 'error',
  })
}

async function handleSubmit() {
  if (!displayName.value) {
    showErrorToast('Please enter a display name.')
    return
  }

  const selectedCardNames: string[] = []
  for (const category of Object.values(mapOfCards.value)) {
    if (!category.selected) {
      showErrorToast('Please select a card for each category before submitting.')
      return
    }
    selectedCardNames.push(category.selected.name)
  }
  isSubmitting.value = true
  const result = await handleSubmission(displayName.value, selectedCardNames)
  isSubmitting.value = false
  if (result === 'error-display-name-in-use') {
    showErrorToast('The display name is already in use. Please choose a different name.')
    return
  }
  if (result === 'error-unknown') {
    showErrorToast('There was an error submitting your choices. Please try again later.')
    return
  }
  showSuccessToast()
}
</script>

<template>
  <UApp>
    <UContainer as="main" class="p-2 pb-12 max-w-xl">
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
    </UContainer>
  </UApp>
</template>

<style scoped></style>
