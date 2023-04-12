import type { INode } from '@/utils/tree'

export const config: INode = {
  name: 'name',
  id: null,
  componentType: 'input',
  componentName: 'input',
  attribute: {},
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
      attribute: {},
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
      attribute: {},
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
      attribute: {},
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
          attribute: {},
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
          attribute: {},
          style: {},
          action: {},
          value: ''
        }
      ],
      attribute: {},
      style: {},
      action: {}
    }
  ]
}
