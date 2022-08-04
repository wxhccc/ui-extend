<script setup lang="ts">
import { ref } from 'vue'
import { PagedList } from './index'

const pagedData = ref({ rows: [], total: 0 })
</script>

<template>
  <div>
    <paged-list :paged-data="pagedData"></paged-list>
  </div>
</template>
