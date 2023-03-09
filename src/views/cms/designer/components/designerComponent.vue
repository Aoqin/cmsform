<template>
  <div class="dragable_component">
    <div class="dragable_icon">
      <el-icon :size="20">
        <Rank />
      </el-icon>
    </div>
    <!-- component -->
    <div class="content">
      <ElFormItem>
        <!-- <component :is="dynamicComp(element.componentType)" v-bind="attrs" v-model="value">
        </component> -->
      </ElFormItem>
    </div>
    <!-- component operation -->
    <div class="operation">
      <el-link>
        <el-icon :size="20">
          <Delete />
        </el-icon>
      </el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, Rank } from '@element-plus/icons-vue'
import {
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElCheckbox,
  ElRadioGroup,
  ElCheckboxGroup,
  ElAlert
} from 'element-plus'
import type { INode } from '@/utils/tree'
import { computed, reactive, render, h } from 'vue'

const props = defineProps<{
  element: INode
}>()

const emit = defineEmits<{
  (e: 'change', value: string | null): void
}>()

const attrs = reactive<{ placeholder: string }>({
  placeholder: '默认提示文字'
})

// 动态组件
const dynamicComp = (type: string) => {
  switch (type) {
    case 'input':
      return ElInput
    case 'select':
      return ElSelect
    default:
      return ElAlert
  }
}

const renderComp = dynamicComp(props.element.componentType)

// todo: 抽出封装
const optionItems = h() 

//
const dynamicSlot = () => {

}

const value = computed({
  get: () => props.element.value,
  set: (val) => {
    emit('change', val)
  }
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
  border: 1px solid white;
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
