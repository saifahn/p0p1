<script setup lang="ts">
import { computed } from 'vue'
import { useParticipantBars } from '../composables/useParticipantBars'
import ParticipantBar from './ParticipantBar.vue'

const { rows } = useParticipantBars()

const maxTotal = computed(() =>
  rows.value.reduce((max, r) => (r.total > max ? r.total : max), 0),
)
</script>

<template>
  <div class="flex flex-row items-end gap-1 overflow-x-auto pb-2">
    <ParticipantBar
      v-for="row in rows"
      :key="row.displayName"
      :row="row"
      :max-total="maxTotal"
    />
  </div>
</template>
