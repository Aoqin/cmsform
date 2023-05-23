import type { IBaseNode } from './baseNode'

interface IOperateNode {
  styles: Record<string, any>
  properties: Record<string, any>
  actions: Record<string, any>
  componentName: string
  componentType: string
}

class OperateNode implements IOperateNode, IBaseNode<OperateNode> {
  index: number = 0
  name: string = ''
  key: string = ''
  data: any = []
  visible: boolean = false
  value: any = null
  children: OperateNode[] = []
  constructor(options: any) {
    Object.assign(this, options)
  }
}

export default OperateNode
