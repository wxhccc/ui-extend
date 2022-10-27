<template>
  <div>
    <el-form ref="form" :model="formData">
      <el-form-item required prop="value">
        <el-input v-model="formData.value"></el-input>
      </el-form-item>
    </el-form>
    <ue-form-btns
      :sending="sending"
      :form="form"
      submit-confirm
      :submit="submitHandler"
      :texts="texts"
    >
    </ue-form-btns>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const form = ref()
    const sending = ref(false)
    const formData = ref({ value: '' })
    const texts = {
      sureBtn: '保存',
      sending: '保存中。。。',
      confirmWord: '保存后会覆盖之前数据，确认操作？'
    }
    const submitHandler = () => {
      apiFetchMock()
    }
    const apiFetchMock = () => {
      sending.value = true
      window.setTimeout(() => {
        sending.value = false
      }, 2000)
    }
    return {
      sending,
      formData,
      texts,
      form,
      submitHandler
    }
  }
})
</script>