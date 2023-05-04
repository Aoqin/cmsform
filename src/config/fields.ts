export type FormComponentType =
  | 'form'
  | 'formItem'
  | 'input'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'datetime'
  | 'rate'
  | 'slider'
  | 'switch'
  | 'color'
  | 'upload'
  | 'cascader'
  | 'transfer'
  | 'inputNumber'
  | 'timePicker'
  | 'timeSelect'
  | 'datePicker'
  | 'dateTimePicker'
  | 'weekPicker'
  | 'monthPicker'
  | 'yearPicker'

export type ContainerComponentType =
  | 'container'
  | 'row'
  | 'col'
  | 'tabs'
  | 'tabPane'
  | 'flexContainer'
  | 'flexContainerItem'

export type ViewComponentType =
  | 'table'
  | 'tableColumn'
  | 'button'
  | 'icon'
  | 'text'
  | 'image'
  | 'divider'

export type ComponentType = FormComponentType | ContainerComponentType | ViewComponentType | ''

export const formFields: Array<FormComponentType> = [
  'input',
  'select',
  'radio',
  'checkbox',
  'date',
  'time',
  'datetime',
  'rate',
  'slider',
  'switch',
  'color',
  'upload',
  'cascader',
  'transfer',
  'inputNumber',
  'timePicker',
  'timeSelect',
  'datePicker',
  'dateTimePicker',
  'weekPicker',
  'monthPicker',
  'yearPicker'
]

export const containerFields: Array<ContainerComponentType> = [
  'row',
  'col',
  'tabs',
  'tabPane',
  'flexContainer',
  'flexContainerItem'
]
export const viewFields: Array<ViewComponentType> = [
  'table',
  'tableColumn',
  'button',
  'icon',
  'text',
  'image',
  'divider'
]

/**
 * 表单项属性及默认值
 */
type optionProps = {
  label: string
  value: string
}

export type IFormItemAttributes = {
  prop?: string | string[]
  label: string
  labelWidth?: string
  rules?: any[]
  required?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  validateStatus?: '' | 'error' | 'validating' | 'success'
}

export type IInputAttributes = {
  placeholder?: string
  type?: 'text' | 'textarea' | 'password' | 'email' | 'url' | 'tel' | 'number'
  maxlength?: string | number
  minlength?: number
  showWordLimit?: boolean
  clearable?: boolean
  formmatter?: (value: any) => any
  parser?: (text: string) => any
  disabled?: boolean
  readonly?: boolean
  size?: 'large' | 'medium' | 'small' | 'mini'
  showPassword?: boolean
}

export type ISelectAttributes = {
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  multiple?: boolean
  multipleLimit?: number
  filterable?: boolean
  remote?: boolean
  remoteOptionProps?: optionProps
  remoteUrl?: String | null
  valueKey?: string
  loading?: boolean
  loadingText?: string
  noMatchText?: string
  noDataText?: string
  popperClass?: string
  reserveKeyword?: boolean
  defaultFirstOption?: boolean
  popperAppendToBody?: boolean
}

export type IRadioAttributes = {
  label?: string | number
  disabled?: boolean
  size?: 'large' | 'medium' | 'small' | 'mini'
  border?: boolean
}

export type ICheckboxAttributes = {
  label?: string | number
  disabled?: boolean
  size?: 'large' | 'medium' | 'small' | 'mini'
  border?: boolean
}

export type IRadioGroupAttributes = {
  size?: 'large' | 'medium' | 'small' | 'mini'
  disabled?: boolean
  remote?: boolean
  remoteOptionProps?: optionProps
}

export type ICheckboxGroupAttributes = {
  size?: 'large' | 'medium' | 'small' | 'mini'
  disabled?: boolean
  remote?: boolean
  remoteOptionProps?: optionProps
}

export type IDatePickerAttributes = {
  type?:
    | 'year'
    | 'month'
    | 'date'
    | 'dates'
    | 'week'
    | 'datetime'
    | 'datetimerange'
    | 'daterange'
    | 'monthrange'
  placeholder?: string
  format?: string
  valueFormat?: string
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  rangeSeparator?: string
  startPlaceholder?: string
  endPlaceholder?: string
}

export type ITimePickerAttributes = {
  placeholder?: string
  format?: string
  valueFormat?: string
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  isRange?: boolean
  arrowControl?: boolean
  startPlaceholder?: string
  endPlaceholder?: string
}

export const formItemAttributes: IFormItemAttributes = {
  label: '',
  prop: ''
}

export const inputAttributes: IInputAttributes = {
  placeholder: '请输入',
  type: 'text'
}

export const selectAttributes: ISelectAttributes = {
  placeholder: '请选择',
  clearable: true,
  remote: false,
  remoteOptionProps: {
    label: 'label',
    value: 'value'
  }
}

export const radiogroupAttributes: IRadioGroupAttributes = {
  remote: false,
  remoteOptionProps: {
    label: 'label',
    value: 'value'
  }
}

export const checkboxgroupAttributes: ICheckboxGroupAttributes = {
  remote: false,
  remoteOptionProps: {
    label: 'label',
    value: 'value'
  }
}

export const datePickerAttributes: IDatePickerAttributes = {
  type: 'date',
  placeholder: '请选择日期',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD'
}

export const timePickerAttributes: ITimePickerAttributes = {
  placeholder: '请选择时间',
  format: 'HH:mm:ss',
  valueFormat: 'HH:mm:ss'
}

export const formInputAttributes: IInputAttributes & IFormItemAttributes = {
  ...formItemAttributes,
  ...inputAttributes,
  label: '单行文本'
}

export const formSelectAttributes: ISelectAttributes & IFormItemAttributes = {
  ...formItemAttributes,
  ...selectAttributes,
  label: '下拉选择'
}

export const formRadioGroupAttributes: IRadioGroupAttributes & IFormItemAttributes = {
  ...formItemAttributes,
  ...radiogroupAttributes,
  label: '单选框组'
}

export const formCheckboxGroupAttributes: ICheckboxGroupAttributes & IFormItemAttributes = {
  ...formItemAttributes,
  ...checkboxgroupAttributes,
  label: '多选框组'
}

export const formDatePickerAttributes: IDatePickerAttributes & IFormItemAttributes = {
  ...formItemAttributes,
  ...datePickerAttributes,
  label: '日期选择'
}

export const formTimePickerAttributes: ITimePickerAttributes & IFormItemAttributes = {
  ...formItemAttributes,
  ...timePickerAttributes,
  label: '时间选择'
}

export const defaultInputAttributes: IInputAttributes = {
  ...inputAttributes,
  maxlength: '',
  minlength: 0,
  showWordLimit: false,
  clearable: false,
  formmatter: (value: any) => value,
  parser: (text: string) => text,
  disabled: false,
  readonly: false,
  size: 'medium',
  showPassword: false
}

export const defaultSelectAttributes: ISelectAttributes = {
  ...selectAttributes,
  disabled: false,
  clearable: false,
  multiple: false,
  multipleLimit: 0,
  filterable: false,
  remote: false,
  valueKey: '',
  remoteUrl: null,
  loading: false,
  loadingText: '加载中',
  noMatchText: '无匹配数据',
  noDataText: '无数据',
  popperClass: '',
  reserveKeyword: false,
  defaultFirstOption: false,
  popperAppendToBody: true
}

export const defaultRadioGroupAttributes: IRadioGroupAttributes = {
  ...radiogroupAttributes,
  size: 'medium',
  disabled: false
}

export const defaultCheckboxGroupAttributes: ICheckboxGroupAttributes = {
  ...checkboxgroupAttributes,
  size: 'medium',
  disabled: false
}

export const defaultDatePickerAttributes: IDatePickerAttributes = {
  ...datePickerAttributes,
  readonly: false,
  disabled: false,
  clearable: false,
  rangeSeparator: '-',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期'
}

export const defaultTimePickerAttributes: ITimePickerAttributes = {
  ...timePickerAttributes,
  readonly: false,
  disabled: false,
  clearable: false,
  isRange: false,
  arrowControl: false,
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间'
}

/**
 * 容器型组件属性及默认值
 */

type IRowAttributes = {
  gutter?: number
  type?: 'flex'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  align?: 'top' | 'middle' | 'bottom'
}

type IColAttributes = {
  span?: number
  offset?: number
  pull?: number
  push?: number
  xs?: number | { span: number; offset: number }
  sm?: number | { span: number; offset: number }
  md?: number | { span: number; offset: number }
  lg?: number | { span: number; offset: number }
}

export const rowAttributes: IRowAttributes = {
  gutter: 10
}

export const colAttributes: IColAttributes = {
  span: 24
}

export const defaultRowAttributes: IRowAttributes = {
  ...rowAttributes,
  type: 'flex',
  justify: 'start',
  align: 'top'
}

export const defaultColAttributes: IColAttributes = {
  ...colAttributes,
  offset: 0
}

type tabsAttributes = {
  type?: 'card' | 'border-card'
  closable?: boolean
  addable?: boolean
  editable?: boolean
  tabPosition?: 'top' | 'right' | 'bottom' | 'left'
  stretch?: boolean
}

type tabPaneAttributes = {
  label?: string
  name?: string
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
}

export const tabsAttributes: tabsAttributes = {
  type: 'card'
}

export const tabPaneAttributes: tabPaneAttributes = {
  lazy: false
}

export const defaultTabsAttributes: tabsAttributes = {
  type: 'card',
  tabPosition: 'top',
  stretch: false
}

export const defaultTabPaneAttributes: tabPaneAttributes = {
  lazy: false,
  disabled: false,
  name: '',
  label: ''
}
