<script setup lang="ts">
import { computed } from 'vue'
import { useTiebreakerStats } from '../composables/useTiebreakerStats'
import data from '../data/17lands-2026-05-21.json'

const { stats } = useTiebreakerStats(data)

function pct(wr: number) {
  return `${(wr * 100).toFixed(1)}%`
}

const trophies = computed(() => [
  { label: 'Most popular', stat: stats.value.mostPopular },
  { label: 'Best picked', stat: stats.value.bestPicked },
  { label: 'Best left on the table', stat: stats.value.bestUnpicked },
])
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold py-2">Tiebreaker</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div
        v-for="t in trophies"
        :key="t.label"
        class="flex flex-col gap-2 p-3 rounded bg-neutral-100 dark:bg-neutral-800"
      >
        <div class="text-xs uppercase opacity-70">{{ t.label }}</div>
        <template v-if="t.stat">
          <img
            :src="t.stat.artCrop"
            :alt="t.stat.cardName"
            class="w-full h-32 object-cover rounded"
          />
          <div class="font-medium">{{ t.stat.cardName }}</div>
          <div class="text-sm tabular-nums opacity-80">
            {{ pct(t.stat.winRate) }} · {{ t.stat.pickCount }} pick<span
              v-if="t.stat.pickCount !== 1"
              >s</span
            >
          </div>
        </template>
        <div v-else class="text-sm opacity-50 italic">No data</div>
      </div>
    </div>
  </section>
</template>
