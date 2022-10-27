<template>
  <div :style="{ height: '400px' }">
    <ue-common-list-page
      v-model:selection-value="selectionValue"
      v-model:search-params="searchParams"
      :loading="loading"
      :columns="columns"
      :paged-data="pagedData"
      :operation="operation"
      :get-paged-data="getPagedData"
      created-auto-send
    >
    </ue-common-list-page>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { SearchInput, vwp } from '@wxhccc/ue-element'

export default defineComponent({
  setup () {
    const loading = ref(false)
    const columns = [
      { key: 'selection', selection: 'checkbox' },
      { prop: 'id', label: 'Id' },
      { prop: 'type', label: '类型' },
      { prop: 'title', label: '标题' },
      { prop: 'description', label: '描述' }
    ]
    const searchParams = ref({ title: '' })
    const selectionValue = ref([])
    const opeLoadings = ref({ delete: false })
    const pagedData = ref({ rows: [], total: 0 })

    const operation = computed(() => {
      return {
        loadings: opeLoadings.value,
        items: [
          {
            text: '新增',
            onClick: () => { console.log('新增') }
          },
          {
            lockingKey: 'delete',
            props: {
              type: 'danger'
            },
            text: '删除选中项',
            onClick: deleteChoose
          },
          {
            component: SearchInput,
            props: {
              placeholder: '请输入标题搜索',
              moduleValue: searchParams.value.title,
              'onUpdate:modelValue': (value) => (searchParams.value.title = value)
            }
          }
        ]
      }
    })

    const getPagedData = async (params) => {
      console.log(params)
      const [, data] = await vwp(getRemoteMockData(params), loading)
      pagedData.value = data
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

    const deleteChoose = () => {
      if (!selectionValue.value.length) {
        ElMessage.warning('请先选择记录')
        return
      }
      ElMessageBox.confirm(`你确定要删除id为${selectionValue.value.join(',')}的记录么？`, '提示').then(() => {
        opeLoadings.value.delete = true
        window.setTimeout(() => {
          ElMessage.success('删除成功')
          opeLoadings.value.delete = false
        }, 2000)
      }).catch(() => {})
    }

    return {
      loading,
      columns,
      searchParams,
      selectionValue,
      opeLoadings,
      pagedData,
      operation,
      getPagedData,
      deleteChoose
    }
  }
})
</script>