<template>
  <el-container :direction="vertical">
    <el-header height="60px">
      <!-- Header content -->
      header
    </el-header>
    <el-container :direction="horizontal">
      <el-aside width="200px">
        <!-- Aside content -->
        <ElementList />
      </el-aside>
      <el-container :direction="vertical">
        <el-main height="">
          <!-- Main content -->
          <DesignerContent :config="designerConfig" />
        </el-main>
      </el-container>
      <el-aside>
        <AttributeBar />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AttributeBar from './components/layout/attributeBar.vue'
import DesignerContent from './components/layout/designerContent.vue'
import ElementList from './components/layout/elementList.vue'

import { ref, reactive } from 'vue'
import type { INode } from '@/utils/tree'

const props = defineProps<{
  config: any
  model: any
}>()

const designerConfig = reactive<INode>({
  name: 'designer',
  id: null,
  componentType: 'designer',
  componentName: 'designer',
  children: [],
  attribute: {},
  style: {},
  action: {}
})

interface IModel {
  name: string
  value: any
}

// const desingerModelsAdd = (model: IModel) => {
//   designerModels[model.name] = model.value
// }

// const desingerModelsRemove = (name: string) => {
//   delete designerModels[name]
// }

const vertical = ref('vertical')
const horizontal = ref('horizontal')
</script>

<style scoped></style>
