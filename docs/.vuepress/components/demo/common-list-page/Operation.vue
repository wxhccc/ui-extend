<template>
  <ue-common-list-page
    :loading="loading"
    :columns="columns"
    :paged-data="data"
    :operation="operation"
    :selection-value.sync="selectionValue"
    :get-paged-data="getPagedData"
    height="300"
    :extra-form="extraForm"
    :init-data="{ pageSize: 10 }"
    created-auto-send
  >
  </ue-common-list-page>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      loading: false,
      columns: [
        { key: 'selection', selection: 'checkbox' },
        { prop: 'id', label: 'Id' },
        { prop: 'type', label: '类型' },
        { prop: 'title', label: '标题' },
        { prop: 'description', label: '描述' }
      ],
      extraForm: { title: '' },
      selectionValue: [],
      opeLoadings: {
        delete: false
      },
      data: {}
    }
  },
  computed: {
    operation () {
      return {
        lockKeys: this.opeLoadings,
        items: [
          {
            text: '新增',
            events: {
              click () { console.log('新增') }
            }
          },
          {
            lockingKey: 'delete',
            props: {
              type: 'danger'
            },
            text: '删除选中项',
            events: {
              click: this.deleteChoose
            }
          },
          {
            component: 'UeSearchInput',
            props: {
              placeholder: '请输入标题搜索',
              value: this.extraForm.title
            },
            events: {
              input: (value) => {
                value !== this.extraForm.title && (this.extraForm.title = value)
              }
            }
          }
        ]
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
    },
    deleteChoose () {
      this.$confirm(`你确定要删除id为${this.selectionValue.join(',')}的记录么？`, '提示').then(() => {
        this.opeLoadings.delete = true
        window.setTimeout(() => {
          this.$message('删除成功')
          this.opeLoadings.delete = false
        }, 2000)
      }).catch(() => {})
    }
  }
}
</script>