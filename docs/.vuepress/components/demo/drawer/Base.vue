<template>
  <div>
    <el-button type="primary" @click="showDrawer">弹出</el-button>
    <ue-drawer :visible.sync="visible" container="body" title="早发白帝城">
      <div style="padding: 0 20px;">
        <p>朝辞白帝彩云间，</p>
        <p>千里江陵一日还。</p>
        <p>两岸猿声啼不住，</p>
        <p>轻舟已过万重山。</p>
      </div>
      <div slot="footer" style="padding: 10px 20px;border-top: 1px solid #eaeaea;">
        <el-button>确定</el-button>
      </div>
    </ue-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    }
  }
}
</script>