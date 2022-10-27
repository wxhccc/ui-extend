import { resolve } from 'path'
import { defineConfig, mergeConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import baseConfig from '../../scripts/vite.base.config'

const commonResolve: UserConfig['resolve'] = {
  alias: {
    '@wxhccc/ue-element': resolve(__dirname, 'src'),
    '@': resolve(__dirname, 'src')
  }
}

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [vue()],
      resolve: commonResolve
    }
  } else {
    return mergeConfig(baseConfig(), {
      resolve: commonResolve,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'UiExtendElement',
          fileName: (format) => (format === 'es' ? 'index.js' : 'index.umd.js')
        }
      }
    })
  }
})
