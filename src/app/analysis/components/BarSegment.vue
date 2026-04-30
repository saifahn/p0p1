<script setup lang="ts">
import { computed } from 'vue'
import type { SegmentRow } from '../composables/useParticipantBars'

const props = defineProps<{ segment: SegmentRow }>()

const segmentStyle = computed(() => {
  return { flex: props.segment.winRate, backgroundImage: `url(${props.segment.artCrop})` }
})

const winRatePercentage = computed(() => `${(props.segment.winRate * 100).toFixed(1)}%`)

const popoverText = computed(() => {
  return `${props.segment.cardName} — ${winRatePercentage.value}`
})
</script>

<template>
  <UPopover mode="click">
    <div
      ref="triggerRef"
      :style="segmentStyle"
      class="relative h-full bg-cover bg-center cursor-pointer overflow-hidden border-r border-black/30 last:border-r-0"
    >
      <div class="absolute inset-0 bg-black/35" />
      <div class="relative h-full flex items-center justify-center gap-1 px-1 text-white">
        <img
          v-for="sym in segment.slot.manaSymbols"
          :key="sym"
          :src="`https://svgs.scryfall.io/card-symbols/${sym.toUpperCase()}.svg`"
          :alt="sym"
          class="h-4 w-4 shrink-0 drop-shadow"
        />
      </div>
    </div>
    <template #content>
      <div class="p-2 text-sm">{{ popoverText }}</div>
    </template>
  </UPopover>
</template>
