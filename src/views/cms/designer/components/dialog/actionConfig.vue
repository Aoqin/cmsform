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
const props = defineProps({
  action: {
    type: Object,
    required: true
  }
})

const emit = defineEmits<{
  updateAction: (action: any) => void
}>()
</script>

<style scoped></style>
