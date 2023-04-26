import type { IObjectKeys } from '@/config/common'

type NodeActionOption = {
  funName: string
  params: string
}

export type NodeAction = 'init'

export type FieldAction = 'change' | 'reset'

export type InputAction = 'blur' | 'focus' | 'change'

export type SelectAction = 'change' | 'loadData'

export type ButtonAction = 'click'

export type NodeActionName =
  | 'change'
  | 'click'
  | 'loadData'
  | 'init'
  | 'blur'
  | 'focus'
  | 'reset'
  | 'show'
  | 'hide'

export type NodeActions = {
  [key in NodeActionName]: NodeActionOption
}

export type NodeActionParams = {
  $value?: any
  args?: IObjectKeys<any>
}
