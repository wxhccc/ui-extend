<script setup lang="ts">
import { usePageData, useSiteData } from '@vuepress/client';
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const props = withDefaults(defineProps<{
  name: string
}>(), { name: 'Base' })

const route = useRoute()

const pageData = usePageData()
const siteData = useSiteData()

const componentName = computed(() => {
  const { path } = route
  return path.indexOf('/component/') >= 0 ? path.split('/').pop()?.split('.').shift() : ''
})

const demoCompName = computed(() => {
  return `${componentName.value}-${props.name}`
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

