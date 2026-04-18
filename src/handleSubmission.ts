import { doc, setDoc } from 'firebase/firestore'
import { submissionsRef } from './firebase'

export async function handleSubmission(name: string, selectedCardNames: string[]) {
  try {
    await setDoc(doc(submissionsRef, name), {
      selectedCards: selectedCardNames,
    })
    console.log('Document successfully written!')
  } catch (e) {
    console.error('Error adding document: ', e)
  }

  console.log('Display Name:', name)
  console.log('Selected Cards:', selectedCardNames)
}
