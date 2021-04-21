<template>
  <demo-block v-if="UEGLOBAL.elemReady" :class="['component-demo-block', `${$componentName}-demo`]">
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

<script>
export default {
  name: 'CompDemo',
  props: {
    name: {
      type: String,
      default: 'Base'
    }
  },
  created () {
    !this.UEGLOBAL.elemReady && this.$ElemPromise.then(() => {
      this.UEGLOBAL.elemReady = true
    })
  },
  computed: {
    componentName () {
      const { $componentName, name } = this
      return `demo-${$componentName}-${name}`
    }
  }
}
</script>

<style lang="scss">
.component-demo-block {
  margin: 20px 0 40px;
}
</style>

