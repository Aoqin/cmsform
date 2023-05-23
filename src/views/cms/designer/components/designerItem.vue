<template>
  <div class="dragable_component" :class="classNames" @click.stop="selectNode">
    <div class="dragable_icon">
      <el-icon :size="20">
        <Rank />
      </el-icon>
    </div>
    <!-- component -->
    <div class="content" :class="{ container: IsContainerComponent }">
      <DynamicContainer v-if="IsContainerComponent" :element="element" />
      <DynamicView v-else-if="IsViewComponet" :element="element" />
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
import { onMounted, computed } from 'vue'
import DynamicFormField from './dynamicFormField.vue'
import DynamicContainer from './dynamicContainer.vue'
import { ElLink } from 'element-plus'
import { containerFields, viewFields } from '@/config/fields'
import DynamicFormItem from './dynamicFormItem.vue'
import DynamicView from './dynamicView.vue'
import type { ContainerComponentType } from '@/config/fields'
import type { ViewComponentType } from '@/config/fields'

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
  return containerFields.includes(props.element.componentType as ContainerComponentType)
})

const IsViewComponet = computed(() => {
  return viewFields.includes(props.element.componentType as ViewComponentType)
})

const selectNode = () => {
  props.element.store?.setCurrentNode(props.element)
}

const classNames = computed(() => {
  const style = props.element.style
  let classList: string[] = [isActive.value ? 'active' : '']
  if (style.gridColumnEnd) {
    classList.push(`col_end_${style.gridColumnEnd}`)
  }
  return classList
})

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
.col_end_2 {
  grid-column-end: span 2;
}
.col_end_3 {
  grid-column-end: span 3;
}
.col_end_4 {
  grid-column-end: span 4;
}
.col_end_5 {
  grid-column-end: span 5;
}
</style>
