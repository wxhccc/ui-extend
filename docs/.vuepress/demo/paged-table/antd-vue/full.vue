<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="标题">
        <a-input v-model:value="tempData.title" placeholder="请输入标题搜索"></a-input>
      </a-form-item>
      <a-form-item label="描述">
        <a-input v-model:value="tempData.description" placeholder="请输入描述，点击按钮搜索"></a-input>
      </a-form-item>
      <a-form-item label="">
        <a-button :loading="loading" @click="searchSend">搜索</a-button>
      </a-form-item>
    </a-form>
    <p>extra-form: {{searchData}}<br />
      selection-value: {{ selectionValue }}</p>
    <ue-paged-table v-model:selection-value="selectionValue" row-key="id" :loading="loading" :columns="columns"
      :paged-data="pagedData" :extra-model="searchData" :get-paged-data="getPagedData" height="300"
      :init-data="{ pageSize: 10 }" created-auto-send>
    </ue-paged-table>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { vwp } from '@wxhccc/ue-antd-vue'

export default defineComponent({
  setup() {
    const loading = ref(false)

    const state = reactive({
      pagedData: {},
      searchData: {
        title: '',
        description: ''
      },
      selectionValue: [],
      tempData: {
        title: '',
        description: ''
      },
      columns: [
        { dataIndex: 'id', title: 'Id' },
        { dataIndex: 'title', title: '标题', sortable: 'custom' },
        { dataIndex: 'description', title: '描述' }
      ]
    })

    const searchSend = () => {
      Object.assign(state.searchData, state.tempData)
    }
    const getPagedData = async (params) => {
      console.log(params)
      const [, data] = await vwp(getRemoteMockData(params), loading)
      state.pagedData = data
    }
    // 模拟接口请求，并动态处理pageSize
    const getRemoteMockData = (params) => new Promise((resolve) => {
      const { current, size, title, description } = params;
      const data = Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (current - 1) * size + index + 1,
          title: title + rand.toString(26).substring(2),
          description: description + rand.toString(34).substring(2) + rand.toString(32),
        }
      })
      window.setTimeout(() => {
        resolve({
          rows: data,
          total: 200
        })
      }, 1500)
    })

    return { loading, ...toRefs(state), searchSend, getPagedData }
  }
})
</script>
