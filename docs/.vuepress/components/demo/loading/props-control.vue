<template>
  <div>
    <p>是否添加到body：<el-switch v-model="appendToBody" active-text="是" inactive-text="否"></el-switch></p>
    <p v-if="appendToBody">是否锁滚动：<el-switch v-model="lock" active-text="是" inactive-text="否"></el-switch></p>
    <el-button @click="loadingHandle">加载</el-button>
    <br/><br/>
    <ue-loading v-if="loading" :body="appendToBody" :lock="appendToBody && lock" background="rgba(0,0,0,0.6)" text="加载中..."></ue-loading>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      lock: false,
      appendToBody: false
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