import type { IFunctions } from '@/model/treeStore'

const request = (parms: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          label: '苹果',
          value: '1'
        },
        {
          label: '橘子',
          value: '2'
        },
        {
          label: '香蕉',
          value: '3'
        }
      ])
    }, 3000)
  })

const restInner = (parms: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          label: '测试远端选项1',
          value: '1'
        },
        {
          label: '测试远端选项2',
          value: '2'
        },
        {
          label: '测试远端选项3',
          value: '3'
        }
      ])
    }, 3000)
  })
}

const functions: IFunctions = {
  request: {
    label: '请求',
    key: 'request',
    fun: request
  },
  restInner: {
    label: '内部请求',
    key: 'restInner',
    fun: restInner
  }
}

export default functions
