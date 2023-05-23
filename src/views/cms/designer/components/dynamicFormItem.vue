<template>
  <el-form-item v-bind="properties">
    <slot></slot>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { INode } from '@/model/treeNode'
import type { IRule } from '@/config/rules'
import { deepCopy } from '@/utils'

export default defineComponent({
  props: {
    element: {
      type: Object as () => INode,
      required: true
    }
  },
  computed: {
    properties() {
      const { componentType } = this.element!
      const { label, required, rules = [], validate } = this.element.properties
      const { hideLabel = false } = this.element.extendAttributes
      const store = this.element.store!
      const attr: {
        label?: null | string
        prop: string
        rules?: IRule[]
      } = {
        label: null,
        prop: this.element.getModelKey()!
      }
      if (!hideLabel) {
        attr.label = label
      }
      // input 框默认 blur 触发，其他组件默认 change 触发
      let triggerName = 'blur'
      if (componentType !== 'input') {
        triggerName = 'change'
      }
      // required
      if (required) {
        if (rules.findIndex((rule: IRule) => rule.required) === -1) {
          rules.push({ required: true, message: `${label}必填项`, trigger: triggerName })
        }
      } else {
        const index = rules.findIndex((rule: IRule) => rule.required)
        if (index !== -1) {
          rules.splice(index, 1)
        }
      }

      // validation name
      if (validate && store.rules![validate]) {
        if (componentType !== '')
          rules.push({ ...store.rules![validate].rule, trigger: triggerName })
      }

      if (rules && rules.length > 0) {
        attr.rules = deepCopy(rules)
      }
      // 重置验证状态
      // attr.validateStatus = ''
      return attr
    }
  }
})
</script>

<style scoped></style>
