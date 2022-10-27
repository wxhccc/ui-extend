<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UeScrollbar'
})
</script>

<template>
  <div class="ue-scrollbar-wrap">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.ue-scrollbar-wrap {
  height: 100%;
  overflow: auto;
}
</style>