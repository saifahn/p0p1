<script setup lang="ts">
import { computed } from 'vue'
import type { ParticipantRow } from '../composables/useParticipantBars'
import BarSegment from './BarSegment.vue'

const props = defineProps<{ row: ParticipantRow; maxTotal: number }>()

const MAX_BAR_PX = 384

const totalLabel = computed(() => props.row.total.toFixed(2))

const barHeight = computed(() => {
  if (props.maxTotal <= 0) return '0px'
  return `${(props.row.total / props.maxTotal) * MAX_BAR_PX}px`
})
</script>

<template>
  <div class="flex flex-col items-center gap-1 w-16 shrink-0">
    <div class="text-xs tabular-nums">{{ totalLabel }}</div>
    <div
      :style="{ height: barHeight }"
      class="flex flex-col-reverse w-full rounded overflow-hidden bg-neutral-800"
    >
      <BarSegment
        v-for="seg in row.segments"
        :key="seg.slot.key"
        :segment="seg"
      />
    </div>
    <div
      class="w-full text-center text-xs font-medium truncate"
      :title="row.displayName"
    >
      {{ row.displayName }}
    </div>
  </div>
</template>
