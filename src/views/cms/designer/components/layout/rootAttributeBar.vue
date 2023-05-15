<template>
  <div class="padding">
    <el-form label-width="80px" :inline="false" size="normal" label-position="top">
      <el-form-item label="名称">
        <el-input
          :model-value="node.componentName"
          @update:modelValue="setAttr('componentName', $event)"
        />
      </el-form-item>
      <el-form-item label="编码">
        <el-input
          :model-value="node.componentKey"
          @update:modelValue="setAttr('componentKey', $event)"
        />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          :model-value="extendAttributes.remark"
          @update:modelValue="setExtendAttribute('remark', $event)"
        />
      </el-form-item>
      <el-divider />
      <el-form-item label="表单标题位置">
        <el-select
          :model-value="properties.labelPosition"
          @update:modelValue="setProperties('labelPosition', $event)"
        >
          <el-option label="左对齐" value="left" />
          <el-option label="右对齐" value="right" />
          <el-option label="顶部对齐" value="top" />
        </el-select>
      </el-form-item>
      <el-form-item label="表单标题长度">
        <el-input-number
          :model-value="properties.labelWidth"
          @update:modelValue="setProperties('labelWidth', $event)"
          numbder
          placeholder="请输入"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { IObjectKeys } from '@/config/common'
import type { INode } from '@/model/treeNode'
import { computed } from 'vue'

const props = defineProps<{
  node: INode
}>()
const extendAttributes = computed(() => (props.node ? props.node.extendAttributes : {}))
const properties = computed(() => (props.node ? props.node.properties : {}))

const setProperties = (key: string, value: any) => {
  if (!props.node) return
  const attr: {
    [key: string]: String | null | number
  } = {}
  attr[key] = value
  props.node?.setProperties(attr)
}

const setAttr = (key: string, val: string) => {
  const params: IObjectKeys<string> = {}
  params[key] = val
  props.node?.setAttr(params)
}

const setExtendAttribute = (key: String, value: String | null | number) => {
  if (!props.node) return
  const attr: {
    [key: string]: String | null | number
  } = {}
  attr[key] = value
  props.node?.setExtendAttribute(attr)
}
</script>

<style scoped>
.padding {
  padding: 15px;
}
</style>
