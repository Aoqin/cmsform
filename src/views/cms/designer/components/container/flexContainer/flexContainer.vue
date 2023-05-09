<template>
  <div class="flex_container">
    <div v-if="label" class="flex_container_header">
      <div class="flex_container_name">
        {{ label }}
      </div>
    </div>
    <div class="flex_container_item">
      <slot></slot>
    </div>
    <div class="flex_container_footer">
      <el-link type="primary" @click="add"> 添加 </el-link>
      <el-link type="primary" @click="transform">转换</el-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FlexContainer',
  emits: ['add', 'transform'],
  components: {},
  props: {
    label: String
  },
  methods: {
    add() {
      this.$emit('add')
    },
    transform() {
      this.$emit('transform')
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.flex_container {
  padding: 10px 0;
}
.flex_container_name {
  padding: 10px 15px;
  font-size: 12px;
}
.flex_container_operation {
  font-size: 12px;
}
.flex_container_item {
  padding: 0 10px;
}
.flex_container_footer {
  padding: 0 15px 15px;
}
.flex_container_operation {
  padding: 10px 0px;
}
.flex_container_header {
  font-size: 14px;
}
</style>
