<template>
  <div>
    <p>
      树关联模式:
      <el-switch v-model="oneWay" active-text="单向" inactive-text="双向"></el-switch>
    </p>
    <p>
      数据转移模式:
      <el-switch v-model="buttonTrigger" active-text="按钮触发" inactive-text="非按钮触发"></el-switch>
    </p>

    <el-alert title="非按钮触发时交互有差异，且两侧顶部栏的统计数据代表意义不一致" type="info"></el-alert>
    <p>
      左侧已选项处理模式:
      <el-radio-group v-model="chosedMode">
        <el-radio label="disabled">禁用</el-radio>
        <el-radio label="filter">过滤</el-radio>
      </el-radio-group>
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
