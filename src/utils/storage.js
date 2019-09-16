import Store from 'store2';

export const UEStorage = component => Store.namespace(`UiExtend${component ? '.' + component : ''}`);

export function namedStorage (namespace) {
  return Store.namespace(namespace);
}

export default Store