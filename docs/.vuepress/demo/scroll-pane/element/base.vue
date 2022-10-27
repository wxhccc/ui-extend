<template>
  <div>
    <el-switch v-model="hasTotal" active-text="有total" inactive-text="无total"></el-switch>
    <ue-scroll-pane class="demo-base" :loading="loading" :data="listData" v-bind="totalProps" :load="getApiData"
      style="height: 200px" :key="hasTotal">
      <template #default="{ data }">
        <ul class="list" style="margin: 0">
          <li v-for="item in data" :key="data.nick">
            <p>昵称：{{ item.nick }}</p>
            <p>描述：{{ item.description }}</p>
          </li>
        </ul>
      </template>
    </ue-scroll-pane>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { vwp } from '@wxhccc/ue-element'

export default defineComponent({
  setup() {
    const loading = ref(false)

    const state = reactive({
      hasTotal: false,
      listData: [],
      total: 0
    })

    const totalProps = computed(() => (state.hasTotal ? { total: state.total } : {}))

    const getApiData = async () => {
      const [, data] = await vwp(createMockData(), loading)
      state.total = data.total
      state.listData.push(...data.list)
    }
    const createMockData = () =>
      new Promise((resolve) => {
        const list = Array(8)
          .fill(0)
          .map(() => ({
            nick: Math.random().toString(33).substring(2),
            description: Math.random().toString(16).substring(2)
          }))
        window.setTimeout(() => resolve({ list, total: 10 }), 2000)
      })

    getApiData()

    return { loading, ...toRefs(state), totalProps, getApiData }
  }
})
</script>

<style>
.demo-base {
  margin-top: 20px;
  box-shadow: 0 0 4px #aeaeae inset;
}
</style>
