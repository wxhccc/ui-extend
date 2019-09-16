import refFnProxyMixin from '../mixins/ref-fn-proxy';

export function getPublicMethodNames (...components) {
  return components.reduce((acc, cur) => (cur && Array.isArray(cur.$_ue_methods) ? acc.concat(cur.$_ue_methods) : acc), []);
}

export function getComponentFnProxy (component, ref) {
  return refFnProxyMixin(ref || component.name, component.$_ue_methods);
}
// resolve props object to Vue Data Object
export function resolveProps (props, events, other) {
  const handledProps = typeof props === 'function' ? props() : props || {};
  return {
    class: handledProps.class,
    style: handledProps.style,
    props: handledProps,
    attrs: handledProps,
    on: events,
    ...other
  }
}