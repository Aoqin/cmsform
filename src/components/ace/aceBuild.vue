<template>
  <div ref="editor" class="ace_editor" />
</template>

<script lang="ts">
import ace from 'ace-builds'
import { nextTick, defineComponent } from 'vue'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-json'
import type { IObjectKeys } from '@/config/common'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data(): {
    aceEdit: any
  } {
    return {
      aceEdit: null
    }
  },
  watch: {
    data: {
      handler(val: IObjectKeys<any>) {
        nextTick(() => {
          if (this.aceEdit) {
            this.aceEdit.setValue(JSON.stringify(val, null, 2))
          }
        })
      },
      deep: true
    }
  },
  methods: {
    getJson() {
      return JSON.parse(this.aceEdit.getValue())
    }
  },
  mounted() {
    this.aceEdit = ace.edit(this.$refs.editor as Element, {
      useWorker: false
    })
    this.aceEdit.setTheme('ace/theme/monokai')
    this.aceEdit.session.setMode('ace/mode/json')
    this.aceEdit.setValue(JSON.stringify(this.data, null, 2))
  }
})
</script>

<style scoped>
.ace_editor {
  min-height: 500px;
  width: 100%;
}
</style>
