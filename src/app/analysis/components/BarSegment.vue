<script setup lang="ts">
import { computed } from 'vue'
import type { SegmentRow } from '../composables/useParticipantBars'

const props = defineProps<{ segment: SegmentRow }>()

const flexValue = computed(() => (props.segment.found ? props.segment.winRate : 0.01))

const bgStyle = computed(() => {
  const { artCrop, found } = props.segment
  if (!found || !artCrop) {
    return { backgroundColor: 'rgb(64 64 64)' }
  }
  return { backgroundImage: `url(${artCrop})` }
})

const winRatePct = computed(() => `${(props.segment.winRate * 100).toFixed(1)}%`)

const popoverText = computed(() => {
  const { slot, cardName, found } = props.segment
  if (!found) return `${slot.label} — ${cardName} — missing 17Lands data`
  return `${cardName} — ${winRatePct.value}`
})
</script>

<template>
  <UPopover mode="click">
    <div
      ref="triggerRef"
      :style="{ flex: flexValue, ...bgStyle }"
      class="relative h-full bg-cover bg-center cursor-pointer overflow-hidden border-r border-black/30 last:border-r-0"
    >
      <div class="absolute inset-0 bg-black/35" />
      <div class="relative h-full flex items-center gap-1 px-1 text-white">
        <template v-if="segment.found">
          <img
            v-for="sym in segment.slot.manaSymbols"
            :key="sym"
            :src="`https://svgs.scryfall.io/card-symbols/${sym.toUpperCase()}.svg`"
            :alt="sym"
            class="h-4 w-4 shrink-0 drop-shadow"
          />
        </template>
        <span v-else class="font-bold">?</span>
        <span
          v-if="segment.found"
          class="text-xs whitespace-nowrap overflow-hidden text-ellipsis font-medium drop-shadow"
        >
          {{ segment.cardName }}
        </span>
      </div>
    </div>
    <template #content>
      <div class="p-2 text-sm">{{ popoverText }}</div>
    </template>
  </UPopover>
</template>
