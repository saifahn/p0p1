<script setup lang="ts">
import BestPickPerSlot from '../components/BestPickPerSlot.vue'
import TiebreakerStats from '../components/TiebreakerStats.vue'
import TopMissed from '../components/TopMissed.vue'
import TopOverpicked from '../components/TopOverpicked.vue'
import TwoTeams from '../components/TwoTeams.vue'
import seventeenlandsData from '../data/17lands-2026-05-21.json'
</script>

<template>
  <UContainer as="main" class="p-2 pb-12 max-w-5xl">
    <h1 class="text-2xl font-bold py-4">Highlights</h1>
    <div class="flex flex-col gap-8">
      <TwoTeams :seventeenlands-data />
      <BestPickPerSlot :seventeenlands-data />
      <TopMissed :seventeenlands-data />
      <TopOverpicked :seventeenlands-data />
      <TiebreakerStats :seventeenlands-data />
    </div>
  </UContainer>
</template>
