<template>
  <div>
    <el-switch v-model="hasRight" active-text="不隐藏" inactive-text="隐藏按钮"></el-switch>
    <br /><br />
    <el-input v-if="data.isEdit" v-model="data.value"></el-input>
    <br /><br />
    <ue-action-btns :data="data" :btns="btns" :loading-flags="data"></ue-action-btns>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue'

export default defineComponent({
  setup() {
    const hasRight = ref(true)
    const data = reactive({ isEdit: false, value: '' })

    const btns = computed(() => {
      return [
        {
          text: 'view',
          click: (data, btn) => { console.log(data, btn) }
        },
        {
          btype: 'primary',
          loadingKey: 'infoSend',
          text: (data) => (!data.isEdit ? 'edit' : 'save'),
          loadingText: 'saveing...',
          click: editHandle
        },
        {
          props: { size: 'small' },
          btype: 'danger',
          text: 'delete',
          hide: () => (!hasRight.value),
          isConfirm: true,
          confirmMsg: () => ('删除后无法恢复，确定要删除'),
          click() {
            // todo
          }
        }
      ]
    })
    const editHandle = (data, btn) => {
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

    return { hasRight, data, btns }
  }
})
</script>