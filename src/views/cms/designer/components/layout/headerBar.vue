<template>
  <div>
    <el-link type="primary" @click="jsonVisible = true"> 查看表单配置 </el-link>
    <el-link type="primary" @click="formVisible = true"> 查看表单值 </el-link>
    <el-link type="primary" @click="previewVisiable = true"> 预览 </el-link>
    <ElLink type="primary" @click="generate">生成后端配置</ElLink>
    <ElDialog v-model="jsonVisible" title="配置信息">
      <AceBuild :data="jsonData" />
      <template #footer>
        <ElButton @click="jsonVisible = false"> 取消 </ElButton>
        <ElButton ref="copyBtn" @click="copyJson"> 复制 </ElButton>
      </template>
    </ElDialog>
    <ElDialog v-model="formVisible" title="表单值">
      <AceBuild :data="formData" />
    </ElDialog>
    <ElDialog v-model="previewVisiable" destroy-on-close title="预览">
      <DrawingBoard :config="jsonData" />
      <template #footer>
        <ElButton @click="previewVisiable = false">确定</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import AceBuild from '@/components/ace/aceBuild.vue'
import type { ITreeStore } from '@/model/treeStore'
import DrawingBoard from '@/views/cms/drawing/drawingBoard.vue'
import { getComponentConfig } from '@/utils/convert'

const jsonVisible = ref<boolean>(false)
const formVisible = ref<boolean>(false)
const previewVisiable = ref<boolean>(false)
const copyBtn = ref<HTMLElement | null>(null)

const props = defineProps<{
  store: ITreeStore
}>()

const jsonCopyValue = computed(() => {
  return JSON.stringify(props.store.root?.getReadOnlyNode() || {}, null, 2)
})

const jsonData = computed(() => {
  return props.store.root?.getReadOnlyNode() || {}
})

const formData = computed(() => {
  return props.store.model || {}
})

const copyJson = async () => {
  try {
    await navigator.clipboard.writeText(jsonCopyValue.value)
    ElMessage.success('复制成功')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

onMounted(() => {})

const generate = () => {
  console.log('generate')
  console.log(getComponentConfig(props.store.root!))
}
</script>

<style scoped></style>
