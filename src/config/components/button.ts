export type Button = {}

export type ButtonProperties = {
  loading: boolean
  disabled: boolean
  type: 'primary' | 'ghost' | 'dashed' | 'danger' | 'default'
  size: 'small' | 'middle' | 'large'
  icon: string
}

export type ButtonAction = {
  click: () => void
}
