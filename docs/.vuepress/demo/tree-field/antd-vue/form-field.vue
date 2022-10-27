<template>
  <a-form
    ref="form"
    :model="formData"
    label-width="60px"
    element-loading-text="数据获取中。。。"
  >
    <a-spin :spinning="loading">
      <p>
        <a-space>
          <a-button @click="getApiData">获取回填数据</a-button>
          <a-button @click="isEditing = !isEditing">{{ isEditing ? '只读' : '编辑' }}</a-button>
        </a-space>
      </p>
      <a-form-item label="名称" name="name" required>
        <a-input v-if="isEditing" v-model:value="formData.name"></a-input>
        <span v-else>{{ formData.name }}</span>
      </a-form-item>
      <a-form-item label="权限" name="rightIds" required>
        <ue-tree-field
          inline
          v-model="formData.rightIds"
          :data="data"
          :readonly="!isEditing"
        ></ue-tree-field>
      </a-form-item>
      <ue-form-btns :form="form" is-validate></ue-form-btns>
    </a-spin>
  </a-form>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const form = ref()
    const loading = ref(false)
    const isEditing = ref(true)

    const formData = ref({
      name: '',
      rightIds: []
    })
    const data = [
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
    const getApiData = () => {
      loading.value = true
      window.setTimeout(() => {
        formData.value = { name: '管理员', rightIds: [1, 11, 111, 2, 21, 211, 22, 221] }
        loading.value = false
      }, 2000)
    }

    return { form, loading, isEditing, formData, data, getApiData }
  }
})
</script>
