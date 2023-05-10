import type { INode } from '@/model/treeNode'

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
  isAllowSelect: boolean // 是否允许选择
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
}

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
}

/**
 *
 * @param node
 * @returns
 */

export function getComponentConfig(node: INode): FormComponent {
  const comp = nodeMapToComponent(node) as ContainerConfig

  //
  return {
    containerConfigs: comp.containerConfigs,
    fileConfigs: comp.fileConfigs,
    innerConfigs: comp.innerConfigs,
    inputConfigs: comp.inputConfigs,
    selectionConfigs: comp.selectionConfigs,
    formConfigName: '',
    formConfigId: '',
    formConfigRemark: '',
    formCssConfig: ''
  }
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

export function getContainerConfig(node: INode): FormComponent {
  const container: ContainerConfig = nodeMapToComponent(node) as ContainerConfig

  return {
    innerConfigs: container.innerConfigs,
    containerConfigs: container.containerConfigs,
    fileConfigs: container.fileConfigs,
    inputConfigs: container.inputConfigs,
    selectionConfigs: container.selectionConfigs,
    formConfigName: '',
    formCssConfig: '',
    formConfigId: ''
  }
}

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
    key: displayKey,
    index: customSort,
    parent,
    id,
    properties,
    options,
    extendAttributes,
    backendConfig
  } = node
  const { label: componentName, multiple, maxlength, minlength } = properties
  const { searchable, isbuildIn, innerComponentCode, innerComponentType } = backendConfig

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
    isAllowSelect: searchable ? true : false
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
    } else {
      // 容器组件 包括 flexContainer, container, row, col,tabs,tabPane
      if (componentType === 'flexContainer') {
        othersProps.isDynamic = true
      }
    }
    const containerConfigs: ContainerConfig[] = []
    const fileConfigs: FileComponent[] = []
    const innerConfigs: InnerComponent[] = []
    const inputConfigs: InputComponent[] = []
    const selectionConfigs: SelectionComponent[] = []
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: INode) => {
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
      })
    }
    othersProps.containerConfigs = containerConfigs
    othersProps.fileConfigs = fileConfigs
    othersProps.innerConfigs = innerConfigs
    othersProps.inputConfigs = inputConfigs
    othersProps.selectionConfigs = selectionConfigs
  } else if (isInput(componentType)) {
    // 输入框组件 包括 input,datePicker
    othersProps.maxLimit = properties.maxlength
    othersProps.minLimit = properties.minlength
    othersProps.verifyRegex = properties.pattern
    othersProps.inputType = backendConfig.inputType ? 'text' : backendConfig.inputType
  } else if (isSelection(componentType)) {
    // 选择组件 包括 radio，checkbox，select，cascader
    othersProps.selectionType = multiple ? 'multi_select' : 'select'
    if (!remote && options) {
      othersProps.selectionValueList = options.map((option) => ({
        label: option.label,
        value: option.value
      }))
    }
  } else if (isFile(componentType)) {
    // 文件组件 包括image，upload
    othersProps.fileTypes = properties.accept
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

function componentMapToNode(component): INode {}
