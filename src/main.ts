import ui from '@nuxt/ui/vue-plugin'

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'mana-font/css/mana.css'

const app = createApp(App)

app.use(ui)

app.mount('#app')
