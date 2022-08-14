<script setup lang="ts">
import { ref } from 'vue'
import { TreeTransfer as UeTreeTransfer } from './index'

const pagedData = ref({ rows: [], total: 0 })
const value = ref([1, 2])
const data = [
    {
      id: 1,
      label: 'language',
      children: [
        {
          id: 2,
          label: 'english',
          children: []
        },
        {
          id: 3,
          label: 'chinese',
          children: []
        }
      ]
    }
  ]
</script>

<template>
  <div>
    {{ value }}
    <div style="width: 600px; height: 300px">
      <ue-tree-transfer v-model="value" :data="data"></ue-tree-transfer>
    </div>
  </div>
</template>
