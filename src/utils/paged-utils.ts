import { SetupContext, computed, reactive, watch } from 'vue'
import { isEqual, cloneDeep } from 'lodash-es'
import { vueTypeProp } from './component'
import { useStorage } from '@/hooks'
import { LoadingProps, UePaginationProps } from '@/ui-comps'

export type PropKey = 'total' | 'rows' | 'pageSize' | 'curPage'

export type GetPagedData = (params: AnyObject, fetchAccessKey?: string | number) => any
/* 分页接口数据格式 */
export interface PagedData<R extends Record<string, any>> {
  rows: R[]
  /** 总记录条数，用于页码分页 */
  total: number
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
  /** 加载中 */
  loading?: boolean
  /** loading组件属性 */
  loadingProps?: string | LoadingProps
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

export const pagedCompProps = <CP extends PagedCommonProps = PagedCommonProps>() => ({
  /** 数据源对象，包含列表数据和记录总数 */
  pagedData: vueTypeProp<NonNullable<CP['pagedData']>>(Object, undefined, true),
  /** 数据项键名映射关系，用于修正输出数据字段 */
  propKeys: vueTypeProp<CP['propKeys']>(Object),
  /** 外部输入表单数据，会合并到输出数据中，变化时也会重置页码 */
  extraModel: vueTypeProp<CP['extraModel']>(Object),
  /** 数据请求函数 */
  getPagedData: vueTypeProp<NonNullable<CP['getPagedData']>>(Function, (() => undefined) as never),
  loading: Boolean,
  loadingProps: vueTypeProp<NonNullable<CP['loadingProps']>>(
    [String, Object],
    '给我一点时间' as any
  ),
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
  sessionStorageKey: vueTypeProp<string>(String, 'PagedList')
})

type HasDefProp = 'getPagedData' | 'storeKey'
type CompPropsWithDefault<D extends AnyObject = AnyObject> = Omit<PagedCommonProps<D>, HasDefProp> &
  Pick<Required<PagedCommonProps<D>>, HasDefProp>

export const emits = {
  extraModelChange: (newValue: unknown, oldValue: unknown) => !newValue || !oldValue,
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
    ...props.propKeys
  }))

  const data = reactive({
    pageSize: 20,
    curPage: 1,
    extraModel: cloneDeep(props.extraModel),
    ...props.initData,
    // 如果需要恢复数据，从缓存中获取数据来覆盖页码
    ...(props.restore && storeSession('pagination', props.storeKey)),
    // 标记值，生命周期内只恢复一次
    isRestoring: props.restore
  })

  const onPagedChange = (paged: { curPage?: number; pageSize?: number }) => {
    Object.assign(data, paged)
    const { pageSize, curPage } = data
    context.emit('pagedChange', { pageSize, curPage })
  }

  const pagination = computed<null | UePaginationProps>(() => {
    const { pagination } = props
    if (pagination === false) {
      return null
    }
    return {
      background: true,
      layout: 'prev, pager, next, jumper',
      ...(pagination === true ? {} : pagination),
      pageSize: data.pageSize,
      total: props.pagedData.total,
      'onUpdate:currentPage': (curPage: number) => onPagedChange({ curPage }),
      'onUpdate:pageSize': (pageSize: number) => onPagedChange({ pageSize })
    } as UePaginationProps
  })

  const dataList = computed<AnyObject[]>(() => {
    const { rows } = propKey.value
    const { pagedData } = props
    const records =
      pagedData && Array.isArray(pagedData[rows]) ? (pagedData[rows] as AnyObject[]) : []
    if (!props.localPaged) {
      return records
    }
    const { pageSize, curPage } = data
    return records.slice(curPage * pageSize, (curPage + 1) * pageSize)
  })

  const params = computed(() => {
    const { pageSize, curPage } = propKey.value
    return {
      ...data.extraModel,
      [pageSize]: data.pageSize,
      [curPage]: data.curPage
    }
  })

  const storeData = () => {
    const { curPage, pageSize } = data
    storeSession('pagination', props.storeKey, { curPage, pageSize })
    storeSession('params', props.storeKey, params.value)
  }

  const sendFetchParam = () => {
    if (data.isRestoring) {
      return
    }
    props.needStore && storeData()
    const fetchAccessKey = props.fetchAccessKey || +new Date()
    props.getPagedData(params.value, fetchAccessKey)
  }

  // 首次创建时获取数据
  const getInitPageData = () => {
    const { storeKey } = props
    const params = storeSession('params', storeKey)
    if (data.isRestoring && params) {
      // storeSession('params', storeKey, undefined, true)
      Promise.resolve(props.getPagedData(params)).finally(() => {
        data.isRestoring = false
      })
    } else {
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
      const { extraModel } = data
      if (!isEqual(newVal, extraModel)) {
        data.curPage = 1
        data.extraModel = cloneDeep(newVal)
        context.emit('extraModelChange', newVal, data.extraModel)
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
