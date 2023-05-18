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
import type { IObjectKeys } from '@/config/common'
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
    let attr: IObjectKeys<string> = {}

    const classbuilder = (attrs: any) => {
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
                className: classbuilder(el.extendAttributes)
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
            children!.map((el: INode, index: Number) => {
              return h(
                GroupItem,
                {
                  label: el.properties.label,
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
            })
        } else {
          childCompBuilder = () => h(FlexTable, { element })
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
        attr.label = properties.label
        attr.className = classbuilder(extendAttributes)
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
</style>
