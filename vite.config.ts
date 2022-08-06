import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const formatFileMap = {
  es: 'index.esm.js',
  umd: 'index.umd.js'
}

export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: true, skipDiagnostics: false })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UiExtend',
      // the proper extensions will be added
      fileName: (format) => formatFileMap[format]
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus', '@element-plus/icons-vue', 'dayjs'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    },
    watch: {}
  }
})
