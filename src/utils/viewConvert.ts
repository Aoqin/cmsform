import type { INode, INodeOptions } from '@/model/treeNode'
import { deepCopy } from './index'
import { formFields, type ComponentType } from '@/config/fields'

type componentType =
  | 'INPUT'
  | 'SELECTION'
  | 'FILE'
  | 'INNER'
  | 'CONTAINER'
  | 'INNER_CONTAINER'
  | 'COMMON'

type formComponent = {
  childFormComponents: formComponent[]
  componentAuthType: 0 | 1 | 2 | 3
  componentKey: string
  componentKeyId: string
  componentName: string
  componentRemark: string
  componentType: componentType
  customSort: number
  displayKey: string
  id: string
  innerComponentCode: string
  inputType: string
  isDynamic: 0 | 1
  parentContainerId: string
}

export function viewConfigBuilder(
  comps: formComponent[],
  frontMap: Record<string, any>,
  valueConfg?: Record<string, any>
): INodeOptions {
  const option = {
    componentType: 'form' as ComponentType,
    componentKey: '',
    componentName: 'form',
    children: comps.map((item) => convertCompToNode(item, frontMap, valueConfg))
  }

  return option
}

/**
 * 后端配置转换为前端配置
 * @param formComponent - 后端配置
 * @param frontMap - 前端配置映射
 * @param compValConfig - 后端配置对应的值配置
 * @returns
 */
function convertCompToNode(
  formComponent: formComponent,
  frontMap: Record<string, INodeOptions>,
  compValConfig?: Record<string, any>
): INodeOptions {
  const {
    displayKey,
    componentKey,
    componentKeyId,
    childFormComponents = [],
    componentName
  } = formComponent
  const record = deepCopy(frontMap[displayKey])

  let children = []
  if (record.componentType === 'flexContainer') {
    const childVolCon = compValConfig![componentKey]
    if (
      childVolCon[componentKey] &&
      childFormComponents &&
      childVolCon[componentKey].length > childFormComponents.length
    ) {
      // 返回的值配置中，子容器的值的数量大于前端配置的子容器数量，需要根据值的数量生成前端配置的子容器
      const firstChild = childFormComponents[0]
      children = childVolCon[componentKey].map((item: any, index: number) => {
        const valConfConvert: Record<string, any> = {}
        valConfConvert[componentKey] = compValConfig![componentKey][firstChild.componentKey][index]
        return convertCompToNode({ ...deepCopy(firstChild) }, frontMap, valConfConvert)
      })
      //
      for (let i = childFormComponents.length; i < childVolCon[componentKey].length; i++) {
        handleDelKey(children[i])
      }
    } else if (childFormComponents && childFormComponents.length > 0) {
      children = childFormComponents.map((item, index) => {
        const valConfConvert: Record<string, any> = {}
        valConfConvert[componentKey] = compValConfig![componentKey][item.componentKey][index]
        return convertCompToNode(item, frontMap, valConfConvert)
      })
    }
    console.log(children)
  } else {
    children =
      childFormComponents && childFormComponents.length > 0
        ? childFormComponents.map((item) =>
            convertCompToNode(
              item,
              frontMap,
              compValConfig ? compValConfig[componentKey] : undefined
            )
          )
        : []
  }
  let val
  if (compValConfig) {
    // 后端配置树与值树结构一直，约定一一对应
    if (formFields.includes(record.componentType!)) {
      // 只有表单组件才有值
      val = compValConfig[componentKey]
    }
  }
  const options: INodeOptions = {
    ...record,
    key: displayKey,
    componentName,
    componentKey,
    componentKeyId,
    children
  }

  if (val !== undefined) {
    options.value = val
  }
  return options
}

export function convertNodeToComp(node: INode) {
  const tmp: Record<string, any> = {}
  if (formFields.includes(node.componentType)) {
    const val = node.store!.model![node.getModelKey()!]
    if (val instanceof Array) {
      tmp[node.componentKey] = val.join(',')
    } else {
      tmp[node.componentKey] = val
    }
  } else {
    // 非表单组件
    const children = node.children
    if (children && children.length > 0) {
      if (node.backendConfig.isDynamic) {
        // 动态组件 特定的组装方式
        tmp[node.componentKey] = []
        let dynamicObj: Record<any, string> = {}
        children.forEach((item) => {
          dynamicObj = {
            ...dynamicObj,
            ...convertNodeToComp(item)
          }
        })
        tmp[node.componentKey].push(dynamicObj)
      } else {
        tmp[node.componentKey] = {}
        if (node.componentType === 'flexContainer') {
          // flexContainer 特定的组装方式
          children.forEach((item) => {
            const itemCon = convertNodeToComp(item)
            for (const key in itemCon) {
              if (tmp[node.componentKey][key] instanceof Array) {
                if (itemCon[key][0]) {
                  tmp[node.componentKey][key].push(itemCon[key][0])
                }
              } else {
                tmp[node.componentKey][key] = itemCon[key]
              }
            }
          })
        } else {
          children.forEach((item) => {
            tmp[node.componentKey] = {
              ...tmp[node.componentKey],
              ...convertNodeToComp(item)
            }
          })
        }
      }
    }
  }
  return tmp
}

/**
 * 置空key
 * @param params
 */
function handleDelKey(params: INodeOptions) {
  if (params.children && params.children.length > 0) {
    params.children.forEach((item) => {
      handleDelKey(item)
    })
  }
  params.key = ''
}
