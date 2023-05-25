<template>
  <el-form ref="formEl" :model="taskForm" :rules="taskFormrules" inline label-width="">
    <el-form-item label="任务名称" prop="taskName">
      <el-input v-model="taskForm.taskName" placeholder="请输入" />
    </el-form-item>
    <DrawingBoard ref="drawingEl" v-if="config" :config="config" />
    <el-button type="default" :loading="saving" @click="saveForm">保存</el-button>
    <el-button type="primary">提交</el-button>
  </el-form>
</template>

<script setup lang="ts">
import type { INodeOptions } from '@/model/treeNode'
import { commitTaskData, getFormCssDetail, getFormDataValue, saveTaskForm } from '@/services/task'
import { convertNodeToComp, viewConfigBuilder } from '@/utils/viewConvert'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DrawingBoard from '../cms/drawing/drawingBoard.vue'

// READER-传阅我的,BIZ_QUERY-业务查询,APPROVED-已处理的,WORK_MANAGEMENT-工单管理
type TaskType = 'CREATE' | 'INITIATED' | 'READER' | 'BIZ_QUERY' | 'APPROVED' | 'WORK_MANAGEMENT'

const route = useRoute()

const config = ref<INodeOptions>()
const id = ref<string | null>(null)
const saving = ref(false)
const submiting = ref(false)
const drawingEl = ref()
const formEl = ref()

const taskForm = ref({
  taskName: ''
})

const taskFormrules = ref({
  taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }]
})

const { no, type, view, instance } = route.query

// 获取表单配置信息
const viewDetail = async (code: string) => {
  // let serviceFun = getFormCssDetail

  if (type === 'CREATE') {
    const res = await getFormCssDetail({ processConfigCode: code })
    if (res.status === 200 && res.data.code === '0') {
      if (res.data) {
        id.value = res.data.data.processConfigId
        const formCssConfig = res.data.data.formConfigVo.formCssConfig
        config.value = viewConfigBuilder(res.data.data.formComponentVos, JSON.parse(formCssConfig))
      }
    }
  } else if (instance) {
    const res = await getFormDataValue({ instanceId: instance })
    if (res.status === 200 && res.data.code === '0') {
      if (res.data) {
        const { formDataValues, formComponentVos, formConfigVo, instanceName, processConfigId } =
          res.data.data
        id.value = processConfigId
        taskForm.value.taskName = instanceName
        const formCssConfig = formConfigVo.formCssConfig
        // buildcompConfig()
        console.log(viewConfigBuilder(formComponentVos, JSON.parse(formCssConfig), formDataValues))
        config.value = viewConfigBuilder(
          formComponentVos,
          JSON.parse(formCssConfig),
          formDataValues
        )
        // const formCssConfig = res.data.data.formConfigVo.formCssConfig
        // console.log(res.data.data.formComponentVos)
        // config.value = viewConfigBuilder(res.data.data.formComponentVos, JSON.parse(formCssConfig))
      }
    }
  }
}

// 保存
const saveForm = async () => {
  saving.value = true
  const root = drawingEl.value.getStore().root
  const volueConfig = convertNodeToComp(root)
  let formValues = null
  for (var key in volueConfig) {
    // 表单配置有根节点
    formValues = volueConfig[key]
  }
  saveTaskForm({
    instanceId: instance,
    instanceName: taskForm.value.taskName,
    processConfigId: id.value,
    formDataValues: formValues
  })
    .then((res) => {
      if (res.status === 200 && res.data.code === '0') {
        saving.value = false
      }
    })
    .finally(() => {
      saving.value = false
    })
}

// 提交
const submitForm = () => {
  submiting.value = true
  Promise.all([formEl.value.validate(), drawingEl.value.validate()])
    .then(() => {
      const root = drawingEl.value.getStore().root
      const volueConfig = convertNodeToComp(root)
      let formValues = null
      for (var key in volueConfig) {
        // 表单配置有根节点
        formValues = volueConfig[key]
      }

      return commitTaskData({
        instanceId: instance,
        instanceName: taskForm.value.taskName,
        processConfigId: id.value,
        formDataValues: formValues
      })
    })
    .finally(() => {
      submiting.value = false
    })
}

if (no) {
  viewDetail(no as string)
}
</script>

<style scoped></style>
