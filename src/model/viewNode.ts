import { reactive } from 'vue'
import type { ComponentType } from '@/config/fields'
import type { ITreeStore } from './viewStore'
import { deepCopy } from '@/utils'
import type { NodeActionName, NodeActionParams } from '@/config/action'
import type { IObjectKeys } from '@/config/common'
import type { INodeOptions } from './treeNode'
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
    [key: string]: Promise<any>
  }
  extendAttributes: any
  backendConfig: any
  options?: Array<any>
  componentType: ComponentType
  componentName: string
  value?: string | number | Array<any> | object | null
  children?: INode[] | null
  store?: ITreeStore
  remote?: boolean
  remoteOptionProps?: {
    label: string
    value: string
  }
  initialize(initChildren?: boolean): void
  action(key: NodeActionName, params: NodeActionParams): void
  getModelKey(): string | null
  getModel(): any
  [key: string]: any
}

export default class Node implements INode {
  parent: INode | null = null
  key: string = ''
  id: string = ''
  visible: boolean = true
  name: string = ''
  index: number = 0
  componentType: ComponentType = ''
  componentName: string = ''
  value: string | Array<any> | Number | null = null
  store?: ITreeStore | undefined
  properties: any = {}
  extendAttributes: any = {}
  options: any = {}
  actions: any = {}
  style: any = {}
  data: any = {}
  backendConfig: any = {}
  children?: Array<INode> | null = []
  constructor(options: INodeOptions, constructChildren?: boolean) {
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        if (
          [
            'properties',
            'extendAttributes',
            'style',
            'data',
            'options',
            'actions',
            'backendConfig'
          ].includes(key)
        ) {
          // 隔离数据
          ;(this as INode)[key] = deepCopy(options[key])
        } else if (key === 'children') {
          // 子节点
          if (constructChildren) {
            options.children?.forEach((child: INodeOptions) => {
              this.children?.push(reactive<INode>(new Node({ ...child, parent: this }, true)))
            })
          }
        } else {
          // parent, store 直接引用
          ;(this as INode)[key] = options[key]
        }
      }
    }
  }

  initialize(initChildren?: boolean) {
    const store = this.store
    if (!store) {
      throw new Error('store is not defined')
    }
    if (initChildren && this.children?.length) {
      this.children.forEach((child: INode) => {
        child.store = this.store
        child.initialize(initChildren)
      })
    }
    store.registerNode(this)
    this.action('init', null)
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
   * data 作为数据栈，存储当前节点的数据
   * @param data
   */
  setData(data: Array<any>): void {
    this.data = data
    const remoteOptionProps: { label: string; value: string } =
      this.extendAttributes.remoteOptionProps
    this.options = data.map((item) => {
      return {
        label: item[remoteOptionProps.label],
        value: item[remoteOptionProps.value]
      }
    })
  }

  /**
   *
   *
   * */
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
   * 更改当前节点的值
   * @param exceptOptions 除了哪些属性
   * @returns
   * @memberof Node
   *
   * */
  setValue(params?: any) {
    this.store?.setModel(this, params)
    this.action('change', params)
  }

  /**
   * 获取当前节点的值
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
  // 获取组件的key
  getModelKey(): string | null {
    return `${this.componentType}.${this.key}`
  }
  // 获取组件的值
  getModel() {
    return this.store?.model![this.getModelKey()!]
  }
}
