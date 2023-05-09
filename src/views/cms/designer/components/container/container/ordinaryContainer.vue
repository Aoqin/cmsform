<template>
  <div>
    <div class="container_label" v-if="label">{{ label }}</div>
    <div class="container_component">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
}>()
</script>

<style scoped>
.container_label {
  padding: 10px 15px 15px 0;
  font-size: 14px;
}
</style>
