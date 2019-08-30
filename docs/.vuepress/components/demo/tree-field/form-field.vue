<template>
  <el-form ref="form" :model="formData" label-width="60px" v-loading="loading" element-loading-text="数据获取中。。。">
    <p>
      <el-button size="small" @click="getApiData">获取回填数据</el-button>
      <el-button size="small" @click="isEditing = !isEditing">{{ isEditing ? '只读' : '编辑'}}</el-button>
    </p>
    <el-form-item label="名称" prop="name" required>
      <el-input v-if="isEditing" v-model="formData.name"></el-input>
      <span v-else>{{formData.name}}</span>
    </el-form-item>
    <el-form-item label="权限" prop="rightIds" required>
      <ue-tree-field inline v-model="formData.rightIds" :data="data" :readonly="!isEditing"></ue-tree-field>
    </el-form-item>
    <ue-form-btns
      :parent-refs="$refs"
      is-validate
    >
    </ue-form-btns>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      isEditing: true,
      formData: {
        name: '',
        rightIds: []
      },
      data: [{
        label: '一级 1',
        id: 1,
        children: [{
          label: '二级 1-1',
          id: 11,
          children: [{
            id: 111,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        id: 2,
        children: [{
          id: 21,
          label: '二级 2-1',
          children: [{
            id: 211,
            label: '三级 2-1-1'
          }]
        }, {
          id: 22,
          label: '二级 2-2',
          children: [{
            id: 221,
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        id: 3,
        children: [{
          id: 31,
          label: '二级 3-1',
          children: [{
            id: 311,
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          id: 32,
          children: [{
            id: 321,
            label: '三级 3-2-1'
          }]
        }]
      }]
    }
  },
  methods: {
    getApiData () {
      this.loading = true
      window.setTimeout(() => {
        this.formData = { name: '管理员', rightIds: [ 1, 11, 111, 2, 21, 211, 22, 221 ] }
        this.loading = false
      }, 2000)
    }
  }
}
</script>