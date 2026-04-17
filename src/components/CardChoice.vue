<script setup lang="ts">
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

defineProps<{
  selectedCard?: Card
  label: string
  cards: Card[]
}>()

defineEmits<{ (e: 'select-card', card: Card): void }>()
</script>

<template>
  <UCollapsible class="flex flex-col gap-2 w-full">
    <UButton :label color="neutral" variant="subtle" block />
    <p>Selected Card: {{ selectedCard?.name ?? '' }}</p>

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
