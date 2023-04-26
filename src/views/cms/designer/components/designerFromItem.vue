<template>
  <div class="dragable_component" :class="{ active: isActive }" @click.stop="selectNode">
    <div class="dragable_icon">
      <el-icon :size="20">
        <Rank />
      </el-icon>
    </div>
    <!-- component -->
    <div class="content" :class="{ container: IsContainerComponent }">
      <DynamicContainer v-if="IsContainerComponent" :element="element" />
      <el-form-item v-else v-bind="properties">
        <DynamicFormItem :element="element" v-model="model" />
      </el-form-item>
    </div>
    <!-- component operation -->
    <div class="operation">
      <el-link @click="handleDelete">
        <el-icon :size="20">
          <Delete />
        </el-icon>
      </el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, Rank } from '@element-plus/icons-vue'
import type { INode } from '@/model/treeNode'
import { onMounted, reactive, computed, defineProps } from 'vue'
import DynamicFormItem from './dynamicFormItem.vue'
import DynamicContainer from './dynamicContainer.vue'
import { ElLink } from 'element-plus'
import type { IObjectKeys } from '@/config/common'
import type { IRule } from '@/config/rules'
import { formFields, type IFormItemAttributes } from '@/config/fields'
import { deepCopy } from '@/utils'

const props = defineProps<{
  element: INode
}>()

const model: IObjectKeys<any> = computed({
  get() {
    return props.element.getModel()
  },
  set(value) {
    props.element.setValue(value)
  }
})

const isActive = computed(() => {
  return props.element.store!.currentNodeKey === props.element.key
})

const handleDelete = () => {
  console.log('emit delete')
  props.element.remove()
}

const IsContainerComponent = computed(() => {
  return !formFields.includes(props.element.componentType as string)
})

const properties = computed(() => {
  const { label, required, rules = [], validate } = props.element.properties
  const store = props.element.store!
  const attr: IFormItemAttributes = {
    label,
    prop: props.element.getModelKey()!
  }
  // input 框默认 blur 触发，其他组件默认 change 触发
  let triggerName = 'blur'
  if (props.element.componentType !== 'input') {
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
    if (props.element.componentType === '')
      rules.push({ ...store.rules![validate].rule, trigger: triggerName })
  }

  if (rules && rules.length > 0) {
    attr.rules = deepCopy(rules)
  }

  return attr
})

const selectNode = () => {
  props.element.store?.setCurrentNode(props.element)
}

onMounted(() => {
  // console.log(compRef.value)
})
</script>

<style scoped>
.active > .dragable_icon {
  display: block;
}

.active > .operation {
  display: block;
}
.active.dragable_component {
  border-color: #2d77d6;
}

.active .content.container {
  border-color: 1px solid #2d77d6;
}

.dragable_component {
  position: relative;
  border: 1px dashed white;
  margin-bottom: 5px;
}
.dragable_icon {
  display: none;
  position: absolute;
  width: 20px;
  height: 20px;
  color: #333;
  background: #fff;
  cursor: move;
  z-index: 9;
}
.content {
  padding: 10px 15px;
}
.content.container {
  padding: 1px;
}
.operation {
  display: none;
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 0 5px;
  background: #fff;
}
</style>
