<template>
  <div>
    <p>
      树关联模式:
      <a-switch v-model:checked="oneWay" checked-children="单向" un-checked-children="双向"></a-switch>
    </p>
    <p>
      数据转移模式:
      <a-switch v-model:checked="buttonTrigger" checked-children="按钮触发" un-checked-children="非按钮触发"></a-switch>
    </p>

    <a-alert message="非按钮触发时交互有差异，且两侧顶部栏的统计数据代表意义不一致" type="info"></a-alert>
    <p>
      左侧已选项处理模式:
      <a-radio-group v-model:value="chosedMode">
        <a-radio value="disabled">禁用</a-radio>
        <a-radio value="filter">过滤</a-radio>
      </a-radio-group>
    </p>
    <ue-tree-transfer v-model="value" :data="data" :one-way="oneWay" :button-trigger="buttonTrigger" :chosed-mode="chosedMode"
      :key="`${buttonTrigger}-${chosedMode}`"></ue-tree-transfer>
    modelValue: {{ value }}
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const buttonTrigger = ref(true)
    const oneWay = ref(false)
    const chosedMode = ref('disabled')
    const value = ref([])
    const data = ref([
      {
        label: '一级 1',
        id: 1,
        children: [
          {
            label: '二级 1-1',
            id: 11,
            children: [
              {
                id: 111,
                label: '三级 1-1-1'
              }
            ]
          }
        ]
      },
      {
        label: '一级 2',
        id: 2,
        children: [
          {
            id: 21,
            label: '二级 2-1',
            children: [
              {
                id: 211,
                label: '三级 2-1-1'
              }
            ]
          },
          {
            id: 22,
            label: '二级 2-2',
            children: [
              {
                id: 221,
                label: '三级 2-2-1'
              }
            ]
          }
        ]
      },
      {
        label: '一级 3',
        id: 3,
        children: [
          {
            id: 31,
            label: '二级 3-1',
            children: [
              {
                id: 311,
                label: '三级 3-1-1'
              }
            ]
          },
          {
            label: '二级 3-2',
            id: 32,
            children: [
              {
                id: 321,
                label: '三级 3-2-1'
              }
            ]
          }
        ]
      }
    ])

    return { oneWay, buttonTrigger, chosedMode, value, data }
  }
})
</script>
