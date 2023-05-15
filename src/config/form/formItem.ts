export type FormItemType =
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

export type FormItem = {}

export type FormItemProperties = {
  prop?: string | string[]
  label?: string
  labelWidth?: string
  rules?: any[]
  required?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  validateStatus?: '' | 'error' | 'validating' | 'success'
}

// export const FormItemPropertiesKeys = []

export const defaultFormItemProperties: FormItemProperties = {
  label: 'formItem'
}

export const initFormItemProperties: FormItemProperties = {}

export enum formItemNameEnum {
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
}

export const formItemPropertiesFactory = (fieldType: FormItemType) => {
  return {}
}
