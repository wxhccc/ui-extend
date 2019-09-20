<template>
  <ue-input
    class="ue-search-input"
    v-bind="$attrs"
    v-model="tempValue"
    v-on="listeners"
    @keyup.enter.native="setValue"
  >
    <template #append>
      <ue-button plain v-bind="handledBtnProps" @click="setValue" :loading="loading"></ue-button>
    </template>
  </ue-input>
</template>

<script>
import { Input, Button } from 'UE/ui-comps';

export default {
  name: 'UeSearchInput',
  components: {
    'UeInput': Input,
    'UeButton': Button
  },
  props: {
    value: [String, Number],
    btnProps: Object,
    loading: Boolean
  },
  data() {
    return {
      tempValue: this.value
    }
  },
  computed: {
    handledBtnProps () {
      return Object.assign({ size: this.$attrs.size, icon: 'el-icon-search' }, this.btnProps);
    },
    listeners () {
      delete this.$listeners.input;
      return this.$listeners;
    }
  },
  methods: {
    setValue() {
      this.$emit('input', this.tempValue);
    }
  }
}
</script>

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
