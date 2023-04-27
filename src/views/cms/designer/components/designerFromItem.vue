<template>
  <div class="dragable_component" :class="{ active: isActive }" @click.stop="selectNode">
    <div class="dragable_icon">
      <el-icon :size="20">
        <Rank />
      </el-icon>
    </div>
    <!-- component -->
    <div class="content" :class="{ container: IsContainerComponent }">
      <DynamicContainer v-if="IsContainerComponent" :element="element" />
      <DynamicFormItem v-else :element="element">
        <DynamicFormField :element="element" />
      </DynamicFormItem>
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
import { onMounted, computed, defineProps } from 'vue'
import DynamicFormField from './dynamicFormField.vue'
import DynamicContainer from './dynamicContainer.vue'
import { ElLink } from 'element-plus'
import { formFields } from '@/config/fields'
import DynamicFormItem from './dynamicFormItem.vue'

const props = defineProps<{
  element: INode
}>()

const isActive = computed(() => {
  return props.element.store!.currentNodeKey === props.element.key
})

const handleDelete = () => {
  console.log('emit delete')
  props.element.remove()
}

const IsContainerComponent = computed(() => {
  return !formFields.includes(props.element.componentType as string)
})

const selectNode = () => {
  props.element.store?.setCurrentNode(props.element)
}

onMounted(() => {
  // console.log(compRef.value)
})
</script>

<style scoped>
.active > .dragable_icon {
  display: block;
}

.active > .operation {
  display: block;
}
.active.dragable_component {
  border-color: #2d77d6;
}

.active .content.container {
  border-color: 1px solid #2d77d6;
}

.dragable_component {
  position: relative;
  border: 1px dashed white;
  margin-bottom: 5px;
}
.dragable_icon {
  display: none;
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
.content.container {
  padding: 1px;
}
.operation {
  display: none;
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 0 5px;
  background: #fff;
}
</style>
