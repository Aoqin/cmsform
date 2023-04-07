<script lang="ts">
import { defineComponent, h, ref, type VNode } from 'vue'
import { Delete, Rank } from '@element-plus/icons-vue'
import { ElRow, ElCol, ElIcon, ElLink } from 'element-plus'
import Draggable from 'vuedraggable'
import type { INode } from '@/utils/tree'

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
    Draggable, {
    list: el.children,
    group: dragGroupOptions
  }, {
    item: ({ element }: { element: INode }) => {
      return h(
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
    }
  })

export default defineComponent({
  props: {
    /* ... */
    Element: Object
  },
  setup(props) {
    const count = ref(1)
  },
  render() {
    return h(ElRow, {}, [
      h(
        ElCol,
        {
          span: 8
        },
        []
      ),
      h(
        ElCol,
        {
          span: 8
        },
        [
          /* ... */
          NodeBuilder()
        ]
      ),
      h(
        ElCol,
        {
          span: 8
        },
        [
          /* ... */
          NodeBuilder()
        ]
      )
    ])
  }
})
</script>

<style scoped></style>
