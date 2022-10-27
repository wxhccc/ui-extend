<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { kebabCase } from 'lodash-es'
import { UEStorage } from '@wxhccc/ue-shared'
import components from './components'

const allDemoComps = import.meta.glob(`../../../docs/.vuepress/demo/**/*.vue`)

const demoComps = Object.entries(allDemoComps).reduce((acc, [path, comp]) => {
  const [, compName, ui, demoName] = path.match(/demo\/([\w|-]+)(\/element)?\/([\w|-]+)\.vue/) || []
  if (!ui || ui.includes('element')) {
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
    <el-tabs v-model="activeTab" tab-position="left" @tab-change="moduleRenderedChange">
      <el-tab-pane v-for="item in compNameMap" v-bind="item">
        <template v-if="moduleRendered[item.name] && demoComps[item.name]?.length">
          <template v-for="di in demoComps[item.name]">
            <el-card :header="di[0]">
              <component :is="di[1]"></component>
            </el-card>
          </template>
        </template>
        <el-empty class="no-example" v-else description="该组件暂无示例"></el-empty>
      </el-tab-pane>
    </el-tabs>
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
  .el-tabs {
    height: 100%;
  }
  .el-tabs__content {
    height: 100%;
    overflow-y: auto;
    padding: 20px 20px 20px 10px;
  }
  .el-card {
    margin-bottom: 20px;
  }
  .el-card__header {
    --el-card-padding: 10px;
  }
  .no-example {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>