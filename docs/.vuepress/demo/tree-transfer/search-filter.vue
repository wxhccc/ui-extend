<template>
  <div>
    <ue-tree-transfer v-model="value" :data="data" show-filter></ue-tree-transfer>
    modelValue: {{ value }}
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
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

    return { value, data }
  }
})
</script>
