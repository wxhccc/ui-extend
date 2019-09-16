<template>
  <div>
    <el-button @click="loadingHandle">加载</el-button>
    <ue-loading v-if="loading"></ue-loading>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    loadingHandle () {
      this.loading = true
      window.setTimeout(() => {
        this.loading = false
      }, 2000)
    }
  }
}
</script>