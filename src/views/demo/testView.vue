<template>
  <DesignerForm ref="designer" :config="config" :loading="loading" @submit="save" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DesignerForm from '../cms/designer/elementDesigner.vue'
import { getContainerConfig, getComponentConfig } from '@/utils/convert'
import { createForm, getForm, updateForm } from '@/services/index'
import type { INode } from '@/model/treeNode'
import { ElMessage } from 'element-plus'

const loading = ref<boolean>(false)
const designer = ref<InstanceType<typeof DesignerForm> | null>(null)

const route = useRoute()
const config = {}
const { id } = route.query

if (id) {
  loading.value = true
  getForm({ formConfigId: id as string })
    .then((res) => {
      if (res.status === 200) {
        if (res.data.code === '0') {
          const root = getContainerConfig(res.data.data)
          console.log(root)
          designer.value?.initNode(root)
        }
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const save = (params: INode) => {
  const container = getComponentConfig(params)
  if (id) {
    container.formConfigId = id as string
    updateForm(container).then((res) => {
      if (res.status === 200) {
        if (res.data.code === '0') {
          console.log(res.data.data)
          ElMessage.success('保存成功')
        }
      }
    })
  } else {
    createForm(container).then((res) => {
      if (res.status === 200) {
        if (res.data.code === '0') {
          console.log(res.data.data)
          ElMessage.success('保存成功')
        }
      }
    })
  }
}

onMounted(() => {
  console.log(designer.value)
})
</script>

<style scoped></style>
