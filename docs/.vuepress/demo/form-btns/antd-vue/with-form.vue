<template>
  <a-form ref="form" :model="formData">
    <a-form-item label="姓名:" required prop="value">
      <a-input v-model:value="formData.value"></a-input>
    </a-form-item>
    <a-form-item>
      <ue-form-btns
        :form="form"
        is-validate
        :btn-keys="btnKeys"
        :submit="submitHandler"
      >
      </ue-form-btns>
    </a-form-item>
  </a-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const form = ref()
    const formData = ref({ value: '' })
    const btnKeys = ['reset', 'submit']

    const submitHandler = () => {
      console.log('submit')
    }
    return {
      form,
      formData,
      btnKeys,
      submitHandler
    }
  }
})
</script>