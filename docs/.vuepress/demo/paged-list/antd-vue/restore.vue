<template>
  <div>
    restore: {{ restore }}
    <a-tabs v-model:active-key="curTab">
      <a-tab-pane key="list" tab="列表页"></a-tab-pane>
      <a-tab-pane key="detail" tab="详情页"></a-tab-pane>
    </a-tabs>
    <div v-if="curTab === 'list'">
      是否进行时序控制：<a-switch v-model:checked="reqControl" checked-children="请求控制" un-checked-children="不控制"></a-switch>
      <a-alert message="仔细观察不控制时序时，数据可能和搜索条件不对应" type="info"></a-alert>
      <p>请输入内容并选择页面，然后切换到详情页，然后切换回来</p>
      <a-form>
        <p>以下搜索条件自动修改extraForm变量值：</p>
        <a-form-item label="标题">
          <a-input v-model:value="searchData.title" placeholder="请输入标题搜索"></a-input>
        </a-form-item>
        <p>以下条件需点击按钮手动修改extraForm变量值</p>
        <a-form-item label="描述">
          <a-input v-model:value="tempData.description" style="width: 200px" placeholder="请输入描述，点击按钮搜索"></a-input>
        </a-form-item>
        <a-button @click="searchDesc">搜索</a-button>
      </a-form>
      <ue-paged-list ref="list" class="paded-list-demo-table" created-auto-send :paged-data="pagedData"
        :loading="loading" :extra-model="searchData" :restore="restore" need-store :pagination="paginationProps"
        :get-paged-data="getPagedData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :title="item.title" :description="item.description">
              <template #avatar>
                <a-avatar src="https://joeschmoe.io/api/v1/random" />
              </template>
            </a-list-item-meta>
          </a-list-item>
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
      searchData: {
        title: '',
        description: ''
      },
      tempData: {
        description: ''
      },
      paginationProps: {
        simple: true
      }
    })
    // 时序控制用
    let curRequest = 0

    const searchDesc = () => {
      state.searchData.description = state.tempData.description
    }

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
      const { current, size, title = '', description = '' } = params
      const data = Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (current - 1) * size + index,
          title: title + rand.toString(26).substring(2),
          description: description + rand.toString(34).substring(2) + rand.toString(32)
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

    return { list, ...toRefs(state), searchDesc, getPagedData }
  }
})
</script>
