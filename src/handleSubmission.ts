import { doc, setDoc } from 'firebase/firestore'
import { submissionsRef } from './firebase'

export async function handleSubmission(name: string, selectedCardNames: string[]) {
  try {
    await setDoc(doc(submissionsRef, name), {
      selectedCards: selectedCardNames,
    })
    return true
  } catch (e) {
    console.error('Error adding document: ', e)
    return false
  }
}
