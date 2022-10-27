<template>
  <div>
    <p>
      <el-button @click="inputFocus">获取焦点</el-button>
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
        component: 'ElInput'
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