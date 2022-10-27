<template>
  <div>
    {{ value }}
    <ue-common-field v-bind="inputField" v-model="value.input">
    </ue-common-field>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      value: {
        input: 12312
      },
      inputField: {
        component: 'AInput',
        isNumber: true
      }
    }
  }
})
</script>