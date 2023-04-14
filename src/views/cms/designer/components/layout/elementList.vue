<template>
  <div>
    <Draggable :model-value="elements" :group="dragGroupOptions" item-key="id" @change="log">
      <template #item="{ element }">
        <div>{{ element.componentName }}</div>
      </template>
    </Draggable>
  </div>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import { reactive, computed } from 'vue'
import { config } from '@/config/demoConfig'
import type { INodeOptions } from '@/model/treeNode'

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
  put: false
})

const components = reactive<INodeOptions>(config)

const elements = computed<INodeOptions[]>(() => components.children!)

const log = (evt: any) => {
  console.log(evt.added)
}
</script>

<style scoped></style>
