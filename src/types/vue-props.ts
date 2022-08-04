import type { Prop } from 'vue'

export type PropsTypeToDefine<Props> = Required<{ [K in keyof Props]: Prop<Props[K]> }>
