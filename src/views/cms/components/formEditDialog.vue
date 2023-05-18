<template>
  <el-dialog v-model="dialogVisible" :title="title" destroy-on-close>
    <drawing-board ref="drawingEl" :config="elementOptions" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import DrawingBoard from '../drawing/drawingBoard.vue'
import { ref, computed, type PropType } from 'vue'
import type { INodeOptions } from '@/model/treeNode'

const props = defineProps<{
  visble: boolean
  elementOptions: INodeOptions
}>()

const drawingEl = ref()

const title = ref<string>('编辑')

const dialogVisible = computed({
  get: () => props.visble,
  set: (val) => emit('update:visble', val)
})

const emit = defineEmits<{
  (e: 'submit', value: any): void
  (e: 'update:visble', value: boolean): void
}>()

const handleConfirm = () => {
  drawingEl.value?.validate().then(() => {
    emit('submit', drawingEl.value.getStore())
  })
}
</script>

<style scoped></style>
