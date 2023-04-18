import { reactive, ref } from 'vue'
import type { INode as IReadOnlyNode } from '../utils/tree'
import type { ITreeStore } from './treeStore'
import { generate } from 'shortid'
import { deepCopy } from '@/utils'
import { formFields } from '@/config/fields'

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
  value?: string | number | Array<any> | object | null
  children?: Array<INode> | null
  store?: ITreeStore
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
  setData(): void
  getModelKey(): string | null
  moveChild(child: INode, index: number, oldIndex?: number): void
}

export interface INodeOptions {
  parent?: INode | null
  index?: number
  name?: string
  key?: string
  id?: string | null
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
  children: INodeOptions[] | undefined
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
  componentType: string = ''
  componentName: string = ''
  value?: string | null = null
  store?: ITreeStore | undefined
  // 引用类型的属性，需要在构造函数中初始化隔离数据
  attributes: any
  options: any
  actions: any
  style: any
  data: any = {}
  // children 不能在构造函数中直接赋值
  children?: Array<INode> | null = []
  constructor(options: INodeOptions) {
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        if (
          key === 'options' ||
          key === 'attributes' ||
          key === 'actions' ||
          key === 'style' ||
          key === 'data'
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
    }
  }
  getChildren(): INode[] {
    return []
  }
  insertChild(child: INode | INodeOptions, index: number) {
    if (!child) {
      throw new Error('InsertChild error: child is required')
    }
    if (this.store && child.key && this.store.getNode(child.key) && child instanceof Node) {
      // 已在store中注册过的node，直接移动位置
      this.children?.splice(index, 0, child)
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
  }
  insertBefore() {}
  insertAfter() {}
  clone(): INode {
    const node = new Node({
      ...this.getReadOnlyNode(),
      parent: this.parent,
      store: this.store
    })
    return node
  }
  setValue(params: any) {}
  setStyle(params: any) {}
  setAction(params: any) {}
  setOptions(params: any) {}
  setAttribute(params: any) {}
  setData(): void {}
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
