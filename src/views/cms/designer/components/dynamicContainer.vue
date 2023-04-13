<script lang="ts">
import { defineComponent, h, ref, type VNode } from 'vue'
import { Delete, Rank } from '@element-plus/icons-vue'
import { ElRow, ElCol, ElIcon, ElLink } from 'element-plus'
import Draggable from 'vuedraggable'
import type { INode } from '@/utils/tree'
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

const dragableBuilder = (el: INode, index) =>
  h(
    Draggable,
    {
      modelValue: el.children,
      group: dragGroupOptions,
      class: 'dragable_wrap',
      'onUpdate:modelValue': (params: INode[]) => {
        console.log('params::')
        console.log(params)
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

    return h(
      ElRow,
      {},
      element!.children.map((el: INode, index: number) => {
        return h(ElCol, { span: 12 }, dragableBuilder(el, index))
      })
    )
  }
})
</script>

<style scoped>
.dragable_wrap {
  border: 1px dashed #e2e2e2;
  padding: 5px;
}
</style>
