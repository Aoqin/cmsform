<template>
  <UnTable v-if="componentType === 'table'" :element="element" />
  <UnLink v-else-if="componentType === 'link'" :element="element" />
  <ElDivider v-else-if="componentType === 'divider'" content-position="left">
    {{ element.properties.label }}
  </ElDivider>
</template>

<script setup lang="ts">
import UnTable from './views/tableComponent.vue'
import type { INode } from '@/model/treeNode'
import UnLink from './views/linkComponent.vue'
import { computed } from 'vue'
import type { ElDivider } from 'element-plus'

const props = defineProps<{
  element: INode
}>()

const componentType = computed(() => {
  return props.element.componentType
})
</script>

<style scoped></style>
