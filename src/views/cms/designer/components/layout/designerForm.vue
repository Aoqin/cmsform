<template>
  <ElForm :model="formModel" label-position="top">
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
    {{ formModel }}
  </div>
</template>

<script setup lang="ts">
import DesignerFormItem from '../designerFromItem.vue'
import Draggable from 'vuedraggable'
import { reactive, computed, provide } from 'vue'
import type { INode } from '@/utils/tree'
import { ElForm } from 'element-plus'
import { Node } from '@/model/treeNode'

const formModel = reactive<Object>({})

provide('formModel', formModel)

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

const list = props.config.children!

const dataSource = computed<INode>(() => props.config)

const changeEvent = (evt: any) => {
  console.log(evt)
  if (evt.added) {
    console.log('added')
    console.log(evt.added.newIndex)
    if (!(evt.added.element instanceof Node)) {
    }
  }
}

const deleteItem = (index: number) => {
  console.log('delete')
  const item: INode = props.config.children![index]
  props.config.children!.splice(index, 1)
  delete formModel[item.componentType + '123']
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
