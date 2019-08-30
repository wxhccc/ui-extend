import ActionBtns from 'Comps/action-btns';

export default {
  functional: true,
  props: {
    column: Object,
    scope: Object
  },
  render (h, context) {
    const { props: { column: { action }, scope } } = context;
    return h(ActionBtns, {
      props: {
        btns: action,
        loadingFlags: scope.row,
        data: scope.row,
        extraArgs: [scope]
      }
    });
  }
}
