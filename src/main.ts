import ui from '@nuxt/ui/vue-plugin'

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { firebaseApp } from './firebase'
import { VueFire } from 'vuefire'

const app = createApp(App)

app.use(ui)

app.use(VueFire, {
  firebaseApp,
})

app.mount('#app')
