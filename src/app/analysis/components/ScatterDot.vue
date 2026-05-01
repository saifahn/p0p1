<script setup lang="ts">
import { computed } from 'vue'
import type { ScatterPoint } from '../composables/useScatterData'
import type { MtgColor } from '../slots'

const props = defineProps<{
  point: ScatterPoint
  totalParticipants: number
  size?: number
}>()

const COLOR_FILL: Record<MtgColor, string> = {
  W: '#fffbe6',
  U: '#3b82f6',
  B: '#1f2937',
  R: '#ef4444',
  G: '#22c55e',
}
const COLORLESS_FILL = '#9ca3af'

const radius = computed(() => (props.size ?? 12) / 2)
const svgSize = computed(() => props.size ?? 12)
const halfSize = computed(() => svgSize.value / 2)

const fills = computed<string[]>(() => {
  if (props.point.colors.length === 0) return [COLORLESS_FILL]
  return props.point.colors.map((c) => COLOR_FILL[c])
})

const winRatePct = computed(() => `${(props.point.winRate * 100).toFixed(1)}%`)

// For two-color dots: left half = colors[0], right half = colors[1]
const halfPaths = computed(() => {
  const r = radius.value
  const cx = halfSize.value
  const cy = halfSize.value
  return [
    `M ${cx},${cy - r} A ${r},${r} 0 0,0 ${cx},${cy + r} Z`,
    `M ${cx},${cy - r} A ${r},${r} 0 0,1 ${cx},${cy + r} Z`,
  ]
})

const isFaint = computed(() => props.point.pickCount === 0)
</script>

<template>
  <UPopover mode="click">
    <button
      type="button"
      class="block cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-white"
      :class="{ 'opacity-30 hover:opacity-100': isFaint }"
      :aria-label="point.name"
    >
      <svg :width="svgSize" :height="svgSize" :viewBox="`0 0 ${svgSize} ${svgSize}`" class="block">
        <template v-if="fills.length === 1">
          <circle
            :cx="halfSize"
            :cy="halfSize"
            :r="radius"
            :fill="fills[0]"
            stroke="#000"
            stroke-width="0.5"
          />
        </template>
        <template v-else>
          <path :d="halfPaths[0]" :fill="fills[0]" />
          <path :d="halfPaths[1]" :fill="fills[1]" />
          <circle
            :cx="halfSize"
            :cy="halfSize"
            :r="radius"
            fill="none"
            stroke="#000"
            stroke-width="0.5"
          />
        </template>
      </svg>
    </button>
    <template #content>
      <div class="p-2 flex flex-col gap-1 text-sm w-52">
        <img :src="point.imageUrl" :alt="point.name" class="w-full rounded" />
        <div class="font-semibold">{{ point.name }}</div>
        <p>GIH win rate - {{ winRatePct }}</p>
        <p>Picked by {{ point.pickCount }}/{{ totalParticipants }} participants</p>
      </div>
    </template>
  </UPopover>
</template>
