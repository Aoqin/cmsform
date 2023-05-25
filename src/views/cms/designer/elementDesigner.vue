<template>
  <el-container :direction="vertical">
    <el-header height="60px">
      <ElContainer :direction="horizontal">
        <!-- Header content -->
        <ElAside width="200px"> 万能表单 </ElAside>
        <ElContainer>
          <HeaderBar
            :store="store"
            @generate="generate"
            @generate-view="generateView"
            @submit="submit"
          />
        </ElContainer>
      </ElContainer>
    </el-header>
    <el-container :direction="horizontal">
      <el-aside class="fields_bar" width="200px">
        <!-- Aside content -->
        <ElementList />
      </el-aside>
      <el-container :direction="vertical">
        <el-mainc class="desingner" height="">
          <!-- Main content -->
          <DesignerForm :config="store.root!" :loading="loading" />
        </el-mainc>
      </el-container>
      <el-aside class="attrs_bar">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性" name="properties">
            <AttributeBar :node="store.currentNode!" />
          </el-tab-pane>
          <el-tab-pane label="表单" name="root">
            <RootAttributeBar :node="store.root!" />
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElAside, ElContainer, ElTabs } from 'element-plus'
import { Treestore } from '@/model/treeStore'
import type { INode, INodeOptions } from '@/model/treeNode'
import type { ITreeStore } from '@/model/treeStore'
import { rules } from '@/config/rules'
import functions from '@/config/functions'

import AttributeBar from './components/layout/attributeBar.vue'
import RootAttributeBar from './components/layout/rootAttributeBar.vue'
import DesignerForm from './components/layout/designerForm.vue'
import ElementList from './components/layout/elementList.vue'
import HeaderBar from './components/layout/headerBar.vue'

defineProps<{
  loading: boolean
  config: INodeOptions
}>()

const emits = defineEmits<{
  (e: 'generate'): void
  (e: 'generateView'): void
  (e: 'submit', root: INode): void
}>()

const store = reactive<ITreeStore>(new Treestore({ rules, functions, componentType: 'form' }))
store.initialize({
  componentType: 'root',
  componentName: 'root',
  properties: {
    labelPosition: 'top'
  }
})

const vertical = ref('vertical')
const horizontal = ref('horizontal')

const generate = () => {
  console.log('generate')
}

const generateView = () => {
  console.log('generateView')
}

const initNode = (nodeOption: INodeOptions) => {
  store.initialize(nodeOption)
}

const activeName = ref<string>('root')

const submit = () => {
  emits('submit', store.root!)
}

defineExpose({
  store,
  generate,
  generateView,
  initNode
})
</script>

<style scoped>
.fields_bar {
  border: 1px solid #ebeef5;
  height: calc(100vh - 60px);
}
.attrs_bar {
  border: 1px solid #ebeef5;
  height: calc(100vh - 60px);
}
</style>
