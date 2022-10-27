<template>
  <div>
    <p>
      <a-button @click="inputFocus">获取焦点</a-button>
    </p>
    <ue-common-field ref="input" v-bind="inputField" v-model="inputValue">
    </ue-common-field>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      inputValue: '',
      inputField: {
        component: 'AInput'
      }
    }
  },
  methods: {
    inputFocus() {
      this.$refs.input.callFieldMethod('focus');
    }
  }
})
</script>