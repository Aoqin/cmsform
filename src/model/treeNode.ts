import { reactive } from 'vue'
import type { INode as IReadOnlyNode } from '../utils/tree'
import type { ITreeStore } from './treeStore'
import { generate } from 'shortid'
import { deepCopy } from '@/utils'
import { type } from 'os'

type INodeOptionKes =
  | 'parent'
  | 'index'
  | 'name'
  | 'key'
  | 'id'
  | 'data'
  | 'visible'
  | 'style'
  | 'attributes'
  | 'actions'
  | 'options'
  | 'componentType'
  | 'componentName'
  | 'value'
  | 'store'

export interface INode {
  parent: INode | null
  index: number
  name: string
  key: string
  id: string
  data: any
  visible: boolean
  style: any
  attributes: any
  actions: any
  options?: Array<any>
  componentType: string
  componentName: string
  value?: string | null
  children?: Array<INode> | null
  store?: ITreeStore
  [key: string]: any
  initialize(): void
  remove(): void
  removeChild(): void
  insertChild(child: INode, index: number): void
  getChildren(): INode[]
  insertBefore(): void
  insertAfter(): void
  // clone(): INode
  // cloneChildren(): INode[]
  setValue(params: any): void
  setStyle(params: any): void
  setAction(params: any): void
  setOptions(params: any): void
  setAttribute(params: any): void
  getReadOnlyNode(exceptOptions?: INodeOptions): INodeOptions
  setData(): void
}

export interface INodeOptions {
  parent?: INode | null
  index?: number
  name?: string
  key?: string
  id?: string
  data?: any
  visible?: boolean
  style?: any
  attributes?: any
  actions?: any
  options?: Array<any>
  componentType?: string
  componentName?: string
  value?: string | null
  store?: ITreeStore
  [key: string]: any
}

class Node implements INode {
  private _attributes: any = reactive({})
  private _options: Array<any> = reactive<Array<any>>([])
  private _actions: any = reactive({})
  private _style: any = reactive({})
  private _data: any = reactive([])
  parent: INode | null = null
  key: string = ''
  id: string = ''
  data: any = {}
  visible: boolean = true
  name: string = ''
  index: number = 0
  componentType: string = ''
  componentName: string = ''
  value?: string | null = null
  children?: Array<INode> | null = []
  store?: ITreeStore | undefined
  constructor(options: INodeOptions) {
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        if (key === 'children') {
          options.children?.forEach((item: INodeOptions, index: number) => {
            this.insertChild(new Node(item), index)
          })
        } else {
          this[key] = options[key]
        }
      }
    }
  }

  get attributes() {
    return this._attributes
  }

  set attributes(value) {
    this._attributes.value = value
  }

  get options() {
    return this._options
  }

  set options(value) {
    this._options.value = value
  }

  get actions() {
    return this._actions
  }

  set actions(value) {
    this._actions.value = value
  }

  get style() {
    return this._style
  }

  set style(value) {
    this._style.value = value
  }

  initialize() {
    const store = this.store
    if (!store) {
      throw new Error('Node must be initialized with a store')
    }
    if (!this.key) {
      this.key = generate()
    }
    store.registerNode(this)
  }
  remove() {}
  removeChild() {}
  getChildren(): INode[] {
    return []
  }
  insertChild(child: INode | INode[], index: number) {
    if (!child) {
      throw new Error('InsertChild error: child is required')
    }
    if (Array.isArray(child)) {
      child.forEach((item, i) => {
        this.insertChild(item, i)
      })
    } else {
      Object.assign(child, {
        parent: this,
        store: this.store
      })
      const grandChildren = child?.children?.map((item) => item)
      child = reactive<INode>(new Node(child.getReadOnlyNode()))
      child.initialize()
      if (grandChildren && grandChildren?.length > 0) {
        grandChildren!.forEach((item, i) => {
          ;(child as Node).insertChild(item, i)
        })
      }
      if (typeof index === 'undefined' || index < 0) {
        this.children?.push(child)
      } else {
        this.children?.splice(index, 0, child)
      }
    }
  }
  insertBefore() {}
  insertAfter() {}
  clone(): INode {
    const node = new Node({
      parent: this.parent,
      index: this.index,
      name: this.name,
      id: this.id,
      key: generate()
    })
    return node
  }
  // cloneChildren(): INode[] {
  //   return []
  // }
  setValue(params: any) {}
  setStyle(params: any) {}
  setAction(params: any) {}
  setOptions(params: any) {}
  setAttribute(params: any) {}
  setData(): void {}
  getReadOnlyNode(exceptOptions?: INodeOptions): INodeOptions {
    const tmp: INodeOptions = {
      parent: this.parent,
      index: this.index,
      name: this.name,
      key: this.key,
      id: this.id,
      data: this.data,
      visible: this.visible,
      style: this.style,
      attributes: this.attributes,
      actions: this.actions,
      options: this.options,
      componentType: this.componentType,
      componentName: this.componentName,
      value: this.value,
      children: this.children?.forEach((item) => item.getReadOnlyNode(exceptOptions))
    }

    if (exceptOptions) {
      for (const key in exceptOptions) {
        if (Object.prototype.hasOwnProperty.call(tmp, key)) {
          delete tmp[key]
        }
      }
    }
    return tmp
  }
}

export default Node
