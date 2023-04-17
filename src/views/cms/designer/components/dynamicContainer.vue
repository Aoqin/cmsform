<script lang="ts">
import { defineComponent, h, type DefineComponent, type VNode } from 'vue'
import { Delete, Rank } from '@element-plus/icons-vue'
import { ElRow, ElCol, ElIcon, ElLink, ElTabs } from 'element-plus'
import Draggable from 'vuedraggable'
import type { INode } from '@/model/treeNode'
import DesignerFormItem from './designerFromItem.vue'

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

const NodeBuilder = () =>
  h(
    'div',
    {
      class: 'dragable_component'
    },
    [
      h(
        'div',
        {
          class: 'dragable_icon'
        },
        [
          h(
            ElIcon,
            {
              size: '20px'
            },
            [h(Rank, {})]
          )
        ]
      ),
      h(
        'div',
        {
          class: 'content'
        },
        [h('div', 'hello world')]
      ),
      h(
        'div',
        {
          class: 'operation'
        },
        [
          h(
            ElLink,
            {
              onClick: () => {
                console.log('emit delete')
              }
            },
            [
              h(
                ElIcon,
                {
                  size: 20
                },
                [
                  h(
                    Delete,
                    {
                      size: 20
                    },
                    {}
                  )
                ]
              )
            ]
          )
        ]
      )
    ]
  )

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
    let comp: VNode | DefineComponent | Function
    let childCompBuilder: VNode | DefineComponent | Function
    let attr = {}
    switch (componentType) {
      case 'row':
        comp = ElRow
        childCompBuilder = () =>
          children.map((el: INode) => {
            return h(ElCol, { span: 12 }, () => dragableBuilder(el))
          })
        break
      case 'tabs':
        comp = ElTabs
        childCompBuilder = () =>
          children.map((el: INode) => {
            return h(ElTabs.TabPane, { label: el.name }, () => dragableBuilder(el))
          })
        attr = {
          modelValue: attributes?.defaultActive || children[0].name
        }
    }
    if (!comp || !childCompBuilder) {
      return h('div', 'error')
    }
    return h(comp, attributes, childCompBuilder)
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
