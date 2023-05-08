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
    const { componentType, properties, children } = element!
    let comp: VNode | DefineComponent | Function | string = h('div')
    let childCompBuilder: VNode | DefineComponent | Function = () => null
    let attr: IObjectKeys<string> = {}
    console.log('drawing container::::::')
    console.log(element)
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
                name: el.key
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
          childCompBuilder = () =>
            children!.map((el: INode, index: Number) => {
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
                      label: el.name || undefined,
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
        break
      case 'container':
        comp = defineComponent({
          name: 'containerComponent',
          setup(props, { slots }) {
            return () => h('div', { class: 'containerComponent' }, slots.default?.())
          }
        })
        childCompBuilder = element!.children?.map((el: INode) => {
          return h(DrawingItem, {
            element: el
          })
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

<style scoped></style>
