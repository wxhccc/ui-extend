declare module '*.json' {
  const value: any
  export const version: string
  export default value
}

declare namespace UE {
  import type { DefineComponent, Plugin } from 'vue'
  interface UnpluginComponent extends DefineComponent {
    name: string
    $_ue_methods?: string[]
  }

  interface Component extends UnpluginComponent {
    install: Plugin
  }

  interface Option extends Record<string, any> {
    label: string | number
    value: string | number
  }

  interface TreeNodeData extends Option {
    children?: TreeNodeData[]
  }

  interface Size {
    width: number
    height: number
  }
}
