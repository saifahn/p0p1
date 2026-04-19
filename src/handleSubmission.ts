import { collection, doc, runTransaction } from 'firebase/firestore'
import { db } from './firebase'

const submissionsCollectionRef = collection(db, 'submissions')

export class DisplayNameInUse extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DisplayNameInUse'
  }
}

export async function handleSubmission(name: string, selectedCardNames: string[]) {
  const docRef = doc(submissionsCollectionRef, name)

  try {
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(docRef)
      if (doc.exists()) {
        throw new DisplayNameInUse(`Display name "${name}" already exists.`)
      }
      transaction.set(docRef, { selectedCards: selectedCardNames })
    })
    return 'success'
  } catch (e) {
    if (e instanceof DisplayNameInUse) {
      return 'error-display-name-in-use'
    }
    console.error('Error adding document: ', e)
    return 'error-unknown'
  }
}
