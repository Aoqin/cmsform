import type { ViewResponse } from '@/utils/convert'

const detail: ViewResponse = {
  formConfigVo: {
    formConfigId: '1656559379077562370',
    formType: 1,
    configStatus: 2,
    formConfigName: 'V2_TEST',
    formConfigCode: 'V2_TEST_0001',
    formConfigRemark: '',
    formVersion: 1,
    formCssConfig:
      '{"2HYuQiNK_":{"index":0,"name":"","key":"2HYuQiNK_","id":"","data":[],"visible":true,"style":{},"properties":{},"extendAttributes":{},"actions":{},"options":{},"componentType":"root","componentName":"root","componentKey":"FHS5e7k1Na","componentKeyId":"","backendConfig":{},"value":null,"parentKey":""},"5u7xYycz7":{"index":0,"name":"name","key":"5u7xYycz7","id":null,"data":[],"visible":true,"style":{},"properties":{"label":"单行文本","prop":"","placeholder":"请输入","type":"text"},"extendAttributes":{},"actions":{},"options":{},"componentType":"input","componentName":"单行文本","componentKey":"FjjnxwTosD","componentKeyId":"","backendConfig":{"build":true,"searchable":true},"value":"","parentKey":"2HYuQiNK_"},"CB8vEbyT3":{"index":0,"name":"answer","key":"CB8vEbyT3","id":null,"data":[],"visible":true,"style":{},"properties":{"label":"下拉选择","prop":"","placeholder":"请选择","clearable":true,"remote":false,"remoteOptionProps":{"label":"label","value":"value"}},"extendAttributes":{"remote":false,"remoteOptionProps":{"label":"label","value":"value"}},"actions":{},"options":[{"key":"1","value":"1","label":"a"},{"key":"2","value":"2","label":"b"}],"componentType":"select","componentName":"下拉选择","componentKey":"qhylHVektt","componentKeyId":"","backendConfig":{},"value":"","parentKey":"2HYuQiNK_"},"WQk_hNxUs":{"index":0,"name":"sex","key":"WQk_hNxUs","id":null,"data":[],"visible":true,"style":{},"properties":{"label":"单选框组","prop":"","remote":false,"remoteOptionProps":{"label":"label","value":"value"}},"extendAttributes":{"remote":false,"remoteOptionProps":{"label":"label","value":"value"}},"actions":{},"options":[{"key":"1","value":"1","label":"a"},{"key":"2","value":"2","label":"b"}],"componentType":"radio","componentName":"单选框组","componentKey":"w07s4Gy4C3","componentKeyId":"","backendConfig":{},"value":"","parentKey":"2HYuQiNK_"},"JsNe_f8Xr":{"index":0,"name":"sex","key":"JsNe_f8Xr","id":null,"data":[],"visible":true,"style":{},"properties":{"label":"多选框组","prop":"","remote":false,"remoteOptionProps":{"label":"label","value":"value"}},"extendAttributes":{"remote":false,"remoteOptionProps":{"label":"label","value":"value"}},"actions":{},"options":[{"key":"1","value":"1","label":"a"},{"key":"2","value":"2","label":"b"}],"componentType":"checkbox","componentName":"多选框组","componentKey":"qd19atCE4E","componentKeyId":"","backendConfig":{},"value":[],"parentKey":"2HYuQiNK_"},"W4KjPmGi$":{"index":0,"name":"date","key":"W4KjPmGi$","id":null,"data":[],"visible":true,"style":{},"properties":{"label":"日期选择","prop":"","type":"date","placeholder":"请选择日期","format":"YYYY-MM-DD","valueFormat":"YYYY-MM-DD"},"extendAttributes":{},"actions":{},"options":[],"componentType":"datePicker","componentName":"日期选择","componentKey":"QceBfEPQPL","componentKeyId":"","backendConfig":{},"value":"","parentKey":"2HYuQiNK_"},"j9dJm3n4k":{"index":0,"name":"upload","key":"j9dJm3n4k","id":null,"data":[],"visible":true,"style":{},"properties":{"label":"文件上传","prop":"","buttonText":"click to upload","buttonType":"link","multiple":true,"limit":5,"limitSize":500,"action":"","accept":["jpg","jpeg","png","gif","bmp"]},"extendAttributes":{"uploadFunName":"upload"},"actions":{},"options":[],"componentType":"upload","componentName":"文件上传","componentKey":"gvaG1RYWbK","componentKeyId":"","backendConfig":{},"value":[],"parentKey":"2HYuQiNK_"},"A4WejNCMl":{"index":0,"name":"link","key":"A4WejNCMl","id":null,"data":[],"visible":true,"style":{},"properties":{"label":"超链接"},"extendAttributes":{"httpParams":{},"url":""},"actions":{},"options":[],"componentType":"link","componentName":"超链接","componentKey":"6QRNe7Cxwu","componentKeyId":"","backendConfig":{},"value":null,"parentKey":"2HYuQiNK_"},"41eVnfTKv":{"index":0,"name":"divider","key":"41eVnfTKv","id":null,"data":[],"visible":true,"style":{},"properties":{"label":"分割线"},"extendAttributes":{"httpParams":{},"url":""},"actions":{},"options":[],"componentType":"divider","componentName":"分割线","componentKey":"4w4gNyuYyI","componentKeyId":"","backendConfig":{},"value":null,"parentKey":"2HYuQiNK_"}}'
  },
  formComponentDetailVo: {
    inputConfigs: [
      {
        id: '1656559382793715716',
        parentContainerId: null,
        componentKey: 'FjjnxwTosD',
        componentKeyId: '1656559382793715714',
        customSort: 0,
        componentName: '单行文本',
        componentRemark: '',
        errorMsg: '',
        displayKey: '5u7xYycz7',
        optTip: '',
        inputType: 'INPUT',
        defaultValue: null,
        isAllowSelect: 0,
        verifyRegex: '',
        maxLimit: null,
        minLimit: null
      },
      {
        id: '1656559382793715717',
        parentContainerId: null,
        componentKey: 'QceBfEPQPL',
        componentKeyId: '1656559382793715715',
        customSort: 0,
        componentName: '日期选择',
        componentRemark: '',
        errorMsg: '',
        displayKey: 'W4KjPmGi$',
        optTip: '',
        inputType: 'DATE',
        defaultValue: null,
        isAllowSelect: 0,
        verifyRegex: '',
        maxLimit: null,
        minLimit: null
      }
    ],
    containerConfigs: [
      {
        id: '1656559379597656065',
        parentContainerId: null,
        componentKey: '4w4gNyuYyI',
        componentKeyId: '1656559379530547203',
        customSort: 0,
        componentName: '分割线',
        componentRemark: '',
        errorMsg: '',
        displayKey: '41eVnfTKv',
        innerComponentCode: '',
        componentContainerType: 'COMMON',
        innerExtConfig: null,
        isDynamic: 0,
        maxLimit: 0,
        minLimit: 0,
        inputConfigs: null,
        containerConfigs: null,
        fileConfigs: null,
        selectionConfigs: null,
        innerConfigs: null,
        innerContainerConfigs: null
      },
      {
        id: '1656559379597656066',
        parentContainerId: null,
        componentKey: '6QRNe7Cxwu',
        componentKeyId: '1656559379530547202',
        customSort: 0,
        componentName: '超链接',
        componentRemark: '',
        errorMsg: '',
        displayKey: 'A4WejNCMl',
        innerComponentCode: '',
        componentContainerType: 'COMMON',
        innerExtConfig: null,
        isDynamic: 0,
        maxLimit: 0,
        minLimit: 0,
        inputConfigs: null,
        containerConfigs: null,
        fileConfigs: null,
        selectionConfigs: null,
        innerConfigs: null,
        innerContainerConfigs: null
      }
    ],
    fileConfigs: [
      {
        id: '1656559383708073987',
        parentContainerId: null,
        componentKey: 'gvaG1RYWbK',
        componentKeyId: '1656559383708073986',
        customSort: 0,
        componentName: '文件上传',
        componentRemark: '',
        errorMsg: '',
        displayKey: 'j9dJm3n4k',
        fileTypes: 'jpg,jpeg,png,gif,bmp',
        maxUploadNum: 5,
        minUploadNum: 1,
        minSingleFileSize: 1.0,
        maxSingleFileSize: 500.0,
        minTotalFileSize: 1.0,
        maxTotalFileSize: 1073741824.0,
        optTip: '',
        isAllowSelect: 0,
        fileNameVerifyRegex: null,
        maxFileName: null,
        minFileName: null
      }
    ],
    selectionConfigs: [
      {
        id: '1656559383318003715',
        parentContainerId: null,
        componentKey: 'qhylHVektt',
        componentKeyId: '1656559383255089154',
        customSort: 0,
        componentName: '下拉选择',
        componentRemark: '',
        errorMsg: '',
        displayKey: 'CB8vEbyT3',
        optTip: '',
        selectionType: 'select',
        selectionValues: '{"1":"a","2":"b"}',
        defaultSelectionValues: null,
        isAllowSelect: 0
      },
      {
        id: '1656559383318003716',
        parentContainerId: null,
        componentKey: 'qd19atCE4E',
        componentKeyId: '1656559383318003714',
        customSort: 0,
        componentName: '多选框组',
        componentRemark: '',
        errorMsg: '',
        displayKey: 'JsNe_f8Xr',
        optTip: '',
        selectionType: 'multi_select',
        selectionValues: '{"1":"a","2":"b"}',
        defaultSelectionValues: null,
        isAllowSelect: 0
      },
      {
        id: '1656559383318003717',
        parentContainerId: null,
        componentKey: 'w07s4Gy4C3',
        componentKeyId: '1656559383318003713',
        customSort: 0,
        componentName: '单选框组',
        componentRemark: '',
        errorMsg: '',
        displayKey: 'WQk_hNxUs',
        optTip: '',
        selectionType: 'select',
        selectionValues: '{"1":"a","2":"b"}',
        defaultSelectionValues: null,
        isAllowSelect: 0
      }
    ]
  }
}

export default detail
