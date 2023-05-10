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

const upload = (file: any) => {
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

const download = (url: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('下载成功')
      resolve(true)
    }, 3000)
  })
}

const openWindow = (params: any) => {
  return new Promise((resolve, reject) => {
    window.open(params.url || 'http://baidu.com', '_blank')
    resolve(true)
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
  },
  download: {
    label: '下载',
    key: 'download',
    fun: download
  },
  openWindow: {
    label: '打开新窗口',
    key: 'openWindow',
    fun: openWindow
  }
}

export default functions
