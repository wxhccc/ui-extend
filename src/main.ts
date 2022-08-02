import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'

const app = createApp(App)

app.config.errorHandler = (err) => {
  console.error('app error:', err)
}

app.mount('#app')
