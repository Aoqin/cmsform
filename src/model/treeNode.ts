import { reactive } from 'vue'
import type { IFunctions, ITreeStore } from './treeStore'
import { characters, generate } from 'shortid'
import { deepCopy } from '@/utils'
import type { ComponentType } from '@/config/fields'

import type { NodeActionName, NodeActionParams } from '@/config/action'
import type { IObjectKeys } from '@/config/common'

// 默认shoriId生成器字符集,规避特殊字符 -
characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_')

export interface INode {
  parent: INode | null
  index: number
  name: string
  key: string
  id: string
  data: any
  visible: boolean
  style: any
  properties: any
  actions: {
    [key: string]: IFunctions
  }
  extendAttributes: any
  backendConfig: any
  options?: Array<any>
  componentType: ComponentType
  componentName: string
  componentKey: string
  componentKeyId: string
  value?: string | number | Array<any> | object | null
  children?: Array<INode> | null
  store?: ITreeStore
  remote?: boolean
  remoteOptionProps?: {
    label: string
    value: string
  }
  [key: string]: any
  initialize(initChildren?: boolean): void
  remove(): void
  removeChild(child: INode): void
  insertChild(child: INode, index?: number): void
  getChildren(): INode[]
  insertBefore(): void
  insertAfter(): void
  clone(deep: boolean, parent?: INode): INode
  setValue(params: any): void
  setStyle(params: any): void
  setAction(params: any): void
  setOptions(params: any): void
  setProperties(params: any): void
  setExtendAttribute(params: any): void
  getReadOnlyNode(exceptOptions?: INodeOptions): INodeOptions
  setData(data: any): void
  setAttrs(attrs: any): void
  getModelKey(): string | null
  moveChild(child: INode, index: number, oldIndex?: number): void
  resetChildrenIndex(): void
}

export interface INodeOptions {
  parent?: INode | null
  parentId?: string | null
  index?: Number
  name?: string
  key?: string
  id?: string | null
  data?: Array<any> | object
  visible?: boolean
  style?: any
  properties?: any
  actions?: {
    [key: string]: Promise<any>
  }
  backendConfig?: any
  extendAttributes?: any
  options?: Array<any>
  componentType?: ComponentType
  componentName?: string
  componentKey?: string // 后端需要定制key
  componentKeyId?: string // 后端配置的id
  value?: string | Array<any> | Number | null
  store?: ITreeStore
  children?: INodeOptions[] | null
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
  componentType: ComponentType = ''
  componentName: string = ''
  componentKey: string = ''
  componentKeyId: string = ''
  value: string | Array<any> | Number | null = null
  store?: ITreeStore | undefined
  // 引用类型的属性，需要在构造函数中初始化隔离数据
  properties: any = {}
  extendAttributes: any = {}
  options: any = {}
  actions: any = {}
  style: any = {}
  data: any = []
  backendConfig: any = {}
  // children 不能在构造函数中直接赋值
  children?: Array<INode> | null = []
  // timer
  // timer: any = null
  constructor(options: INodeOptions, constructChildren?: boolean) {
    for (const key in options) {
      // todo: 优化
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        if (
          [
            'options',
            'properties',
            'extendAttributes',
            'actions',
            'style',
            'data',
            'backendConfig'
          ].includes(key)
        ) {
          // 隔离每个node的数据
          ;(this as INode)[key] = deepCopy(options[key])
        } else if (key === 'children') {
          if (constructChildren) {
            options.children?.forEach((child: INodeOptions) => {
              this.children?.push(reactive<INode>(new Node({ ...child, parent: this }, true)))
            })
          }
        } else {
          ;(this as INode)[key] = options[key]
        }
      }
    }
    if (!this.key) {
      this.key = generate()
    }
    if (!this.componentKey) {
      this.componentKey = generate()
    }
  }

  initialize(initChildren?: boolean) {
    const store = this.store
    if (!store) {
      throw new Error('Node must be initialized with a store')
    }
    if (initChildren && this.children?.length) {
      this.children.forEach((child: INode) => {
        child.store = this.store
        child.initialize(initChildren)
      })
    }
    store.registerNode(this)
    this.action('init', {})
  }

  remove() {
    if (this.parent) {
      const parent = this.parent
      parent.removeChild(this)
      parent.resetChildrenIndex()
    }
  }

  removeChild(child: INode) {
    const index = this.children?.indexOf(child)
    if (index !== -1 && index !== undefined) {
      if (child.parent !== this) {
        // 如果child的parent不是当前node，说明child已经被移动到其他node下，不需要再从store中移除
        this.children?.splice(index, 1)
        // 后端要求，移除的节点的id设置为空
        child.id = ''
      } else {
        this.store && this.store.deregisterNode(child)
        child.parent = null
        this.children?.splice(index, 1)
      }
      this.resetChildrenIndex()
    }
  }

  /**
   *
   * @param deep 是否深度clone
   * @param parent 当前clone的节点的父节点
   * @param recordMap 当前clone的节点和新节点的映射关系
   * @returns
   */
  cloneTmpNode(
    deep: boolean,
    parent?: INode,
    recordMap?: Map<string, { val: INode; old: INode }>
  ): INode {
    const excludeAttrs: IObjectKeys<any> = {
      key: ''
    }
    const initParams = {
      ...this.getReadOnlyNode(excludeAttrs),
      parent: parent ? parent : this.parent,
      store: this.store
    }
    if (this.componentType === 'upload') {
      // 上传组件清空data
      initParams.data = []
    }
    const node = new Node(initParams)
    recordMap?.set(this.key, { val: node, old: this })
    // 关联关系
    if (deep) {
      node.children = this.children?.map((item) => {
        return item.cloneTmpNode(deep, node, recordMap)
      })
    }
    return node
  }

  clone(deep: boolean, parent?: INode): INode {
    const recordMap = new Map<string, { val: INode; old: INode }>()
    const clonedNode = this.cloneTmpNode(deep, parent, recordMap)
    recordMap.forEach((item) => {
      const { val } = item
      if (val.extendAttributes?.linked) {
        // 此节点存在关联关系
        const linkedNode = recordMap.get(val.extendAttributes.linkSource)
        //
        if (linkedNode) {
          item.val.extendAttributes.linkSource = linkedNode.val.key
          linkedNode.val.extendAttributes.linkTarget = item.val.key
        } else {
          // clone 时的节点中没有找到关联的节点
          throw new Error('clone error: linked node not found')
        }
      }
    })
    return clonedNode
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
      // 不做深拷贝，直接使用原对象
      constructorOptions = child.getReadOnlyNode({ children: [] })
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

  setValue(params?: any) {
    this.store?.setModel(this, params)
    this.action('change', params)
  }

  setStyle(params: any) {}

  setAction(params: any) {}

  setOptions(params: any) {}

  setProperties(params: any) {
    for (const key in params) {
      this.properties[key] = params[key]
      if (key === 'multiple') {
        // 多选属性对应的初始值需要手动重置
        this.setValue(params[key] ? [] : '')
      }
      // 日期选择器的类型变化时，需要手动重置值
      if (this.componentType === 'datePicker' && key === 'type') {
        if (
          params[key] === 'datetimerange' ||
          params[key] === 'daterange' ||
          params[key] === 'monthrange'
        ) {
          this.setValue([])
        } else {
          this.setValue('')
        }
      }
    }
  }

  setAttrs(params: INodeOptions) {
    for (const key in params) {
      Object.hasOwnProperty.call(this, key) && (this[key] = params[key])
    }
  }

  setIndex(index: number, oldIndex?: number) {
    if (oldIndex === undefined) {
      oldIndex = this.parent?.children?.indexOf(this)
    }
    if (oldIndex === undefined || oldIndex < 0) {
      throw new Error('MoveChild error: node is not a child of this node')
    }
    this.parent?.children?.splice(oldIndex, 1)
    this.parent?.children?.splice(index, 0, this)
    this.parent?.resetChildrenIndex()
  }

  /**
   *
   * @param params
   */
  setExtendAttribute(params: any) {
    for (const key in params) {
      this.extendAttributes[key] = params[key]
    }
  }

  /**
   *
   * @param data
   */
  setData(data: Array<any>): void {
    this.data = data
    const remoteOptionProps: { label: string; value: string } = this.extendAttributes
      .remoteOptionProps || { label: 'label', value: 'value' }
    this.data = data.map((item) => {
      return {
        ...item,
        label: item[remoteOptionProps.label],
        value: item[remoteOptionProps.value]
      }
    })
  }

  /**
   *
   * @param actionName
   * @param params
   * @returns
   */
  action(actionName: NodeActionName, params: NodeActionParams) {
    const {
      remote,
      remoteFunOrUrl,
      isRemoteFun,
      linkage,
      linked,
      linkAction,
      linkTarget,
      linkTargetAction,
      remoteParams
    } = this.extendAttributes
    if (actionName === 'reset') {
      this.setValue()
    } else if (actionName === 'loadData') {
      if (linked) {
        // 如果是联动触发的，必须传入联动源值，获取联列表数据
        if (!params.$value) return
      }
      if (remote && remoteFunOrUrl) {
        // 如果是远程数据，需要调用远程接口获取数据
        this.setProperties({ loading: true })
        // 协议组装请求参数
        let reqParams: IObjectKeys<any> = {}
        if (remoteParams) {
          const { $value, args = {} } = params
          const { $value: $valueKey = undefined, ...others } = remoteParams
            ? JSON.parse(remoteParams)
            : {}
          reqParams = {
            ...args,
            ...others
          }
          if ($valueKey) reqParams[$valueKey] = $value
        }
        if (!isRemoteFun) {
          //  路径请求
          const request = this.store?.functions?.request?.fun
            ? this.store?.functions?.request.fun
            : () => {
                throw new Error('reqest is not defined')
              }
          request({ url: remoteFunOrUrl, reqParams })
            .then((res: Array<any>) => {
              this.setData(res)
            })
            .finally(() => {
              this.setProperties({ loading: false })
            })
        } else {
          // 库函数名请求
          const request = this.store?.functions?.[remoteFunOrUrl]?.fun
          if (request) {
            request(reqParams)
              .then((res: Array<any>) => {
                this.setData(res)
              })
              .finally(() => {
                this.setProperties({ loading: false })
              })
          }
        }
      }
    } else if (actionName === 'change') {
      console.log('change')
    } else if (actionName === 'init') {
      // 初始化
      this.action('loadData', {})
    }
    // 联动
    if (linkage && linkTarget && actionName === linkAction) {
      // 如果配置了联动目标，需要触发联动目标的action
      const node = this.store?.getNode(linkTarget)
      if (node && linkTargetAction && linkTargetAction.length > 0) {
        // 如果配置联动目标的action，直接触发，将当前值传入
        const val = this.getModel()
        linkTargetAction.forEach((actNam: string) => {
          node.action(actNam, { $value: val, args: params })
        })
      }
    }
    // todo click 事件
    // todo show hide
  }

  /**
   *
   * @param exceptOptions 除了哪些属性
   * @returns
   */
  getReadOnlyNode(exceptOptions?: INodeOptions): INodeOptions {
    const {
      index,
      name,
      key,
      id,
      data,
      visible,
      style,
      properties,
      extendAttributes,
      actions,
      options,
      componentType,
      componentName,
      componentKey,
      componentKeyId,
      value,
      backendConfig
    } = this

    const tmp: INodeOptions = {
      index,
      name,
      key,
      id,
      data,
      visible,
      style,
      properties,
      extendAttributes,
      actions,
      options,
      componentType,
      componentName,
      componentKey,
      componentKeyId,
      backendConfig,
      value,
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

  /**
   *
   * @returns {string | null} 返回当前节点的modelKey，如果不是表单组件，返回null
   */
  getModelKey(): string | null {
    return `${this.componentType}.${this.key}`
  }

  getModel() {
    return this.store?.model![this.getModelKey()!]
  }
}

export default Node
