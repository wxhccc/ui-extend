const stripTag = (tag: 'script' | 'style' | 'template') => (content = '') => {
  const regexp = new RegExp(`<(${tag})\\s*>([\\s\\S]+)<\\/\\1>`);
  const result = content.match(regexp);
  return result && result[2] ? result[2].trim() : '';
}
export const stripScript = stripTag('script');

export const stripStyle = stripTag('style');

export const stripTemplate = stripTag('template');

export default function codeStrParse (content: string) {
  return {
    script: stripScript(content),
    html: stripTemplate(content),
    style: stripStyle(content)
  }
}