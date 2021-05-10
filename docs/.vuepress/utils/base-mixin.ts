import { defineComponent } from 'vue'
import { versionCompare } from './versions'

export default defineComponent({
  data () {
    return {
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
})
