<script setup lang="ts">
import { useMissed } from '../composables/useMissed'
import data from '../data/17lands-2026-05-21.json'

const { rows } = useMissed(data)

function pct(wr: number) {
  return `${(wr * 100).toFixed(1)}%`
}
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold py-2">Top 5 missed</h2>
    <p class="text-sm opacity-70 mb-3">
      Unpopular picks whose win rate beats the slot average. Score = (N − pickCount) × (WR −
      slotAvg).
    </p>
    <ol class="flex flex-col gap-2">
      <li
        v-for="(row, i) in rows"
        :key="row.cardName"
        class="flex items-center gap-3 p-2 rounded bg-neutral-100 dark:bg-neutral-800"
      >
        <div class="w-6 text-right text-sm tabular-nums opacity-60">{{ i + 1 }}</div>
        <img
          :src="row.artCrop"
          :alt="row.cardName"
          class="w-24 h-16 object-cover rounded shrink-0"
        />
        <div class="flex-1 min-w-0">
          <div class="text-xs uppercase opacity-70">{{ row.slot.label }}</div>
          <div class="font-medium truncate">{{ row.cardName }}</div>
          <div class="text-xs opacity-70">
            slot avg {{ pct(row.slotAvg) }} · {{ row.pickCount }} pick<span
              v-if="row.pickCount !== 1"
              >s</span
            >
          </div>
        </div>
        <div class="text-right shrink-0">
          <div class="text-sm tabular-nums">{{ pct(row.winRate) }}</div>
          <div class="text-xs opacity-70 tabular-nums">{{ row.score.toFixed(2) }}</div>
        </div>
      </li>
    </ol>
  </section>
</template>
