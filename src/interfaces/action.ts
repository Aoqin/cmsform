export interface IFormAction {}

export interface IFormItemAction {}

export interface IAction {
  auth?: boolean
  actions: Array<Function>
}

export interface IInputAction {
  change?: Function
  blur?: Function
  foucs?: Function
}

export interface ISelectAction {
  change?: Function
  beforeLoad?: Function
  load: Function
}
