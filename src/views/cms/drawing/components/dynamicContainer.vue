<script lang="ts">
import { defineComponent, h, type DefineComponent, type VNode, type Prop, type PropType } from 'vue'
import { ElRow, ElCol, ElTabs, ElFormItem, ElTabPane } from 'element-plus'
import type { INode } from '@/model/treeNode'
import { objMapToSet } from '@/utils'
import {
  defaultColProperties,
  defaultRowProperties,
  defaultTabsProperties,
  defaultTabPaneProperties
} from '@/config/fields'
import DrawingItem from './drawingItem.vue'
import DynamicFormField from '../../designer/components/dynamicFormField.vue'
import FlexTable from '../../designer/components/container/flexContainer/flexContainerTable.vue'
import Group from './container/flexContainer/flexContainer.vue'
import GroupItem from './container/flexContainer/flexContainerItem.vue'
import OrdinaryContainer from '../../designer/components/container/container/ordinaryContainer.vue'

export default defineComponent({
  name: 'DynamicContainer',
  props: {
    /* ... */
    element: {
      type: Object as PropType<INode>,
      required: true
    }
  },
  render() {
    const { element } = this.$props
    const { componentType, properties, children, extendAttributes } = element!
    let comp: VNode | DefineComponent | Function | string = h('div')
    let childCompBuilder: VNode | DefineComponent | Function = () => null
    let attr: Record<string, any> = {}

    const classBuilder = (attrs: any) => {
      let contentClassName = ''
      if (extendAttributes && attrs.grid) {
        contentClassName = 'grid'
        if (attrs.gridColumns) {
          contentClassName += ` grid_col_${attrs.gridColumns}`
        }
        if (attrs.gridRows) {
          contentClassName += ` grid_row_${attrs.gridRows}`
        }
      }
      return contentClassName
    }

    const clearDefaulValue = (node: INode) => {
      if (node.children) {
        node.children.forEach((item: INode) => {
          clearDefaulValue(item)
        })
      }
      if (node.value instanceof Array) {
        node.value = []
      } else if (node.value instanceof Object) {
        node.value = {}
      } else {
        node.value = ''
      }
    }

    const groupAddItem = () => {
      const first = children![0]
      const cloneTmp = first.clone(true)
      clearDefaulValue(cloneTmp)
      element!.insertChild(cloneTmp)
    }

    switch (componentType) {
      case 'row':
        comp = ElRow
        objMapToSet(attr, properties, defaultRowProperties)
        childCompBuilder = () =>
          children!.map((el: INode) => {
            const subAttr = {}
            objMapToSet(subAttr, el.properties, defaultColProperties)
            return h(
              ElCol,
              {
                ...subAttr
              },
              el.children?.map((child: INode) => {
                return h(DrawingItem, {
                  element: child
                })
              })
            )
          })
        attr.label = properties.label
        break
      case 'tabs':
        comp = ElTabs
        objMapToSet(attr, properties, defaultTabsProperties)
        childCompBuilder = () =>
          children!.map((el: INode) => {
            const subAttr = {}
            objMapToSet(subAttr, el.properties, defaultTabPaneProperties)
            return h(
              ElTabPane,
              {
                ...subAttr,
                name: el.key,
                className: classBuilder(el.extendAttributes)
              },
              () =>
                el.children?.map((child: INode) => {
                  return h(DrawingItem, {
                    element: child
                  })
                })
            )
          })
        if (attr.modelValue === undefined) {
          attr.modelValue = children![0].key
        }
        break
      case 'flexContainer':
        comp = Group
        if (!element.extendAttributes.table) {
          // 非 table 样式展示
          childCompBuilder = () =>
            children!.map((el: INode, index: number) => {
              let label = ''
              if (extendAttributes.showSubTitle) {
                label = el.componentName
              }
              if (extendAttributes.showIndex) {
                label = label + `${index + 1}`
              }
              const childAttr = {
                operatiable: true,
                noDrag: true,
                label,
                onEdit() {
                  console.log('edit')
                },
                onDel() {
                  el!.remove()
                  console.log('delete')
                }
              }
              if (!el.extendAttributes.hideLabel) {
                childAttr.label = el.properties.label
              }
              return h(
                GroupItem,
                {
                  ...childAttr
                },
                el.children!.map((el: INode) => {
                  const subChildAttr = {
                    label: null,
                    prop: el.key || undefined
                  }
                  if (!el.extendAttributes.hideLabel) {
                    subChildAttr.label = el.properties.label
                  }
                  return h(
                    ElFormItem,
                    {
                      ...subChildAttr
                    },
                    () => h(DynamicFormField, { element: el })
                  )
                })
              )
            })
          attr.onAdd = groupAddItem
        } else {
          childCompBuilder = () => h(FlexTable, { element, ref: 'flexTable' })
          attr.onAdd = () => {
            ;(this.$refs.flexTable as InstanceType<typeof FlexTable>).addColumn()
          }
        }
        attr.label = properties.label
        break
      case 'container':
        comp = OrdinaryContainer
        childCompBuilder = element!.children?.map((el: INode) => {
          return h(DrawingItem, {
            element: el
          })
        })
        extendAttributes.hideLabel
          ? (attr.hideLabel = extendAttributes.hideLabel)
          : (attr.hideLabel = false)
        attr.className = classBuilder(extendAttributes)
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
.grid {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  display: grid;
  grid-gap: 0 1rem;
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
</style>
