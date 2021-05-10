function stripTag (tag: string, content: string) {
  const regexp = new RegExp(`<(${tag})\\s*>([\\s\\S]+)<\\/\\1>`);
  const result = content.match(regexp);
  return result && result[2] ? result[2].trim() : '';
}
export const stripScript = stripTag.bind(undefined, 'script');

export const stripStyle = stripTag.bind(undefined, 'style');

export const stripTemplate = stripTag.bind(undefined, 'template');

export default function codeStrParse (content: string) {
  return {
    script: stripScript(content),
    html: stripTemplate(content),
    style: stripStyle(content)
  }
}