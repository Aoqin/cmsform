<template>
  <div>
    <ElForm :model="formModel" label-position="top">
      <Draggable :list="config.children" :group="dragGroupOptions" item-key="id" @change="log">
        <!-- Item slot must have only one child -->
        <template #item="{ element, index }">
          <DesignerComponent :element="element" @delete="deleteItem(index)" />
        </template>
      </Draggable>
    </ElForm>
    <div class="source_code">
      {{ dataSource }}
    </div>
    <div class="source_code">
      {{ formModel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import DesignerComponent from '../designerComponent.vue'
import Draggable from 'vuedraggable'
import { reactive, computed, provide } from 'vue'
import type { INode } from '@/utils/tree'
import shortId from 'shortid'
import { ElForm } from 'element-plus'

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

const props = defineProps<{
  config: INode
}>()

const dataSource = computed<INode>(() => props.config)

const log = (evt: any) => {
  console.log(evt)
  console.log(arguments)
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
