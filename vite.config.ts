import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { external, globals } from './script/config'

export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: true, skipDiagnostics: false, include: ['src/**/*'] })],
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
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.umd.js')
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external,
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals
      }
    }
    // watch: {}
  }
})
