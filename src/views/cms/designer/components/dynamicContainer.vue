<script lang="ts">
import { defineComponent, h, type DefineComponent, type VNode } from 'vue'
import { ElRow, ElCol, ElTabs, ElFormItem } from 'element-plus'
import Draggable from 'vuedraggable'
import type { INode } from '@/model/treeNode'
import DesignerItem from './designerItem.vue'
import Group from './container/flexContainer/flexContainer.vue'
import GroupItem from './container/flexContainer/flexContainerItem.vue'
import flexTable from './container/flexContainer/flexContainerTable.vue'
import { objMapToSet } from '@/utils'
import {
  defaultColProperties,
  defaultRowProperties,
  defaultTabsProperties,
  defaultTabPaneProperties
} from '@/config/fields'
import DynamicFormField from './dynamicFormField.vue'
import OrdinaryContainer from './container/container/ordinaryContainer.vue'

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

const dragableBuilder = (el: INode) => {
  let className = 'dragable_wrap'
  const { extendAttributes } = el
  if (extendAttributes.grid) {
    // todo: grid
    className += ' grid'
    if (extendAttributes.gridColumns) {
      className += ` grid_col_${extendAttributes.gridColumns}`
    }
    if (extendAttributes.gridRows) {
      className += ` grid_row_${extendAttributes.gridRows}`
    }
  }

  return h(
    Draggable,
    {
      modelValue: el.children,
      group: dragGroupOptions,
      class: className,
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
        return h(DesignerItem, {
          element
        })
      }
    }
  )
}

const fieldBuilder = (el: INode) =>
  h(DesignerItem, {
    element: el
  })

export default defineComponent({
  props: {
    /* ... */
    element: {
      type: Object,
      required: true
    }
  },
  setup(props) {},
  render() {
    const { element } = this.$props
    const { componentType, properties, children } = element!
    let comp: VNode | DefineComponent | Function | string = h('div')
    let childCompBuilder: VNode | DefineComponent | Function = () => null
    let attr: any = {}
    const groupAddItem = () => {
      const first = children[0]
      const cloneTmp = first.clone(true)
      element!.insertChild(cloneTmp)
    }

    const groupItemDel = () => {
      console.log('del')
    }

    const groupItemEdit = () => {
      console.log('edit')
    }

    switch (componentType) {
      case 'row':
        comp = ElRow
        objMapToSet(attr, properties, defaultRowProperties)
        childCompBuilder = () =>
          children.map((el: INode) => {
            const subAttr = {}
            objMapToSet(subAttr, el.properties, defaultColProperties)
            return h(
              ElCol,
              {
                ...subAttr
              },
              () => dragableBuilder(el)
            )
          })
        attr.label = properties.label
        break
      case 'tabs':
        comp = ElTabs
        objMapToSet(attr, properties, defaultTabsProperties)
        childCompBuilder = () =>
          children.map((el: INode) => {
            const subAttr = {}
            objMapToSet(subAttr, el.properties, defaultTabPaneProperties)
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
        if (!element.extendAttributes.table) {
          childCompBuilder = () =>
            children.map((el: INode, index: Number) => {
              if (index === 0) {
                return h(
                  GroupItem,
                  {
                    label: el.properties.label,
                    onEdit: groupItemEdit,
                    onDel: groupItemDel
                  },
                  () => dragableBuilder(el)
                )
              } else {
                return h(
                  GroupItem,
                  {
                    label: el.name,
                    operatiable: true,
                    noDrag: true,
                    onEdit() {
                      console.log('edit')
                    },
                    onDel() {
                      el!.remove()
                      console.log('delete')
                    }
                  },
                  el.children!.map((el: INode) => {
                    return h(
                      ElFormItem,
                      {
                        label: el.properties.label || undefined,
                        prop: el.key || undefined
                      },
                      () => h(DynamicFormField, { element: el })
                    )
                  })
                )
              }
            })
          attr.onAdd = groupAddItem
        } else {
          childCompBuilder = () => h(flexTable, { element, ref: 'flexTable' })
          attr.onAdd = () => {
            console.log('add')
            this.$refs.flexTable.addColumn()
          }
        }
        attr.label = properties.label
        attr.onTransform = () => {
          element.setExtendAttribute({ table: !element.extendAttributes.table })
        }
        break
      case 'container':
        comp = OrdinaryContainer
        childCompBuilder = () => dragableBuilder(element as INode)
        attr.label = properties.label
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
.dragable_wrap :deep(.dragable_component:last-child) {
  margin-bottom: 0;
}
</style>
