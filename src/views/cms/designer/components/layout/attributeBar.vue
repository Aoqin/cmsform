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
          :modelValue="attributes.label"
          @update:modelValue="setAttribute('label', $event)"
        />
      </el-form-item>
      <el-form-item label="placeholder">
        <el-input
          :modelValue="attributes.placeholder"
          @update:modelValue="setAttribute('placeholder', $event)"
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
          :modelValue="attributes.disabled"
          @update:modelValue="setAttribute('disabled', $event)"
        />
      </el-form-item>
      <el-form-item label="multiple">
        <el-switch
          :modelValue="attributes.multiple"
          @update:modelValue="setAttribute('multiple', $event)"
        />
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
        <el-input
          :modelValue="extendAttributes.target"
          @update:modelValue="setExtendAttribute('target', $event)"
        />
      </el-form-item>
      <el-form-item label="targetActions">
        <el-select
          :modelValue="extendAttributes.targetActions"
          @update:modelValue="setExtendAttribute('targetActions', $event)"
        >
          <el-option label="change" value="change" />
          <el-option label="init" value="init" />
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
          <el-input v-model="attributes.remoteMethod">
            <template #prepend>
              <div>远端方法</div>
            </template>
          </el-input>
          <el-input v-model="attributes.remoteOptionProps.value">
            <template #prepend>
              <div>值</div>
            </template>
          </el-input>
          <el-input v-model="attributes.remoteOptionProps.label">
            <template #prepend>
              <div>标签</div>
            </template>
          </el-input>
        </template>
      </el-form-item>
      <el-form-item label="row">
        <div v-for="(item, index) in children" :key="`col_${index}`">
          <el-input
            :modelValue="item.attributes.span"
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
            :modelValue="item.attributes.label"
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
          :modelValue="attributes.validate"
          @update:modelValue="setAttribute('required', $event)"
        />
        <el-select
          :modelValue="attributes.validate"
          @update:modelValue="setAttribute('validate', $event)"
        >
          <el-option
            v-for="item in validateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          :modelValue="attributes.validate"
          @update:modelValue="setAttribute('validate', $event)"
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
          :modelValue="attributes.readonly"
          @update:modelValue="setAttribute('readonly', $event)"
        />
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { colAttributes, tabPaneAttributes } from '@/config/fields'
import Node from '@/model/treeNode'
import type { IRule } from '@/model/treeStore'
import { reactive, ref, defineProps, computed } from 'vue'

const props = defineProps({
  node: Node
})

const attributeFormEl = ref()

const attributeForm = computed(() => {
  return props.node ? props.node : {}
})

const attributes = computed(() => (props.node ? props.node.attributes : {}))

const style = computed(() => (props.node ? props.node.style : {}))

const options = computed(() => (props.node ? props.node.options : {}))

const children = computed(() => (props.node ? props.node.children : []))

const extendAttributes = computed(() => (props.node ? props.node.extendAttributes : {}))

const setAttribute = (key: String, value: String | null | number) => {
  if (!props.node) return
  const attr: {
    [key: string]: String | null | number
  } = {}
  attr[key] = value
  props.node?.setAttribute(attr)
}

const setExtendAttribute = (key: String, value: String | null | number) => {
  if (!props.node) return
  const attr: {
    [key: string]: String | null | number
  } = {}
  attr[key] = value
  props.node?.setExtendAttribute(attr)
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

const addOption = () => {
  options.value.push({
    label: '',
    value: ''
  })
}

const removeOption = (index: number) => {
  if (options.value.length <= 1) return
  options.value.splice(index, 1)
}

const removeChild = (item: Node) => {
  if (children.value.length <= 1) return
  if (props.node?.attributes?.modelValue && props.node?.attributes?.modelValue === item.key) {
    props.node?.setAttribute({ modelValue: '' })
  }
  item.remove()
}

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
    attributes: {
      ...attr
    },
    style: {},
    action: {},
    value: ''
  })
  props.node?.insertChild(node)
}

const changeSpan = (node: Node, index: string) => {
  if (Number(index) > 24) return
  node.setAttribute({
    span: index ? Number(index) : null
  })
}

const changeLabel = (node: Node, label: string) => {
  node.setAttribute({
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
</script>

<style scoped>
.attribute {
  padding: 20px 15px;
}
</style>
