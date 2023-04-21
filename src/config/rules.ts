import type { IObjectKeys } from '@/config/common'

export interface IRule {
  message: string
  trigger: 'blur' | 'change' | Array<'blur' | 'change'>
  required?: boolean
  validator?: (rule: any, value: any, callback: any) => void
  [key: string]: any
}

export interface IRuleOption {
  label: string
  key: string
  rule: IRule
}

export const rules: IObjectKeys<IRuleOption> = {
  emali: {
    label: '邮箱',
    key: 'email',
    rule: {
      message: '请输入正确的邮箱地址',
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入邮箱地址'))
        } else {
          const reg = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱地址'))
          } else {
            callback()
          }
        }
      }
    }
  },
  phone: {
    label: '手机号',
    key: 'phone',
    rule: {
      message: '请输入正确的手机号',
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else {
          const reg = /^1[3456789]\d{9}$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        }
      }
    }
  },
  amount: {
    label: '金额',
    key: 'amount',
    rule: {
      message: '请输入正确的金额',
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入金额'))
        } else {
          const reg = /^\d+(\.\d{1,2})?$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的金额'))
          } else {
            callback()
          }
        }
      }
    }
  },
  idcard: {
    label: '身份证号',
    key: 'idcard',
    rule: {
      message: '请输入正确的身份证号',
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入身份证号'))
        } else {
          const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的身份证号'))
          } else {
            callback()
          }
        }
      }
    }
  }
}
