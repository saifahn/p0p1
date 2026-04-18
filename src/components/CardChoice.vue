<script setup lang="ts">
import { computed } from 'vue'

export type Card = {
  name: string
  colors: string[]
  rarity: string
  image_uris: {
    small: string
    normal: string
    large: string
    png: string
    art_crop: string
    border_crop: string
  }
}

const { selectedCard } = defineProps<{
  selectedCard?: Card
  label: string
  cards: Card[]
}>()

defineEmits<{ (e: 'select-card', card: Card): void }>()

const buttonIcon = computed(() => {
  if (!selectedCard) {
    return 'i-radix-icons:question-mark-circled'
  }
  return 'i-radix-icons:check-circled'
})

const buttonColor = computed(() => (selectedCard ? 'success' : 'warning'))
</script>

<template>
  <UCollapsible class="flex flex-col w-full mb-2">
    <div>
      <UButton :trailing-icon="buttonIcon" :color="buttonColor" variant="subtle" block size="xl">
        <p>{{ label }}: {{ selectedCard?.name ?? 'Select a card' }}</p>
      </UButton>
    </div>

    <template #content>
      <ul>
        <li
          :style="`background-image: url(${card.image_uris.art_crop});`"
          class="w-full h-10 relative bg-cover my-2 rounded shadow-2xl bg-position-[center_20%]"
          v-for="card in cards"
          :key="card.name"
          @click="$emit('select-card', card)"
        >
          <div
            class="absolute w-full h-full bg-black/55 text-white font-bold flex items-center px-2"
          >
            {{ card.name }}
          </div>
        </li>
      </ul>
    </template>
  </UCollapsible>
</template>
