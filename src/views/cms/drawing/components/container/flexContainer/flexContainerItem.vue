<template>
  <div class="group_item">
    <slot></slot>
    <div v-if="operatiable" class="group_item_operation">
      <el-link type="primary" @click="edit">
        <el-icon size="18">
          <Edit />
        </el-icon>
      </el-link>
      <el-link type="primary" @click="del">
        <el-icon size="18">
          <Delete />
        </el-icon>
      </el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
const emits = defineEmits<{
  (e: 'add'): void
  (e: 'del'): void
  (e: 'edit'): void
}>()

defineProps<{
  operatiable: boolean
  label: string
  noDrag: boolean
}>()

const edit = () => {
  emits('edit')
}

const del = () => {
  emits('del')
}
</script>

<style scoped>
.group_item {
  position: relative;
  margin-bottom: 10px;
}
.group_item_block {
  border: 1px dotted #e2e2e2;
  padding: 10px 20px 5px;
  min-height: 36px;
}
.group_item_operation {
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 5px 10px;
  background: #fff;
}
</style>
