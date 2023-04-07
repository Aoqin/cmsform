import { type reactive } from 'vue'

export interface INode {
  name: string
  id?: string | null
  key?: string
  componentType: string
  componentName: string
  children?: Array<INode> | null
  style: any
  action: any
  attribute: any
  value?: string | null
  options?: Array<any>
}

export class Node implements INode {
  name: string = ''
  id: string = ''
  key: string = ''
  componentType: string = ''
  componentName: string = ''
  children: INode[] | undefined = []
  style: Object = {}
  action: Object = {}
  attribute: Object = {}
  value = null
  constructor(params: Node) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        // if (params[key]) {
        // }
      }
    }
    // deepClone(this.style, style)
    // deepClone(this.action, action)
    // deepClone(this.attribute, attribute)
    // children && this.addChildren(children)
  }

  addChildren(children: Array<INode>) {}
  removeChildren(children: Array<INode>) {}
  resetChild(children: Array<INode>) {}
}

// function deepClone(target, source) {}
