<template>
  <div>
    <ue-search-input v-model="input" placeholder="输入内容后按回车或点击搜索"></ue-search-input>
    {{input || '--'}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>