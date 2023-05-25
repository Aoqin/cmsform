/*
 * @Author: yancheng
 * @Date: 2022-03-26 11:23:53
 * @LastEditTime: 2022-06-09 11:07:20
 * @LastEditors: yancheng
 * @Description:  任务管理接口
 * @FilePath: \runthink-approval-view-front\src\api\taskManager\index.js
 */
import request from '@/utils/request'

/**
 * 我发起的任务列表
 * @param {*} params
 * @returns
 */
export function getMylaunchList(params: any) {
  return request({
    url: '/instance/query/initiated/page',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 根据id删除我发起的流程
 * @param {*} params
 * @returns
 */
export function deleteMyLaunch(params: any) {
  return request({
    url: '/initiated/process/delete',
    method: 'delete',
    params
  })
}

/**
 * 待处理列表
 * @param {*} params
 * @returns
 */
export function getPendingApprovalList(params: any) {
  return request({
    url: '/instance/query/pendingApproval/page',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 待领取列表
 * @param {*} params
 * @returns
 */
export function getPendingAcceptList(params: any) {
  return request({
    url: '/instance/query/pendingAccept/page',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 已挂起列表
 * @param {*} params
 * @returns
 */
export function getPendingHangupList(params: any) {
  return request({
    url: '/instance/query//pendingHangup/page',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 已处理流程列表
 * @param {*} params
 * @returns
 */
export function getHadHandleList(params: any) {
  return request({
    url: '/instance/query/handled/page',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 传阅我流程列表
 * @param {*} params
 * @returns
 */
export function getCirculateList(params: any) {
  return request({
    url: '/instance/query/reader/page',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 业务查询列表
 * @param {*} params
 * @returns
 */
export function getBusinessQueryList(params: any) {
  return request({
    url: '/instance/query/biz/process/page',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 工单管理查询列表
 * @param {*} params
 * @returns
 */
export function getWorkOrderList(params: any) {
  return request({
    url: '/instance/query/work/management/process/page',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 实例当前待审批人员
 * @param {*} params instanceId
 * @returns
 */
export function waitAprovalUserList(params: any) {
  return request({
    url: '/instance/query/current/opt/user',
    method: 'get',
    params
  })
}

/**
 * 任务生成--提交
 * @param {object} params
 * @returns Promise
 */
export function commitTaskData(params: any) {
  return request({
    url: '/initiated/process/commit',
    method: 'post',
    data: { ...params }
  })
}
/**
 * 任务表单设计详情
 * @param {object} params
 * @returns Promise
 */
export function getFormCssDetail(params: any) {
  return request({
    url: '/initiated/process/getFormCssDetail',
    method: 'GET',
    params
  })
}
/**
 * 保存任务详情
 * @param {object} params
 * @returns Promise
 */
export function saveTaskForm(params: any) {
  return request({
    url: '/initiated/process/save',
    method: 'POST',
    data: { ...params }
  })
}
/**
 * 任务表单数据详情
 * @param {object} params
 * @returns Promise
 */
export function getFormDataValue(params: any) {
  return request({
    url: '/initiated/process/get/formDataValue',
    method: 'GET',
    params
  })
}

/**
 * 获取高级搜索字段
 * @param {object} params processConfigCode 流程配置编码
 * @returns Promise
 */
export function searchableCom(params: any) {
  return request({
    url: '/instance/query/searchable/comp',
    method: 'GET',
    params
  })
}
/**
 * 获取流程节点表单信息
 * @param {object} params
 * @returns Promise
 */
export function getNodeFormDataDetail(params: any) {
  return request({
    url: '/process/detail/getNodeFormDataDetail',
    method: 'GET',
    params
  })
}
/**
 * 获取转件人员列表
 * @param {object} params
 * @returns Promise
 */
export function getTransfer(params: any) {
  return request({
    url: '/instance/query/transfer/user',
    method: 'GET',
    params
  })
}
