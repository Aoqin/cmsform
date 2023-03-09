<template>
  <div>
    <Draggable :list="components" group="components" item-key="id" @change="log">
      <!-- Item slot must have only one child -->
      <template #item="{ element }">
        <DesignerComponent
          :element="element"
          @change="
            (val) => {
              element.value = val
            }
          "
        />
      </template>
    </Draggable>
    <div class="source_code">
      {{ dataSource }}
    </div>
  </div>
</template>

<script setup lang="ts">
import DesignerComponent from '../designerComponent.vue'
import Draggable from 'vuedraggable'
import { reactive, computed } from 'vue'
import type { INode } from '@/utils/tree'

let components = reactive<INode[]>([
  {
    name: 'form',
    id: '123123',
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
    id: '1231234',
    componentType: 'select',
    componentName: 'input',
    children: null,
    attribute: {},
    style: {},
    action: {},
    value: ''
  }
])

const dataSource = computed<INode[]>(() => components)

// const reactiveComponents: Array<any> = computed({
//   get: () => {
//     return components
//   },
//   set: (val) => {
//     components.value = val
//   }
// })

const log = (evt: any) => {
  console.log(evt)
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
