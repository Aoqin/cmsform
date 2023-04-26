import { reactive, ref } from 'vue'
import type { INode, INodeOptions } from './treeNode'
import node from './treeNode'
import { deepCopy } from '@/utils'
import type { IRuleOption } from '@/config/rules'
import type { IObjectKeys } from '@/config/common'

export interface IFunOption {
  label: string
  key: string
  fun: (params: { url: string; params: any; method?: 'GET' | 'POST' } | Object) => Promise<any>
}

export interface IFunctions {
  [key: string]: IFunOption
}

export interface ITreeStore {
  currentNode: INode | null
  currentNodeKey: string | null
  nodesMap: Map<string, INode>
  root?: INode | null
  model: IObjectKeys<any> | null
  functions: IObjectKeys<IFunOption>
  rules: IObjectKeys<IRuleOption>
  initialize(mergeParams?: any): void
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
  constructor(options?: any) {
    if (options && options.functions) {
      this.registerFunctions(options.functions)
    }
    if (options && options.rules) {
      this.registerRules(options.rules)
    }
  }
  initialize(mergeParams?: INodeOptions) {
    this.root = new node({
      store: this,
      ...mergeParams
    })
    this.createModel()
    this.root!.initialize()
  }
  registerNode(node: INode) {
    if (!this.nodesMap.get(node.key)) {
      this.nodesMap.set(node.key, node)
      this.registerModel(node)
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
      if (this.model![key] instanceof Object) {
        this.model![key].value = {}
      } else if (this.model![key] instanceof Array) {
        this.model![key].value = []
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

// class TreeStoreClone {
//   constructor(options) {
//     this.currentNode = null
//     this.currentNodeKey = null
//     for (const option in options) {
//       if (shared.hasOwn(options, option)) {
//         this[option] = options[option]
//       }
//     }
//     this.nodesMap = {}
//   }
//   initialize() {
//     this.root = new node['default']({
//       data: this.data,
//       store: this
//     })
//     this.root.initialize()
//     if (this.lazy && this.load) {
//       const loadFn = this.load
//       loadFn(this.root, (data) => {
//         this.root.doCreateChildren(data)
//         this._initDefaultCheckedNodes()
//       })
//     } else {
//       this._initDefaultCheckedNodes()
//     }
//   }
//   filter(value) {
//     const filterNodeMethod = this.filterNodeMethod
//     const lazy = this.lazy
//     const traverse = function (node) {
//       const childNodes = node.root ? node.root.childNodes : node.childNodes
//       childNodes.forEach((child) => {
//         child.visible = filterNodeMethod.call(child, value, child.data, child)
//         traverse(child)
//       })
//       if (!node.visible && childNodes.length) {
//         let allHidden = true
//         allHidden = !childNodes.some((child) => child.visible)
//         if (node.root) {
//           node.root.visible = allHidden === false
//         } else {
//           node.visible = allHidden === false
//         }
//       }
//       if (!value) return
//       if (node.visible && !node.isLeaf && !lazy) node.expand()
//     }
//     traverse(this)
//   }
//   setData(newVal) {
//     const instanceChanged = newVal !== this.root.data
//     if (instanceChanged) {
//       this.root.setData(newVal)
//       this._initDefaultCheckedNodes()
//     } else {
//       this.root.updateChildren()
//     }
//   }
//   getNode(data) {
//     if (data instanceof node['default']) return data
//     const key = shared.isObject(data) ? util.getNodeKey(this.key, data) : data
//     return this.nodesMap[key] || null
//   }
//   insertBefore(data, refData) {
//     const refNode = this.getNode(refData)
//     refNode.parent.insertBefore({ data }, refNode)
//   }
//   insertAfter(data, refData) {
//     const refNode = this.getNode(refData)
//     refNode.parent.insertAfter({ data }, refNode)
//   }
//   remove(data) {
//     const node = this.getNode(data)
//     if (node && node.parent) {
//       if (node === this.currentNode) {
//         this.currentNode = null
//       }
//       node.parent.removeChild(node)
//     }
//   }
//   append(data, parentData) {
//     const parentNode = parentData ? this.getNode(parentData) : this.root
//     if (parentNode) {
//       parentNode.insertChild({ data })
//     }
//   }
//   _initDefaultCheckedNodes() {
//     const defaultCheckedKeys = this.defaultCheckedKeys || []
//     const nodesMap = this.nodesMap
//     defaultCheckedKeys.forEach((checkedKey) => {
//       const node = nodesMap[checkedKey]
//       if (node) {
//         node.setChecked(true, !this.checkStrictly)
//       }
//     })
//   }
//   _initDefaultCheckedNode(node) {
//     const defaultCheckedKeys = this.defaultCheckedKeys || []
//     if (defaultCheckedKeys.includes(node.key)) {
//       node.setChecked(true, !this.checkStrictly)
//     }
//   }
//   setDefaultCheckedKey(newVal) {
//     if (newVal !== this.defaultCheckedKeys) {
//       this.defaultCheckedKeys = newVal
//       this._initDefaultCheckedNodes()
//     }
//   }
//   registerNode(node) {
//     const key = this.key
//     if (!node || !node.data) return
//     if (!key) {
//       this.nodesMap[node.id] = node
//     } else {
//       const nodeKey = node.key
//       if (nodeKey !== void 0) this.nodesMap[node.key] = node
//     }
//   }
//   deregisterNode(node) {
//     const key = this.key
//     if (!key || !node || !node.data) return
//     node.childNodes.forEach((child) => {
//       this.deregisterNode(child)
//     })
//     delete this.nodesMap[node.key]
//   }
//   getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
//     const checkedNodes = []
//     const traverse = function (node) {
//       const childNodes = node.root ? node.root.childNodes : node.childNodes
//       childNodes.forEach((child) => {
//         if (
//           (child.checked || (includeHalfChecked && child.indeterminate)) &&
//           (!leafOnly || (leafOnly && child.isLeaf))
//         ) {
//           checkedNodes.push(child.data)
//         }
//         traverse(child)
//       })
//     }
//     traverse(this)
//     return checkedNodes
//   }
//   getCheckedKeys(leafOnly = false) {
//     return this.getCheckedNodes(leafOnly).map((data) => (data || {})[this.key])
//   }
//   getHalfCheckedNodes() {
//     const nodes = []
//     const traverse = function (node) {
//       const childNodes = node.root ? node.root.childNodes : node.childNodes
//       childNodes.forEach((child) => {
//         if (child.indeterminate) {
//           nodes.push(child.data)
//         }
//         traverse(child)
//       })
//     }
//     traverse(this)
//     return nodes
//   }
//   getHalfCheckedKeys() {
//     return this.getHalfCheckedNodes().map((data) => (data || {})[this.key])
//   }
//   _getAllNodes() {
//     const allNodes = []
//     const nodesMap = this.nodesMap
//     for (const nodeKey in nodesMap) {
//       if (shared.hasOwn(nodesMap, nodeKey)) {
//         allNodes.push(nodesMap[nodeKey])
//       }
//     }
//     return allNodes
//   }
//   updateChildren(key, data) {
//     const node = this.nodesMap[key]
//     if (!node) return
//     const childNodes = node.childNodes
//     for (let i = childNodes.length - 1; i >= 0; i--) {
//       const child = childNodes[i]
//       this.remove(child.data)
//     }
//     for (let i = 0, j = data.length; i < j; i++) {
//       const child = data[i]
//       this.append(child, node.data)
//     }
//   }
//   _setCheckedKeys(key, leafOnly = false, checkedKeys) {
//     const allNodes = this._getAllNodes().sort((a, b) => b.level - a.level)
//     const cache = /* @__PURE__ */ Object.create(null)
//     const keys = Object.keys(checkedKeys)
//     allNodes.forEach((node) => node.setChecked(false, false))
//     for (let i = 0, j = allNodes.length; i < j; i++) {
//       const node = allNodes[i]
//       const nodeKey = node.data[key].toString()
//       const checked = keys.includes(nodeKey)
//       if (!checked) {
//         if (node.checked && !cache[nodeKey]) {
//           node.setChecked(false, false)
//         }
//         continue
//       }
//       let parent = node.parent
//       while (parent && parent.level > 0) {
//         cache[parent.data[key]] = true
//         parent = parent.parent
//       }
//       if (node.isLeaf || this.checkStrictly) {
//         node.setChecked(true, false)
//         continue
//       }
//       node.setChecked(true, true)
//       if (leafOnly) {
//         node.setChecked(false, false)
//         const traverse = function (node2) {
//           const childNodes = node2.childNodes
//           childNodes.forEach((child) => {
//             if (!child.isLeaf) {
//               child.setChecked(false, false)
//             }
//             traverse(child)
//           })
//         }
//         traverse(node)
//       }
//     }
//   }
//   setCheckedNodes(array, leafOnly = false) {
//     const key = this.key
//     const checkedKeys = {}
//     array.forEach((item) => {
//       checkedKeys[(item || {})[key]] = true
//     })
//     this._setCheckedKeys(key, leafOnly, checkedKeys)
//   }
//   setCheckedKeys(keys, leafOnly = false) {
//     this.defaultCheckedKeys = keys
//     const key = this.key
//     const checkedKeys = {}
//     keys.forEach((key2) => {
//       checkedKeys[key2] = true
//     })
//     this._setCheckedKeys(key, leafOnly, checkedKeys)
//   }
//   setDefaultExpandedKeys(keys) {
//     keys = keys || []
//     this.defaultExpandedKeys = keys
//     keys.forEach((key) => {
//       const node = this.getNode(key)
//       if (node) node.expand(null, this.autoExpandParent)
//     })
//   }
//   setChecked(data, checked, deep) {
//     const node = this.getNode(data)
//     if (node) {
//       node.setChecked(!!checked, deep)
//     }
//   }
//   getCurrentNode() {
//     return this.currentNode
//   }
//   setCurrentNode(currentNode) {
//     const prevCurrentNode = this.currentNode
//     if (prevCurrentNode) {
//       prevCurrentNode.isCurrent = false
//     }
//     this.currentNode = currentNode
//     this.currentNode.isCurrent = true
//   }
//   setUserCurrentNode(node, shouldAutoExpandParent = true) {
//     const key = node[this.key]
//     const currNode = this.nodesMap[key]
//     this.setCurrentNode(currNode)
//     if (shouldAutoExpandParent && this.currentNode.level > 1) {
//       this.currentNode.parent.expand(null, true)
//     }
//   }
//   setCurrentNodeKey(key, shouldAutoExpandParent = true) {
//     if (key === null || key === void 0) {
//       this.currentNode && (this.currentNode.isCurrent = false)
//       this.currentNode = null
//       return
//     }
//     const node = this.getNode(key)
//     if (node) {
//       this.setCurrentNode(node)
//       if (shouldAutoExpandParent && this.currentNode.level > 1) {
//         this.currentNode.parent.expand(null, true)
//       }
//     }
//   }
// }
