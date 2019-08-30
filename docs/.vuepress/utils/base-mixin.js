export default {
  computed: {
    $componentName () {
      const { path } = this.$route
      return path.indexOf('/component/') >= 0 ? path.split('/').pop() : ''
    }
  },
  methods: {
    versionCompare (origin, target) {
      const oriVerNums = origin.split('.')
      const targVerNums = target.split('.')
      let result = 0
      oriVerNums.some((num, index) => {
        if(num - targVerNums[index] !== 0) {
          result = num - targVerNums[index] > 0 ? 1 : -1
          return true
        }
      })
      return result
    }
  }
}