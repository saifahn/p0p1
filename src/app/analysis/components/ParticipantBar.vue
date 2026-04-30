<script setup lang="ts">
import { computed } from 'vue'
import type { ParticipantRow } from '../composables/useParticipantBars'
import BarSegment from './BarSegment.vue'

const props = defineProps<{ row: ParticipantRow; maxTotal: number }>()

const MAX_BAR_PX = 600

const totalLabel = computed(() => (props.row.total * 100).toFixed(2))

const barWidth = computed(() => {
  if (props.maxTotal <= 0) return '0px'
  return `${(props.row.total / props.maxTotal) * MAX_BAR_PX}px`
})
</script>

<template>
  <div class="flex items-center gap-2 py-1">
    <div class="w-32 shrink-0 truncate text-sm font-medium" :title="row.displayName">
      {{ row.displayName }}
    </div>
    <div
      :style="{ width: barWidth }"
      class="flex h-12 shrink-0 rounded overflow-hidden bg-neutral-800"
    >
      <BarSegment v-for="seg in row.segments" :key="seg.slot.key" :segment="seg" />
    </div>
    <div class="w-12 shrink-0 text-right text-sm tabular-nums">
      {{ totalLabel }}
    </div>
  </div>
</template>
