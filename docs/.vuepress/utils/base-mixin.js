const { versionCompare } = require('./versions')
export default {
  data () {
    return {
      UEGLOBAL: {
        elemReady: false
      }
    }
  },
  computed: {
    $componentName () {
      const { path } = this.$route
      return path.indexOf('/component/') >= 0 ? path.split('/').pop().split('.').shift() : ''
    }
  },
  methods: {
    versionCompare
  }
}