<script lang="ts">
import { defineComponent } from 'vue'
import { UeAlert } from '@/ui-comps'
import { vueTypeProp } from '@wxhccc/ue-shared'

export interface AlertItem {
  title: string
  description?: string | string[]
}

export default defineComponent({
  name: 'UeMultiAlert',
  components: {
    UeAlert
  },
  props: {
    data: vueTypeProp<AlertItem[]>(Array, () => [])
  }
})
</script>
<template>
  <ue-alert
    v-if="Array.isArray(data) && data.length"
    class="ue-multi-alert"
    :message="data[0].title"
  >
    <template #description>
      <div v-for="(item, index) in data" :key="index" class="alert-item-module">
        <span v-if="index !== 0" class="ant-alert-message">{{ item.title }}</span>
        <ul v-if="Array.isArray(item.description)" class="desc-list">
          <li v-for="(descItem, dindex) in item.description" :key="'s' + dindex" class="single-desc">
            {{ descItem }}
          </li>
        </ul>
        <p v-else class="single-desc">{{ item.description }}</p>
      </div>
    </template>
  </ue-alert>
</template>

<style lang="scss">
.ue-multi-alert {
  .alert-item-module {
    padding-top: 0.4em;
  }
  .single-desc {
    margin: 0;
  }
  .desc-list {
    margin: 0.2em 0;
    line-height: 1.4;
  }
}
</style>
