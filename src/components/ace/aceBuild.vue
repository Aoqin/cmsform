<template>
  <div ref="editor"></div>
</template>

<script setup lang="ts">
import ace from 'ace-builds'
import { ref, onMounted } from 'vue'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-json'

const editor = ref<Element | null>(null)

onMounted(() => {
  console.log('editor::::::::::')
  console.log(editor)
  const edit = ace.edit(editor.value, {
    useWorker: false
  })
  edit.setTheme('ace/theme/monokai')
  edit.session.setMode('ace/mode/json')
  edit.setValue(JSON.stringify({ a: 1, b: 2 }, null, 2))
})
</script>

<style scoped></style>
