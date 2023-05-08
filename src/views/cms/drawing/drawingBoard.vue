<template>
  <ElForm ref="formRef">
    <DrawingItem v-for="item in list" :key="`drawing_${item.key}`" :element="item" />
  </ElForm>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import { ElForm } from 'element-plus'
import type { INode } from '@/model/treeNode'
import { Treestore } from '@/model/viewStore'
import type { ITreeStore } from '@/model/viewStore'
import { rules } from '@/config/rules'
import functions from '@/config/functions'
import DrawingItem from './components/drawingItem.vue'

const store = reactive<ITreeStore>(new Treestore({ rules, functions }))
const props = defineProps<{
  config: Object
}>()

const emits = defineEmits<{
  (e: 'validate', value: boolean): void
}>()

const formRef = ref(null)

const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}

store.initialize(props.config)

const list = computed<INode[]>(() => store.root?.children ?? [])
</script>

<style scoped></style>
