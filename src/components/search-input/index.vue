<script setup lang="ts">
import { ref } from 'vue'
import { UeInput, UeButton, UeButtonProps } from '@/ui-comps'
import { SearchOutlined } from '@/ui-comps/icons'
import { useIgnoreWatch } from '@/hooks/props'

const props = defineProps<{
  modelValue?: string
  loading?: boolean
  btnProps?: UeButtonProps
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string): void
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
}
</script>
<script lang="ts">
export default { name: 'UeSearchInput' }
</script>

<template>
  <ue-input v-bind="$attrs" v-model="tempValue" class="ue-search-input" @keyup.enter="setValue">
    <template #append>
      <ue-button plain v-bind="btnProps" :loading="loading" @click="setValue">
        <search-outlined></search-outlined>
      </ue-button>
    </template>
  </ue-input>
</template>

<style lang="scss">
.ue-search-input {
  .el-input-group__append {
    padding: 0 12px;
    text-align: center;
    overflow: hidden;
    border-left: none;
    background-color: #ffffff;
  }
}
</style>
