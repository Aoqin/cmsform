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
  attributes: {},
  style: {},
  action: {},
  value: '',
  children: [
    {
      name: 'name',
      id: null,
      componentType: 'input',
      componentName: '单行文本',
      children: null,
      attributes: {
        ...formInputAttributes
      },
      style: {},
      action: {},
      value: ''
    },
    {
      name: 'answer',
      id: null,
      componentType: 'select',
      componentName: '下拉选择框',
      children: null,
      attributes: {
        ...formSelectAttributes
      },
      style: {},
      action: {},
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
      attributes: {
        ...formRadioGroupAttributes
      },
      style: {},
      action: {},
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
      attributes: {
        ...formCheckboxGroupAttributes
      },
      style: {},
      action: {},
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
      attributes: {
        ...formDatePickerAttributes
      },
      style: {},
      action: {},
      value: '',
      options: []
    },
    {
      name: 'date',
      id: null,
      componentType: 'timePicker',
      componentName: '时间选择器',
      children: null,
      attributes: {
        ...formTimePickerAttributes
      },
      style: {},
      action: {},
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
          attributes: {
            ...colAttributes
          },
          style: {},
          action: {},
          value: ''
        },
        {
          name: 'col',
          id: null,
          componentType: 'col',
          componentName: 'col',
          children: [],
          attributes: {
            ...colAttributes
          },
          style: {},
          action: {},
          value: ''
        }
      ],
      attributes: {
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
          attributes: {
            label: 'tabpane1',
            key: 'tabpane1'
          },
          style: {},
          action: {},
          value: ''
        },
        {
          name: 'tabPane2',
          id: null,
          componentType: 'tabPane',
          componentName: 'tabPane',
          children: [],
          attributes: {
            label: 'tabpane2',
            key: 'tabpane2'
          },
          style: {},
          action: {},
          value: ''
        }
      ],
      attributes: {},
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
          name: 'flexContainer1',
          id: null,
          componentType: 'flexContainerItem',
          componentName: '分组',
          children: [],
          attributes: {},
          style: {},
          action: {},
          value: ''
        }
      ],
      attributes: {},
      style: {},
      action: {}
    }
  ]
}
