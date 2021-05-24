import Viewer from 'viewerjs'
import { FunctionalType } from '../utils/types'

export type MethodName =
  | 'show'
  | 'hide'
  | 'view'
  | 'prev'
  | 'next'
  | 'move'
  | 'moveTo'
  | 'zoom'
  | 'zoomTo'
  | 'rotate'
  | 'scale'
  | 'scaleX'
  | 'scaleY'
  | 'play'
  | 'stop'
  | 'full'
  | 'exit'
  | 'tooltip'
  | 'toggle'
  | 'reset'
  | 'update'
  | 'destroy'

export type EventName =
  | 'move'
  | 'moved'
  | 'play'
  | 'ready'
  | 'rotate'
  | 'scale'
  | 'scaled'
  | 'show'
  | 'shown'
  | 'stop'
  | 'view'
  | 'viewed'
  | 'zoom'
  | 'zoomed'

export interface ViewerProps {
  images: string[]
  inline?: boolean
  initTip?: string
  activeIndex?: number
  thumbSrcQuery?: FunctionalType<string>
  options?: Viewer.Options
}
