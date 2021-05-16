import type { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $uiVersion: string
    $ueVersion: string
  }
}
