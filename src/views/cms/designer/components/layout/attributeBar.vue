<template>
  <div class="padding">
    <el-form
      v-if="node"
      ref="attributeFormEl"
      :rules="rules"
      :inline="false"
      label-width="60px"
      label-position="top"
    >
      <el-form-item label="key">
        <el-input :modelValue="node.key">
          <template #append>
            <el-link @click="copy"> 点击复制 </el-link>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="componentKey">
        <el-input v-model="node!.componentKey" placeholder="" />
      </el-form-item>
      <!-- <el-form-item label="name">
        <el-input v-model="node!.name" />
      </el-form-item> -->
      <!-- 表单项通用配置 -->
      <el-form-item label="label">
        <el-input :modelValue="properties.label" @update:modelValue="setLabel($event)">
          <template #append>
            <el-switch
              :modelValue="extendAttributes.hideLabel"
              active-text="隐藏"
              @update:modelValue="setExtendAttribute('hideLabel', $event)"
            />
          </template>
        </el-input>
      </el-form-item>
      <template v-if="IsFormFiled">
        <el-form-item label="placeholder">
          <el-input
            :modelValue="properties.placeholder"
            @update:modelValue="setProperties('placeholder', $event)"
          />
        </el-form-item>
        <el-form-item label="disabled">
          <el-switch
            :modelValue="properties.disabled"
            @update:modelValue="setProperties('disabled', $event)"
          />
        </el-form-item>
        <!-- 表单项通用配置信息 end -->
        <!-- action 配置 -->
        <!-- 
        <el-form-item label="action">
          <el-switch
            :modelValue="extendAttributes.action"
            @update:modelValue="setExtendAttribute('action', $event)"
          />
        </el-form-item>
        <el-form-item label="actions">
          <el-select placeholder="">
            <el-option
              v-for="item in actionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click="addAction(item)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="actionconfig">
          <div class="" v-for="(item, index) in actions" :key="`action_${index}`">
            <el-input
              :modelValue="item.actionFunName"
              @update:modelValue="setExtendAttribute('actionText', $event)"
            />
            <el-input v-model="item.params" placeholder="" />
          </div>
        </el-form-item>
         -->
        <!-- action 配置end -->
      </template>
      <!-- 联动信息配置 目前支持select-->
      <template v-if="componentType === 'select'">
        <el-form-item label="linkage">
          <el-switch
            :modelValue="extendAttributes.linkage"
            @update:modelValue="setExtendAttribute('linkage', $event)"
          />
        </el-form-item>
        <template v-if="extendAttributes.linkage">
          <el-form-item label="linkAction">
            <el-select
              :modelValue="extendAttributes.linkAction"
              @update:modelValue="setExtendAttribute('linkAction', $event)"
              clearable
            >
              <el-option value="change" label="change" />
            </el-select>
          </el-form-item>
          <el-form-item label="linkTarget">
            <el-input :modelValue="extendAttributes.linkTarget" @update:modelValue="setTarget" />
          </el-form-item>
          <el-form-item label="linkTargetAction">
            <el-select
              :modelValue="extendAttributes.linkTargetAction"
              @update:modelValue="setExtendAttribute('linkTargetAction', $event)"
              :multiple="true"
            >
              <el-option label="change" value="change" />
              <el-option label="reset" value="reset" />
              <el-option label="loadData" value="loadData" />
            </el-select>
          </el-form-item>
        </template>
      </template>
      <!-- 联动信息配置 end -->
      <!-- link 配置信息 -->
      <template v-if="componentType === 'link'">
        <el-form-item label="href">
          <el-input
            :modelValue="extendAttributes.href"
            @update:modelValue="setExtendAttribute('link', $event)"
          />
        </el-form-item>
        <el-form-item label="query">
          <el-input
            placeholder=""
            :modelValue="extendAttributes.search"
            @update:modelValue="setExtendAttribute('search', $event)"
          />
        </el-form-item>
      </template>
      <!-- link 配置信息 end -->
      <template v-if="componentType === 'datePicker'">
        <!-- 时间框配置信息 -->
        <el-form-item label="dateType">
          <el-select
            :modelValue="properties.type"
            @update:modelValue="setProperties('type', $event)"
            placeholder=""
          >
            <el-option
              v-for="item in datePickerTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="datePickerFormart">
          <el-input
            :modelValue="properties.format"
            @update:modelValue="setProperties('format', $event)"
          />
        </el-form-item>
        <el-form-item label="datePickerValueFormart">
          <el-input
            :modelValue="properties.valueFormat"
            @update:modelValue="setProperties('valueFormat', $event)"
          />
        </el-form-item>
      </template>
      <!-- uploade 配置信息 -->
      <template v-if="componentType === 'upload'">
        <el-form-item label="limit">
          <ElInputNumber
            :modelValue="properties.limit"
            @update:modelValue="setProperties('limit', $event)"
          />
        </el-form-item>
        <el-form-item label="limitSize">
          <ElInputNumber
            :modelValue="properties.limitSize"
            @update:modelValue="setProperties('limitSize', $event)"
          />
        </el-form-item>
        <el-form-item label="fileType">
          <el-checkbox-group
            :modelValue="properties.accept"
            @update:modelValue="setProperties('accept', $event)"
          >
            <el-checkbox
              v-for="(item, index) in FileTypes"
              :key="`filetype_${index}`"
              :label="item"
            />
          </el-checkbox-group>
        </el-form-item>
      </template>
      <!-- uploade 配置信息 end -->
      <!-- 时间框配置信息 end -->
      <!-- 选择项配置 -->
      <template v-if="hasOptions">
        <el-form-item v-if="componentType !== 'radio'" label="multiple">
          <el-switch
            :modelValue="properties.multiple"
            @update:modelValue="setProperties('multiple', $event)"
          />
        </el-form-item>
        <el-form-item label="options">
          <el-radio-group
            :modelValue="extendAttributes.remote"
            @update:modelValue="setExtendAttribute('remote', $event)"
          >
            <el-radio-button :label="false">静态数据</el-radio-button>
            <el-radio-button :label="true">远程数据</el-radio-button>
          </el-radio-group>
          <template v-if="!extendAttributes.remote">
            <el-row :gutter="5" v-for="(option, index) in options" :key="`option_config_${index}`">
              <el-col :span="8">
                <el-input v-model="option.label" placeholder="请输入" />
              </el-col>
              <el-col :span="8">
                <el-input v-model="option.value" placeholder="请输入" />
              </el-col>
              <el-link
                v-if="options.length > 1"
                type="primary"
                :underline="false"
                @click="removeOption(index)"
              >
                删除
              </el-link>
            </el-row>
            <div><el-link :underline="false" type="primary" @click="addOption">添加</el-link></div>
          </template>
          <template v-else>
            <el-input
              :modelValue="extendAttributes.remoteFunOrUrl"
              @update:modelValue="setExtendAttribute('remoteFunOrUrl', $event)"
              placeholder="请输入方法名或URL地址"
            >
              <template #prepend>
                <div>远端方法</div>
              </template>
            </el-input>
            <span>action</span>
            <el-switch
              :modelValue="extendAttributes.isRemoteFun"
              @update:modelValue="setExtendAttribute('isRemoteFun', $event)"
            />
            <el-input
              placeholder="{ 'key': value , '$value': 'key'}"
              :modelValue="extendAttributes.remoteParams"
              @update:modelValue="setExtendAttribute('remoteParams', $event)"
            >
              <template #prepend>
                <div>参数</div>
              </template>
            </el-input>
            <el-input v-model="extendAttributes.remoteOptionProps.value">
              <template #prepend>
                <div>值</div>
              </template>
            </el-input>
            <el-input v-model="extendAttributes.remoteOptionProps.label">
              <template #prepend>
                <div>标签</div>
              </template>
            </el-input>
            <el-button @click="handleLoadData">加载数据</el-button>
          </template>
        </el-form-item>
      </template>
      <!-- 选择项配置 end -->
      <!-- 容器添加子项 -->
      <template v-if="componentType === 'row'">
        <el-form-item label="row">
          <div v-for="(item, index) in children" :key="`col_${index}`">
            <el-input
              :modelValue="item.properties.span"
              @update:modelValue="changeSpan(item, $event)"
              placeholder=""
            >
              <template #append>
                <el-link type="primary" @click="removeChild(item)">删除</el-link>
              </template>
            </el-input>
          </div>
          <el-link type="primary" @click="addChild">添加</el-link>
        </el-form-item>
        <el-form-item label="gutter">
          <ElInput
            :modelValue="properties.gutter"
            @update:modelValue="setProperties('gutter', $event)"
          />
        </el-form-item>
      </template>
      <template v-if="componentType === 'tabs'">
        <el-form-item label="tabpane">
          <div v-for="(item, index) in children" :key="`tabpane_${index}`">
            <el-input
              :class="{ mgt_1: index !== 0 }"
              :modelValue="item.properties.label"
              @update:modelValue="changeLabel(item, $event)"
              placeholder=""
            >
              <template #append>
                <el-link type="primary" @click="removeChild(item)">删除</el-link>
                <el-link type="primary" @click="editAttr(item)">
                  {{ childrenActive(item) ? '隐藏' : '编辑' }}
                </el-link>
              </template>
            </el-input>
            <!-- 子项属性面板 -->
            <template v-if="childrenActive(item)">
              <el-form-item label="componentKey" prop="">
                <el-input
                  :modelValue="item.componentKey"
                  @update:modelValue="editNodeAttr(item, 'componentKey', $event)"
                  placeholder=""
                />
              </el-form-item>
              <el-form-item label="grid" prop="">
                <el-switch
                  :modelValue="item.extendAttributes.grid"
                  @update:modelValue="editNodeExtendAttr(item, 'grid', $event)"
                />
              </el-form-item>
              <template v-if="item.extendAttributes.grid">
                <el-form-item label="gridColumns">
                  <el-input-number
                    :modelValue="item.extendAttributes.gridColumns"
                    @update:modelValue="editNodeExtendAttr(item, 'gridColumns', $event)"
                    :min="1"
                    :max="5"
                  />
                </el-form-item>
                <el-form-item label="gridRows">
                  <el-input-number
                    :modelValue="item.extendAttributes.gridRows"
                    @update:modelValue="editNodeExtendAttr(item, 'gridRows', $event)"
                    :min="1"
                    :max="5"
                  />
                </el-form-item>
              </template>
              <el-divider />
            </template>
          </div>
          <el-link type="primary" @click="addChild">添加</el-link>
        </el-form-item>
      </template>
      <template v-if="componentType === 'container'">
        <el-form-item label="grid">
          <el-switch
            :modelValue="extendAttributes.grid"
            @update:modelValue="setExtendAttribute('grid', $event)"
          />
        </el-form-item>
        <template v-if="extendAttributes.grid">
          <el-form-item label="gridColumns">
            <el-input-number
              :modelValue="extendAttributes.gridColumns"
              @update:modelValue="setExtendAttribute('gridColumns', $event)"
              :min="1"
              :max="24"
            />
          </el-form-item>
          <el-form-item label="gridRows">
            <el-input-number
              :modelValue="extendAttributes.gridRows"
              @update:modelValue="setExtendAttribute('gridRows', $event)"
              :min="1"
              :max="24"
            />
          </el-form-item>
        </template>
      </template>
      <template v-if="componentType === 'flexContainer'">
        <el-form-item label="sub">
          <template v-for="(item, index) in children" :key="item.key">
            <el-input
              class="mgt_1"
              :modelValue="item.componentKey"
              :placeholder="item.componentKey"
              @update:modelValue="editNodeAttr(item, 'componentKey', $event)"
            >
              <template #prepend> componentKey </template>
            </el-input>
            <el-input
              class="mgt_1"
              :modelValue="item.componentName"
              :placeholder="item.componentName"
              @update:modelValue="editNodeAttr(item, 'componentName', $event)"
            >
              <template #prepend> componentName </template>
            </el-input>
            <el-link type="primary" @click="configNode(item)">配置信息</el-link>
            <el-divider v-if="index + 1 !== children?.length" />
          </template>
        </el-form-item>
        <el-form-item label="groupTitle">
          <el-switch
            :modelValue="extendAttributes.showSubTitle"
            @update:modelValue="setExtendAttribute('showSubTitle', $event)"
          />
        </el-form-item>
        <el-form-item label="groupIndex">
          <el-switch
            :modelValue="extendAttributes.showIndex"
            @update:modelValue="setExtendAttribute('showIndex', $event)"
          />
        </el-form-item>
      </template>
      <!-- 容器添加子项 end -->
      <!-- 验证规则 -->
      <template v-if="IsFormFiled">
        <el-form-item label="validate">
          <el-checkbox
            label="required"
            :modelValue="properties.required"
            @update:modelValue="setProperties('required', $event)"
          />
          <el-select
            :modelValue="properties.validate"
            @update:modelValue="setProperties('validate', $event)"
          >
            <el-option
              v-for="item in validateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            :modelValue="properties.pattern"
            @update:modelValue="setProperties('pattern', $event)"
            placeholder="填写正则表达式"
          >
            <template #prepend>
              <div>/</div>
            </template>
            <template #append>
              <div>/</div>
            </template>
          </el-input>
        </el-form-item>
      </template>
      <!-- 后端配置信息 -->
      <el-form-item label="config">
        <ElButton type="primary" @click="configVisible = true">配置信息</ElButton>
      </el-form-item>
      <el-form-item label="style">
        <ElButton type="primary" @click="styleVisible = true">配置样式</ElButton>
      </el-form-item>
      <BackConfigDialog v-model="configVisible" v-model:config="backConfigData" />
      <BackConfigDialog v-model="subConfigVisible" v-model:config="subBackConfigData" />
      <BackConfigDialog v-model="styleVisible" v-model:config="styleData" />
      <!-- 后端配置信息 end -->
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { colProperties, formFields, tabPaneProperties } from '@/config/fields'
import Node, { type INode } from '@/model/treeNode'
import type { ElButton, ElInput, ElInputNumber } from 'element-plus'
import { reactive, ref, computed, type PropType } from 'vue'
import BackConfigDialog from '../dialog/backConfig.vue'
import type { IObjectKeys } from '@/config/common'
import FileTypes from '@/config/fileType'

const props = defineProps<{
  node: INode
}>()

const componentType = computed(() => (props.node ? props.node.componentType : ''))

const IsFormFiled = computed(() => {
  return formFields.includes(componentType.value)
})

const hasOptions = computed(() => {
  return ['select', 'radio', 'checkbox', 'cascader'].includes(componentType.value)
})

const attributeFormEl = ref()

const configVisible = ref<boolean>(false)

const attributeForm = computed(() => {
  return props.node ? props.node : {}
})

const properties = computed(() => (props.node ? props.node.properties : {}))

const style = computed(() => (props.node ? props.node.style : {}))

const options = computed(() => (props.node ? props.node.options : []))

const children = computed(() => (props.node ? props.node.children : []))

const extendAttributes = computed(() => (props.node ? props.node.extendAttributes : {}))

const actions = computed(() => {
  const result = []
  if (props.node && props.node.actions) {
    for (const key in props.node.actions) {
      result.push({
        key,
        funName: props.node.actions[key].funName,
        params: props.node.actions[key].params
      })
    }
  }
  return result
})

const setProperties = (key: string, value: any) => {
  if (!props.node) return
  const attr: {
    [key: string]: String | null | number
  } = {}
  attr[key] = value
  props.node?.setProperties(attr)
}

const setExtendAttribute = (key: String, value: String | null | number) => {
  if (!props.node) return
  const attr: {
    [key: string]: String | null | number
  } = {}
  attr[key] = value
  props.node?.setExtendAttribute(attr)
}

const setAction = (key: String, value: String | null | number) => {
  if (!props.node) return
  const attr: {
    [key: string]: String | null | number
  } = {}
  attr[key] = value
  // props.node?.setAction(attr)
}

const rules = reactive({
  id: []
})

// const remote = computed({
//   get() {
//     return props.node ? props.node.remote : 1
//   },
//   set(val) {
//     props.node!.remote = val ? true : false
//   }
// })

/**
 * 添加配置项
 */
const addOption = () => {
  options.value!.push({
    label: '',
    value: ''
  })
}

/**
 * 删除配置项
 */
const removeOption = (index: number) => {
  if (options.value!.length <= 1) return
  options.value!.splice(index, 1)
}

/**
 * 类似 row 组件，删除col
 * 删除字节点
 */
const removeChild = (item: Node) => {
  if (children.value!.length <= 1) return
  if (props.node?.properties?.modelValue && props.node?.properties?.modelValue === item.key) {
    props.node?.setProperties({ modelValue: '' })
  }
  item.remove()
}

/**
 * 类似 row 的组件，添加col
 * 添加子节点
 */
const addChild = () => {
  let type: 'col' | 'tabPane'
  const index = props.node?.children?.length || 0
  switch (props.node?.componentType) {
    case 'row':
      type = 'col'
      break
    case 'tabs':
      type = 'tabPane'
      break
    default:
      type = 'col'
      break
  }
  const componentName = `${type}${index}`
  const attr =
    type === 'col' ? colProperties : { ...tabPaneProperties, label: `tabpane${index + 1}` }
  const node = new Node({
    name: componentName,
    id: null,
    componentType: type,
    componentName: componentName,
    children: [],
    properties: {
      ...attr
    },
    style: {},
    action: {},
    value: ''
  })
  props.node?.insertChild(node)
}

/**
 * 修改 col 组件 span
 */
const changeSpan = (node: INode, index: string) => {
  if (Number(index) > 24) return
  node.setProperties({
    span: index ? Number(index) : null
  })
}

const setTarget = (key: string) => {
  const oldTargetKey = props.node?.properties?.linkTarget
  const oldTargetNode = props.node?.store?.getNode(oldTargetKey)
  const newTargetNode = props.node?.store?.getNode(key)
  if (oldTargetNode && oldTargetNode.extendAttributes?.linked) {
    // 撤销关联
    oldTargetNode.setExtendAttribute({ linked: false })
  }
  if (key && newTargetNode) {
    if (newTargetNode.key === props.node?.key) {
      throw new Error('不能关联自己')
    }
    if (newTargetNode.extendAttributes?.linked) {
      throw new Error('已经关联了其他节点')
    }
    newTargetNode.setExtendAttribute({ linked: true, linkSource: props.node?.key })
    props.node?.setExtendAttribute({ linkTarget: key })
  }
  if (!key) {
    props.node?.setExtendAttribute({ linkTarget: '' })
  }
}

const addAction = () => {}

const changeLabel = (node: Node, label: string) => {
  node.setProperties({
    label
  })
}

const copy = () => {}

const validateOptions = computed(() => {
  const _rules = []
  const rules = props.node?.store?.rules || {}
  for (var key in rules) {
    _rules.push({
      label: rules[key].label,
      value: rules[key].key
    })
  }
  return _rules
})

const actionOptions = [
  {
    label: 'init',
    value: 'init'
  },
  {
    label: 'click',
    value: 'click'
  },
  {
    label: 'change',
    value: 'change'
  }
]

const datePickerTypes = [
  {
    label: 'year',
    value: 'year'
  },
  {
    label: 'month',
    value: 'month'
  },
  {
    label: 'date',
    value: 'date'
  },
  {
    label: 'dates',
    value: 'dates'
  },
  {
    label: 'week',
    value: 'week'
  },
  {
    label: 'datetime',
    value: 'datetime'
  },
  {
    label: 'datetimerange',
    value: 'datetimerange'
  },
  {
    label: 'daterange',
    value: 'daterange'
  }
]

const handleLoadData = () => {
  props.node?.action('loadData', {})
}

const backConfigData = computed({
  get() {
    return props.node?.backendConfig || {}
  },
  set(val: IObjectKeys<any>) {
    props.node?.setAttrs({ backendConfig: val })
  }
})

const setLabel = (val: string) => {
  props.node?.setAttrs({ componentName: val })
  setProperties('label', val)
}

// 编辑固有 children 属性
const editSelected = ref<INode[]>([])

const editAttr = (node: INode) => {
  const index = editSelected.value.findIndex((item) => item.key === node.key)
  if (index > -1) {
    editSelected.value.splice(index, 1)
  } else {
    editSelected.value.push(node)
  }
}

const childrenActive = (child: INode): boolean => {
  if (editSelected.value.length === 0) return false
  const index = editSelected.value.findIndex((item) => item.key === child.key)
  if (index > -1) {
    return true
  }
  return false
}

/**
 * 编辑 node.extendAttrubtes - 扩展属性
 * @param node
 * @param key
 * @param value
 */
const editNodeExtendAttr = (node: INode, key: string, value: any) => {
  node.setExtendAttribute({ [key]: value })
}

/**
 * 编辑 node 属性
 * @param node
 * @param key
 * @param value
 */
const editNodeAttr = (node: INode, key: string, value: any) => {
  node.setAttrs({ [key]: value })
}

// 编辑 subNode 属性
const currentEditNode = ref<INode>()
const subConfigVisible = ref(false)
const subBackConfigData = computed({
  get() {
    return currentEditNode.value?.backendConfig || {}
  },
  set(val: IObjectKeys<any>) {
    currentEditNode.value?.setAttrs({ backendConfig: val })
  }
})

const configNode = (node: INode) => {
  currentEditNode.value = node
  subConfigVisible.value = true
}

//
const styleVisible = ref(false)
const styleData = computed({
  get() {
    return props.node?.style || {}
  },
  set(val: IObjectKeys<any>) {
    props.node?.setAttrs({ style: val })
  }
})
</script>

<style scoped>
.padding {
  padding: 15px;
}
.mgt_1 {
  margin-top: 5px;
}
</style>
