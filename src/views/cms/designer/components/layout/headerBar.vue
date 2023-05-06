<template>
  <div>
    <el-link type="primary" @click="jsonVisible = true"> 查看表单配置 </el-link>
    <el-link type="primary" @click="formVisible = true"> 查看表单值 </el-link>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import AceBuild from '@/components/ace/aceBuild.vue'
import type { ITreeStore } from '@/model/treeStore'

const jsonVisible = ref<boolean>(false)
const formVisible = ref<boolean>(false)
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

// const viewJson = () => {
//   jsonVisible.value = true
//   if (!clipboard && copyBtn.value) {
//     clipboard = new Clipboard(copyBtn.value as HTMLElement)
//     clipboard.on('success', () => {
//       ElMessage.success('复制成功')
//     })
//     clipboard.on('error', () => {
//       console.log('error')
//       ElMessage.error('复制失败')
//     })
//   }
// }

onMounted(() => {
  console.log('copyBtn.value')
  console.log(copyBtn)
  console.log(copyBtn.value)
  // const clipboard = new Clipboard(copyBtn.value as HTMLElement)
  // clipboard.on('success', () => {
  //   ElMessage.success('复制成功')
  // })
  // clipboard.on('error', () => {
  //   console.log('error')
  //   ElMessage.error('复制失败')
  // })
})

// const viewJson = () => {
//   console.log('viewJson')
// }
</script>

<style scoped></style>
