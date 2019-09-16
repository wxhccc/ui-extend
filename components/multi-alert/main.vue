<template>
  <ue-alert
    v-if="Array.isArray(data) && data.length"
    class="ue-multi-alert"
    v-bind="$attrs"
    v-on="$listeners"
    description=""
    :title="data[0].title"
  >
    <div v-for="(item, index) in data" class="alert-item-module" :key="index">
      <span v-if="index !== 0" class="el-alert__title is-bold">{{item.title}}</span>
      <ul v-if="Array.isArray(item.description)" class="desc-list">
        <li v-for="(descItem, dindex) in item.description" class="single-desc" :key="'s' + dindex">{{descItem}}</li>
      </ul>
      <p v-else class="single-desc">{{item.description}}</p>
    </div>
  </ue-alert>
</template>

<script>
import { Alert } from 'UE/ui-comps'

export default {
  name: 'UeMultiAlert',
  components: {
    'UeAlert': Alert
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" >
.ue-multi-alert {
  .alert-item-module {
    padding-top: .4em;
  }
  .single-desc {
    margin: 0;
  }
  .desc-list {
    margin: .2em 0;
    line-height: 1.4;
  }
}
</style>
