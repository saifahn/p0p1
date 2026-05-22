<script setup lang="ts">
import BestPickPerSlot from '../components/BestPickPerSlot.vue'
import TiebreakerStats from '../components/TiebreakerStats.vue'
import TopMissed from '../components/TopMissed.vue'
import TopOverpicked from '../components/TopOverpicked.vue'
import TwoTeams from '../components/TwoTeams.vue'
</script>

<template>
  <UContainer as="main" class="p-2 pb-12 max-w-5xl">
    <h1 class="text-2xl font-bold py-4">Highlights</h1>
    <div class="flex flex-col gap-8">
      <TwoTeams />
      <BestPickPerSlot />
      <TopMissed />
      <TopOverpicked />
      <TiebreakerStats />
    </div>
  </UContainer>
</template>
