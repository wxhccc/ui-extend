<script setup lang="ts">
import { ref } from 'vue'
import { Ticker as UeTicker } from './index'

const pagedData = ref({ rows: [], total: 0 })
const value = ref([])
</script>

<template>
  <div>
    {{ value }}
    <div style="width: 600px; height: 300px">
      <ue-ticker :duration="5"></ue-ticker>
    </div>
  </div>
</template>
