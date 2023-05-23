<template>
  <el-table :data="collection" border lazy>
    <el-table-column
      v-for="(item, index) in columns"
      :key="`${element.key}_${index}`"
      :label="item.label"
    >
      <template #default="scope">
        <template v-if="isUpload(item.prop, scope.$index)">
          <el-link
            v-for="(subItem, subIndex) in formartVal(scope.row, item.prop, scope.$index)"
            @click="downloadFile(subItem)"
            :key="`${item.prop}_${index}_${subIndex}`"
          >
            {{ subItem.name }}
          </el-link>
        </template>
        <template v-else>
          {{ formartVal(scope.row, item.prop, scope.$index) }}
        </template>
      </template>
    </el-table-column>
    <el-table-column v-if="operatiable" label="操作">
      <template #default="scope">
        <el-button type="text" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
        <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <form-edit-dialog
    v-model:visble="visible"
    :element-options="elementOptions"
    @submit="handleUpdate"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TreeNode from '@/model/treeNode'
import type { IObjectKeys } from '@/config/common'
import FormEditDialog from '@/views/cms/components/formEditDialog.vue'
import type { INodeOptions } from '@/model/treeNode'
import type { ITreeStore } from '@/model/treeStore'
import { deepCopy } from '@/utils'

const props = defineProps<{
  element: TreeNode
}>()

const selectedKey = ref<string>('')

const collection = computed(() => {
  let arr: any[] = []
  if (props.element.children) {
    props.element.children?.forEach((item: any, index: number) => {
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
})

const columns = computed(() => {
  return props.element!.children![0].children?.map((item: any) => ({
    label: item.properties.label,
    prop: item.name
  }))
})

const elementOptions = computed((): INodeOptions => {
  let group
  const nodes = props.element.children
  if (selectedKey.value) {
    group = nodes?.find((item: any) => item.key === selectedKey.value)
  } else {
    group = nodes![nodes!.length - 1].clone(true)
  }
  const children = group?.children?.map((item: any) => {
    return {
      ...item.getReadOnlyNode(),
      value: selectedKey.value ? item.getModel() : null
    }
  })
  let opts = group?.getReadOnlyNode({ children: null })
  return {
    ...opts,
    componentName: 'form',
    componentType: 'form',
    children: children
  } as INodeOptions
})

const store = computed((): ITreeStore => {
  return props.element.store!
})


const visible = ref<boolean>(false)

const handleEdit = (row: any, index: number) => {
  console.log('-------------edit:')
  console.log(row)
  console.log(index)
}

const handleDelete = (row: { $index: number }) => {
  const group = props.element!.children![row.$index]
  if (row.$index === 0 && group) {
    // 第一行不做物理删除，置空
    console.log(props.element.children)
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

const formartVal = (obj: Record<string, any>, propName: string, index: number) => {
  const group = props.element.children ? props.element.children[index] : undefined
  if (group) {
    const el = group.children?.find((item: any) => item.name === propName)
    if (
      el &&
      ['select', 'radio', 'checkbox'].includes(el.componentType) &&
      el.options &&
      el.options.length > 0
    ) {
      const options = el.options
      const val = obj[propName]
      if (val instanceof Array) {
        const option = options.filter((item: any) => val.includes(item.value))
        return option.map((item: any) => item.label).join(',')
      } else {
        const option = options.find((item: any) => item.value === val)
        return option ? option.label : ''
      }
    } else if (el && el.componentType === 'upload') {
      return obj[propName]
    }
  }
  return obj[propName]
}

const isUpload = (prop: string, index: number): boolean => {
  const group = props.element.children ? props.element.children[index] : undefined
  if (group) {
    const el = group.children?.find((item: any) => item.name === prop)
    if (el && el.componentType === 'upload') {
      return true
    }
  }
  return false
}

const downloadFile = (params: { name: string; uid: string }) => {
  console.log('downloadFile')
}

const handleUpdate = (tmpstore: ITreeStore) => {
  if (selectedKey.value) {
    // 更新
    for (const key in tmpstore!.model) {
      const nodeKey = key.split('.')[1]
      const node = store.value.nodesMap.get(nodeKey)
      if (node) {
        store.value.setModel(node, deepCopy(tmpstore.model![key]))
        const tmpNode = tmpstore.nodesMap.get(nodeKey)
        if (node.componentType === 'upload') {
          // 上传组件需要单独处理, 缓存区也需要更新
          node.data = deepCopy(tmpNode?.data || {})
        }
      }
    }
  } else {
    // 新增
    let group = tmpstore.root?.getReadOnlyNode()
    const setDefaultValue = (node: INodeOptions, store: ITreeStore) => {
      if (node.children) {
        node.children.forEach((item: INodeOptions) => {
          setDefaultValue(item, store)
        })
      }
      node.value = store.nodesMap.get(node.key!)!.getModel()
      if (node.componentType === 'upload') {
        node.data = deepCopy(store.nodesMap.get(node.key!)?.data || {})
      }
    }
    setDefaultValue(group!, tmpstore)
    const groupNode = new TreeNode(group!, true)
    if (collection.value.length !== props.element.children?.length) {
      // 存在空行数据，直接填充
      const nullDataArr = props.element.children?.filter((item) => {
        return collection.value.findIndex((tmp: any) => tmp.$key === item.key) === -1
      })
      nullDataArr![0].children?.forEach((item: any, index: number) => {
        if (item.componentType === 'upload') {
          item.data = deepCopy(group!.children![index].data || {})
        }
        item.store!.setModel(item, deepCopy(group?.children![index].value))
      })
    } else {
      props.element.insertChild(groupNode)
    }
  }
  visible.value = false
}

const operatiable = computed(() => {
  return true
})
</script>

<style scoped></style>
