<template>
  <DynamicContainer v-if="IsContainerComponent" :element="element" />
  <DynamicView v-else-if="IsViewComponet" :element="element" />
  <DynamicFormItem v-else :element="element">
    <DynamicFormField :element="element" />
  </DynamicFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  containerFields,
  viewFields,
  type ContainerComponentType,
  type ViewComponentType
} from '@/config/fields'
import type { INode } from '@/model/treeNode'
import DynamicFormItem from '../../designer/components/dynamicFormItem.vue'
import DynamicFormField from '../../designer/components/dynamicFormField.vue'
import DynamicContainer from './dynamicContainer.vue'
import DynamicView from '../../designer/components/dynamicView.vue'

const props = defineProps<{
  element: INode
}>()

console.log("props ----------->")
console.log(props)
const IsContainerComponent = computed(() => {
  return containerFields.includes(props.element.componentType as ContainerComponentType)
})

const IsViewComponet = computed(() => {
  return viewFields.includes(props.element.componentType as ViewComponentType)
})
</script>

<style scoped></style>
