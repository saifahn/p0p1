<script setup lang="ts">
import { ref } from 'vue'
import AnalysisPage from './app/analysis/views/AnalysisPage.vue'
import ScatterPage from './app/analysis/views/ScatterPage.vue'

type View = 'bars' | 'scatter'
const view = ref<View>('bars')
</script>

<template>
  <UApp>
    <nav class="flex gap-4 px-4 py-2 border-b border-neutral-800">
      <button
        type="button"
        class="text-sm font-medium"
        :class="view === 'bars' ? 'text-white underline' : 'text-neutral-400 hover:text-white'"
        @click="view = 'bars'"
      >
        Bars
      </button>
      <button
        type="button"
        class="text-sm font-medium"
        :class="view === 'scatter' ? 'text-white underline' : 'text-neutral-400 hover:text-white'"
        @click="view = 'scatter'"
      >
        Scatter
      </button>
    </nav>
    <AnalysisPage v-if="view === 'bars'" />
    <ScatterPage v-else />
  </UApp>
</template>

<style scoped></style>
