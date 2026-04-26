<script setup lang="ts">
import { useParticipantBars } from '../composables/useParticipantBars'
import ParticipantBar from './ParticipantBar.vue'

const { rows } = useParticipantBars()
</script>

<template>
  <div class="flex flex-col gap-1">
    <ParticipantBar v-for="row in rows" :key="row.displayName" :row="row" />
  </div>
</template>
