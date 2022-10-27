<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { kebabCase } from 'lodash-es'
import { UEStorage } from '@wxhccc/ue-shared'
import components from './components'

const allDemoComps = import.meta.glob(`../../../docs/.vuepress/demo/**/*.vue`)

const demoComps = Object.entries(allDemoComps).reduce((acc, [path, comp]) => {
  const [, compName, ui, demoName] = path.match(/demo\/([\w|-]+)(\/antd-vue)?\/([\w|-]+)\.vue/) || []
  if (!ui || ui.includes('antd-vue')) {
    if (!acc[compName]) {
      acc[compName] = []
    }
    acc[compName].push([demoName, defineAsyncComponent(comp as any)])
  }
  return acc
}, {} as Record<string, [string, any][]>) 

const lastTab = UEStorage.session('dev-act-tab') || 'loading'

const activeTab = ref(lastTab)

const moduleRendered = ref<Record<string, boolean>>({
  [lastTab]: true
})

const moduleRenderedChange = (tab: string) => {
  UEStorage.session('dev-act-tab', tab)
  if (!moduleRendered.value[tab]) {
    moduleRendered.value[tab] = true
  }
}

const compNameMap = components.map(label => ({ label, name: kebabCase(label) }))

</script>

<template>
  <div class="common-layout">
    <a-tabs v-model:active-key="activeTab" tab-position="left" @change="moduleRenderedChange">
      <a-tab-pane v-for="item in compNameMap" :key="item.name" :tab="item.label">
        <template v-if="moduleRendered[item.name] && demoComps[item.name]?.length">
          <template v-for="di in demoComps[item.name]">
            <a-card :title="di[0]">
              <component :is="di[1]"></component>
            </a-card>
          </template>
        </template>
        <a-empty class="no-example" v-else description="该组件暂无示例"></a-empty>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang="scss">
@mixin relative-full {
  position: relative;
  width: 100%;
  height: 100%;
}
html,
body {
  @include relative-full;
  margin: 0;
  padding: 0;
}
#app {
  @include relative-full;
  overflow: hidden;
}
* {
  box-sizing: border-box;
}

.common-layout {
  @include relative-full;
  .ant-tabs {
    height: 100%;
  }
  .ant-tabs-content {
    height: 100%;
    overflow-y: auto;
    padding: 20px 20px 20px 10px;
  }
  .ant-card {
    margin-bottom: 20px;
  }
  .ant-card-head-title {
    padding: 10px 0;
  }
  .no-example {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>