import type { IObjectKeys } from '@/config/common'
import type { INode } from '@/model/treeNode'
import Node from '@/model/treeNode'
import type { INodeOptions } from '@/model/viewNode'

type BaseComponent = {
  id: string // 组件id
  componentKey: string // 组件key
  componentKeyId: string // 组件key唯一标识，新增时不需要传该字段
  componentName: string // 组件名称
  componentRemark: string // 组件备注
  customSort: number // 自定义排序
  displayKey: string // 组件展示key 对应 key
  errorMsg: string // 组件错误信息
  optTip: string // 操作提示
  parentContainerId: string // 父容器id
  isAllowSelect: number // 是否允许选择
}

type FileComponent = {
  fileNameVerifyRegex: string // 文件名校验正则
  fileTypes: string // 文件类型
  maxFileName: number // 文件名最大长度
  maxSingleFileSize: number // 单个文件大小最大值，单位为kb，保留四位小数
  maxTotalFileSize: number // 总文件大小最大值，单位为kb，保留四位小数
  maxUploadNum: number // 最大上传数量
  minFileName: number // 文件名最小长度
  minSingleFileSize: number // 单个文件大小最小值，单位为kb，保留四位小数
  minTotalFileSize: number // 总文件大小最小值，单位为kb，保留四位小数
  minUploadNum: number // 最小上传数量
} & BaseComponent

type InputComponent = {
  inputType: string // 输入框类型
  maxLimit: number // 最大长度
  minLimit: number // 最小长度
  verifyRegex: string // 校验正则
} & BaseComponent

type SelectionComponent = {
  selectionType: 'select' | 'multi_select' // 选择类型
  selectionValueList: { label: string; value: string }[]
  defaultSelectionValueList: { label: string; value: string }[]
} & BaseComponent

type InnerComponent = {
  innerComponentCode: string // 内部组件code
  innerComponentType: string // 内部组件类型
} & BaseComponent

type ContainerConfig = {
  componentContainerType: string // 容器类型
  containerConfigs: [] // 容器组件值
  innerComponentCode: string // 内部组件code
  innerExtConfig: []
  fileConfigs: FileComponent[] // 文件组件值
  innerConfigs: InnerComponent[] // 内部组件值
  inputConfigs: InputComponent[] // 输入框组件值
  selectionConfigs: SelectionComponent[] // 选择组件值
  isDynamic: 0 | 1 // 是否动态
  maxLimit: number // 最大允许添加长度
  minLimit: number // 最小允许添加长度
} & BaseComponent

type FormComponent = {
  containerConfigs: ContainerConfig[]
  fileConfigs: FileComponent[]
  innerConfigs: InnerComponent[]
  inputConfigs: InputComponent[]
  selectionConfigs: SelectionComponent[]
  formConfigName: string // 表单配置名称
  formConfigRemark: string // 表单配置备注
  formConfigId: string // 表单配置id
  formCssConfig: string // 表单css配置
  formConfigCode: string // 表单配置code
}

type ResponseNode = {
  inputConfigs?: InputComponent[]
  selectionConfigs?: SelectionComponent[]
  fileConfigs?: FileComponent[]
  containerConfigs?: ContainerConfig[]
  innerConfigs?: InnerComponent[]
}

type Components =
  | FileComponent
  | InputComponent
  | SelectionComponent
  | InnerComponent
  | ContainerConfig

export type ViewResponse = {
  formConfigVo: {
    formConfigId: string
    formConfigName: string
    formConfigCode: string
    formConfigRemark: string
    formCssConfig: string
    formVersion: 1 | 2
    formType: 1 | 2
    configStatus: 1 | 2
  }
  formComponentDetailVo: ResponseNode
}

const isContainer = (componentType: string): boolean => {
  return [
    'container',
    'flexContainer',
    'row',
    'col',
    'tabs',
    'tabPane',
    'divider',
    'link',
    'form',
    'root'
  ].includes(componentType)
}

const isInput = (componentType: string): boolean => {
  return ['input', 'datePicker', 'timePicker'].includes(componentType)
}

const isSelection = (componentType: string): boolean => {
  return ['select', 'checkbox', 'radio', 'cascader'].includes(componentType)
}

const isFile = (componentType: string): boolean => {
  return ['upload', 'image'].includes(componentType)
}

/**
 * 将node树转换后端需要的数据结构
 * @param node
 * @returns
 */
export function getComponentConfig(node: INode): FormComponent {
  const comp = nodeMapToComponent(node) as ContainerConfig
  const formCssConfig: IObjectKeys<any> = {}
  const nodesMap = node.store!.nodesMap
  nodesMap.forEach((_node: INode, _key: string) => {
    formCssConfig[_key] = getNodeCssConfig(_node)
  })
  //
  return {
    containerConfigs: comp.containerConfigs,
    fileConfigs: comp.fileConfigs,
    innerConfigs: comp.innerConfigs,
    inputConfigs: comp.inputConfigs,
    selectionConfigs: comp.selectionConfigs,
    formConfigName: node.componentName,
    formConfigId: '',
    formConfigCode: node.componentKey,
    formConfigRemark: node.extendAttributes?.remark || '',
    formCssConfig: JSON.stringify(formCssConfig)
  }
}

/**
 * 根据后端返回的数据结构，转换为node树
 * @param response
 */
export function getContainerConfig(response: ViewResponse): INodeOptions {
  const {
    formConfigVo: {
      formConfigName,
      formConfigId,
      formConfigCode,
      formConfigRemark,
      formVersion,
      formCssConfig
    },
    formComponentDetailVo: {
      inputConfigs = [],
      selectionConfigs = [],
      fileConfigs = [],
      containerConfigs = [],
      innerConfigs = []
    }
  } = response
  const nodeMap = new Map(Object.entries(JSON.parse(formCssConfig)))
  const children = [
    ...inputConfigs,
    ...selectionConfigs,
    ...fileConfigs,
    ...containerConfigs,
    ...innerConfigs
  ].sort((a, b) => a.customSort - b.customSort)
  const root: INodeOptions = {
    componentType: 'root',
    componentKey: formConfigCode,
    componentName: formConfigName,
    extendAttributes: {
      remark: formConfigRemark
    },
    children: []
  }
  children.forEach((comp: Components) => {
    root.children!.push(componentMapToNode(comp, nodeMap as Map<string, INodeOptions>))
  })

  return root
}

/**
 * node 转换为后端对应的model
 * @param node
 * @returns
 */
function nodeMapToComponent(
  node: INode
):
  | InnerComponent
  | InputComponent
  | SelectionComponent
  | FileComponent
  | ContainerConfig
  | BaseComponent {
  const {
    componentKey,
    componentKeyId,
    componentType,
    componentName,
    key: displayKey,
    index: customSort,
    parent,
    id,
    properties,
    options,
    extendAttributes,
    backendConfig
  } = node
  const { multiple, maxlength, minlength } = properties
  const {
    isAllowSelect = 0,
    isbuildIn,
    innerComponentCode,
    innerComponentType,
    inputType,
    selectionType,
    componentContainerType = 'COMMON'
  } = backendConfig

  const { remote } = extendAttributes

  const comp: BaseComponent = {
    id,
    componentKey,
    componentKeyId,
    displayKey,
    componentName,
    customSort,
    parentContainerId: parent ? parent.componentKeyId : '',
    errorMsg: '', // todo
    optTip: '', // todo
    isAllowSelect
  }
  const othersProps: { [key: string]: any } = {}

  // 后端提供了6种类型组件
  if (isContainer(componentType)) {
    // 容器组件又分为两种，一种是内置容器组件，一种是普通容器组件
    // 表单容器
    if (isbuildIn) {
      // 内置容器组件
      othersProps.innerComponentCode = innerComponentCode
      othersProps.innerComponentType = innerComponentType
    }
    // 容器组件 包括 flexContainer, container, row, col,tabs,tabPane

    const containerConfigs: ContainerConfig[] = []
    const fileConfigs: FileComponent[] = []
    const innerConfigs: InnerComponent[] = []
    const inputConfigs: InputComponent[] = []
    const selectionConfigs: SelectionComponent[] = []
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: INode, index: number) => {
        const childComp = nodeMapToComponent(child)
        if (isContainer(child.componentType)) {
          if (child.backendConfig.isbuildIn) {
            innerConfigs.push(childComp as InnerComponent)
          } else {
            containerConfigs.push(childComp as ContainerConfig)
          }
        } else if (isFile(child.componentType)) {
          fileConfigs.push(childComp as FileComponent)
        } else if (isInput(child.componentType)) {
          inputConfigs.push(childComp as InputComponent)
        } else if (isSelection(child.componentType)) {
          selectionConfigs.push(childComp as SelectionComponent)
        }
        childComp.customSort = index
      })
    }
    othersProps.containerConfigs = containerConfigs
    othersProps.componentContainerType = componentContainerType
    othersProps.fileConfigs = fileConfigs
    othersProps.innerConfigs = innerConfigs
    othersProps.inputConfigs = inputConfigs
    othersProps.selectionConfigs = selectionConfigs
    othersProps.isDynamic = 0
    if (componentType === 'flexContainer') {
      othersProps.isDynamic = 1
    }
  } else if (isInput(componentType)) {
    // 输入框组件 包括 input,datePicker
    othersProps.maxLimit = properties.maxlength
    othersProps.minLimit = properties.minlength
    othersProps.verifyRegex = properties.pattern
    if (inputType) {
      othersProps.inputType = inputType
    } else {
      switch (componentType) {
        case 'datePicker':
          othersProps.inputType = 'DATE'
          break
        default:
          othersProps.inputType = 'INPUT'
      }
    }
  } else if (isSelection(componentType)) {
    // 选择组件 包括 radio，checkbox，select，cascader
    if (selectionType) {
      othersProps.selectionType = selectionType
    } else {
      switch (componentType) {
        case 'checkbox':
          othersProps.selectionType = 'multi_select'
          break
        case 'select':
        case 'cascader':
          othersProps.selectionType = multiple ? 'multi_select' : 'select'
          break
        default:
          othersProps.selectionType = 'select'
      }
    }
    if (!remote && options) {
      othersProps.selectionValueList = options.map((option) => ({
        label: option.label,
        value: option.value
      }))
    }
  } else if (isFile(componentType)) {
    // 文件组件 包括image，upload
    othersProps.fileTypes = properties.accept ? properties.accept.join(',') : ''
    othersProps.maxUploadNum = properties.limit
    othersProps.maxSingleFileSize = properties.limitSize
    othersProps.maxFileName = backendConfig.maxFileName
    othersProps.fileNameVerifyRegex = backendConfig.fileNameVerifyRegex
    othersProps.maxTotalFileSize = backendConfig.maxTotalFileSize
    othersProps.minUploadNum = backendConfig.minUploadNum || 1
  }

  return {
    ...comp,
    ...othersProps
  }
}

/**
 * component 生成 node
 * @param component
 * @param nodeMap
 * @returns
 */
function componentMapToNode(
  component: Components,
  nodeMap: Map<string, INodeOptions>
): INodeOptions {
  const { componentKeyId, displayKey, customSort: index, id } = component
  let {
    innerConfigs = [],
    containerConfigs = [],
    fileConfigs = [],
    inputConfigs = [],
    selectionConfigs = []
  } = component
  // 后端可能返回null 值
  innerConfigs = innerConfigs || []
  containerConfigs = containerConfigs || []
  fileConfigs = fileConfigs || []
  inputConfigs = inputConfigs || []
  selectionConfigs = selectionConfigs || []

  const options: INodeOptions = {
    ...nodeMap.get(displayKey),
    componentKeyId,
    id,
    index
  }

  options.children = [
    ...innerConfigs,
    ...containerConfigs,
    ...fileConfigs,
    ...inputConfigs,
    ...selectionConfigs
  ]
    .sort((a, b) => a.customSort - b.customSort)
    .map((child) => componentMapToNode(child, nodeMap))
  return options
}

/**
 * node 对应的 readonlyNode
 * 可根据readonlyNode生成node
 * @param node
 * @returns
 */
function getNodeCssConfig(node: INode): any {
  const { remote } = node.extendAttributes
  const exceptOptions: IObjectKeys<any> = {
    children: []
  }
  if (remote) {
    exceptOptions.options = []
  }
  const result = node.getReadOnlyNode(exceptOptions)
  result.parentKey = node.parent ? node.parent.key : ''
  delete result.parent

  return result
}
