<template>
  <div>
    <el-switch v-model="hasRight" active-text="不隐藏" inactive-text="隐藏按钮"></el-switch>
    <br/><br/>
    <el-input size="small" v-if="data.isEdit" v-model="data.value" ></el-input>
    <br/><br/>
    <ue-action-btns :data="data" :btns="btns" :loadingFlags="data"></ue-action-btns>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hasRight: true,
      data: { isEdit: false, value: '' }
    }
  },
  computed: {
    btns () {
      const { hasRight } = this
      return [
        {
          props: { size: 'small' },
          text: 'view',
          click (data, btn) { console.log(data, btn) }
        },
        {
          btype: 'primary',
          loadingKey: 'infoSend',
          text: (loading, item, data) => {
            if (loading) return 'saveing...'
            return !data.isEdit ? 'edit' : 'save'
          },
          click: this.editHandle
        },
        {
          props: { size: 'small' },
          btype: 'danger',
          text: 'delete',
          hide: () => (!this.hasRight),
          isConfirm: true,
          confirmMsg: () => ('删除后无法恢复，确定要删除'),
          click () {
            // todo
          }
        }
      ]
    }
  },
  methods: {
    editHandle (data, btn) {
      console.log(data)
      // 切换到编辑模式
      if (!data.isEdit) {
        data.isEdit = !data.isEdit
      } else {
        // 模拟接口提交
        data.infoSend = true
        window.setTimeout(() => {
          // send
          data.infoSend = false
          data.isEdit = !data.isEdit
        }, 2000)
      }
    }
  }
}
</script>