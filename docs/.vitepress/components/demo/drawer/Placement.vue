<template>
  <div>
    <el-radio-group v-model="placement">
      <el-radio label="top"></el-radio>
      <el-radio label="right"></el-radio>
      <el-radio label="bottom"></el-radio>
      <el-radio label="left"></el-radio>
    </el-radio-group>
    <el-button style="margin-left: 40px;" type="primary" @click="showDrawer">弹出</el-button>
    <ue-drawer :visible.sync="visible" :placement="placement" container="body" title="早发白帝城">
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
      placement: 'right'
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    }
  }
}
</script>