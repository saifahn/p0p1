<script setup lang="ts">
import { computed } from 'vue'
import type { ParticipantRow } from '../composables/useParticipantBars'
import BarSegment from './BarSegment.vue'

const props = defineProps<{ row: ParticipantRow }>()

const totalLabel = computed(() => props.row.total.toFixed(2))
</script>

<template>
  <div class="flex items-center gap-2 py-1">
    <div
      class="w-32 shrink-0 truncate text-sm font-medium"
      :title="row.displayName"
    >
      {{ row.displayName }}
    </div>
    <div class="flex h-12 grow rounded overflow-hidden bg-neutral-800">
      <BarSegment
        v-for="seg in row.segments"
        :key="seg.slot.key"
        :segment="seg"
      />
    </div>
    <div class="w-12 shrink-0 text-right text-sm tabular-nums">
      {{ totalLabel }}
    </div>
  </div>
</template>
