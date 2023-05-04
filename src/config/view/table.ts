export type TableProperties = {
  border?: boolean
  striped?: boolean
  data?: Array<any>
}

export type Table = {
  properties: TableProperties
  data: Array<any>
}

export type TableColumn = {
  properties: TableColumnProperties
  data: Array<any>
  options?: Array<any>
}

export type TableColumnProperties = {
  label: string
  prop: string
  width?: string
  align?: 'left' | 'center' | 'right'
  type?: 'selection' | 'index' | 'expand'
}
