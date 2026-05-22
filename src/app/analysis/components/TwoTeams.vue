<script setup lang="ts">
import { useTwoTeams, type Team } from '../composables/useTwoTeams'
import type { SeventeenLandsEntry } from '../shared/types'

const { seventeenlandsData } = defineProps<{ seventeenlandsData: SeventeenLandsEntry[] }>()

const { platonic, crowd } = useTwoTeams(seventeenlandsData)

function pct(wr: number) {
  return `${(wr * 100).toFixed(1)}%`
}

function totalLabel(team: Team) {
  return (team.total * 100).toFixed(1)
}
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold py-2">Two Teams</h2>
    <p class="text-sm opacity-70 mb-3">
      Ceiling vs. consensus — the highest-WR card in each slot (regardless of picks) vs. the group's
      most-picked card.
    </p>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <div class="flex items-baseline justify-between mb-1">
          <h3 class="text-sm font-semibold uppercase opacity-80">Platonic</h3>
          <div class="text-sm tabular-nums">{{ totalLabel(platonic) }}</div>
        </div>
        <ul class="flex flex-col gap-1">
          <li
            v-for="row in platonic.slots"
            :key="row.slot.key"
            class="flex items-center gap-2 p-1 rounded bg-neutral-100 dark:bg-neutral-800"
          >
            <img :src="row.artCrop" :alt="row.cardName" class="w-16 h-10 object-cover rounded" />
            <div class="flex-1 min-w-0">
              <div class="text-[10px] uppercase opacity-60">{{ row.slot.label }}</div>
              <div class="text-xs truncate">{{ row.cardName }}</div>
            </div>
            <div class="text-xs tabular-nums shrink-0">{{ pct(row.winRate) }}</div>
          </li>
        </ul>
      </div>
      <div>
        <div class="flex items-baseline justify-between mb-1">
          <h3 class="text-sm font-semibold uppercase opacity-80">Crowd</h3>
          <div class="text-sm tabular-nums">{{ totalLabel(crowd) }}</div>
        </div>
        <ul class="flex flex-col gap-1">
          <li
            v-for="row in crowd.slots"
            :key="row.slot.key"
            class="flex items-center gap-2 p-1 rounded bg-neutral-100 dark:bg-neutral-800"
          >
            <img :src="row.artCrop" :alt="row.cardName" class="w-16 h-10 object-cover rounded" />
            <div class="flex-1 min-w-0">
              <div class="text-[10px] uppercase opacity-60">{{ row.slot.label }}</div>
              <div class="text-xs truncate">{{ row.cardName }}</div>
            </div>
            <div class="text-xs tabular-nums shrink-0">{{ pct(row.winRate) }}</div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
