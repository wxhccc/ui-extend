import {
  defineComponent,
  shallowRef,
  onUnmounted,
  getCurrentInstance,
  App,
  ExtractPropTypes
} from 'vue'
import { ElLoading } from 'element-plus'
import { vueTypeProp } from '@/utils/component'

const props = {
  body: vueTypeProp<boolean>(Boolean),
  text: vueTypeProp<string>(String),
  spinner: vueTypeProp<string>(String),
  lock: vueTypeProp<boolean>(Boolean),
  background: vueTypeProp<string>(String)
}

export type LoadingProps = Partial<ExtractPropTypes<typeof props>>

const Loading = defineComponent({
  name: 'UeLoading',
  props,
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

    createService()

    onUnmounted(() => {
      service.value?.close()
    })
    return {}
  }
})

Loading.install = function (app: App) {
  app.component(Loading.name, Loading)
}

export default Loading
