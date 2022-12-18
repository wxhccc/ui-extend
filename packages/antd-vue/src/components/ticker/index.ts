import { defineComponent, h, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { createRAFTimer } from '@wxhccc/es-util'
import { vueTypeProp } from '@wxhccc/ue-shared'

export interface TickerProps {
  /** 总时间，单位s，必须为正数 */
  duration?: number
  /** 更新间隔，单位s，必须为正数 */
  interval?: number
  /** 显示数字的小数的精度，默认为1，如果间隔为整数秒，则不受此字段影响 */
  precision?: number
}

const tickerTimer = createRAFTimer({ autoStartWhenAddTask: true, autoStopWhenNoTask: false })

export default defineComponent({
  name: 'UeTicker',
  props: {
    duration: vueTypeProp<number>(Number, 60),
    interval: vueTypeProp<number>(Number, 1),
    precision: vueTypeProp<number>(Number, 1)
  },
  emits: ['timeout'],
  setup(props, { emit, slots }) {
    const durationMil = ref(props.duration > 0 ? props.duration * 1000 : 0)
    let lastTime = 0

    const text = computed(() => {
      const duraSec = durationMil.value / 1000
      const isSecond = tickerInterval.value % 1000 === 0
      return `${isSecond ? Math.round(duraSec) : duraSec.toFixed(props.precision)}s`
    })

    const tickerInterval = computed(() => (props.interval ? props.interval * 1000 : 1000))

    const updateText = () => {
      const trueInterval = +new Date() - lastTime
      lastTime = +new Date()
      const interval =
        trueInterval > 1.5 * tickerInterval.value ? trueInterval : tickerInterval.value
      const newValue = durationMil.value - interval
      durationMil.value = newValue >= 0 ? newValue : 0
      if (durationMil.value === 0) {
        emit('timeout')
        tickerTimer.removeTask(updateText)
      }
    }
    const createTicker = () => {
      lastTime = +new Date()
      tickerTimer.addTask(updateText, tickerInterval.value)
    }

    onMounted(createTicker)

    onBeforeUnmount(() => tickerTimer.removeTask(updateText))

    return () =>
      h('span', { class: 'ue-ticker' }, [text.value, slots.default ? slots.default() : null])
  }
})