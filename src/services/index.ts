import request from '@/utils/request'

export const createForm = (params: any) =>
  request({
    url: '/approval/form/config/create',
    method: 'post',
    data: {
      ...params
    }
  })

export const getForm = (params: { formConfigId: string }) =>
  request({
    url: '/approval/form/config/getDetail',
    method: 'get',
    params
  })

export const updateForm = (params: any) =>
  request({
    url: '/approval/form/config/update',
    method: 'put',
    data: {
      ...params
    }
  })
