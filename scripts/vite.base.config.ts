import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

/** 外部依赖 */
const external = [
  'vue',
  'store2',
  'element-plus',
  '@element-plus/icons-vue',
  'ant-design-vue',
  /ant-design-vue/,
  '@ant-design/icons-vue',
  '@wxhccc/es-util',
  'lodash-es',
  'dayjs',
  'cropperjs',
  '@wxhccc/ue-shared'
]

const globals = {
  vue: 'Vue',
  'ant-design-vue': 'antd',
  '@ant-design/icons-vue': 'AntDesignIconsVue',
  'element-plus': 'ElementPlus',
  '@element-plus/icons-vue': 'ElementPlusIconsVue',
  '@wxhccc/es-util': 'EsUtil',
  'lodash-es': '_',
  dayjs: 'dayjs',
  cropperjs: 'Cropper',
  '@wxhccc/ue-shared': 'UiExtendShared'
}

export default function () {
  return {
    plugins: [vue(), dts({
      rollupTypes: true,
      copyDtsFiles: true,
      skipDiagnostics: false
    })],
    build: {
      rollupOptions: {
        external,
        output: {
          exports: 'named',
          globals
        }
      }
    }
  } as UserConfig
}

