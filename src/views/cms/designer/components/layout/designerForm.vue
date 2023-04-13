<template>
  <ElForm :model="model" label-position="top">
    <Draggable
      :model-value="list"
      :group="dragGroupOptions"
      item-key="id"
      @change="changeEvent"
      @update:model-value="updateModel"
    >
      <!-- Item slot must have only one child -->
      <template #item="{ element, index }">
        <DesignerFormItem :element="element" @delete="deleteItem(index)" />
      </template>
    </Draggable>
  </ElForm>
  <div class="source_code">
    {{ dataSource }}
  </div>
  <div class="source_code">
    {{ model }}
  </div>
</template>

<script setup lang="ts">
import DesignerFormItem from '../designerFromItem.vue'
import Draggable from 'vuedraggable'
import { reactive, computed, provide } from 'vue'
import type { INode, INodeOptions } from '@/model/treeNode'
import { ElForm } from 'element-plus'
import Node from '@/model/treeNode'

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
  scrollSpeed: 10
})

const updateModel = (arr: INode[]) => {
  console.log('updateModel::')
  console.log(arr)
}

const props = defineProps<{
  config: INode
}>()

const list = computed<INode[]>(() => props.config.children!)
const model = computed<any>(() => props.config.store?.model)

const dataSource = computed<INodeOptions>(() => props.config.getReadOnlyNode())

const changeEvent = (evt: any) => {
  console.log('==========================')
  console.log(evt)
  console.log(props.config)
  console.log('==========================')
  if (evt.added) {
    props.config.insertChild(evt.added.element, evt.added.newIndex)
  }
}

const deleteItem = (index: number) => {
  console.log('delete')
}
</script>

<style scoped>
.source_code {
  padding: 15px;
}
.wrap {
  padding: 20px;
  background: #494949;
  margin-bottom: 5px;
}
</style>
