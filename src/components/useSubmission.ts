import { useToasts } from '@/composables/useToasts'
import type { MapOfCards } from './useCards'
import { ref, toValue, type Ref } from 'vue'
import { handleSubmission } from '@/handleSubmission'
import type { Card } from './CardChoice.vue'

export function useSubmission(
  displayName: Ref<string>,
  mapOfCards: Ref<MapOfCards>,
  tiebreaker: Ref<Card>,
  onSuccess: () => void,
) {
  const { showErrorToast } = useToasts()

  const isSubmitting = ref(false)

  async function submit() {
    const selectedCardNames: string[] = []
    for (const category of Object.values(mapOfCards.value)) {
      const selectedCard = toValue(category.selected)
      if (!selectedCard) {
        showErrorToast('Please select a card for each category before submitting.')
        return
      }
      selectedCardNames.push(selectedCard.name)
    }
    const tiebreakerCard = toValue(tiebreaker)
    if (!tiebreakerCard) {
      showErrorToast('Please select a card for each category before submitting.')
      return
    }
    isSubmitting.value = true
    const result = await handleSubmission(
      toValue(displayName),
      selectedCardNames,
      tiebreakerCard.name,
    )
    isSubmitting.value = false
    if (result === 'error-display-name-in-use') {
      showErrorToast('The display name is already in use. Please choose a different name.')
      return
    }
    if (result === 'error-unknown') {
      showErrorToast('There was an error submitting your choices. Please try again later.')
      return
    }
    onSuccess()
  }

  return { submit, isSubmitting }
}
