export type Select = {}

export type SelectProperties = {
  placeholder?: string
  clearable?: boolean
  remote?: boolean
  remoteOptionProps?: { label: string; value: string }
  remoteAction?: 'init'
  multiple?: boolean
  filterable?: boolean
  remoteUrl?: string | null
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

export type SelectOption = {}

export type Option = {
  label: string
  value: string
  key: string
}

export type OptionProperties = {
  label: string
  value: string
}

export const defaultSelectProperties: SelectProperties = {
  placeholder: '请选择',
  clearable: true,
  remote: false,
  remoteOptionProps: { label: 'label', value: 'value' }
}
