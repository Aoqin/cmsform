<template>
  <div class="field_list">
    <Draggable :model-value="elements" :group="dragGroupOptions" item-key="id" @change="log">
      <template #item="{ element }">
        <div class="field">{{ element.componentName }}</div>
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

<style scoped>
.field_list {
  padding: 10px 10px;
}
.field {
  padding: 5px 10px;
  border: 1px dashed #e2e2e2;
  margin-bottom: 5px;
  cursor: move;
  font-size: 12px;
}
.drag {
  display: flex;
  flex-direction: row;
}
</style>
