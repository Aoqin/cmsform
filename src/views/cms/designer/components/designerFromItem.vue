<template>
  <div class="dragable_component">
    <div class="dragable_icon">
      <el-icon :size="20">
        <Rank />
      </el-icon>
    </div>
    <!-- component -->
    <div class="content">
      <DynamicContainer v-if="IsContainerComponent" :element="element" />
      <el-form-item v-else :label="element.name" prop="">
        <DynamicFormItem :element="element" v-model="model" />
      </el-form-item>
    </div>
    <!-- component operation -->
    <div class="operation">
      <el-link @click="handleDelete">
        <el-icon :size="20">
          <Delete />
        </el-icon>
      </el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, Rank } from '@element-plus/icons-vue'
import type { INode } from '@/model/treeNode'
import { onMounted, inject, computed } from 'vue'
import DynamicFormItem from './dynamicFormItem.vue'
import DynamicContainer from './dynamicContainer.vue'
import { ElLink } from 'element-plus'
import type { IObjectKeys } from '@/model/treeStore'
import { formFields } from '@/config/fields'

const props = defineProps<{
  element: INode
}>()

const model: IObjectKeys = computed({
  get() {
    return props.element.store!.model![props.element.getModelKey()!]
  },
  set(value) {
    props.element.store!.model![props.element.getModelKey()!] = value
  }
})

const emit = defineEmits<{
  (e: 'change', value: string | null): void
  (e: 'delete', value: string | null): void
}>()

const handleDelete = () => {
  console.log('emit delete')
  emit('delete', null)
}

const IsContainerComponent = computed(() => {
  return !formFields.includes(props.element.componentType)
})

onMounted(() => {
  // console.log(compRef.value)
})
</script>

<style scoped>
.dragable_component {
  position: relative;
  border: 1px dashed white;
  margin-bottom: 10px;
}
.dragable_icon {
  position: absolute;
  width: 20px;
  height: 20px;
  color: #333;
  background: #fff;
  cursor: move;
  z-index: 9;
}
.content {
  padding: 10px 15px;
}
.operation {
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 0 5px;
  background: #fff;
}
</style>
