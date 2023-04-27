<template>
  <div class="attribute">
    <el-form
      :model="attributeForm"
      ref="attributeFormEl"
      :rules="rules"
      :inline="false"
      label-width="60px"
      label-position="top"
    >
      <el-form-item label="key">
        <el-input :modelValue="attributeForm.key">
          <template #append>
            <el-link @click="copy"> 点击复制 </el-link>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="name">
        <el-input v-model="attributeForm.name" />
      </el-form-item>
      <el-form-item label="label">
        <el-input
          :modelValue="properties.label"
          @update:modelValue="setProperties('label', $event)"
        />
      </el-form-item>
      <el-form-item label="placeholder">
        <el-input
          :modelValue="properties.placeholder"
          @update:modelValue="setProperties('placeholder', $event)"
        />
      </el-form-item>
      <el-form-item label="searchable">
        <el-switch
          :modelValue="extendAttributes.searchable"
          @update:modelValue="setExtendAttribute('searchable', $event)"
        />
      </el-form-item>
      <el-form-item label="IsBuildIn">
        <el-switch
          :modelValue="extendAttributes.IsBuildIn"
          @update:modelValue="setExtendAttribute('IsBuildIn', $event)"
        />
      </el-form-item>
      <el-form-item label="disabled">
        <el-switch
          :modelValue="properties.disabled"
          @update:modelValue="setProperties('disabled', $event)"
        />
      </el-form-item>
      <el-form-item label="multiple">
        <el-switch
          :modelValue="properties.multiple"
          @update:modelValue="setProperties('multiple', $event)"
        />
      </el-form-item>
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
      <el-form-item label="linkage">
        <el-switch
          :modelValue="extendAttributes.linkage"
          @update:modelValue="setExtendAttribute('linkage', $event)"
        />
      </el-form-item>
      <el-form-item label="linkAction">
        <el-select
          :modelValue="extendAttributes.linkAction"
          @update:modelValue="setExtendAttribute('linkAction', $event)"
          clearable
        >
          <el-option value="change" label="change" />
        </el-select>
      </el-form-item>
      <el-form-item label="target">
        <el-input :modelValue="extendAttributes.target" @update:modelValue="setTarget" />
      </el-form-item>
      <el-form-item label="targetAction">
        <el-select
          :modelValue="extendAttributes.targetAction"
          @update:modelValue="setExtendAttribute('targetAction', $event)"
          :multiple="true"
        >
          <el-option label="change" value="change" />
          <el-option label="reset" value="reset" />
          <el-option label="loadData" value="loadData" />
        </el-select>
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
      <el-form-item label="tabpane">
        <div v-for="(item, index) in children" :key="`tabpane_${index}`">
          <el-input
            :modelValue="item.properties.label"
            @update:modelValue="changeLabel(item, $event)"
            placeholder=""
          >
            <template #append>
              <el-link type="primary" @click="removeChild(item)">删除</el-link>
            </template>
          </el-input>
        </div>
        <el-link type="primary" @click="addChild">添加</el-link>
      </el-form-item>
      <el-form-item label="validate">
        <el-checkbox
          label="required"
          :modelValue="properties.validate"
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
          :modelValue="properties.validate"
          @update:modelValue="setProperties('validate', $event)"
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
      <!-- <el-form-item label="readonly">
        <el-switch
          :modelValue="properties.readonly"
          @update:modelValue="setProperties('readonly', $event)"
        />
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { colAttributes, tabPaneAttributes } from '@/config/fields'
import Node from '@/model/treeNode'
import { reactive, ref, defineProps, computed, type PropType } from 'vue'

const props = defineProps({
  node: [Node, null] as PropType<Node | null>
})

const attributeFormEl = ref()

const attributeForm = computed(() => {
  return props.node ? props.node : {}
})

const properties = computed(() => (props.node ? props.node.properties : {}))

const style = computed(() => (props.node ? props.node.style : {}))

const options = computed(() => (props.node ? props.node.options : {}))

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

const setProperties = (key: String, value: String | null | number) => {
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

const remote = computed({
  get() {
    return props.node ? props.node.remote : 1
  },
  set(val) {
    props.node!.remote = val
  }
})

/**
 * 添加配置项
 */
const addOption = () => {
  options.value.push({
    label: '',
    value: ''
  })
}

/**
 * 删除配置项
 */
const removeOption = (index: number) => {
  if (options.value.length <= 1) return
  options.value.splice(index, 1)
}

/**
 * 类似row组件，删除col
 * 删除字节点
 */
const removeChild = (item: Node) => {
  if (children.value.length <= 1) return
  if (props.node?.properties?.modelValue && props.node?.properties?.modelValue === item.key) {
    props.node?.setProperties({ modelValue: '' })
  }
  item.remove()
}
/**
 * 类似row的组件，添加col
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
    type === 'col' ? colAttributes : { ...tabPaneAttributes, label: `tabpane${index + 1}` }
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
const changeSpan = (node: Node, index: string) => {
  if (Number(index) > 24) return
  node.setProperties({
    span: index ? Number(index) : null
  })
}

const setTarget = (key: string) => {
  const oldTargetKey = props.node?.properties?.target
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
    newTargetNode.setExtendAttribute({ linked: true })
    props.node?.setExtendAttribute({ target: key })
  }
  if (!key) {
    props.node?.setExtendAttribute({ target: '' })
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

const handleLoadData = () => {
  props.node?.action('loadData', {})
}
</script>

<style scoped>
.attribute {
  padding: 20px 15px;
}
</style>
