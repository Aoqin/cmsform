<script lang="ts">
import { ElLink, ElTable, ElTableColumn } from 'element-plus'
import { defineComponent, h } from 'vue'
import type { INode } from '@/model/treeNode'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

function formFieldConvert(node?: INode): Array<any> {
  return tableData
}

export default defineComponent({
  props: {
    element: {
      type: Object as () => INode,
      required: true
    }
  },
  render() {
    const { element } = this.$props
    return h('div', {}, [
      h('div', {}, [
        h('span', element.name),
        h(
          ElLink,
          {
            type: 'primary'
          },
          '添加'
        )
      ]),
      h(
        ElTable,
        {
          data: formFieldConvert()
        },
        element.options!.map((item: any) => {
          console.log('item: ', item)
          return h(ElTableColumn, {
            prop: item.prop,
            label: item.label
          })
        })
      )
    ])
  }
})
</script>

<style scoped></style>
