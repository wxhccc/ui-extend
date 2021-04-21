<template>
  <div>
    restore: {{restore}}
    <el-tabs v-model="curTab">
      <el-tab-pane name="list" label="列表页"></el-tab-pane>
      <el-tab-pane name="detail" label="详情页"></el-tab-pane>
    </el-tabs>
    <div v-if="curTab === 'list'">
      <ue-common-list-page
        :loading="loading"
        :columns="columns"
        tab-form-key="type"
        :paged-data="data"
        :search-forms="searchForms"
        :get-paged-data="getPagedData"
        height="300"
        :restore="restore"
        need-store
        :store-key="curTab"
        :init-data="{ pageSize: 10 }"
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
export default {
  data () {
    return {
      loading: false,
      curTab: 'list',
      restore: false,
      columns: [
        { prop: 'id', label: 'Id' },
        { prop: 'type', label: '类型' },
        { prop: 'title', label: '标题' },
        { prop: 'description', label: '描述' }
      ],
      searchFormItem: {
        size: 'small',
        items: [
          {
            prop: 'title',
            props: {
              label: '标题'
            },
            field: {
              component: 'ElInput'
            }
          },
          {
            prop: 'date',
            props: {
              label: '活动时间'
            },
            field: {
              props: {
                type: 'daterange',
                placeholder: '请选择日期',
                startPlaceholder: '开始日期',
                endPlaceholder: '开始日期'
              },
              component: 'ElDatePicker',
              initValue: []
            }
          }
        ]
      },
      data: {}
    }
  },
  computed: {
    searchForms () {
      return [
        {
          name: '文章',
          label: '文章',
          ...this.searchFormItem
        },
        {
          name: '帖子',
          label: '帖子',
          ...this.searchFormItem
        }
      ]
    }
  },
  watch: {
    curTab (newVal) {
      if (newVal === 'list') {
      } else {
        // 离开列表页时设置restore为true
        this.restore = true
      }
    }
  },
  methods: {
    getPagedData (params) {
      console.log(params)
      this.loading = true
      setTimeout(() => {
        this.data = {
          rows: this.getRemoteMockData(params),
          total: 200
        }
        this.loading = false
      }, 1500)
    },
    // 模拟接口请求，并动态处理pageSize
    getRemoteMockData (params) {
      const { page, size, title, description, type } = params;
      return Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (page - 1) * size + index + 1,
          type: type || (rand > 0.5 ? '文章' : '帖子'),
          title: (title || '') + rand.toString(26).substring(2),
          description: (description || '') + rand.toString(34).substring(2) + rand.toString(32),
        }
      })
    }
  }
}
</script>