<template>
  <div>
    {{value}}
    <ue-common-field :field="inputField" v-model="value.input">
    </ue-common-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: {
        input: 12312
      },
      inputField: {
        component: 'ElInput',
        props: { size: 'small' },
        isNumber: true
      }
    }
  }
}
</script>