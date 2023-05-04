<script lang="ts">
import { ElTable, ElTableColumn } from 'element-plus'
import { defineComponent, h } from 'vue'
import TreeNode from '@/model/treeNode'

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

export default defineComponent({
  props: {
    element: {
      type: TreeNode,
      required: true
    }
  },
  render() {
    const { element } = this.$props
    return h(
      ElTable,
      {
        data: tableData
      },
      element.children!.map((item: any) => {
        console.log('item: ', item)
        return h(ElTableColumn, {
          prop: item.properties.prop,
          label: item.properties.label
        })
      })
    )
  }
})
</script>

<style scoped></style>
