<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  h,
  inject
} from 'vue'
import { Spin, SpinProps } from 'ant-design-vue'
import { pickBy } from 'lodash-es'
import { vueTypeProp } from '@wxhccc/ue-shared'
import { spinProps } from 'ant-design-vue/lib/spin'

export interface LoadingProps extends SpinProps {
  body?: boolean
}

export default defineComponent({
  name: 'UeLoading',
  props: {
    ...spinProps,
    body: vueTypeProp<boolean>(Boolean)
  },
  setup(props) {
    const el = ref<HTMLDivElement>()

    const injectProps = inject<LoadingProps>('UeLoadingOptions')

    const handleProps = computed(() => {
      const { body, ...rest } = props
      return { ...injectProps, ...pickBy(rest, (v) => v !== undefined) }
    })

    return () =>
      h(
        'div',
        {
          ref: el,
          class: ['ue-loading', props.body ? 'ue-loading-body-root' : 'ue-loading-relative-root']
        },
        h(Spin, handleProps.value)
      )
  }
})
</script>

<style lang="scss">
.ue-loading {
  --ue-mask-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20000;
  background-color: var(--ue-mask-color);

  &.ue-loading-body-root {
    position: fixed;
  }
}

.dark .ue-loading {
  --ue-mask-color: rgba(0, 0, 0, 0.6);
}
</style>
