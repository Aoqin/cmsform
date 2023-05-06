<template>
  <div>
    <el-link type="primary" @click="jsonVisible = true"> 查看json </el-link>
    <AceBuild />
    <ElDialog v-model="jsonVisible" title="配置信息"> </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElDialog } from 'element-plus'
import AceBuild from '@/components/ace/aceBuild.vue'

const jsonVisible = ref<boolean>(false)

const viewJson = () => {
  console.log('viewJson')
}
</script>

<style scoped></style>
