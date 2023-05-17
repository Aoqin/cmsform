<template>
  <div class="flex_containr">
    <div class="flex_contaier_header">
      <div class="flex_container_name">
        {{ name || '弹性容器' }}
      </div>
      <div class="flex_container_operation">
        <ElLink type="prymary" @click="add">添加</ElLink>
      </div>
    </div>
    <div class="flex_contaier_body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  name: string
}>()

const emits = defineEmits<{
  (e: 'add'): void
}>()

const add = () => {
  emits('add')
}
</script>

<style scoped></style>
