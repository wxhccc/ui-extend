<template>
  <demo-block :class="['component-demo-block', `${$componentName}-demo`]">
    <template v-if="componentName" #source>
      <component :is="componentName"></component>
    </template>
    <template #default>
      <slot name="description"></slot>
    </template>
    <template #highlight>
      <slot></slot>
    </template>
  </demo-block>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CompDemo',
  props: {
    name: {
      type: String,
      default: 'Base'
    }
  },
  created() {
    
  },
  computed: {
    $componentName (): string {
      const { path } = this.$route
      return path.indexOf('/component/') >= 0 ? (path.split('/').pop() as string).split('.').shift() as string : ''
    },
    componentName (): string {
      const { $componentName, name } = this
      return `demo-${$componentName}-${name}`
    }
  }
})
</script>

<style lang="scss">
.component-demo-block {
  margin: 20px 0 40px;
}
</style>

