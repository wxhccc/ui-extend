<template>
  <ue-multi-alert :data="data" v-bind="props" @close="closeHandle"></ue-multi-alert>
</template>

<script>
export default {
  data () {
    return {
      props: {
        type: 'success',
        showIcon: true,
        center: true
      },
      data: [
        {
          title: '什么是ES?',
          description: 'ECMAScript 6.0(以下简称 ES6)是 JavaScript 语言的下一代标准'
        }
      ]
    }
  },
  methods: {
    closeHandle () {
      console.log('closed')
    }
  }
}
</script>