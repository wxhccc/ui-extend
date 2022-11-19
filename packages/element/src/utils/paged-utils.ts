import { SetupContext, computed, isProxy, reactive, watch, inject } from 'vue'
import { isEqual, cloneDeep, isFunction } from 'lodash-es'
import { vueTypeProp, useStorage, searchFormDateSwitch, AnyObject, StrOrNum } from '@wxhccc/ue-shared'
import { ParamsSwitchMaps } from '@wxhccc/es-util'
import { LoadingProps, UePaginationProps } from '../ui-comps'

export type PropKey = 'total' | 'rows' | 'pageSize' | 'curPage' | 'hasMore'

export type GetPagedData = (params: AnyObject, fetchAccessKey?: string | number) => any
/* 分页接口数据格式 */
export interface PagedData<R extends Record<string, any>> {
  rows?: R[]
  /** 总记录条数，用于页码分页 */
  total?: number
  /** 是否有下一页，用于下拉分页 */
  [key: string]: unknown
}

export interface PagedCommonProps<D extends AnyObject = AnyObject, PD = PagedData<D>> {
  /** 数据源对象，包含列表数据和记录总数 */
  pagedData: PD
  /** 数据项键名映射关系，用于修正输出数据字段 */
  propKeys?: Record<PropKey, string>
  /** 外部输入表单数据，会合并到输出数据中，变化时也会重置页码 */
  extraModel?: AnyObject
  /** 数据请求函数 */
  getPagedData?: GetPagedData
  /** 数据传递给请求函数前，可以用searchFormDateSwitch对数据中的时间范围进行转换 */
  paramsSwitchMaps?: ParamsSwitchMaps
  /** 加载中 */
  loading?: boolean
  /** loading组件属性 */
  loadingProps?: string | LoadingProps
  /** 是否使用flex布局填充满容器 */
  flexLayout?: boolean
  /** 是否需要刷新列表 */
  refresh?: boolean
  /** 存储数据时的关键字，一般是页面名称加列表模块名 */
  storeKey?: string
  /** 初始设置数据，一般用来设置每页记录数 */
  initData?: { pageSize?: number }
  fetchAccessKey?: StrOrNum
  /** 是否组件创建时自动发送请求 */
  createdAutoSend?: boolean
  /** 是否需要使用缓存数据 */
  restore?: boolean
  /** 是否需要缓存数据功能 */
  needStore?: boolean
  /** 分页参数 */
  pagination?: boolean | UePaginationProps
  /** 是否采用前端分页方式 */
  localPaged?: boolean
  sessionStorageKey?: string
}

export const pagedCompProps = <CP extends PagedCommonProps = PagedCommonProps>(sessionStorageKey = 'PagedList') => ({
  /** 数据源对象，包含列表数据和记录总数 */
  pagedData: vueTypeProp<NonNullable<CP['pagedData']>>(Object, undefined, true),
  /** 数据项键名映射关系，用于修正输出数据字段 */
  propKeys: vueTypeProp<CP['propKeys']>(Object),
  /** 外部输入表单数据，会合并到输出数据中，变化时也会重置页码 */
  extraModel: vueTypeProp<CP['extraModel']>(Object),
  /** 数据请求函数 */
  getPagedData: vueTypeProp<NonNullable<CP['getPagedData']>>(Function, (() => undefined) as never),
  paramsSwitchMaps: vueTypeProp<CP['paramsSwitchMaps']>(Object),
  loading: {
    type: Boolean,
    default: undefined
  },
  loadingProps: vueTypeProp<CP['loadingProps']>([String, Object]),
  flexLayout: Boolean,
  /** 是否需要刷新列表 */
  refresh: Boolean,
  /** 存储数据时的关键字，一般是页面名称加列表模块名 */
  storeKey: vueTypeProp<string>(String, 'data'),
  /** 初始设置数据，一般用来设置每页记录数 */
  initData: vueTypeProp<CP['initData']>(Object),
  fetchAccessKey: vueTypeProp<CP['fetchAccessKey']>([Number, String]),
  /** 是否组件创建时自动发送请求 */
  createdAutoSend: Boolean,
  /** 是否需要使用缓存数据 */
  restore: Boolean,
  /** 是否需要缓存数据功能 */
  needStore: Boolean,
  pagination: vueTypeProp<CP['pagination']>([Boolean, Object]),
  localPaged: Boolean,
  sessionStorageKey: vueTypeProp<string>(String, sessionStorageKey)
})

type HasDefProp = 'getPagedData' | 'storeKey'
type CompPropsWithDefault<D extends AnyObject = AnyObject> = Omit<PagedCommonProps<D>, HasDefProp> &
  Pick<Required<PagedCommonProps<D>>, HasDefProp>

export const emits = {
  extraModelChange: (newValue: unknown, oldValue: unknown) => !!newValue || !!oldValue,
  'update:refresh': (bool: boolean) => typeof bool === 'boolean',
  pagedChange: (data: { curPage: number; pageSize: number }) => !!data
}

export type Context = SetupContext<{
  extraModelChange: (newValue: unknown, oldValue: unknown) => void
  'update:refresh': (bool: boolean) => void
  pagedChange: (data: { curPage: number; pageSize: number }) => void
}>

export function usePagedLogic<
  CP extends CompPropsWithDefault = CompPropsWithDefault,
  CTX extends Context = Context
>(props: CP, context: CTX, storeSession: ReturnType<typeof useStorage>) {
  const propKey = computed(() => ({
    total: 'total',
    rows: 'rows',
    pageSize: 'size',
    curPage: 'current',
    hasMore: 'hasMore',
    ...props.propKeys
  }))

  const initPageSize = inject<number>('UeDefaultPageSize') || 10

  const pagedState = reactive<{ pageSize: number; curPage: number }>({
    pageSize: initPageSize,
    curPage: 1,
    ...props.initData,
    // 如果需要恢复数据，从缓存中获取数据来覆盖页码
    ...(props.restore && storeSession('pagination', props.storeKey)),
  })
  const state = reactive({
    extraModel: cloneDeep(props.extraModel),
    // 标记值，生命周期内只恢复一次
    isRestoring: props.restore
  })

  const onPagedChange = (paged: { curPage?: number; pageSize?: number }) => {
    Object.assign(pagedState, paged)
    const { pageSize, curPage } = pagedState
    context.emit('pagedChange', { pageSize, curPage })
  }

  const isTotalMode = computed(() => {
    const { hasMore } = propKey.value
    const { [hasMore]: hasNext } = props.pagedData || {}
    return typeof hasNext !== 'boolean'
  })

  const total = computed(() => {
    const { total } = propKey.value
    const { pagedData } = props
    return pagedData ? pagedData[total as 'total'] : 0
  })

  const dataList = computed<AnyObject[]>(() => {
    const { rows } = propKey.value
    const { pagedData } = props
    const records =
      pagedData && Array.isArray(pagedData[rows]) ? (pagedData[rows] as AnyObject[]) : []
    if (!props.localPaged) {
      return records
    }
    const { pageSize, curPage } = pagedState
    return records.slice(curPage * pageSize, (curPage + 1) * pageSize)
  })

  const pagination = computed<null | UePaginationProps>(() => {
    const { pagination, loading } = props
    if (pagination === false) {
      return null
    }
    const { pageSize, curPage } = pagedState
    const { hasMore } = propKey.value
    const { [hasMore]: hasNext } = props.pagedData || {}
    /** 根据是否有total来确定分页组件的属性 */
    const typeProps: Partial<UePaginationProps> = isTotalMode.value
    ? {
        total: total.value
      }
    : {
        small: true,
        layout: 'prev,next', 
        total: hasNext && !loading ? (curPage + 1) * pageSize : curPage * pageSize
      }
    return {
      background: true,
      ...(pagination === true ? {} : pagination),
      ...typeProps,
      currentPage: pagedState.curPage,
      pageSize: pagedState.pageSize,
      'onUpdate:currentPage': (curPage: number) => onPagedChange({ curPage }),
      'onUpdate:pageSize': (pageSize: number) => onPagedChange({ pageSize })
    } as UePaginationProps
  })



  const params = computed(() => {
    const { pageSize, curPage } = propKey.value
    return {
      ...state.extraModel,
      [pageSize]: pagedState.pageSize,
      [curPage]: pagedState.curPage
    }
  })

  const storeData = () => {
    const { curPage, pageSize } = pagedState
    storeSession('pagination', props.storeKey, { curPage, pageSize })
    storeSession('params', props.storeKey, params.value)
  }

  const sendFetchParam = () => {
    if (state.isRestoring) {
      return
    }
    props.needStore && storeData()
    const fetchAccessKey = props.fetchAccessKey || +new Date()
    innerGetPagedData(params.value, fetchAccessKey)
  }

  const innerGetPagedData: GetPagedData = (params, fetchAccessKey) => {
    const { getPagedData, paramsSwitchMaps: maps } = props
    if (isFunction(getPagedData)) {
      const handleParams = maps ? searchFormDateSwitch(params, maps) : params
      return getPagedData(handleParams, fetchAccessKey)
    }
  }

  // 首次创建时获取数据
  const getInitPageData = async () => {
    const { storeKey } = props
    const params = storeSession('params', storeKey)
    if (state.isRestoring && params) {
      // storeSession('params', storeKey, undefined, true)
      await innerGetPagedData(params)
      state.isRestoring = false
    } else {
      state.isRestoring = false
      sendFetchParam()
    }
  }

  const getStoreData = () => {
    return {
      pagination: storeSession('pagination', props.storeKey),
      params: storeSession('params', props.storeKey)
    }
  }
  const clearStoreData = (module = ['params', 'pagination']) => {
    const modules = Array.isArray(module) ? module : [module]
    modules.forEach((item) => {
      storeSession(item, props.storeKey, null, true)
    })
  }

  watch(
    () => props.extraModel,
    (newVal: AnyObject) => {
      if (state.isRestoring) {
        return
      }
      const { extraModel } = state
      if (isProxy(newVal) || !isEqual(newVal, extraModel)) {
        pagedState.curPage = 1
        state.extraModel = isProxy(newVal) ? newVal : cloneDeep(newVal)
        context.emit('extraModelChange', newVal, state.extraModel)
      }
    },
    {
      deep: true
    }
  )

  watch(
    () => props.refresh,
    (newVal) => {
      if (newVal) {
        sendFetchParam()
        context.emit('update:refresh', false)
      }
    }
  )
  // 监听params变化，如果变化则发请求
  watch(() => params.value, sendFetchParam)

  props.createdAutoSend && getInitPageData()

  return { pagination, dataList, storeSession, getStoreData, clearStoreData }
}

export const exposeMethods = ['getStoreData', 'clearStoreData']