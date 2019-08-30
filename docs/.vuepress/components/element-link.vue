<script>
export default {
  functional: true,
  render (h, context) {
    const { props: { component }, parent: { $elVersion } } = context
    if (!$elVersion) return '';
    const docVersion = $elVersion.split('.').slice(0, 2).join('.');
    const href = `http://element.eleme.cn/${docVersion}/#/zh-CN/component/${component}`;
    return h('a', { attrs: { href, target: '_blank' } }, [
      `${component}(Element)`,
      h('OutboundLink')
    ])
  }
}
</script>
