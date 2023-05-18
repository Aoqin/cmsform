<template>
  <ElForm ref="formRef" v-buid="properties" :model="models">
    <DrawingItem v-for="item in list" :key="`drawing_${item.key}`" :element="item" />
  </ElForm>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import { ElForm, type FormInstance } from 'element-plus'
import type { INode } from '@/model/treeNode'
import { Treestore } from '@/model/viewStore'
import type { ITreeStore } from '@/model/viewStore'
import { rules } from '@/config/rules'
import functions from '@/config/functions'
import DrawingItem from './components/drawingItem.vue'
import type { INodeOptions } from '@/model/treeNode'

const props = defineProps<{
  config: INodeOptions
}>()

const store = reactive<ITreeStore>(new Treestore({ rules, functions }))
const formRef = ref<FormInstance>()
const properties = computed(() => store.root?.properties ?? {})

const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value!.validate((valid: boolean) => {
      if (valid) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}

const models = computed(() => store.model as Record<string, any>)

store.initialize(props.config)

const list = computed((): INode[] => {
  if (!store.root || !store.root.children) return []
  else return store.root.children
})

const getStore = () => {
  return store
}

defineExpose({
  validate,
  getStore
})
</script>

<style scoped></style>
