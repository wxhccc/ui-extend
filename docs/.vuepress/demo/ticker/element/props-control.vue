<template>
  <div>
    <p>总时间(s): <el-input-number v-model.number="props.duration" :min="0"></el-input-number>
    </p>
    <p style="tex">
      <span>间隔时间(s): </span>
      <el-slider style="display: inline-block; margin-left: 20px;width: 80%; vertical-align: middle;" :min="0"
        :step="0.01" :max="props.duration / 10" v-model="props.interval"></el-slider>
    </p>
    <ue-ticker v-bind="props" :key="`${props.duration}-${props.interval}`"></ue-ticker>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const props = ref({
      duration: 10,
      interval: 0.01
    })

    return { props }
  }
})
</script>