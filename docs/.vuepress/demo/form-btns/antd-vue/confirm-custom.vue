<template>
  <div>
    <a-form ref="form" :model="formData">
      <a-form-item required prop="value">
        <a-input v-model:value="formData.value"></a-input>
      </a-form-item>
    </a-form>
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