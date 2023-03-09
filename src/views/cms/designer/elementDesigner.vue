<template>
  <el-container :direction="vertical">
    <el-header height="60px">
      <!-- Header content -->
      header
    </el-header>
    <el-container :direction="horizontal">
      <el-aside width="200px">
        <!-- Aside content -->
        as
      </el-aside>
      <el-container :direction="vertical">
        <el-main height="">
          <!-- Main content -->
          <DesignerContent />
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
import { ref } from 'vue'
const vertical = ref('vertical')
const horizontal = ref('horizontal')
</script>

<style scoped></style>
