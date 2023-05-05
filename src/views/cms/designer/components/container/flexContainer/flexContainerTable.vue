<template>
  <div>
    <div></div>
    <el-table :data="collection" :loading="loading" lazy>
      <el-table-column
        v-for="(item, index) in columns"
        :key="`${element.key}_${index}`"
        :label="item.label"
      >
        <template #default="scope">
          <div>
            {{ formartVal(scope.row, item.prop, scope.$index) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column if="operation" label="operation">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TreeNode from '@/model/treeNode'
import type { IObjectKeys } from '@/config/common'

export default defineComponent({
  props: {
    element: {
      type: TreeNode,
      required: true
    }
  },
  computed: {
    collection() {
      let arr: any[] = []
      if (this.element.children) {
        this.element.children?.forEach((item: any, index: number) => {
          let tmp: IObjectKeys<any> = {}
          item.children.forEach((child: TreeNode) => {
            tmp[child.name] =
              child.getModel() instanceof Array ? [...child.getModel()] : child.getModel()
          })
          // 过滤空数据
          let isNull = true
          Object.keys(tmp).forEach((key) => {
            if (tmp[key] instanceof Array) {
              if (tmp[key].length > 0) isNull = false
            } else if (tmp[key] instanceof Object) {
              if (Object.keys(tmp[key]).length > 0) isNull = false
            } else if (tmp[key] !== '' && tmp[key] !== undefined && tmp[key] !== null) {
              isNull = false
            }
          })
          if (!isNull) {
            tmp.$index = index
            arr.push(tmp)
          }
        })
      }
      return arr
    },
    columns() {
      return this.element!.children![0].children?.map((item: any) => ({
        label: item.properties.label,
        prop: item.name
      }))
    },
    loading() {
      return false
    }
  },
  methods: {
    formartVal(obj: Object, propName: string, index: number) {
      //   console.log('------------ row --------------')
      //   console.log(this.element.children ? this.element.children[index] : '')
      //   console.log('------------- row end -------------')
      //   console.log(index)
      console.log('-------------params:')
      console.log(obj)
      console.log(propName)
      console.log(index)
      const group = this.element.children ? this.element.children[index] : undefined
      if (group) {
        const el = group.children?.find((item: any) => item.name === propName)
        console.log(el)
        if (
          el &&
          ['select', 'radio', 'checkbox'].includes(el.componentType) &&
          el.options &&
          el.options.length > 0
        ) {
          const options = el.options
          const val = obj[propName]
          console.log('-------------options:')
          console.log(val)
          console.log(options)
          if (val instanceof Array) {
            const option = options.filter((item: any) => val.includes(item.value))
            return option.map((item: any) => item.label).join(',')
          } else {
            const option = options.find((item: any) => item.value === val)
            return option ? option.label : ''
          }
        }
      }
      return obj[propName]
    },
    handleEdit(row: any, index: number) {
      console.log('-------------edit:')
      console.log(row)
      console.log(index)
    },
    handleDelete(row) {
      console.log('-------------remove:')
      console.log(row)
      console.log(row.$index)
      //   const row = this.element.children[index]
      const group = this.element!.children![row.$index]
      if (row.$index === 0 && group) {
        // 第一行不做物理删除，置空
        console.log(this.element.children)
        if (group) {
          group.children?.forEach((item: any) => {
            console.log(item)
            item.store!.setModel(item)
          })
        }
      } else if (row.$index > 0 && group) {
        group.remove()
      }
    }
  },
  setup() {
    const operation = ref(true)
    return { operation }
  }
})
</script>

<style scoped></style>
