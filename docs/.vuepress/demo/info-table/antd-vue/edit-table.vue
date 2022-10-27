<template>
  <div>
    <a-radio-group v-model:value="editMode">
      <a-radio value="">仅展示</a-radio>
      <a-radio value="manual">手动切换</a-radio>
      <a-radio value="alaways">直接编辑</a-radio>
    </a-radio-group>
    <p>data: --- {{ data }}</p>
    <p>value: --- {{ formData }}</p>
    <a-form ref="form" :model="formData">
      <ue-info-table bordered :edit-mode="editMode" :cells="cells" :data="data" v-model="formData"></ue-info-table>
      <ue-form-btns v-if="editMode" is-cancel :sending="sending" :form="form" is-validate :submit="infoSubmit"
        :cancel="cancelEdit">
      </ue-form-btns>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { createFFIRulesProps, createInputFormItem } from '@wxhccc/ue-antd-vue'

export default defineComponent({
  setup() {
    const form = ref()
    const editMode = ref('')
    const sending = ref(false)

    const cells = [
      {
        prop: 'date', label: '日期', props: { span: 12 },
        canEdit: true,
        formItem: {
          field: {
            component: 'ADatePicker',
            props: {
              valueFormat: 'YYYY-MM-DD',
              placeholder: '请选择日期'
            }
          }
        }
      },
      {
        prop: 'name',
        label: '姓名',
        props: { span: 12 },
        canEdit: true,
        formItem: createInputFormItem(createFFIRulesProps('', '请输入姓名'), '', '请选择姓名')
      },
      {
        prop: 'address',
        label: '地址',
        formItem: createInputFormItem('', '', '请选择姓名')
      }
    ]
    const data = ref({
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    })

    const formData = ref()

    const cancelEdit = () => editMode.value = undefined

    const infoSubmit = () => {
      sending.value = true
      window.setTimeout(() => {
        data.value = { ...data.value, ...formData.value }
        cancelEdit()
        sending.value = false
      }, 1000)
    }
    return { form, editMode, sending, cells, data, formData, cancelEdit, infoSubmit }
  }
})
</script>