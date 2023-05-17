<template>
  <el-dialog v-model="dialogVisible" title="" width="" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  action: {
    type: Object,
    required: true
  },
  modelValue: Boolean
})

const emit = defineEmits<{
  (e: 'update:action', value: any): void
  (e: 'update:modelValue', value: boolean): void
}>()

const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  }
})

const handleClose = () => {
  dialogVisible.value = false
}
const handleConfirm = () => {
  emit('update:action', props.action)
  dialogVisible.value = false
}
</script>

<style scoped></style>
