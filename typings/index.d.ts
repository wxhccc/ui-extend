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

  interface Option {
    label: string | number
    value: string | number
    [key: string]: any
  }

  interface Size {
    width: number
    height: number
  }
}
