<script lang="ts">
import { defineComponent, h, type DefineComponent, type VNode } from 'vue'
import { ElRow, ElCol, ElTabs } from 'element-plus'
import Draggable from 'vuedraggable'
import type { INode } from '@/model/treeNode'
import DesignerFormItem from './designerFromItem.vue'
import Group from './container/flexContainer/flexContainer.vue'
import GroupItem from './container/flexContainer/flexContainerItem.vue'
import { objMapToSet } from '@/utils'
import {
  defaultColAttributes,
  defaultRowAttributes,
  defaultTabsAttributes,
  defaultTabPaneAttributes
} from '@/config/fields'

const dragGroupOptions = {
  name: 'components',
  animation: 150,
  ghostClass: 'ghost',
  chosenClass: 'chosen',
  dragClass: 'drag',
  forceFallback: true,
  fallbackClass: 'fallback',
  fallbackOnBody: true,
  fallbackTolerance: 0,
  scroll: true,
  scrollSensitivity: 30,
  scrollSpeed: 10
}

const dragableBuilder = (el: INode) =>
  h(
    Draggable,
    {
      modelValue: el.children,
      group: dragGroupOptions,
      class: 'dragable_wrap',
      itemKey: 'key',
      onChange: (evt: any) => {
        if (evt.added) {
          el.insertChild(evt.added.element, evt.added.newIndex)
        }
        if (evt.removed) {
          el.removeChild(evt.removed.element)
        }
        if (evt.moved) {
          el.moveChild(evt.moved.element, evt.moved.newIndex, evt.moved.oldIndex)
        }
      }
    },
    {
      item: ({ element }: { element: INode }) => {
        return h(DesignerFormItem, {
          element
        })
      }
    }
  )

export default defineComponent({
  props: {
    /* ... */
    element: Object
  },
  setup(props) {},
  render() {
    const { element } = this.$props
    const { componentType, attributes, children } = element!
    let comp: VNode | DefineComponent | Function | string
    let childCompBuilder: VNode | DefineComponent | Function
    let attr: any = {}
    switch (componentType) {
      case 'row':
        comp = ElRow
        objMapToSet(attr, attributes, defaultRowAttributes)
        childCompBuilder = () =>
          children.map((el: INode) => {
            const subAttr = {}
            objMapToSet(subAttr, el.attributes, defaultColAttributes)
            return h(
              ElCol,
              {
                ...subAttr
              },
              () => dragableBuilder(el)
            )
          })
        break
      case 'tabs':
        comp = ElTabs
        objMapToSet(attr, attributes, defaultTabsAttributes)
        childCompBuilder = () =>
          children.map((el: INode) => {
            const subAttr = {}
            objMapToSet(subAttr, el.attributes, defaultTabPaneAttributes)
            return h(
              ElTabs.TabPane,
              {
                ...subAttr,
                name: el.key
              },
              () => dragableBuilder(el)
            )
          })
        if (attr.modelValue === undefined) {
          attr.modelValue = children[0].key
        }
        break
      case 'flexContainer':
        comp = Group
        childCompBuilder = () =>
          children.map((el: INode) => {
            return h(GroupItem, { label: el.name }, () => dragableBuilder(el))
          })
        break
    }
    if (!comp) {
      return h('div', 'error')
    }
    return h(
      comp,
      {
        ...attr
      },
      childCompBuilder
    )
  }
})
</script>

<style scoped>
.dragable_wrap {
  border: 1px dotted #e2e2e2;
  padding: 5px;
  min-height: 36px;
}
.dragable_wrap :deep .dragable_component:last-child {
  margin-bottom: 0;
}
</style>
