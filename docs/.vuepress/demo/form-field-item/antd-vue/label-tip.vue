<template>
  <div>
    <ue-form-field-item v-bind="inputItem" v-model="age"></ue-form-field-item>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const age = ref('')

    const inputItem = {
      name: 'age',
      props: {
        label: '年龄'
      },
      labelTip: '年龄是从出生到现在的年数',
      field: {
        isNumber: true,
        component: 'AInput',
        props: {
          placeholder: '请输入年龄'
        }
      }
    }
    return { age, inputItem }
  }
})
</script>