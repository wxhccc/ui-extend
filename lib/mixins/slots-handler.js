"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  methods: {
    $_mixin_slotsToVNode: function $_mixin_slotsToVNode(slots, data, filter) {
      if (!slots) return;
      var h = this.$createElement;
      var slotNames = Object.keys(slots);
      var filterNames = filter ? slotNames.filter(Array.isArray(filter) ? function (name) {
        return filter.includes(name);
      } : filter) : slotNames;
      return filterNames.map(function (name) {
        var _slots$name = slots[name],
            props = _slots$name.props,
            events = _slots$name.events,
            component = _slots$name.component;
        var vdo = {
          props: props,
          on: events,
          slot: name,
          key: name
        };
        return typeof component === 'function' ? component(h, vdo, name, data) : h(component, vdo);
      });
    }
  }
};
exports["default"] = _default;