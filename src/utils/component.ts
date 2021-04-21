import { App } from 'vue';
import refMethodsProxyMixin from '../mixins/ref-fn-proxy';

export function getPublicMethodNames (...components: UE.Component[]) {
  return components.reduce((acc: string[], cur) => (cur && Array.isArray(cur.$_ue_methods) ? acc.concat(cur.$_ue_methods) : acc), []);
}

export function getComponentFnProxy (component: UE.Component, ref: string) {
  return refMethodsProxyMixin(ref || component.name, component.$_ue_methods);
}

export const wrapperInstall = (component: UE.UnpluginComponent) => {
  const c = component as any
  c.install = function(app: App) {
    app.component(component.name, component);
  };
  return c as UE.Component
};
