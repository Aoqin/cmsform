<template>
  <el-container :direction="vertical">
    <el-header height="60px">
      <ElContainer :direction="horizontal">
        <!-- Header content -->
        <ElAside width="200px"> 万能表单 </ElAside>
        <ElContainer>
          <HeaderBar :store="store" />
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
          <DesignerForm :config="store.root!" />
        </el-mainc>
      </el-container>
      <el-aside class="attrs_bar">
        <AttributeBar :node="store.currentNode" />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Treestore } from '@/model/treeStore'
import type { ITreeStore } from '@/model/treeStore'

import AttributeBar from './components/layout/attributeBar.vue'
import DesignerForm from './components/layout/designerForm.vue'
import ElementList from './components/layout/elementList.vue'

import { ref, reactive, watch } from 'vue'
import { rules } from '@/config/rules'
// import type { INode } from '@/utils/tree'
import functions from '@/config/functions'
import HeaderBar from './components/layout/headerBar.vue'
import { ElAside, ElContainer } from 'element-plus'

const store = reactive<ITreeStore>(new Treestore({ rules, functions }))
store.initialize()

watch(
  () => store.currentNode,
  (val) => {
    console.log('val:: ', val)
  }
)

const vertical = ref('vertical')
const horizontal = ref('horizontal')
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
