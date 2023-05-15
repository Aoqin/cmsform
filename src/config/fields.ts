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
  | 'root'

export type ViewComponentType =
  | 'table'
  | 'tableColumn'
  | 'button'
  | 'icon'
  | 'text'
  | 'image'
  | 'divider'
  | 'link'

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
  'flexContainerItem',
  'container'
]
export const viewFields: Array<ViewComponentType> = [
  'table',
  'tableColumn',
  'button',
  'icon',
  'text',
  'image',
  'divider',
  'link'
]

/**
 * 表单项属性及默认值
 */
type optionProps = {
  label: string
  value: string
}

export type IFormItemProperties = {
  prop?: string | string[]
  label: string
  labelWidth?: string
  rules?: any[]
  required?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  validateStatus?: '' | 'error' | 'validating' | 'success'
}

export type IInputProperties = {
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

export type ISelectProperties = {
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

export type IRadioProperties = {
  label?: string | number
  disabled?: boolean
  size?: 'large' | 'medium' | 'small' | 'mini'
  border?: boolean
}

export type ICheckboxProperties = {
  label?: string | number
  disabled?: boolean
  size?: 'large' | 'medium' | 'small' | 'mini'
  border?: boolean
}

export type IRadioGroupProperties = {
  size?: 'large' | 'medium' | 'small' | 'mini'
  disabled?: boolean
  remote?: boolean
  remoteOptionProps?: optionProps
}

export type ICheckboxGroupProperties = {
  size?: 'large' | 'medium' | 'small' | 'mini'
  disabled?: boolean
  remote?: boolean
  remoteOptionProps?: optionProps
}

export type IDatePickerProperties = {
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

export type ITimePickerProperties = {
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

export type UploadPoperties = {
  action?: string
  headers?: any
  multiple?: boolean
  limit?: number
  disabled?: boolean
  listType?: 'text' | 'picture' | 'picture-card'
  limitSize: number
  accept?: string[]
  name?: string
  data?: any
  showFileList?: boolean
  buttonText?: string
  drag?: boolean
  buttonType?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'link'
  httpRequest?: any
}

export const formItemProperties: IFormItemProperties = {
  label: '',
  prop: ''
}

export const inputProperties: IInputProperties = {
  placeholder: '请输入',
  type: 'text'
}

export const selectProperties: ISelectProperties = {
  placeholder: '请选择',
  clearable: true,
  remote: false,
  remoteOptionProps: {
    label: 'label',
    value: 'value'
  }
}

export const radiogroupProperties: IRadioGroupProperties = {
  remote: false,
  remoteOptionProps: {
    label: 'label',
    value: 'value'
  }
}

export const checkboxgroupProperties: ICheckboxGroupProperties = {
  remote: false,
  remoteOptionProps: {
    label: 'label',
    value: 'value'
  }
}

export const datePickerProperties: IDatePickerProperties = {
  type: 'date',
  placeholder: '请选择日期',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD'
}

export const timePickerProperties: ITimePickerProperties = {
  placeholder: '请选择时间',
  format: 'HH:mm:ss',
  valueFormat: 'HH:mm:ss'
}

export const uploadProperties: UploadPoperties = {
  buttonText: 'click to upload',
  buttonType: 'link',
  multiple: true,
  limit: 5,
  limitSize: 500,
  action: '',
  accept: ['jpg', 'jpeg', 'png', 'gif', 'bmp']
}

export const formInputProperties: IInputProperties & IFormItemProperties = {
  ...formItemProperties,
  ...inputProperties,
  label: '单行文本'
}

export const formSelectProperties: ISelectProperties & IFormItemProperties = {
  ...formItemProperties,
  ...selectProperties,
  label: '下拉选择'
}

export const formRadioGroupProperties: IRadioGroupProperties & IFormItemProperties = {
  ...formItemProperties,
  ...radiogroupProperties,
  label: '单选框组'
}

export const formCheckboxGroupProperties: ICheckboxGroupProperties & IFormItemProperties = {
  ...formItemProperties,
  ...checkboxgroupProperties,
  label: '多选框组'
}

export const formDatePickerProperties: IDatePickerProperties & IFormItemProperties = {
  ...formItemProperties,
  ...datePickerProperties,
  label: '日期选择'
}

export const formTimePickerProperties: ITimePickerProperties & IFormItemProperties = {
  ...formItemProperties,
  ...timePickerProperties,
  label: '时间选择'
}

export const formUploadProperties: UploadPoperties & IFormItemProperties = {
  ...formItemProperties,
  ...uploadProperties,
  label: '文件上传'
}

export const defaultInputProperties: IInputProperties = {
  ...inputProperties,
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

export const defaultSelectProperties: ISelectProperties = {
  ...selectProperties,
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

export const defaultRadioGroupProperties: IRadioGroupProperties = {
  ...radiogroupProperties,
  size: 'medium',
  disabled: false
}

export const defaultCheckboxGroupProperties: ICheckboxGroupProperties = {
  ...checkboxgroupProperties,
  size: 'medium',
  disabled: false
}

export const defaultDatePickerProperties: IDatePickerProperties = {
  ...datePickerProperties,
  readonly: false,
  disabled: false,
  clearable: false,
  rangeSeparator: '-',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期'
}

export const defaultTimePickerProperties: ITimePickerProperties = {
  ...timePickerProperties,
  readonly: false,
  disabled: false,
  clearable: false,
  isRange: false,
  arrowControl: false,
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间'
}

export const defaultUploadProperties: UploadPoperties = {
  ...uploadProperties
}

/**
 * 容器型组件属性及默认值
 */

type IRowProperties = {
  gutter?: number
  type?: 'flex'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  align?: 'top' | 'middle' | 'bottom'
}

type IColProperties = {
  span?: number
  offset?: number
  pull?: number
  push?: number
  xs?: number | { span: number; offset: number }
  sm?: number | { span: number; offset: number }
  md?: number | { span: number; offset: number }
  lg?: number | { span: number; offset: number }
}

export const rowProperties: IRowProperties = {
  gutter: 15
}

export const colProperties: IColProperties = {
  span: 12
}

export const defaultRowProperties: IRowProperties = {
  ...rowProperties,
  type: 'flex',
  justify: 'start',
  align: 'top'
}

export const defaultColProperties: IColProperties = {
  ...colProperties,
  offset: 0
}

type tabsProperties = {
  type?: 'card' | 'border-card'
  closable?: boolean
  addable?: boolean
  editable?: boolean
  tabPosition?: 'top' | 'right' | 'bottom' | 'left'
  stretch?: boolean
}

type tabPaneProperties = {
  label?: string
  name?: string
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
}

export const tabsProperties: tabsProperties = {
  type: 'card'
}

export const tabPaneProperties: tabPaneProperties = {
  lazy: false
}

export const defaultTabsProperties: tabsProperties = {
  type: 'card',
  tabPosition: 'top',
  stretch: false
}

export const defaultTabPaneProperties: tabPaneProperties = {
  lazy: false,
  disabled: false,
  name: '',
  label: ''
}
