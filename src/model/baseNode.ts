import type { IBaseStore } from './baseStore'

export interface IBaseNode {
  index: number
  name: string
  key: string
  data: any
  visible: boolean
  value: any
  children: this[]
  parent?: this | null
  store: IBaseStore<this> | null
  initialize: (subGenerate?: boolean) => void
  insertChild: (child: this, index?: number) => void
  moveChild: (child: this, index: number, oldIndex?: number) => void
  moveChildInOther: (child: this, other: this, index: number) => void
  clone: (deep?: boolean) => this
  removeChild: (child: this) => void
  remove: () => void
}

export type BaseNodeOptions = {
  index: number
  name: string
  key: string
  data: any
  visible: boolean
  value: any
}

class BaseNode<T> implements IBaseNode {
  index: number = 0
  name: string = ''
  key: string = ''
  data: any = []
  visible: boolean = false
  value: any = null
  children: this[] = []
  parent?: this | null = null
  store: IBaseStore<this> | null = null
  constructor(options: T) {
    Object.assign(this, options)
  }

  initialize(subGenerate?: boolean) {
    const store = this.store
    if (!store) {
      throw new Error('Node must be initialized with a store')
    }
    if (subGenerate && this.children.length > 0) {
      this.children.forEach((child) => {
        child.store = this.store
        child.initialize(subGenerate)
      })
    }
    store.registerNode(this)
  }

  insertChild(child: this | T, index?: number) {
    if (!child) {
      throw new Error('insertChild: child is required')
    }
    let tmpNode
    if (Object.hasOwnProperty.call(child, 'remove')) {
      // 传入参数为 node
    } else {
      // 传入 nodeoptions
      tmpNode = new (this.constructor as any)(child)
    }
    tmpNode.parent = this
    tmpNode.store = this.store
    this.children.splice(index === undefined ? this.children.length : index, 0, tmpNode)
  }

  moveChild(child: this, index: number, oldIndex?: number) {}
  moveChildInOther(child: this, other: this, index: number) {}
  clone(deep?: boolean) {
    return this
  }
  removeChild(child: this) {
    const index = this.children.indexOf(child)
    if (index > -1) {
      this.store && this.store.deregisterNode(child)
      child.parent = undefined
      this.children.splice(index, 1)
    }
  }
  remove() {
    if (this.parent) {
      this.parent.removeChild(this)
    }
  }
}

export default BaseNode
