<template>
  <div>
    current-search-params: {{searchParams}}
    <ue-common-list-page
      :loading="loading"
      :columns="columns"
      :paged-data="data"
      :search-forms="searchForms"
      :get-paged-data="getPagedData"
      :export-url="exportUrl"
      :current-search-params.sync="searchParams"
      height="300"
      :init-data="{ pageSize: 10 }"
      created-auto-send
    >
    </ue-common-list-page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      columns: [
        { prop: 'id', label: 'Id' },
        { prop: 'type', label: '类型' },
        { prop: 'title', label: '标题' },
        { prop: 'description', label: '描述' }
      ],
      searchForms: {
        size: 'small',
        labelWidth: '80px',
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
            prop: 'type',
            props: {
              label: '类型'
            },
            field: {
              component: 'ElSelect',
              data: [
                { value: '文章', label: '文章' },
                { value: '帖子', label: '帖子' }
              ]
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
      searchParams: {},
      data: {}
    }
  },
  computed: {
    exportUrl () {
      const { searchParams } = this;
      return 'http://www.xxxxxx.com/aaa?' + Object.keys(searchParams).map(key => (`${key}=${searchParams[key]}`)).join('&')
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