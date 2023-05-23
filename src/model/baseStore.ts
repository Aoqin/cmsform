type BaseStoreOptions = {
  // currentNode: T | null
}

export interface IBaseStore<T> {
  currentNode: T | null
  currentNodeKey: string | null
  nodesMap: Map<string, T>
  root?: T | null
  model: Record<string, any> | null
  registerNode(node: T): void
  registerModel(node: T, value: any): void
  deregisterNode(node: T): void
  deregisterModel(node: T): void
  initialize(nodeOptions?: any): void
}

export class BaseStore<T> implements IBaseStore<T> {
  currentNode: T | null = null
  currentNodeKey: string | null = null
  nodesMap = new Map<string, T>()
  root: T | null = null
  model: Record<string, any> | null = null
  constructor(options?: any) {}

  initialize(nodeOptions?: any): void {}

  registerNode(node: T): void {}
  deregisterNode(node: T): void {}

  registerModel(node: T, value: any): void {}
  deregisterModel(node: T): void {}
}

export default BaseStore
