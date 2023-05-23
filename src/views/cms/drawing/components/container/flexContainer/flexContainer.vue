<template>
  <div class="flex_containr">
    <div class="flex_contaier_header">
      <div class="flex_container_name">
        {{ label }}
      </div>
      <div class="flex_container_operation">
        <el-button type="primary" @click="add" round>
          <el-icon size="14">
            <Plus />
          </el-icon>
          <span>添加</span>
        </el-button>
      </div>
    </div>
    <div class="flex_contaier_body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElButton, ElIcon } from 'element-plus'

defineProps<{
  label: String
}>()

const emits = defineEmits<{
  (e: 'add'): void
}>()

const add = () => {
  emits('add')
}
</script>

<style scoped>
.flex_containr {
  margin-bottom: 15px;
}
.flex_contaier_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  font-size: 14px;
}
</style>
