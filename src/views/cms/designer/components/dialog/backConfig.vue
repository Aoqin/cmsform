<template>
  <!-- 配置信息 -->
  <ElDialog ref="confiDialog" v-model="visibleAsync" destroy-on-close title="后端配置信息">
    <AceBuild ref="aceBuildRef" :data="backConfigData" />
    <template #footer>
      <ElButton @click="visibleAsync = false"> 取消 </ElButton>
      <ElButton type="primary" @click="updateConfig"> 确定 </ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts">
import { ElDialog } from 'element-plus'
import AceBuild from '@/components/ace/aceBuild.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    AceBuild,
    ElDialog
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'update:config'],
  computed: {
    visibleAsync: {
      get() {
        return this.modelValue
      },
      set(value: boolean) {
        this.$emit('update:modelValue', value)
      }
    },
    backConfigData: {
      get() {
        return this.config
      },
      set(value: any) {
        this.$emit('update:config', value)
      }
    }
  },
  methods: {
    updateConfig() {
      this.$emit('update:config', this.$refs.aceBuildRef.getJson())
      this.visibleAsync = false
      //   console.log(this.$refs.aceBuildRef.getJson())
      //   console.log(this.$refs.confiDialog.getJson())
    }
  }
})


</script>

<style scoped></style>
