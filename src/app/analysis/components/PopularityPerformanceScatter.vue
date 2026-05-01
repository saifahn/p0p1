<script setup lang="ts">
import { computed } from 'vue'
import { useScatterData, type ScatterPoint } from '../composables/useScatterData'
import data from '../data/17lands-2026-04-30.json'
import ScatterDot from './ScatterDot.vue'

const VIEWBOX_W = 800
const VIEWBOX_H = 500
const MARGIN_L = 50
const MARGIN_R = 20
const MARGIN_T = 30
const MARGIN_B = 40
const PLOT_X = MARGIN_L
const PLOT_Y = MARGIN_T
const PLOT_W = VIEWBOX_W - MARGIN_L - MARGIN_R
const PLOT_H = VIEWBOX_H - MARGIN_T - MARGIN_B

const { points, totalParticipants } = useScatterData(data)

const xDomain = computed<readonly [number, number]>(() => {
  const wrs = points.value.map((p) => p.winRate)
  const min = Math.min(...wrs)
  const max = Math.max(...wrs)
  const pad = (max - min) * 0.05
  return [min - pad, max + pad]
})

const yDomain = computed<readonly [number, number]>(() => {
  const max = Math.max(...points.value.map((p) => p.pickCount), 1)
  return [0, max]
})

function xScale(wr: number) {
  const [lo, hi] = xDomain.value
  return PLOT_X + ((wr - lo) / (hi - lo)) * PLOT_W
}
function yScale(pc: number) {
  const [lo, hi] = yDomain.value
  return PLOT_Y + PLOT_H - ((pc - lo) / (hi - lo)) * PLOT_H
}

function median(arr: number[]) {
  const s = [...arr].sort((a, b) => a - b)
  const n = s.length
  if (n === 0) return 0
  return n % 2 ? s[(n - 1) / 2]! : (s[n / 2 - 1]! + s[n / 2]!) / 2
}

const pickedPoints = computed(() => points.value.filter((p) => p.pickCount > 0))
const xMedian = computed(() => median(pickedPoints.value.map((p) => p.winRate)))
const yMedian = computed(() => median(pickedPoints.value.map((p) => p.pickCount)))

type Quadrant = 'consensus' | 'darlings' | 'missed' | 'nobody'
function quadrantOf(p: ScatterPoint, xm: number, ym: number): Quadrant {
  const right = p.winRate >= xm
  const top = p.pickCount >= ym
  if (top && right) return 'consensus'
  if (top && !right) return 'darlings'
  if (!top && right) return 'missed'
  return 'nobody'
}

const labeledNames = computed(() => {
  const xm = xMedian.value
  const ym = yMedian.value
  const groups: Record<Quadrant, ScatterPoint[]> = {
    consensus: [],
    darlings: [],
    missed: [],
    nobody: [],
  }
  for (const p of pickedPoints.value) groups[quadrantOf(p, xm, ym)].push(p)
  groups.consensus.sort((a, b) => b.pickCount - a.pickCount)
  groups.darlings.sort((a, b) => b.pickCount - a.pickCount)
  groups.missed.sort((a, b) => b.winRate - a.winRate)
  return new Set(
    [
      ...groups.consensus.slice(0, 5),
      ...groups.darlings.slice(0, 5),
      ...groups.missed.slice(0, 5),
    ].map((p) => p.name),
  )
})

const labeledPoints = computed(() => points.value.filter((p) => labeledNames.value.has(p.name)))

const xTicks = computed(() => {
  const [lo, hi] = xDomain.value
  const ticks: number[] = []
  const start = Math.ceil(lo * 20) / 20
  for (let v = start; v <= hi + 1e-9; v += 0.05) ticks.push(Math.round(v * 100) / 100)
  return ticks
})

const yTicks = computed(() => {
  const [, hi] = yDomain.value
  const step = Math.max(1, Math.ceil(hi / 5))
  const ticks: number[] = []
  for (let v = 0; v <= hi; v += step) ticks.push(v)
  return ticks
})

function pct(wr: number) {
  return `${Math.round(wr * 100)}%`
}
</script>

<template>
  <div class="relative w-full" style="aspect-ratio: 8 / 5">
    <svg
      :viewBox="`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`"
      class="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
    >
      <rect
        :x="PLOT_X"
        :y="PLOT_Y"
        :width="PLOT_W"
        :height="PLOT_H"
        fill="transparent"
        stroke="#374151"
      />

      <g v-for="t in xTicks" :key="`xt-${t}`">
        <line
          :x1="xScale(t)"
          :y1="PLOT_Y + PLOT_H"
          :x2="xScale(t)"
          :y2="PLOT_Y + PLOT_H + 4"
          stroke="#6b7280"
        />
        <text
          :x="xScale(t)"
          :y="PLOT_Y + PLOT_H + 18"
          text-anchor="middle"
          font-size="11"
          class="dark:fill-zinc-100"
        >
          {{ pct(t) }}
        </text>
      </g>
      <text
        :x="PLOT_X + PLOT_W / 2"
        :y="VIEWBOX_H - 5"
        text-anchor="middle"
        font-size="12"
        class="dark:fill-zinc-100"
      >
        17Lands GIH win rate
      </text>

      <g v-for="t in yTicks" :key="`yt-${t}`">
        <line :x1="PLOT_X - 4" :y1="yScale(t)" :x2="PLOT_X" :y2="yScale(t)" stroke="#6b7280" />
        <text
          :x="PLOT_X - 8"
          :y="yScale(t) + 4"
          class="dark:fill-zinc-100"
          text-anchor="end"
          font-size="11"
        >
          {{ t }}
        </text>
      </g>
      <text
        :x="14"
        :y="PLOT_Y + PLOT_H / 2"
        :transform="`rotate(-90 14 ${PLOT_Y + PLOT_H / 2})`"
        text-anchor="middle"
        class="dark:fill-zinc-100"
        font-size="12"
      >
        Group pick count
      </text>

      <line
        :x1="xScale(xMedian)"
        :y1="PLOT_Y"
        :x2="xScale(xMedian)"
        :y2="PLOT_Y + PLOT_H"
        stroke="#6b7280"
        stroke-dasharray="4 4"
      />
      <line
        :x1="PLOT_X"
        :y1="yScale(yMedian)"
        :x2="PLOT_X + PLOT_W"
        :y2="yScale(yMedian)"
        stroke="#6b7280"
        stroke-dasharray="4 4"
      />

      <text
        :x="PLOT_X + 8"
        :y="PLOT_Y + 16"
        font-size="12"
        font-weight="bold"
        opacity="0.8"
        class="dark:fill-zinc-100"
      >
        Group Darlings
      </text>
      <text
        :x="PLOT_X + PLOT_W - 8"
        :y="PLOT_Y + 16"
        text-anchor="end"
        font-size="12"
        font-weight="bold"
        opacity="0.8"
        class="dark:fill-zinc-100"
      >
        Consensus
      </text>
      <text
        :x="PLOT_X + 8"
        :y="PLOT_Y + PLOT_H - 8"
        font-size="12"
        font-weight="bold"
        opacity="0.6"
        class="dark:fill-zinc-100"
      >
        Nobody Wanted
      </text>
      <text
        :x="PLOT_X + PLOT_W - 8"
        :y="PLOT_Y + PLOT_H - 8"
        text-anchor="end"
        font-size="12"
        font-weight="bold"
        opacity="0.8"
        class="dark:fill-zinc-100"
      >
        Group Missed
      </text>
    </svg>

    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="p in points"
        :key="p.name"
        class="absolute pointer-events-auto"
        :style="{
          left: `${(xScale(p.winRate) / VIEWBOX_W) * 100}%`,
          top: `${(yScale(p.pickCount) / VIEWBOX_H) * 100}%`,
          transform: 'translate(-50%, -50%)',
        }"
      >
        <ScatterDot :point="p" :total-participants="totalParticipants" />
      </div>
    </div>
  </div>
</template>
