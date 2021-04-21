declare module '*.json' {
  const value: any;
  export const version: string;
  export default value;
}

declare namespace UE {
  import type { Component, Plugin } from 'vue'

  interface UnpluginComponent extends Component {
    name: string
    $_ue_methods?: string[]
  }

  interface Component extends UnpluginComponent {
    install: Plugin
  }
  
}