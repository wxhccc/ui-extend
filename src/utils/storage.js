import Store from 'store2';

export const UEStorage = component => Store.namespace(`UiExtends${component ? '.' + component : ''}`);

export function namedStorage (namespace) {
  return Store.namespace(namespace);
}

