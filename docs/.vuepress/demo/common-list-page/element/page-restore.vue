<template>
  <div>
    restore: {{ restore }}
    <el-tabs v-model="curTab">
      <el-tab-pane name="list" label="列表页"></el-tab-pane>
      <el-tab-pane name="detail" label="详情页"></el-tab-pane>
    </el-tabs>
    <div v-if="curTab === 'list'">
      <ue-common-list-page
        :columns="columns"
        tab-form-key="type"
        :search-forms="searchForms"
        :request="getRemoteMockData"
        :restore="restore"
        need-store
        height="300"
        :store-key="curTab"
        created-auto-send
      >
      </ue-common-list-page>
    </div>
    <div v-if="curTab === 'detail'">
      假装这个是详情页
    </div>
  </div>
  
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import {
  vwp,
  createInputFormItem,
  createSelectFormItem,
  createDateFormItem
} from '@wxhccc/ue-element'

export default defineComponent({
  setup () {
    const curTab = ref('list')
    const restore = ref(false)
    const columns = [
      { prop: 'id', label: 'Id' },
      { prop: 'type', label: '类型' },
      { prop: 'title', label: '标题' },
      { prop: 'description', label: '描述' }
    ]
    const searchForms = {
      size: 'small',
      labelWidth: '80px',
      items: [
        createInputFormItem('标题', 'title'),
        createSelectFormItem('类型', 'type', [
          { value: '文章', label: '文章' },
          { value: '帖子', label: '帖子' }
        ]),
        createDateFormItem('活动时间', 'date', 'dateRange', { initValue: [] })
      ]
    }

    // 模拟接口请求，并动态处理pageSize
    const getRemoteMockData = (params) => new Promise((resolve) => {
      const { current, size, title, description, type } = params;
      const data = Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (current - 1) * size + index + 1,
          type: type || (rand > 0.5 ? '文章' : '帖子'),
          title: (title || '') + rand.toString(26).substring(2),
          description: (description || '') + rand.toString(34).substring(2) + rand.toString(32)
        }
      })
      window.setTimeout(() => {
        resolve({
          rows: data,
          total: 200
        })
      }, 1500)
    })

    watch(curTab, (newVal) => {
      if (newVal === 'list') {
      } else {
        // 离开列表页时设置restore为true
        restore.value = true
      }
    })

    return {
      curTab,
      restore,
      searchForms,
      columns,
      getRemoteMockData
    }
  }
})
</script>