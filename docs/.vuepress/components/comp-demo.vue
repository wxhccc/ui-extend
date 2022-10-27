<script setup lang="ts">
import { usePageData } from '@vuepress/client'
import { computed } from 'vue'
import { kebabCase } from 'lodash-es'

const props = withDefaults(defineProps<{
  name: string
  noLimitLib?: boolean
}>(), { name: 'Base' })

const pageData = usePageData()

const componentName = computed(() => {
  const { path } = pageData.value
  return path.indexOf('/component/') >= 0 ? path.split('/').pop()?.split('.').shift() : ''
})

const demoCompName = computed(() => {
  const libName = props.noLimitLib ? '' : `-${__CURRENT_LIB__}`
  return `${componentName.value}${libName}-${kebabCase(props.name)}`
})
</script>
<script lang="ts">
export default { name: 'CompDemo' }
</script>

<template>
  <demo-block :class="['component-demo-block', `${componentName}-demo`]">
    <template v-if="demoCompName" #source>
      <component :is="demoCompName"></component>
    </template>
    <template #default>
      <slot name="description"></slot>
    </template>
    <template #highlight>
      <slot></slot>
    </template>
  </demo-block>
</template>



<style lang="scss">
.component-demo-block {
  margin: 20px 0 40px;
}
</style>

