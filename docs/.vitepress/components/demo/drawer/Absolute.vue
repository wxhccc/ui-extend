<template>
  <div class="demo-ue-drawer-relative-pane">
    <el-button style="margin-left: 40px;" type="primary" @click="showDrawer">弹出</el-button>
    <ue-drawer :visible.sync="visible" container="" title="早发白帝城">
      <div style="padding: 0 20px;">
        <p>朝辞白帝彩云间，</p>
        <p>千里江陵一日还。</p>
        <p>两岸猿声啼不住，</p>
        <p>轻舟已过万重山。</p>
      </div>
    </ue-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    }
  }
}
</script>

<style>
.demo-ue-drawer-relative-pane {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}
</style>
