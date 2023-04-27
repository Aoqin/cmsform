import type { INodeOptions } from '@/model/treeNode'
import {
  colAttributes,
  formCheckboxGroupAttributes,
  formDatePickerAttributes,
  formInputAttributes,
  formRadioGroupAttributes,
  formSelectAttributes,
  formTimePickerAttributes,
  rowAttributes
} from './fields'

export const config: INodeOptions = {
  name: 'name',
  id: undefined,
  componentType: 'input',
  componentName: 'input',
  properties: {},
  style: {},
  actions: {},
  value: '',
  children: [
    {
      name: 'name',
      id: null,
      componentType: 'input',
      componentName: '单行文本',
      children: null,
      properties: {
        ...formInputAttributes
      },
      extendAttributes: {},
      style: {},
      actions: {},
      value: ''
    },
    {
      name: 'answer',
      id: null,
      componentType: 'select',
      componentName: '下拉选择框',
      children: null,
      properties: {
        ...formSelectAttributes
      },
      style: {},
      actions: {},
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
      componentName: '单选',
      children: null,
      properties: {
        ...formRadioGroupAttributes
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
      componentName: '多选',
      children: null,
      properties: {
        ...formCheckboxGroupAttributes
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
      componentName: '日期选择器',
      children: null,
      properties: {
        ...formDatePickerAttributes
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
      componentName: '时间选择器',
      children: null,
      properties: {
        ...formTimePickerAttributes
      },
      extendAttributes: {},
      style: {},
      actions: {},
      value: '',
      options: []
    },
    {
      name: 'row',
      id: null,
      componentType: 'row',
      componentName: '栅格布局',
      children: [
        {
          name: 'col',
          id: null,
          componentType: 'col',
          componentName: 'col',
          children: [],
          properties: {
            ...colAttributes
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
            ...colAttributes
          },
          extendAttributes: {},
          style: {},
          actions: {},
          value: ''
        }
      ],
      properties: {
        ...rowAttributes
      },
      style: {},
      action: {}
    },
    {
      name: 'tab',
      id: null,
      componentType: 'tabs',
      componentName: '标签页',
      children: [
        {
          name: 'tabPane1',
          id: null,
          componentType: 'tabPane',
          componentName: 'tabPane',
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
          componentName: 'tabPane',
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
          value: ''
        }
      ],
      properties: {},
      style: {},
      action: {}
    }
  ]
}
