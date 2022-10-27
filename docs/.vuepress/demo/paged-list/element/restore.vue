<template>
  <div>
    restore: {{ restore }}
    <el-tabs v-model="curTab">
      <el-tab-pane name="list" label="列表页"></el-tab-pane>
      <el-tab-pane name="detail" label="详情页"></el-tab-pane>
    </el-tabs>
    <div v-if="curTab === 'list'">
      是否进行时序控制：<el-switch v-model="reqControl" active-text="请求控制" inactive-text="不控制"></el-switch>
      <el-alert title="仔细观察不控制时序时，数据可能和搜索条件不对应" type="info"></el-alert>
      <p>请输入内容并选择页面，然后切换到详情页，然后切换回来</p>
      <el-form inline>
        <el-form-item label="标题">
          <el-input v-model="searchData.title" placeholder="请输入标题搜索"></el-input>
        </el-form-item>
      </el-form>
      <ue-paged-list ref="list" class="paded-list-demo-table" created-auto-send :paged-data="pagedData"
        :loading="loading" :extra-model="searchData" :restore="restore" need-store :pagination="paginationProps"
        :get-paged-data="getPagedData">
        <template #default="{ rows }">
          <el-table :data="rows" height="320">
            <el-table-column label="Id" prop="id"></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
          </el-table>
        </template>
      </ue-paged-list>
    </div>
    <div v-if="curTab === 'detail'">假装这个是详情页</div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, watch, nextTick } from 'vue'

export default defineComponent({
  setup() {
    const list = ref()
    const state = reactive({
      curTab: 'list',
      loading: false,
      pagedData: {},
      reqControl: false,
      restore: false,
      searchData: { title: '' },
      paginationProps: {
        layout: 'total, prev, pager, next'
      }
    })
    // 时序控制用
    let curRequest = 0

    const getPagedData = (params, accessKey) => {
      console.log(params, accessKey)
      // 这里记录请求值
      curRequest = accessKey
      state.loading = true
      return getRemoteMockData(params)
        .then((data) => {
          // 过期请求不处理
          if (state.reqControl && curRequest !== accessKey) {
            return
          }
          console.log(params, data)
          state.pagedData = data
        })
        .finally(() => {
          state.loading = false
        })
    }
    // 模拟接口请求，并动态处理pageSize
    const getRemoteMockData = (params) => new Promise((resolve) => {
      const { current, size, title = '' } = params
      const data = Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (current - 1) * size + index,
          title: title + rand.toString(26).substring(2),
          description: rand.toString(34).substring(2) + rand.toString(32),
        }
      })
      window.setTimeout(() => {
        resolve({
          rows: data,
          total: 200
        })
      }, 1500)
    })

    watch(
      () => state.curTab,
      (newVal) => {
        if (newVal === 'list') {
          // 回到列表页时重置页面状态
          state.searchData = { title: '' }
          // 如果是需要恢复，则设置搜索条件。注意如果是恢复，上面修改extra-form属性的值不会响应
          if (state.restore) {
            // 搜索条件需要自己恢复，使用SearchForm组件可自动恢复
            nextTick(() => {
              const { params } = list.value.getStoreData()
              state.searchData.title = params.title
            })
          }
        } else {
          // 离开列表页时设置restore为true
          state.restore = true
        }
      }
    )

    return { list, ...toRefs(state), getPagedData }
  }
})
</script>
