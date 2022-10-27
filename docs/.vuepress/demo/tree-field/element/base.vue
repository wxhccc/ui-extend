<template>
  <div>
    <p>
      关联模式：
      <el-radio-group v-model="checkMode" @change="resetValues">
        <el-radio label="two-way">two-way(双向)</el-radio>
        <el-radio label="one-way">one-way(单向)</el-radio>
        <el-radio label="none">none(不关联）</el-radio>
      </el-radio-group>
    </p>
    <ue-tree-field v-model="nodeIds" v-model:detail-value="detailValue" :data="data" :check-mode="checkMode"
      :key="checkMode"></ue-tree-field>
    modelValue: {{  nodeIds  }}
    <br />
    detailValue: {{  detailValue  }}
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      checkMode: 'one-way',
      nodeIds: [],
      detailValue: {},
      data: [
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
      ]
    })

    const resetValues = () => {
      state.nodeIds = []
      state.detailValue = {}
    }

    return { ...toRefs(state), resetValues }
  }
})
</script>
