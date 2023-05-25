/*
 * @Author: yancheng
 * @Date: 2022-04-11 09:25:57
 * @LastEditTime: 2022-06-09 11:28:39
 * @LastEditors: yancheng
 * @Description:  流程管理
 * @FilePath: \runthink-approval-view-front\src\api\processManager\index.js
 */

import request from '@/utils/request'

/**
 * 流程配置列表
 * @param {*} params
 * @returns
 */
export function getProcessList(params: { processConfigCode: string }) {
  return request({
    url: '/process/config/page',
    method: 'get',
    params
  })
}

/**
 * 流程配置列表-code分组
 * @param {*} params
 * @returns
 */
export function pageGroupByCode(params: any) {
  return request({
    url: '/process/config/pageGroupByCode',
    method: 'get',
    params
  })
}

/**
 * 启用流程
 * @param {*} params processConfigId
 * @returns
 */
export function enableProcess(params: any) {
  return request({
    url: '/process/config/enable',
    method: 'put',
    params
  })
}

/**
 * 停用流程
 * @param {*} params processConfigId
 * @returns
 */
export function disableProcess(params: any) {
  return request({
    url: '/process/config/disable',
    method: 'put',
    params
  })
}

/**
 * 删除流程
 * @param {*} params processConfigIds
 * @returns
 */
export function deleteProcessApi(params: any) {
  return request({
    url: '/process/config/delete',
    method: 'delete',
    params
  })
}

/**
 * 流程配置详情
 * @param {*} params instanceId
 * @returns
 */
export function getProcessConfigDetailById(params: any) {
  return request({
    url: '/process/config/getProcessConfigDetailById',
    method: 'get',
    params
  })
}

/**
 * 新建流程
 * @param {*} params
 * @returns
 */
export function createProcess(params: any) {
  return request({
    url: '/process/config/create',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 复制新建流程通过表单配置id
 * @param {*} params originalProcessConfigId
 * @returns
 */
export function copyProcessConfig(params: any) {
  return request({
    url: '/process/config/copyProcessConfig',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 编辑流程
 * @param {*} params
 * @returns
 */
export function updateProcess(params: any) {
  return request({
    url: '/process/config/update',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 新建流程节点
 * @param {*} params processConfigId
 * @param {*} params processNodeName
 * @param {*} params type [START, APPROVAL, ACTION, LOGIC, END]
 * @returns
 */
export function createProcessNode(params: any) {
  return request({
    url: '/process/config/createProcessNode',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 动作节点失败重试
 * @param {*} params instanceId
 * @param {*} params processNodeId
 * @returns
 */
export function retryProcess(params: any) {
  return request({
    url: '/process/detail/retry',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 节点配置信息，包含流程json
 * @param {*} params processConfigId
 * @returns
 */
export function getProcessNodeConfig(params: any) {
  return request({
    url: '/process/config/getProcessNodeConfig',
    method: 'get',
    params
  })
}

/**
 * 单个节点详情
 * @param {*} params processNodeId
 * @returns
 */
export function getNodeDetailById(params: any) {
  return request({
    url: '/process/config/getNodeDetailById',
    method: 'get',
    params
  })
}

/**
 * 保存流程节点配置信息
 * @param {*} params
 * @returns
 */
export function saveProcessNodeConfig(params: any) {
  return request({
    url: '/process/config/saveProcessNodeConfig',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 查看用户可提交流程列表
 * @param {*} params
 * @returns
 */
export function getUserProcesses(params: any) {
  return request({
    url: '/process/config/pageHaveAuth',
    method: 'get',
    params
  })
}
/**
 * 保存单个节点配置信息
 * @param {*} params
 * @returns
 */
export function saveNodeDetailConfig(params: any) {
  return request({
    url: '/process/config/saveNodeDetailConfig',
    method: 'post',
    data: { ...params }
  })
}

/**
 * 批量查询节点名称
 * @param {*} params
 * @returns
 */
export function getNodeSimpleDetailByIds(params: any) {
  return request({
    url: '/process/config/getNodeSimpleDetailByIds',
    method: 'get',
    params
  })
}

/**
 * 下载当前流程对应表单api数据交互文档
 * @param {*} params
 * @returns
 */
export function downloadApiExcel(params: any) {
  return request({
    url: '/process/config/download/excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

/**
 * 领取任务
 * @param {*} params instanceId
 * @returns
 */
export function acceptInstance(params: any) {
  return request({
    url: '/process/instance/opt/accept',
    method: 'get',
    params
  })
}

/**
 * 工单管理管理员终止流程
 * @param {*} params instanceId
 * @returns
 */
export function adminStopInstance(params: any) {
  return request({
    url: '/process/instance/opt/admin/stop',
    method: 'put',
    data: { ...params }
  })
}

/**
 * 工单管理管理员转件
 * @param {*} params fromUser instanceId reason toUser
 * @returns
 */
export function adminTransferInstance(params: any) {
  return request({
    url: '/process/instance/opt/admin/transfer',
    method: 'put',
    data: { ...params }
  })
}

/**
 * 取消挂起
 * @param {*} params instanceId
 * @returns
 */
export function cancelHangUpInstance(params: any) {
  return request({
    url: '/process/instance/opt/cancelHangUp',
    method: 'put',
    data: { ...params }
  })
}
/**
 * 挂起
 * @param {*} params
 * @returns
 */
export function hangUpInstance(params: any) {
  return request({
    url: '/process/instance/opt/hangUp',
    method: 'put',
    data: { ...params }
  })
}
/**
 * 拒绝
 * @param {*} params
 * @returns
 */
export function refuseInstance(params: any) {
  return request({
    url: '/process/instance/opt/refuse',
    method: 'put',
    data: { ...params }
  })
}
/**
 * 驳回
 * @param {*} params
 * @returns
 */
export function rejectInstance(params: any) {
  return request({
    url: '/process/instance/opt/reject',
    method: 'put',
    data: { ...params }
  })
}
/**
 * 通过
 * @param {*} params
 * @returns
 */
export function submitInstance(params: any) {
  return request({
    url: '/process/instance/opt/submit',
    method: 'put',
    data: { ...params }
  })
}

/**
 * 传阅
 * @param {*} params instanceId
 * @returns
 */
export function circulateInstance(params: any) {
  return request({
    url: '/process/instance/opt/circulate',
    method: 'put',
    data: { ...params }
  })
}

/**
 * 转件
 * @param {*} params instanceId
 * @returns
 */
export function transferInstance(params: any) {
  return request({
    url: '/process/instance/opt/transfer',
    method: 'put',
    data: { ...params }
  })
}

/**
 * 查看流程详情-我发起
 * @param {*} params
 * @returns
 */
export function getInitiatedProcessFormValue(params: any) {
  return request({
    url: '/process/detail/initiated/get',
    method: 'get',
    params
  })
}
/**
 * 查看流程详情-工单管理
 * @param {*} params
 * @returns
 */
export function getWorkProcessFormValue(params: any) {
  return request({
    url: '/process/detail/work/get',
    method: 'get',
    params
  })
}
/**
 * 查看流程详情-业务查询
 * @param {*} params
 * @returns
 */
export function getBizProcessFormValue(params: any) {
  return request({
    url: '/process/detail/biz/get',
    method: 'get',
    params
  })
}
/**
 * 查看流程详情-待处理-待审批
 * @param {*} params
 * @returns
 */
export function getApprovalProcessFormValue(params: any) {
  return request({
    url: '/process/detail/approval/get',
    method: 'get',
    params
  })
}
/**
 * 查看流程详情-已处理
 * @param {*} params
 * @returns
 */
export function getApprovedProcessFormValue(params: any) {
  return request({
    url: '/process/detail/approved/get',
    method: 'get',
    params
  })
}

/**
 * 查看流程详情-传阅我
 * @param {*} params
 * @returns
 */
export function getReaderProcessFormValue(params: any) {
  return request({
    url: '/process/detail/reader/get',
    method: 'get',
    params
  })
}
/**
 * 流转信息
 * @param {*} params
 * @returns
 */
export function getProcessStreamLog(params: any) {
  return request({
    url: '/process/detail/getProcessStreamLog',
    method: 'get',
    params
  })
}
