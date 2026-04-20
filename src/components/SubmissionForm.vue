<script setup lang="ts">
import { reactive, toRef } from 'vue'
import * as v from 'valibot'

import CardChoice from './CardChoice.vue'
import { useSubmission } from './useSubmission'
import { useCards } from './useCards'
import { useToasts } from '@/composables/useToasts'

const { mapOfCards } = useCards()
const { showErrorToast } = useToasts()

const schema = v.object({
  displayName: v.pipe(
    v.string(),
    v.trim(),
    v.excludes('/', 'Display name cannot contain slashes.'),
    v.nonEmpty('Display name cannot be empty.'),
    v.excludes('__', 'Display name cannot contain double underscores.'),
  ),
})
const state = reactive({
  displayName: '',
})

const { submit, isSubmitting } = useSubmission(toRef(state, 'displayName'), mapOfCards)

async function handleSubmit() {
  if (!state.displayName) {
    showErrorToast('Please enter a display name.')
    return
  }
  await submit()
}
</script>

<template>
  <UForm :schema :state @submit.prevent="handleSubmit">
    <UFormField
      label="Display name"
      class="mb-4"
      required
      orientation="horizontal"
      size="xl"
      name="displayName"
    >
      <UInput placeholder="Enter a name" v-model="state.displayName" />
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
