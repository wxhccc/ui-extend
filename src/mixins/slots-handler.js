export default {
  methods: {
    $_mixin_slotsToVNode (slots, data, filter) {
      if (!slots) return;
      const { $createElement: h } = this;
      const slotNames = Object.keys(slots);
      const filterNames = filter
        ? slotNames.filter(Array.isArray(filter) ? name => filter.includes(name) : filter)
        : slotNames;
      return filterNames.map(name => {
        const { props, events, component } = slots[name];
        const vdo = { props, on: events, slot: name, key: name };
        return typeof component === 'function' ? component(h, vdo, name, data) : h(component, vdo);
      });
    }
  }
}