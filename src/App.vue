<script setup lang="ts">
import { computed } from 'vue'

import cardData from './sets/SOS-slimmed.json'
import { ref } from 'vue'
import CardChoice, { type Card } from './components/CardChoice.vue'

const cards = ref(cardData)

const commonCards = computed(() => cards.value.filter((card) => card.rarity === 'common'))

const selectedWhiteCard = ref<Card>()
const whiteCommons = computed(() =>
  commonCards.value.filter((card) => card.colors.length === 1 && card.colors[0] === 'W'),
)

const selectedBlueCard = ref<Card>()
const blueCommons = computed(() =>
  commonCards.value.filter((card) => card.colors.length === 1 && card.colors[0] === 'U'),
)

const selectedBlackCard = ref<Card>()
const blackCommons = computed(() =>
  commonCards.value.filter((card) => card.colors.length === 1 && card.colors[0] === 'B'),
)

const selectedRedCard = ref<Card>()
const redCommons = computed(() =>
  commonCards.value.filter((card) => card.colors.length === 1 && card.colors[0] === 'R'),
)

const selectedGreenCard = ref<Card>()
const greenCommons = computed(() =>
  commonCards.value.filter((card) => card.colors.length === 1 && card.colors[0] === 'G'),
)
</script>

<template>
  <UApp>
    <UContainer as="main" class="p-2">
      <h1>SOS p0p1</h1>
      <form>
        <CardChoice
          :cards="whiteCommons"
          :selected-card="selectedWhiteCard"
          label="White Common"
          @select-card="(card) => (selectedWhiteCard = card)"
        />
        <CardChoice
          :cards="blueCommons"
          :selected-card="selectedBlueCard"
          label="Blue Common"
          @select-card="(card) => (selectedBlueCard = card)"
        />
        <CardChoice
          :cards="blackCommons"
          :selected-card="selectedBlackCard"
          label="Black Common"
          @select-card="(card) => (selectedBlackCard = card)"
        />
        <CardChoice
          :cards="redCommons"
          :selected-card="selectedRedCard"
          label="Red Common"
          @select-card="(card) => (selectedRedCard = card)"
        />
        <CardChoice
          :cards="greenCommons"
          :selected-card="selectedGreenCard"
          label="Green Common"
          @select-card="(card) => (selectedGreenCard = card)"
        />
      </form>
    </UContainer>
  </UApp>
</template>

<style scoped></style>
