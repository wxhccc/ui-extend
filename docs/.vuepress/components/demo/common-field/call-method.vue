<template>
  <div>
    <p><el-button size="small" @click="inputFocus">获取焦点</el-button></p>
    <ue-common-field ref="input" v-bind="inputField" v-model="inputValue">
    </ue-common-field>
  </div>
</template>

<script>

export default {
  data () {
    return {
      inputValue: '',
      inputField: {
        component: 'ElInput',
        props: { size: 'small' }
      }
    }
  },
  methods: {
    inputFocus () {
      this.$refs.input.callFieldMethod('focus');
    }
  }
}
</script>