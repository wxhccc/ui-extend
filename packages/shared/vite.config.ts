import { resolve } from 'path'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

/** 外部依赖 */
const external = [
  'vue',
  '@wxhccc/es-util',
  'lodash-es',
  'dayjs'
]

const globals = {
  vue: 'Vue',
  '@wxhccc/es-util': 'EsUtil',
  'lodash-es': '_',
  dayjs: 'dayjs'
}

export default defineConfig({
  plugins: [vue(), dts({
    entryRoot: resolve(__dirname),
    rollupTypes: true,
    copyDtsFiles: true
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UiExtendShared',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.umd.js')
    },
    rollupOptions: {
      external,
      output: {
        exports: 'named',
        globals
      }
    }
  }
}
)
