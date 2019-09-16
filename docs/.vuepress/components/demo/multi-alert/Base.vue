<template>
  <ue-multi-alert :data="data"></ue-multi-alert>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          title: '什么是ES?',
          description: 'ECMAScript 6.0(以下简称 ES6)是 JavaScript 语言的下一代标准'
        },
        {
          title: 'ES常用特性',
          description: [
            'let, const命令',
            'Class类和继承',
            'Module语法'
          ]
        }
      ]
    }
  }
}
</script>