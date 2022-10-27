<template>
  <div>
    <ue-search-input v-model="input" placeholder="输入内容后按回车或点击搜索"></ue-search-input>
    {{input || '--'}}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      input: ''
    }
  }
})
</script>