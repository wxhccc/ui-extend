import Store, { StoreAPI } from 'store2'

export interface StoreInstance extends StoreAPI {
  session: (...args: any[]) => any
}

export const UEStorage = (component: string) =>
  Store.namespace(`UiExtend${component ? '.' + component : ''}`) as StoreInstance

export function namedStorage(namespace: string) {
  return Store.namespace(namespace)
}

export default Store
