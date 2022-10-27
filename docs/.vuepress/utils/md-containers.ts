import mdit from 'markdown-it'
import { Plugin } from 'vuepress'
import { containerPlugin } from '@vuepress/plugin-container'

const md = mdit()
const container: Plugin = containerPlugin({
  type: 'demo',
  validate (params) {
    return !!params.trim().match(/^demo\s*(.*)$/)
  },
  render (tokens, idx) {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
    const [compName, nll, desc] = m && m.length > 1 ? m[1].split(' ') : []
    const [noLimitLib, description] = nll === 'no-limit-lib' ? [true, desc] : [false, nll]
    const content = tokens[idx + 1] && tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
    if (tokens[idx].nesting === 1) {
      return `<comp-demo name="${compName}" ${noLimitLib ? 'no-limit-lib' : ''}>${description ? `<template #description>${md.render(description)}</template>` : ''}${content}`
    }
    return '</comp-demo>'
  }
})

export default container
