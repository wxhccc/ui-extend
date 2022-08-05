import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

let tsChecked = true

function createConfig(config, plugins, tsOptions) {
  const nodePlugin = [resolve(), commonjs()]
  const tsOpt = tsOptions || {
    tsconfigOverride: {
      compilerOptions: {
        declaration: tsChecked,
        declarationMap: tsChecked
      }
    }
  }

  const tsPlugin = typescript(tsOpt)
  tsChecked && (tsChecked = false)

  const output = {
    globals: {
      vue: 'Vue'
    },
    ...('output' in config ? config.output : {})
  }

  return {
    input: 'src/index.ts',
    external: ['vue'],
    ...config,
    plugins: [vue(), tsPlugin, nodePlugin].concat(plugins),
    output,
    watch: { include: 'src/**/*' }
  }
}

function getConfig(env) {
  const babelPlugin = babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**' // 只编译我们的源代码
  })
  // core核心的es格式
  const esmCfg = createConfig({
    output: {
      file: pkg.module,
      format: 'es'
    }
  })
  // core核心的cjs格式
  const cjsCfg = createConfig(
    {
      output: {
        file: pkg.main,
        format: 'cjs',
        exports: 'named'
      }
    },
    [babelPlugin]
  )

  const configs = [esmCfg, cjsCfg]

  if (env === 'development') return configs

  const umdMinCfg = createConfig(
    {
      input: 'src/index.ts',
      output: {
        file: pkg.unpkg,
        name: 'UiExtend',
        format: 'umd',
        exports: 'named'
      }
    },
    [babelPlugin, terser()]
  )
  return configs.concat([umdMinCfg])
}

export default getConfig(process.env.NODE_ENV)
