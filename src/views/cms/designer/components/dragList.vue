<script lang="ts">
import { defineComponent, h } from 'vue'
import Draggable from 'vuedraggable'
import DesignerFormItem from './dynamicFormItem.vue'

export default defineComponent({
  setup() {},
  render() {
    return h(Draggable, {},)
  }
})
</script>

<style scoped></style>
