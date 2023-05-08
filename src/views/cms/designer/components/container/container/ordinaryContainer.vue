<template>
  <div>
    <div class="container_label" v-if="showLabel">{{ name }}</div>
    <div class="container_component">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { INode } from '@/model/treeNode'
import { computed } from 'vue'

const props = defineProps<{
  element: INode
}>()

const name = computed(() => props.element.properties.label)

const showLabel = computed(() => props.element.properties.showLabel)
</script>

<style scoped>
.container_label {
  padding: 10px 15px 15px 0px;
  font-size: 14px;
}
</style>
