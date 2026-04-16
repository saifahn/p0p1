<script setup lang="ts">
import { computed } from 'vue'

import cardData from './sets/SOS-slimmed.json'
import { ref } from 'vue'

const cards = ref(cardData)

const selectedWhiteCard = ref('')

const whiteCards = computed(() =>
  cards.value.filter((card) => card.colors.length === 1 && card.colors[0] === 'W'),
)
</script>

<template>
  <UApp>
    <UContainer as="main" class="p-2">
      <h1>SOS p0p1</h1>
      <form>
        <UCollapsible class="flex flex-col gap-2 w-full">
          <UButton label="White Common" color="neutral" variant="subtle" block />
          <p>Selected Card: {{ selectedWhiteCard }}</p>

          <template #content>
            <ul>
              <li
                :style="`background-image: url(${card.image_uris.art_crop});`"
                class="w-full h-10 relative bg-cover my-2 rounded shadow-2xl"
                v-for="card in whiteCards"
                :key="card.id"
                @click="selectedWhiteCard = card.name"
              >
                <div
                  class="absolute w-full h-full bg-black/65 text-white font-bold flex items-center px-2"
                >
                  {{ card.name }}
                </div>
              </li>
            </ul>
          </template>
        </UCollapsible>
      </form>
    </UContainer>
  </UApp>
</template>

<style scoped></style>
