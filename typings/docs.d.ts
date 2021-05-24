import type { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $uiVersion: string
    $ueVersion: string
  }
}
