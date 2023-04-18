<template>
  <div>
    <div class="flex_container_header">
      <div class="flex_container_name">
        {{ name || '弹性容器' }}
      </div>
    </div>
    <div class="flex_container_item">
      <slot></slot>
      <div>
        <el-link type="primary"> 新增 </el-link>
        <el-link type="primary">
          <el-icon size="18">
            <Delete />
          </el-icon>
        </el-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Delete, Rank, Plus } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'FlexContainer',
  components: {
    Delete
  },
  props: {
    name: String
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.flex_container_name {
  padding: 10px 15px;
  font-size: 12px;
}
.flex_container_operation {
  font-size: 12px;
}
.flex_container_item {
  padding: 20px;
}
.flex_container_operation {
  padding: 10px 15px;
}
.flex_container_header {
  font-size: 14px;
}
</style>
