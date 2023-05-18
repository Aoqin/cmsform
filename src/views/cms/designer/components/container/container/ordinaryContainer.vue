<template>
  <div>
    <div class="container_label" v-if="label">{{ label }}</div>
    <div class="container_component" :class="className">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  className: string
}>()
</script>

<style scoped>
.grid {
  display: grid;
  grid-gap: 1rem;
  align-items: start;
  justify-content: start;
}
.grid_col_1 {
  grid-template-columns: 1fr;
}
.grid_col_2 {
  grid-template-columns: 1fr 1fr;
}
.grid_col_3 {
  grid-template-columns: 1fr 1fr 1fr;
}
.grid_col_4 {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.grid_col_5 {
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.container_label {
  padding: 10px 15px 15px 0;
  font-size: 14px;
}
</style>
