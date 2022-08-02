<template>
  <div>
    <p>
      配置项：<br/>
      <el-checkbox v-model="options.button">button</el-checkbox>
      <el-checkbox v-model="options.navbar">navbar</el-checkbox>
      <el-checkbox v-model="options.title">title</el-checkbox>
      <el-checkbox v-model="options.toolbar">toolbar</el-checkbox>
      <el-checkbox v-model="options.movable">movable</el-checkbox>
      <el-checkbox v-model="options.rotatable">rotatable</el-checkbox>
      <el-checkbox v-model="options.scalable">scalable</el-checkbox>
      <el-checkbox v-model="options.transition">transition</el-checkbox>
    </p>
    <el-row>
      <el-col :span="14" style="height: 280px;overflow:auto;">
        <ue-viewer ref="viewer" :imgs="imgs" :inline="true" :options="options" :active-index.sync="actIndex">
        </ue-viewer>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-button-group>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addImage">添加一张</el-button>
          <el-button type="primary" size="small" icon="el-icon-minus" :disabled="imgs.length <= 1" @click="reduceImage">添加一张</el-button>
        </el-button-group>
        <p>
          当前图片索引：<el-input-number size="small" :min="0" :max="imgs.length - 1" v-model="actIndex"></el-input-number>
        </p>
        <p>
          <el-button-group >
            <el-button type="primary" size="small" @click="callMethod('zoom', 0.5)">Zoom In</el-button>
            <el-button type="primary" size="small" @click="callMethod('zoom', -0.5)">Zoom Out</el-button>
          </el-button-group>
        </p>
        <p>
          <el-button-group>
            <el-button type="primary" size="small" @click="callMethod('rotate', -90)">Rotate Left</el-button>
            <el-button type="primary" size="small" @click="callMethod('rotate', 90)">Rotate Right</el-button>
          </el-button-group>
        </p>
        <p>
          <el-button-group>
            <el-button type="primary" size="small" @click="callMethod('prev')">Prev</el-button>
            <el-button type="primary" size="small" @click="callMethod('next')">Next</el-button>
            <el-button type="primary" size="small" @click="callMethod('play')">Play</el-button>
            <el-button type="primary" size="small" @click="callMethod('stop')">Stop</el-button>
          </el-button-group>
        </p>
        <p>
          <el-button-group>
            <el-button type="primary" size="small" @click="callMethod('reset')">Reset</el-button>
            <el-button type="primary" size="small" @click="callMethod('tooltip')">Tooltip</el-button>
          </el-button-group>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const images = {
  1: 'https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78461.jpg',
  2: 'https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78462.jpg',
  3: 'https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78463.jpg'
}
export default {
  data () {
    return {
      isReady: false,
      actIndex: 0,
      options: {
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        rotatable: true,
        scalable: true,
        transition: true
      },
      imgs: [images[1], images[2]]
    }
  },
  methods: {
    addImage () {
      const index = 1 + Math.floor(Math.random() * 3)
      this.imgs.push(images[index])
    },
    reduceImage () {
      this.imgs.splice(Math.floor(this.imgs.length * Math.random()), 1)
    },
    callMethod (fnName, ...args) {
      this.$refs.viewer[fnName](...args)
    }
  }
}
</script>