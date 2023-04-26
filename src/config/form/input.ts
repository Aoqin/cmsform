export type Input = {}

export type InputProperties = {
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

export const defaultInputProperties: InputProperties = {
  placeholder: '请输入',
  type: 'text',
  maxlength: 0,
  minlength: 0,
  showWordLimit: false,
  clearable: false,
  formmatter: (value: any) => value,
  parser: (text: string) => text,
  disabled: false,
  readonly: false,
  size: 'medium'
}

export const initInputProperties: InputProperties = {
  placeholder: defaultInputProperties.placeholder
}


// export const initInputPropertiesFactory = (): InputProperties => {
//   return Object.assign({}, initInputProperties)
// }
