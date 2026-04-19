<script setup lang="ts">
import { ref } from 'vue'

import CardChoice from './CardChoice.vue'
import { useSubmission } from './useSubmission'
import { useCards } from './useCards'

const { mapOfCards } = useCards()

const displayName = ref('')

const { handleSubmit, isSubmitting } = useSubmission(displayName, mapOfCards)
</script>

<template>
  <UForm @submit.prevent="handleSubmit">
    <UFormField label="Display name" class="mb-4" required orientation="horizontal" size="xl">
      <UInput placeholder="Enter a name" v-model="displayName" />
    </UFormField>

    <CardChoice
      v-for="category in Object.values(mapOfCards)"
      :key="category.label"
      :label="category.label"
      :cards="category.cards"
      :selected-card="category.selected"
      @select-card="(card) => (category.selected = card)"
    />
    <UButton :loading="isSubmitting" size="xl" block type="submit"> Submit </UButton>
  </UForm>
</template>
