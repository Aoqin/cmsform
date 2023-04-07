<template>
  <div>
    <Draggable :list="components" :group="dragGroupOptions" item-key="id" @change="log">
      <template #item="{ element }">
        <div>{{ element.componentName }}</div>
      </template>
    </Draggable>
  </div>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import { reactive } from 'vue'
import type { INode } from '@/utils/tree'

const dragGroupOptions = reactive({
  name: 'components',
  animation: 150,
  ghostClass: 'ghost',
  chosenClass: 'chosen',
  dragClass: 'drag',
  forceFallback: true,
  fallbackClass: 'fallback',
  fallbackOnBody: true,
  fallbackTolerance: 0,
  scroll: true,
  scrollSensitivity: 30,
  scrollSpeed: 10,
  pull: 'clone',
  put: false,
})

const components = reactive<INode[]>([
  {
    name: 'form',
    id: null,
    componentType: 'input',
    componentName: 'input',
    children: null,
    attribute: {},
    style: {},
    action: {},
    value: ''
  },
  {
    name: 'form',
    id: null,
    componentType: 'select',
    componentName: 'select',
    children: null,
    attribute: {},
    style: {},
    action: {},
    value: '',
    options: [
      {
        key: '1',
        value: '1',
        label: 'a'
      },
      {
        key: '2',
        value: '2',
        label: 'b'
      }
    ]
  },
  {
    name: 'form',
    id: null,
    componentType: 'radio',
    componentName: 'radio',
    children: null,
    attribute: {},
    style: {},
    action: {},
    value: '',
    options: [
      {
        key: '1',
        value: '1',
        label: 'a'
      },
      {
        key: '2',
        value: '2',
        label: 'b'
      }
    ]
  },
  {
    name: 'row',
    id: null,
    componentType: 'row',
    componentName: 'row',
    children: null,
    attribute: {},
    style: {},
    action: {}
  }
])
</script>

<style scoped></style>
