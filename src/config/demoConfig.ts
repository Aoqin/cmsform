import type { INodeOptions } from '@/model/treeNode'

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
      componentName: 'input',
      children: null,
      attributes: {},
      style: {},
      action: {},
      value: ''
    },
    {
      name: 'answer',
      id: null,
      componentType: 'select',
      componentName: 'select',
      children: null,
      attributes: {},
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
      componentName: 'radio',
      children: null,
      attributes: {},
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
          attributes: {},
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
