import { dirname, resolve } from 'path'
import minimist from 'minimist'
import { fileURLToPath } from 'url'
import { build, mergeConfig } from 'vite'
import typescript from 'rollup-plugin-typescript2'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { ui = 'element' } = minimist(process.argv.slice(2))

const pkgRoot = resolve(__dirname, `../packages/${ui}`)
const pkgRootSrc = resolve(pkgRoot, 'src')
const sharedRoot = resolve(__dirname, '../packages/shared')

/** 外部依赖 */
const external = [
  'vue',
  'element-plus',
  'ant-design-vue',
  '@element-plus/icons-vue',
  '@wxhccc/es-util',
  'lodash-es',
  'dayjs',
  'cropperjs',
  '@shared',
  /^@\/+/
]

const globals = {
  vue: 'Vue',
  'element-plus': 'ElementPlus',
  '@element-plus/icons-vue': 'ElementPlusIconsVue',
  dayjs: 'dayjs',
  cropperjs: 'Cropper'
}

const createBuildConfig = (config) => {
  return {
    root: pkgRoot,
    build: mergeConfig({
      emptyOutDir: false,
      rollupOptions: {
        external,
        output: {
          globals,
          paths: (id) => {
            if (id.startsWith('@/')) {
              return id.replace('@', '.')
            }
            return id
          }
        }
      }
    }, config,false)
  }
}
const createSingleFileConfig = (entry, fileName = 'index') => createBuildConfig({
  lib: {
    entry,
    formats: ['es', 'cjs'],
    fileName: (format) => `${format === 'es' ? 'es' : 'lib'}/${fileName}.js`
  },
  minify: false,
  rollupOptions: {
    plugins: [typescript({
      cwd: pkgRoot,
      abortOnError: false
    })]
  }
})
const optionals = createSingleFileConfig(resolve(pkgRoot, 'src/optionals/index.ts'), 'optionals')

const shared = createSingleFileConfig(resolve(sharedRoot, 'index.ts'), 'shared')

;(async () => {

  await build(optionals)
  await build(shared)
})()