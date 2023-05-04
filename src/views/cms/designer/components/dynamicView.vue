<template>
  <UnTable :element="props.element" />
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import UnTable from './views/tableComponent.vue'
import type { INode } from '@/model/treeNode'

const props = defineProps<{
  element: INode
}>()
</script>

<style scoped></style>
