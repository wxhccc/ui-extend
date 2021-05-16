import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container';

export default (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate (params: string) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render (tokens, idx: number) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      const [compName, description] = m && m.length > 1 ? m[1].split(' ') : [];
      const content = tokens[idx + 1] && tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
      if (tokens[idx].nesting === 1) {
        return `<comp-demo name="${compName}">${description ? `<template #description>${md.render(description)}</template>` : ''}${content}`;
      }
      return '</comp-demo>';
    }
  })
};