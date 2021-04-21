// <template>
//   <span class="ue-ticker">
//     {{text}}<slot></slot>
//   </span>
// </template>

import { computed, defineComponent, h, mergeProps, onBeforeUnmount, onMounted, ref } from 'vue'

export interface Props {
  duration?: number,
  interval?: number
}

export default defineComponent({
  name: 'UeTicker',
  props: {
    duration: {
      type: Number,
      default: 60
    },
    interval: {
      type: Number,
      default: 1
    }
  },
  emits: ['on-timeout'],
  setup(props, { attrs, slots, emit }) {
    let ticker = 0
    const durationMil = ref(props.duration > 0 ? props.duration * 1000 : 0)

    const tickerInterval = computed(() => props.interval ? props.interval * 1000 : 1000)
    const text = computed(() => {
      const duraSec = durationMil.value / 1000
      return `${durationMil.value % 1000 === 0 ? duraSec : duraSec.toFixed(1)}s`
    })

    const destroyTicker = () => clearInterval(ticker)


    onMounted(() => {
      ticker = window.setInterval(() => {
        durationMil.value -= tickerInterval.value
        if (durationMil.value <= 0) {
          emit('on-timeout')
          destroyTicker()
        }
      }, tickerInterval.value);
    })

    onBeforeUnmount(destroyTicker)

    return () => h('span', mergeProps({ class: 'ue-ticker' }, attrs), [text.value, slots.default && slots?.default()])
  }
})

//   computed: {

//     tickerInterval () {
//       return this.interval ? this.interval * 1000 : 1000;
//     }
//   },
//   mounted () {
//     this.$ticker = this.createTicker();
//   },
//   beforeDestroy () {
//     this.destroyTicker();
//   },
//   methods: {


//   }
// })
