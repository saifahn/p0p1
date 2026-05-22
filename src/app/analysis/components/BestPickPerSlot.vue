<script setup lang="ts">
import { useBestPickPerSlot } from '../composables/useBestPickPerSlot'
import type { SeventeenLandsEntry } from '../shared/types'

const { seventeenlandsData } = defineProps<{ seventeenlandsData: SeventeenLandsEntry[] }>()

const { rows } = useBestPickPerSlot(seventeenlandsData)

function pct(wr: number) {
  return `${(wr * 100).toFixed(1)}%`
}
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold py-2">Best pick per slot</h2>
    <ul class="flex flex-col gap-2">
      <li
        v-for="row in rows"
        :key="row.slot.key"
        class="flex items-center gap-3 p-2 rounded bg-neutral-100 dark:bg-neutral-800"
      >
        <img
          :src="row.artCrop"
          :alt="row.cardName"
          class="w-24 h-16 object-cover rounded shrink-0"
        />
        <div class="flex-1 min-w-0">
          <div class="text-xs uppercase opacity-70">{{ row.slot.label }}</div>
          <div class="font-medium truncate">{{ row.cardName }}</div>
        </div>
        <div class="text-right shrink-0">
          <div class="text-sm tabular-nums">{{ pct(row.winRate) }}</div>
          <div class="text-xs opacity-70">
            {{ row.pickCount }} pick<span v-if="row.pickCount !== 1">s</span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
