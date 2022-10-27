<template>
  <ue-info-table bordered :cells="cells" :data="data"></ue-info-table>
</template>

<script>
import { defineComponent, ref, h } from 'vue'
import { ElIcon } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'

const TimerIcon = {
  setup() {
    return () => h(ElIcon, null, { default: () => h(Timer) })
  }
}

export default defineComponent({
  setup() {
    const cells = [
      // 使用vnode自定义label，用icon配置图标
      { prop: 'date', label: () => h('span', { style: { color: 'red' } }, '日期'), icon: TimerIcon },
      // 使用link来配置内容链接
      { prop: 'name', label: '姓名', link: 'https://github.com/wxhccc' },
      // 内容是图片
      { prop: 'avatar', label: '图像', isImage: true },
      // 内容脱敏
      { prop: 'telphone', label: '联系方式', isSecret: true },
      // 内容可复制
      { prop: 'address', label: '地址', canCopy: true }
    ]
    const data = ref({
      date: '2016-05-02',
      name: '王小虎',
      avatar: 'https://avatars.githubusercontent.com/u/19343220?s=40&v=4',
      telphone: '12345678901',
      address: '上海市普陀区金沙江路 1518 弄'
    })
    return { cells, data }
  }
})
</script>