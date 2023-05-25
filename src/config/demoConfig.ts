import type { INodeOptions } from '@/model/treeNode'
import {
  colProperties,
  formCheckboxGroupProperties,
  formDatePickerProperties,
  formInputProperties,
  formRadioGroupProperties,
  formSelectProperties,
  formTimePickerProperties,
  formUploadProperties,
  rowProperties
} from './fields'
import { FormDefaultPoperties } from './form/form'

export const config: INodeOptions = {
  name: 'name',
  id: undefined,
  componentType: 'form',
  componentName: 'form',
  properties: {
    ...FormDefaultPoperties
  },
  style: {},
  actions: {},
  value: {},
  children: [
    {
      name: 'name',
      id: null,
      componentType: 'input',
      componentName: '单行文本',
      children: null,
      properties: {
        ...formInputProperties
      },
      extendAttributes: {},
      style: {},
      actions: {},
      value: '',
      backendConfig: {
        inputType: 'TEXT'
      }
    },
    {
      name: 'answer',
      id: null,
      componentType: 'select',
      componentName: '下拉选择',
      children: null,
      properties: {
        ...formSelectProperties
      },
      style: {},
      actions: {},
      data: [],
      extendAttributes: {
        remote: false,
        remoteOptionProps: { label: 'label', value: 'value' }
      },
      value: '',
      options: [
        {
          key: '1',
          value: '1',
          label: 'a'
        },
        {
          key: '2',
          value: '2',
          label: 'b'
        }
      ]
    },
    {
      name: 'sex',
      id: null,
      componentType: 'radio',
      componentName: '单选框组',
      children: null,
      properties: {
        ...formRadioGroupProperties
      },
      extendAttributes: {
        remote: false,
        remoteOptionProps: { label: 'label', value: 'value' }
      },
      style: {},
      actions: {},
      value: '',
      options: [
        {
          key: '1',
          value: '1',
          label: 'a'
        },
        {
          key: '2',
          value: '2',
          label: 'b'
        }
      ]
    },
    {
      name: 'sex',
      id: null,
      componentType: 'checkbox',
      componentName: '多选框组',
      children: null,
      properties: {
        ...formCheckboxGroupProperties
      },
      extendAttributes: {
        remote: false,
        remoteOptionProps: { label: 'label', value: 'value' }
      },
      style: {},
      actions: {},
      value: [],
      options: [
        {
          key: '1',
          value: '1',
          label: 'a'
        },
        {
          key: '2',
          value: '2',
          label: 'b'
        }
      ]
    },
    {
      name: 'date',
      id: null,
      componentType: 'datePicker',
      componentName: '日期选择',
      children: null,
      properties: {
        ...formDatePickerProperties
      },
      extendAttributes: {},
      style: {},
      actions: {},
      value: '',
      options: []
    },
    {
      name: 'date',
      id: null,
      componentType: 'timePicker',
      componentName: '时间选择',
      children: null,
      properties: {
        ...formTimePickerProperties
      },
      extendAttributes: {},
      style: {},
      actions: {},
      value: '',
      options: []
    },
    {
      name: 'upload',
      id: null,
      componentType: 'upload',
      componentName: '文件上传',
      children: null,
      properties: {
        ...formUploadProperties
      },
      extendAttributes: {
        uploadFunName: 'upload'
      },
      style: {},
      actions: {},
      value: [],
      options: [],
      data: []
    },
    {
      name: 'row',
      id: null,
      componentType: 'row',
      componentName: 'row',
      children: [
        {
          name: 'col',
          id: null,
          componentType: 'col',
          componentName: 'col',
          children: [],
          properties: {
            ...colProperties,
            label: 'col1'
          },
          extendAttributes: {},
          style: {},
          actions: {},
          value: ''
        },
        {
          name: 'col',
          id: null,
          componentType: 'col',
          componentName: 'col',
          children: [],
          properties: {
            ...colProperties,
            label: 'col2'
          },
          extendAttributes: {},
          style: {},
          actions: {},
          value: ''
        }
      ],
      properties: {
        ...rowProperties,
        label: 'row'
      },
      style: {},
      action: {}
    },
    {
      name: 'tab',
      id: null,
      componentType: 'tabs',
      componentName: 'tabs',
      children: [
        {
          name: 'tabPane1',
          id: null,
          componentType: 'tabPane',
          componentName: 'tabpane1',
          children: [],
          properties: {
            label: 'tabpane1',
            key: 'tabpane1'
          },
          style: {},
          actions: {},
          value: ''
        },
        {
          name: 'tabPane2',
          id: null,
          componentType: 'tabPane',
          componentName: 'tabpane2',
          children: [],
          properties: {
            label: 'tabpane2',
            key: 'tabpane2'
          },
          style: {},
          actions: {},
          value: ''
        }
      ],
      properties: {},
      style: {},
      action: {}
    },
    {
      name: 'flexContainer',
      id: null,
      componentType: 'flexContainer',
      componentName: '弹性容器',
      children: [
        {
          name: 'flexContainerItem1',
          id: null,
          componentType: 'flexContainerItem',
          componentName: '分组',
          children: [],
          properties: {},
          style: {},
          actions: {},
          value: '',
          backendConfig: {
            isDynamic: 1
          }
        }
      ],
      properties: {
        label: '弹性容器'
      },
      style: {},
      action: {}
    },
    {
      name: 'container',
      id: null,
      componentType: 'container',
      componentName: '普通容器',
      children: [],
      properties: {
        showLabel: true,
        label: '普通容器'
      },
      style: {},
      action: {}
    },
    {
      name: 'table',
      id: null,
      componentType: 'table',
      componentName: '表格',
      children: [],
      properties: {
        lable: '表格'
      },
      style: {},
      action: {},
      options: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
      extendAttributes: {
        remote: false
      }
    },
    {
      name: 'link',
      id: null,
      componentType: 'link',
      componentName: '超链接',
      children: [],
      properties: {
        label: '超链接'
      },
      style: {},
      action: {},
      options: [],
      extendAttributes: {
        httpParams: {},
        url: ''
      }
    },
    {
      name: 'divider',
      id: null,
      componentType: 'divider',
      componentName: '分割线',
      children: [],
      properties: {
        label: '分割线'
      },
      style: {},
      action: {},
      options: [],
      extendAttributes: {
        httpParams: {},
        url: ''
      }
    }
  ],
  backendConfig: {}
}
