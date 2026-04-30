<script setup lang="ts">
import { computed } from 'vue'
import { useParticipantBars } from '../composables/useParticipantBars'
import ParticipantBar from './ParticipantBar.vue'

const { rows } = useParticipantBars([])

const maxTotal = computed(() => Math.max(0, ...rows.value.map((r) => r.total)))
</script>

<template>
  <div class="flex flex-col gap-1">
    <ParticipantBar v-for="row in rows" :key="row.displayName" :row="row" :max-total="maxTotal" />
  </div>
</template>
