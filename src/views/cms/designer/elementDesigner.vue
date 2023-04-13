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
          <DesignerForm :config="store.root" />
        </el-main>
      </el-container>
      <el-aside>
        <AttributeBar />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Treestore } from '@/model/treeStore';
import type { ITreeStore } from '@/model/treeStore'

import AttributeBar from './components/layout/attributeBar.vue'
import DesignerForm from './components/layout/designerForm.vue'
import ElementList from './components/layout/elementList.vue'

import { ref, reactive } from 'vue'
// import type { INode } from '@/utils/tree'

const store = reactive<ITreeStore>(new Treestore())
store.initialize()

console.log(store)

const vertical = ref('vertical')
const horizontal = ref('horizontal')
</script>

<style scoped></style>
