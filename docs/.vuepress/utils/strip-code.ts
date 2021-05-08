function stripTag (tag, content) {
  const regexp = new RegExp(`<(${tag})\\s*>([\\s\\S]+)<\\/\\1>`);
  const result = content.match(regexp);
  return result && result[2] ? result[2].trim() : '';
}
export const stripScript = stripTag.bind({}, 'script');

export const stripStyle = stripTag.bind({}, 'style');

export const stripTemplate = stripTag.bind({}, 'template');

export default function codeStrParse (content) {
  return {
    script: stripScript(content),
    html: stripTemplate(content),
    style: stripStyle(content)
  }
}