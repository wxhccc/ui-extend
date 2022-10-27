<script lang="ts">
import {
  defineComponent,
  shallowRef,
  ref,
  h,
  onBeforeUnmount,
  onMounted,
  inject,
  Ref,
} from 'vue'
import { pickBy } from 'lodash-es'
import { ElLoading, LoadingOptions } from 'element-plus'
import { vueTypeProp } from '@wxhccc/ue-shared'

type MaybeRef<T> = T | Ref<T>
type NoRefOptions<T> = { [P in keyof T]: T[P] extends MaybeRef<infer V> ? V : T[P] }

export type LoadingProps = PartailPick<NoRefOptions<LoadingOptions>, 'body' | 'text' | 'spinner' | 'lock' | 'background'>

export default defineComponent({
  name: 'UeLoading',
  props: {
    body: vueTypeProp<boolean>(Boolean),
    text: vueTypeProp<string>(String),
    spinner: vueTypeProp<string>(String),
    lock: vueTypeProp<boolean>(Boolean),
    background: vueTypeProp<string>(String)
  },
  setup(props) {
    const service = shallowRef()
    const el = ref<HTMLDivElement>()

    const injectProps = inject<LoadingProps>('UeLoadingOptions')

    const createService = () => {
      service.value = ElLoading.service({
        target: props.body || !el.value ? document.body : el.value,
        ...injectProps,
        ...pickBy(props, (v) => v !== undefined)
      })
    }

    onMounted(createService)

    onBeforeUnmount(() => {
      service.value?.close()
    })
    return () => props.body ? null : h('div', { ref: el, class: 'ue-loading ue-loading-relative-root' })
  }
})
</script>

<style>
.ue-loading.ue-loading-relative-root {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20000;
}
</style>