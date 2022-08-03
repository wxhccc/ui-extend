import {
  defineComponent,
  shallowRef,
  onBeforeUnmount,
  getCurrentInstance,
  App,
  ExtractPropTypes,
  onMounted
} from 'vue'
import { ElLoading } from 'element-plus'
import { vueTypeProp } from '@/utils/component'

const compProps = {
  body: vueTypeProp<boolean>(Boolean),
  text: vueTypeProp<string>(String),
  spinner: vueTypeProp<string>(String),
  lock: vueTypeProp<boolean>(Boolean),
  background: vueTypeProp<string>(String)
}

export type LoadingProps = Partial<ExtractPropTypes<typeof compProps>>

const Loading = defineComponent({
  name: 'UeLoading',
  props: compProps,
  setup(props) {
    const service = shallowRef()

    const createService = () => {
      const instance = getCurrentInstance()
      const parentEl = instance?.parent?.vnode.el as HTMLElement | undefined
      service.value = ElLoading.service({
        target: props.body || !parentEl ? document.body : parentEl,
        ...props
      })
    }

    onMounted(createService)

    onBeforeUnmount(() => {
      service.value?.close()
    })
    return {}
  }
})

export default Loading
