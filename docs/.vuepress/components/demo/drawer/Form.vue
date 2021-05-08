<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showDrawer">新增</el-button>
    <ue-drawer :visible.sync="visible" container="body" title="早发白帝城">
      <el-form ref="form" :model="fromData">
        
      </el-form>
      <div slot="footer" style="padding: 10px 20px;border-top: 1px solid #eaeaea;">
        <ue-form-btns
          :parent-refs="$refs"
          is-validate
          is-cancel
        >
        </ue-form-btns>
      </div>
    </ue-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      fromData: {
        name: '',
        sentences: []
      }
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    }
  }
}
</script>