<template>
  <el-dialog v-model="dialogVisible" title="" width="" :before-close="handleClose">
    <el-row>
      <el-col :span="6">
        <div class="">links:: <el-link type="primary" @click="handleAddLink">添加</el-link></div>
        <div class="">
          <div class="">
            <div class="" v-for="(item, index) in linkNodes" :key="`linkNode_${index}`">
              <el-link class="" @click="editLinkNode(item)">
                <span>{{ item.name }}</span>
                <span>{{ item.key }}</span>
              </el-link>
              <div class="">
                <el-link type="primary" @click="removeLinkNode(item)">删除</el-link>
              </div>
            </div>
          </div>
          <div class=""></div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-form
          :model="form"
          ref="form"
          :rules="rules"
          label-width="80px"
          :inline="false"
          size="normal"
        >
          <el-form-item label=""> </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue'

const form = ref<any>({})
const rules = ref<any>({})

const props = defineProps({
  //   action: {
  //     type: Object,
  //     required: true
  //   },
  visible: Boolean
})
const dialogVisible = ref<boolean>(true)
// const dialogVisible = computed({
//   get() {
//     return props.visible
//   },
//   set(value) {
//     // props.action.dialogVisible = value
//   }
// })

const linkNodes = ref<any>([
  {
    id: 1,
    name: '1111'
  },
  {
    id: 2,
    name: '2222'
  }
])

const emit = defineEmits<{
  updateAction: (action: any) => void
}>()

const handleConfirm = () => {
  //   emit('updateAction', props.action)
  //   dialogVisible.value = false
}
const handleClose = () => {
  //   dialogVisible.value = false
}

const onSubmit = () => {
  console.log('submit')
}
const handleAddLink = () => {}
const removeLinkNode = (item: any) => {
  console.log('item:: ', item)
}
const editLinkNode = (item: any) => {
  console.log('item:: ', item)
}
</script>

<style scoped></style>
