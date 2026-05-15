<script setup lang="ts">
import AnalysisPage from './app/analysis/views/AnalysisPage.vue'
import ScatterPage from './app/analysis/views/ScatterPage.vue'

const tabItems = [
  {
    label: 'Bars',
    slot: 'bars',
  },
  {
    label: 'Scatter',
    slot: 'scatter',
  },
]
</script>

<template>
  <UApp>
    <UTabs :items="tabItems">
      <template #bars>
        <AnalysisPage />
      </template>
      <template #scatter>
        <ScatterPage />
      </template>
    </UTabs>
  </UApp>
</template>

<style scoped></style>
