<template>
  <div class="attribute">
    <el-form
      :model="attributeForm"
      ref="attributeFormEl"
      :rules="rules"
      :inline="false"
      label-width="60px"
      label-position="top"
    >
      <el-form-item label="id">
        <el-input v-model="attributeForm.id" />
      </el-form-item>
      <el-form-item label="name">
        <el-input v-model="attributeForm.name" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const attributeFormEl = ref()

const attributeForm = reactive({
  id: '',
  name: ''
})
const rules = reactive({
  id: []
})
</script>

<style scoped>
.attribute {
  padding: 20px 15px;
}
</style>
