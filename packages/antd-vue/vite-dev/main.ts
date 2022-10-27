import { createApp } from 'vue'
import AntdVue from 'ant-design-vue'
import App from './App.vue'
import UiExtend from '../src'

import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/antd.dark.css';

const app = createApp(App)

app.use(AntdVue)
app.use(UiExtend)

app.config.globalProperties.$ui_antd_vue = true

app.config.errorHandler = (err) => {
  console.error('app error:', err)
}

app.mount('#app')
