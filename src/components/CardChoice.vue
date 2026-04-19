<script setup lang="ts">
import { computed, ref } from 'vue'

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

const emit = defineEmits<{
  (e: 'select-card', card: Card): void
}>()

const isCollapsibleOpen = ref(false)

function handleCardSelect(card: Card) {
  isModalOpen.value = false
  emit('select-card', card)
  isCollapsibleOpen.value = false
}

const buttonIcon = computed(() => {
  if (!selectedCard) {
    return 'i-radix-icons:question-mark-circled'
  }
  return 'i-radix-icons:check-circled'
})

const buttonColor = computed(() => (selectedCard ? 'success' : 'warning'))

const isModalOpen = ref(false)
</script>

<template>
  <UCollapsible v-model:open="isCollapsibleOpen" class="flex flex-col w-full mb-2">
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
        >
          <UModal :close="false" v-model:open="isModalOpen">
            <div
              class="absolute w-full h-full bg-black/55 text-white font-bold flex items-center px-2 rounded"
            >
              {{ card.name }}
            </div>

            <template #body>
              <img :src="card.image_uris.normal" :alt="card.name" class="w-full h-auto rounded" />
            </template>

            <template #footer>
              <div class="flex gap-2 justify-end w-full">
                <UButton variant="ghost" color="neutral" @click="isModalOpen = false" size="lg"
                  >Close</UButton
                >
                <UButton color="primary" @click="handleCardSelect(card)" size="lg">Select</UButton>
              </div>
            </template>
          </UModal>
        </li>
      </ul>
    </template>
  </UCollapsible>
</template>
