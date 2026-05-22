<script setup lang="ts">
import AnalysisPage from './app/analysis/views/AnalysisPage.vue'
import HighlightsPage from './app/analysis/views/HighlightsPage.vue'
import ScatterPage from './app/analysis/views/ScatterPage.vue'

const tabItems = [
  {
    label: 'Highlights',
    slot: 'highlights',
  },
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
      <template #highlights>
        <HighlightsPage />
      </template>
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
