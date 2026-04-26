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
      :style="{ flex: flexValue, ...bgStyle }"
      class="relative w-full bg-cover bg-center cursor-pointer overflow-hidden border-b border-black/30 last:border-b-0"
    >
      <div class="absolute inset-0 bg-black/35" />
      <div class="relative h-full flex items-center justify-center gap-1 text-white">
        <template v-if="segment.found">
          <i
            v-for="sym in segment.slot.manaSymbols"
            :key="sym"
            :class="['ms', 'ms-cost', 'ms-shadow', `ms-${sym}`]"
          />
        </template>
        <span v-else class="font-bold">?</span>
      </div>
    </div>
    <template #content>
      <div class="p-2 text-sm">{{ popoverText }}</div>
    </template>
  </UPopover>
</template>
