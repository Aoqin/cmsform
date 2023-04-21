import { reactive, ref } from 'vue'
import type { INode as IReadOnlyNode } from '../utils/tree'
import type { ITreeStore } from './treeStore'
import { generate } from 'shortid'
import { deepCopy } from '@/utils'
import { formFields, type IComponentType } from '@/config/fields'

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

type actionType = 'change' | 'loadData' | 'init'

export interface INode {
  parent: INode | null
  index: number
  name: String
  key: String
  id: String
  data: any
  visible: boolean
  style: any
  attributes: any
  actions: {
    [key: string]: Promise<any>
  }
  options?: Array<any>
  componentType: IComponentType
  componentName: String
  value?: String | number | Array<any> | object | null
  children?: Array<INode> | null
  store?: ITreeStore
  remote?: boolean
  remoteOptionProps?: {
    label: String
    value: String
  }
  [key: string]: any
  initialize(): void
  remove(): void
  removeChild(child: INode): void
  insertChild(child: INode, index: number): void
  getChildren(): INode[]
  insertBefore(): void
  insertAfter(): void
  clone(): INode
  setValue(params: any): void
  setStyle(params: any): void
  setAction(params: any): void
  setOptions(params: any): void
  setAttribute(params: any): void
  getReadOnlyNode(exceptOptions?: INodeOptions): INodeOptions
  setData(data: any): void
  getModelKey(): string | null
  moveChild(child: INode, index: number, oldIndex?: number): void
  resetChildrenIndex(): void
}

export interface INodeOptions {
  parent?: INode | null
  index?: Number
  name?: String
  key?: String
  id?: String | null
  data?: Array<any> | object
  visible?: boolean
  style?: any
  attributes?: any
  actions: {
    [key: string]: Promise<any>
  }
  options?: Array<any>
  componentType?: IComponentType
  componentName?: String
  value?: String | null
  store?: ITreeStore
  children: INodeOptions[] | undefined
  extendAttributes: any
  [key: string]: any
}

class Node implements INode {
  // parent 不在构造函数中初始化
  parent: INode | null = null
  key: string = ''
  id: string = ''
  visible: boolean = true
  name: string = ''
  index: number = 0
  componentType: IComponentType = ''
  componentName: string = ''
  value?: string | null = null
  store?: ITreeStore | undefined
  // 引用类型的属性，需要在构造函数中初始化隔离数据
  attributes: any = {}
  extendAttributes: any = {}
  options: any = {}
  actions: any = {}
  style: any = {}
  data: any = {}
  // children 不能在构造函数中直接赋值
  children?: Array<INode> | null = []
  constructor(options: INodeOptions) {
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        if (
          ['options', 'attributes', 'extendAttributes', 'actions', 'style', 'data'].indexOf(key) !=
          -1
        ) {
          // 隔离每个node的数据
          this[key] = deepCopy(options[key])
        } else if (key === 'children') {
          console.log(options)
        } else {
          this[key] = options[key]
        }
      }
    }
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
  remove() {
    if (this.parent) {
      this.parent.removeChild(this)
      this.parent.resetChildrenIndex()
    }
  }
  removeChild(child: INode) {
    const index = this.children?.indexOf(child)
    if (index !== -1 && index !== undefined) {
      if (child.parent !== this) {
        // 如果child的parent不是当前node，说明child已经被移动到其他node下，不需要再从store中移除
        this.children?.splice(index, 1)
      } else {
        this.store && this.store.deregisterNode(child)
        child.parent = null
        this.children?.splice(index, 1)
      }
      this.resetChildrenIndex()
    }
  }
  getChildren(): INode[] {
    return []
  }
  insertChild(child: INode | INodeOptions, index?: number) {
    if (!child) {
      throw new Error('InsertChild error: child is required')
    }
    if (this.store && child.key && this.store.getNode(child.key) && child instanceof Node) {
      // 已在store中注册过的node，直接移动位置
      this.children?.splice(index!, 0, child)
      child.parent = this
      return
    }
    const tmpGrandChildren = child?.children?.map((item) => item)
    let constructorOptions: INodeOptions
    if (child instanceof Node) {
      constructorOptions = child.getReadOnlyNode()
    } else {
      constructorOptions = child as INodeOptions
    }
    child = reactive<INode>(
      new Node({
        ...constructorOptions,
        parent: this,
        store: this.store
      })
    )
    child.initialize()
    if (tmpGrandChildren && tmpGrandChildren?.length > 0) {
      tmpGrandChildren!.forEach((item, i) => {
        ;(child as Node).insertChild(item, i)
      })
    }
    if (typeof index === 'undefined' || index < 0) {
      this.children?.push(child)
    } else {
      this.children?.splice(index, 0, child)
    }
    this.resetChildrenIndex()
  }
  moveChild(child: INode, index: number, oldIndex?: number) {
    if (index === undefined || index < 0) {
      throw new Error('MoveChild error: index is required')
    }
    if (oldIndex === undefined) {
      oldIndex = this.children?.indexOf(child)
    }
    if (oldIndex === undefined || oldIndex < 0) {
      throw new Error('MoveChild error: node is not a child of this node')
    }
    this.children?.splice(oldIndex, 1)
    this.children?.splice(index, 0, child)
    this.resetChildrenIndex()
  }
  insertBefore() {}
  insertAfter() {}
  resetChildrenIndex(): void {
    this.children?.forEach((child, index) => {
      child.index = index
    })
  }
  clone(): INode {
    const node = new Node({
      ...this.getReadOnlyNode(),
      parent: this.parent,
      store: this.store
    })
    return node
  }
  setValue(params: any) {
    this.store?.setModel(this, params)
  }
  setStyle(params: any) {}
  setAction(params: any) {}
  setOptions(params: any) {}
  setAttribute(params: any) {
    for (const key in params) {
      this.attributes[key] = params[key]
      if (key === 'multiple') {
        // 多选属性对应的值需要手动重置
        this.setValue(params[key] ? [] : '')
      }
    }
  }
  setExtendAttribute(params: any) {
    console.log(params)
    for (const key in params) {
      this.extendAttributes[key] = params[key]
    }
  }
  setData(data: any): void {
    this.data = data
  }
  async action(actionName: string, params: any) {
    // if (actionName === 'loadData') {
    //   this.setData([])
    //   const res = await this.actions[actionName](params)
    //   this.setData(res)
    // } else if (actionName === 'init') {
    //   this.store?.setModel(this, null)
    //   if (this.extendAttributes.remote) {
    //     await this.action('loadData', params)
    //   }
    // } else (this.actions && this.actions[actionName]) {
    //   await this.actions[actionName](params)
    // }
  }

  getReadOnlyNode(exceptOptions?: INodeOptions): INodeOptions {
    const tmp: INodeOptions = {
      index: this.index,
      name: this.name,
      key: this.key,
      id: this.id,
      data: this.data,
      visible: this.visible,
      style: this.style,
      attributes: this.attributes,
      extendAttributes: this.extendAttributes,
      actions: this.actions,
      options: this.options,
      componentType: this.componentType,
      componentName: this.componentName,
      value: this.value,
      children: this.children?.map((item) => item.getReadOnlyNode(exceptOptions))
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
  getModelKey(): string | null {
    if (formFields.includes(this.componentType)) {
      return `${this.componentType}.${this.key}`
    }
    return null
  }
}

export default Node
