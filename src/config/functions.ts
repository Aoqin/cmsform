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

const upload = (file: File) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: file.name,
        url: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
        uid: file.uid
      })
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
  },
  upload: {
    label: '上传',
    key: 'upload',
    fun: upload
  }
}

export default functions
