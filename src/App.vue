<script setup lang="ts">
import { computed } from 'vue'

import cardData from './sets/SOS-slimmed.json'
import { ref } from 'vue'
import CardChoice, { type Card } from './components/CardChoice.vue'

const cards = ref(cardData)

const selectedWhiteCard = ref<Card>()

const whiteCards = computed(() =>
  cards.value.filter((card) => card.colors.length === 1 && card.colors[0] === 'W'),
)
</script>

<template>
  <UApp>
    <UContainer as="main" class="p-2">
      <h1>SOS p0p1</h1>
      <form>
        <CardChoice
          :cards="whiteCards"
          :selected-card="selectedWhiteCard"
          label="White Common"
          @select-card="(card) => (selectedWhiteCard = card)"
        />
      </form>
    </UContainer>
  </UApp>
</template>

<style scoped></style>
