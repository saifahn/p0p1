import { useToasts } from '@/composables/useToasts'
import type { MapOfCards } from './useCards'
import { ref, unref, type Ref } from 'vue'
import { handleSubmission } from '@/handleSubmission'

export function useSubmission(displayName: Ref<string>, mapOfCards: Ref<MapOfCards>) {
  const { showSuccessToast, showErrorToast } = useToasts()

  const isSubmitting = ref(false)

  async function handleSubmit() {
    if (!displayName.value) {
      showErrorToast('Please enter a display name.')
      return
    }

    const selectedCardNames: string[] = []
    for (const category of Object.values(mapOfCards.value)) {
      const selectedCard = unref(category.selected)
      if (!selectedCard) {
        showErrorToast('Please select a card for each category before submitting.')
        return
      }
      selectedCardNames.push(selectedCard.name)
    }
    isSubmitting.value = true
    const result = await handleSubmission(displayName.value, selectedCardNames)
    isSubmitting.value = false
    if (result === 'error-display-name-in-use') {
      showErrorToast('The display name is already in use. Please choose a different name.')
      return
    }
    if (result === 'error-unknown') {
      showErrorToast('There was an error submitting your choices. Please try again later.')
      return
    }
    showSuccessToast()
  }

  return { handleSubmit, isSubmitting }
}
