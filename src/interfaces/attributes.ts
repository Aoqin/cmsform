export type ComponentAttributes = {
  id: string
  type: string
  name: string
  attribute: Object
  style: Object
  action: Object
  children?: Array<any>
}

export type FormAttributes = {
  rules?: []
  value: any
}

type FormItemCommonAttributes = {
  disabled?: boolean
  size?: 'large' | 'default' | 'small'
  clearable?: boolean
  reg?: string
  readonly?: boolean
  requird?: boolean
  placeholder: string
  value: string
  label: string
}

export type InputAttributes = {
  maxLength?: string
  minLength?: string
  showWorldLimit?: string
} & FormItemCommonAttributes

/**
 * @param serial 是否串联其它组件
 * @param downstream 串联组件数组
 */
export type SelectAttributes = {
  serial?: boolean
  downstream?: Array<any>
  options: Array<any>
  filterable?: boolean
  multiple?: boolean
  multipleLimit?: Number
  loadingText?: string
  noMatchText?: string
  remote?: boolean
} & FormItemCommonAttributes

export type SelectOptionAttributes = {}

export type RadioGroupAttributes = {}
export type RadioAttributes = {
  label: string
}

export type CheckGroupAttributes = {}
export type CheckAttributes = {
  label: string
}

export type SwitchAttributes = {}

export type TimePickerAttributes = {}

export type DatePickerAttributes = {}
