import Store from 'store2';

export const UEStorage = (component: string) => Store.namespace(`UiExtend${component ? '.' + component : ''}`);

export function namedStorage (namespace: string) {
  return Store.namespace(namespace);
}

export default Store