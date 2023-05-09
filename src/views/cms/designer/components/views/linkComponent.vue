<template>
  <ElLink v-bind="properties" @click="openWindow">{{ element.properties.label }}</ElLink>
</template>

<script setup lang="ts">
import type { INode } from '@/model/treeNode'
import { computed } from 'vue'

const props = defineProps<{
  element: INode
}>()

const properties = computed(() => {
  const { underline, type = 'primary' } = props.element.properties
  return {
    underline,
    type
  }
})

const openWindow = () => {
  const store = props.element.store
  const { href } = props.element.properties
  const { search } = props.element.extendAttributes
  store!.functions.openWindow?.fun({ url: href, httpParams: search })
}
</script>

<style scoped></style>
