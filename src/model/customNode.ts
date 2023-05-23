import type { BaseNodeOptions } from './baseNode'
import BaseNode from './baseNode'

type CustomNodeOptions = {
  id: string | null
  componentType: string | null
  componentName: string
  actions: Record<string, any>
  styles: Record<string, any>
  properties: Record<string, any>
  extendAttributes: Record<string, any>
  backendConfig: Record<string, any>
  children: CustomNodeOptions[]
} & BaseNodeOptions

interface ICustomNode {
  id: string | null
  componentType: string | null
  componentName: string
  actions: Record<string, any>
  styles: Record<string, any>
  properties: Record<string, any>
  extendAttributes: Record<string, any>
  backendConfig: Record<string, any>
}

class CustomNode extends BaseNode<CustomNodeOptions> implements ICustomNode {
  id: string | null = null
  componentType = null
  componentName = ''
  actions = {}
  styles = {}
  properties = {}
  extendAttributes = {}
  backendConfig = {}
  constructor(options: CustomNodeOptions) {
    super(options)
    Object.assign(this, options)
  }

  //   get Properties() {
  //     return this.properties
  //   }
  //   set Properties(val: Record<string, any>) {}
}

export default CustomNode
