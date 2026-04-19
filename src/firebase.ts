import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCp3QAHxoI-YO6LnTkyfLOoR1PhO7f3Ck8',
  authDomain: 'p0p1-421f7.firebaseapp.com',
  projectId: 'p0p1-421f7',
  storageBucket: 'p0p1-421f7.firebasestorage.app',
  messagingSenderId: '846564572257',
  appId: '1:846564572257:web:6142a19724756396c2fe20',
  measurementId: 'G-L1T3J9WR92',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
