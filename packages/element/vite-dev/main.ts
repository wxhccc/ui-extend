import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import UiExtend from '../src'
import Cropper from '../src/components/cropper'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(UiExtend)
app.component('UeCropper', Cropper)

app.config.globalProperties.$ui_element = true

app.config.errorHandler = (err) => {
  console.error('app error:', err)
}

app.mount('#app')
