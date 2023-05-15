import { reactive, ref } from 'vue'
import type { INode, INodeOptions } from './treeNode'
import Node from './treeNode'
import { deepCopy } from '@/utils'
import type { IRuleOption } from '@/config/rules'
import type { IObjectKeys } from '@/config/common'
import { formFields } from '@/config/fields'

export interface IFunOption {
  label: string
  key: string
  fun: (params: { url: string; params?: any; method?: 'GET' | 'POST' } | Object) => Promise<any>
}

export interface IFunctions {
  [key: string]: IFunOption
}

// todo: 公共字典
type DictionaryOption = {
  label: string
  value: string | number
  options: Array<any>
  remote: boolean
  url: string
}

export interface ITreeStore {
  currentNode: INode | null
  currentNodeKey: string | null
  nodesMap: Map<string, INode>
  root?: INode | null
  model: IObjectKeys<any> | null
  functions: IObjectKeys<IFunOption>
  dictionnary: IObjectKeys<DictionaryOption>
  rules: IObjectKeys<IRuleOption>
  initialize(nodeOptions?: INodeOptions, mergeParams?: any): void
  getCurrentNode(): INode | null
  setCurrentNode(node: INode | null): void
  setCurrentNodeKey(key: string | null): void
  getNode(key: any): any
  registerFunctions(functions: IFunctions): void
  deregisterFunctions(key: string): void
  registerRules(rules: IObjectKeys<IRuleOption>): void
  deregisterRules(key: string): void
  registerNode(node: INode): void
  deregisterNode(node: INode): void
  registerModel(node: INode, value: any): void
  deregisterModel(node: INode): void
  createModel(): void
  setModel(node: INode, value?: any): void
}

export class Treestore implements ITreeStore {
  currentNode: INode | null = null
  currentNodeKey: string | null = null
  nodesMap = new Map<string, INode>()
  root: INode | null = null
  model: IObjectKeys<any> | null = null
  functions: IObjectKeys<IFunOption> = {}
  rules: IObjectKeys<IRuleOption> = {}
  dictionnary: IObjectKeys<DictionaryOption> = {}
  constructor(options?: any) {
    if (options && options.functions) {
      this.registerFunctions(options.functions)
    }
    if (options && options.rules) {
      this.registerRules(options.rules)
    }
  }

  initialize(nodeOptions?: INodeOptions): void {
    this.createModel()
    const options = nodeOptions
      ? nodeOptions
      : {
          componentType: 'root',
          componentName: 'root'
        }
    this.root = new Node(
      {
        ...options,
        store: this
      } as INodeOptions,
      true
    )
    this.root!.initialize(true)
  }

  registerNode(node: INode) {
    if (!this.nodesMap.get(node.key)) {
      this.nodesMap.set(node.key, node)
      // 只有表单项才需要注册model
      if (formFields.includes(node.componentType)) {
        this.registerModel(node)
      }
    }
  }

  deregisterNode(node: INode): void {
    node.children?.forEach((child) => {
      this.deregisterNode(child)
    })
    this.nodesMap.delete(node.key)
    this.deregisterModel(node)
    if (node.key === this.currentNodeKey) {
      this.setCurrentNode(null)
    }
  }

  registerModel(node: INode): void {
    const key = node.getModelKey()
    const multiple = node.properties?.multiple
    if (key) {
      // todo: 一套标准的初始化对应model的方法
      if (node.value === undefined || node.value === null) {
        this.model![key] = multiple ? ref([]) : ref(null)
      } else {
        if (node.value instanceof Array) {
          this.model![key] = ref([...node.value])
        } else if (node.value instanceof Object) {
          this.model![key] = reactive({ ...deepCopy(node.value) })
        } else {
          this.model![key] = ref(node.value)
        }
      }
    }
  }

  deregisterModel(node: INode): void {
    const key = node.getModelKey()
    if (key) {
      delete this.model![key]
    }
  }

  registerRules(rule: IObjectKeys<IRuleOption>): void {
    if (rule) {
      for (const key in rule) {
        this.rules![key] = deepCopy(rule[key])
      }
    }
  }

  deregisterRules(key: string): void {
    if (key && Object.hasOwnProperty.call(this.rules, key)) {
      delete this.rules![key]
    }
  }

  registerFunctions(func: IObjectKeys<IFunOption>): void {
    if (func) {
      for (const key in func) {
        this.functions![key] = func[key]
      }
    }
  }

  deregisterFunctions(key: string): void {
    if (key && Object.hasOwnProperty.call(this.functions, key)) {
      delete this.functions![key]
    }
  }

  getCurrentNode(): INode | null {
    return this.currentNode
  }

  setCurrentNode(node: INode | null) {
    this.currentNode = node || null
    this.currentNodeKey = node ? node.key : null
  }

  setCurrentNodeKey(key: string | null) {}

  getNode(key: any) {
    return this.nodesMap.get(key)
  }

  setModel(node: INode, value?: any): void {
    const key = node.getModelKey()!
    if (value === undefined || value === null) {
      if (this.model![key] instanceof Array) {
        this.model![key] = []
      } else if (this.model![key] instanceof Object) {
        this.model![key] = {}
      } else {
        this.model![key] = ''
      }
    } else {
      if (value instanceof Array) {
        this.model![key] = [...value]
      } else if (value instanceof Object) {
        this.model![key] = { ...deepCopy(value) }
      } else {
        this.model![key] = value
      }
    }
  }

  createModel() {
    this.model = reactive<IObjectKeys<any>>({})
  }
}

export default Treestore
