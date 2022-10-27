<template>
  <ue-form-btns
    is-cancel
    :submit="submitHandler"
    :cancel="cancelHandler"
    :btn-props="btnProps"
  >
  </ue-form-btns>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      btnProps: { size: 'small' }
    }
  },
  methods: {
    submitHandler () {
      console.log('submit')
    },
    cancelHandler () {
      console.log('cancel')
    }
  }
})
</script>