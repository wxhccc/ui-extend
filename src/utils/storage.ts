import Store from 'store2'

export const UEStorage = Store.namespace('UI_EXTEND')

export const CompStorage = (component: string) => UEStorage.namespace(`${component || ''}`)

export default Store
