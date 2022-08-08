<script setup lang="ts">
import { ref } from 'vue'
import { TreeNodeData } from './components/tree-transfer'
import { TreeTransfer } from './index'

const pagedData = ref({ rows: [], total: 0 })
const value = ref([])
const data: TreeNodeData[] = []
</script>

<template>
  <div>
    {{ value }}
    <div style="width: 600px; height: 300px">
      <tree-transfer
        v-model="value"
        :data="data"
        show-filter
        :button-trigger="false"
      ></tree-transfer>
    </div>
  </div>
</template>
