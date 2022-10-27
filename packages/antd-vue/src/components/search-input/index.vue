<script setup lang="ts">
import { ref } from 'vue'
import { useIgnoreWatch } from '@wxhccc/ue-shared'
import { UeInput } from '@/ui-comps'

const { Search: UeSearchInput } = UeInput

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string): void
  (e: 'search'): void
}>()

const tempValue = ref(props.modelValue)

const { ignoreWatch } = useIgnoreWatch(
  () => props.modelValue,
  () => {
    tempValue.value = props.modelValue
  }
)

const setValue = () => {
  ignoreWatch.value = true
  emit('update:modelValue', tempValue.value)
  emit('search')
}
</script>
<script lang="ts">
export default { name: 'UeSearchInput' }
</script>

<template>
  <ue-search-input v-bind="$attrs" v-model:value="tempValue" class="ue-search-input" @search="setValue"></ue-search-input>
</template>

