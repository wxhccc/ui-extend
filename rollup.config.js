import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import css from 'rollup-plugin-css-only'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

let tsChecked = true

export function createConfig(config, plugins) {
  const tsPlugin = typescript({
    tsconfigOverride: {
      declaration: tsChecked,
      emitDeclarationOnly: false
    },
    useTsconfigDeclarationDir: true
  })

  tsChecked && (tsChecked = false)

  const output = Object.assign(
    {
      globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus',
        'ant-design-vue': 'Antd'
      }
    },
    'output' in config ? config.output : {}
  )
  return Object.assign(
    {
      input: 'components/index.ts'
    },
    config,
    {
      output,
      external: ['vue', 'ant-design-vue'],
      plugins: [tsPlugin, json(), vuePlugin({ css: false }), resolve(), commonjs(), css(), scss({
        sass: require('sass'),
      })].concat(plugins)
    }
  )
}

function getConfig(env) {
  const babelPlugin = babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**'
  })
  const esCfg = createConfig({
    output: {
      file: pkg.module,
      format: 'esm'
    }
  })
  const cjsCfg = createConfig(
    {
      output: {
        file: pkg.main,
        format: 'cjs',
        exports: 'named'
      },
      watch: {
        include: 'components/**'
      }
    },
    [babelPlugin]
  )

  if (env === 'development') return [esCfg, cjsCfg]

  const umdMinCfg = createConfig(
    {
      output: {
        file: pkg.unpkg,
        name: 'UiExtend',
        format: 'umd',
        exports: 'named'
      }
    },
    [babelPlugin, terser()]
  )
  return [cjsCfg, esCfg, umdMinCfg]
}

export default getConfig(process.env.NODE_ENV)
