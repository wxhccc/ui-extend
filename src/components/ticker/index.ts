import { defineComponent, h, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { createRAFTimer } from '@wxhccc/es-util'
import { vueTypeProp } from '@/utils/component'

export interface TickerProps {
  /** 总时间，单位s，必须为正数 */
  duration?: number
  /** 更新间隔，单位s，必须为正数 */
  interval?: number
}

const timer = createRAFTimer({ autoStartWhenAddTask: true, autoStopWhenNoTask: false })

export default defineComponent({
  name: 'UeTicker',
  props: {
    duration: vueTypeProp<number>(Number, 60),
    interval: vueTypeProp<number>(Number, 1)
  },
  emits: ['on-timeout'],
  setup(props, { emit, slots }) {
    const durationMil = ref(props.duration > 0 ? props.duration * 1000 : 0)

    const text = computed(() => {
      const duraSec = durationMil.value / 1000
      return `${durationMil.value % 1000 === 0 ? duraSec : duraSec.toFixed(1)}s`
    })

    const tickerInterval = computed(() => (props.interval ? props.interval * 1000 : 1000))

    const updateText = () => {
      durationMil.value -= tickerInterval.value
      if (durationMil.value) {
        emit('on-timeout')
        timer.removeTask(updateText)
      }
    }
    const createTicker = () => {
      timer.addTask(updateText, tickerInterval.value)
    }

    onMounted(createTicker)

    onBeforeUnmount(() => timer.removeTask(updateText))

    return () =>
      h('span', { class: 'ue-ticker' }, [text.value, slots.default ? slots.default() : null])
  }
})
