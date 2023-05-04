export type DatePicker = {}

export type DatePickerProperties = {
  placeholder?: string
  format?: string
  type?:
    | 'year'
    | 'month'
    | 'date'
    | 'dates'
    | 'datetime'
    | 'week'
    | 'datetimerange'
    | 'daterange'
    | 'monthrange'
}
