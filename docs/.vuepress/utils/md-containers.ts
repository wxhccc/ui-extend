import mdit from 'markdown-it'
import { containerPlugin } from '@vuepress/plugin-container'

const md = mdit()
export default containerPlugin({
  type: 'demo',
  validate (params) {
    return !!params.trim().match(/^demo\s*(.*)$/)
  },
  render (tokens, idx) {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
    const [compName, description] = m && m.length > 1 ? m[1].split(' ') : [];
    const content = tokens[idx + 1] && tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
    if (tokens[idx].nesting === 1) {
      return `<comp-demo name="${compName}">${description ? `<div slot="description">${md.render(description)}</div>` : ''}${content}`;
    }
    return '</comp-demo>';
  }
})
