<template>
  <el-form ref="form" :model="formData" size="small">
    <el-form-item label="姓名:" required prop="value">
      <el-input v-model="formData.value"></el-input>
    </el-form-item>
    <el-form-item>
      <ue-form-btns
        :form="form"
        is-validate
        :btn-keys="btnKeys"
        :submit="submitHandler"
      >
      </ue-form-btns>
    </el-form-item>
  </el-form>
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