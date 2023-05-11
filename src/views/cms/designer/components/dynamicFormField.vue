<script lang="ts">
import {
  defaultCheckboxGroupProperties,
  defaultDatePickerProperties,
  defaultInputProperties,
  defaultRadioGroupProperties,
  defaultSelectProperties,
  defaultTimePickerProperties,
  defaultUploadProperties
} from '@/config/fields'
import { objMapToSet } from '@/utils'
import {
  ElAlert,
  ElInput,
  ElOption,
  ElRadio,
  ElCheckbox,
  ElCheckboxGroup,
  ElRadioGroup,
  ElSelect,
  ElDatePicker,
  ElTimePicker,
  ElUpload,
  ElButton,
  type UploadRequestOptions,
  ElLink
} from 'element-plus'
import { defineComponent, h, type VNode, type DefineComponent } from 'vue'

export default defineComponent({
  props: {
    element: {
      type: Object,
      required: true
    },
    modelValue: [Object, String, Number, Array, Boolean]
  },
  computed: {
    model: {
      get(): any {
        return this.element.getModel()
      },
      set(val: any) {
        this.element.setValue(val)
      }
    }
  },
  render() {
    let comp: VNode | DefineComponent | Function
    let slots: { default?: Function | null; tip?: Function | null } = {}
    let attr: any = {}
    const { componentType, options, properties, data = [], extendAttributes } = this.element!
    switch (componentType) {
      case 'input':
        comp = ElInput
        objMapToSet(attr, properties, defaultInputProperties)
        break
      case 'select':
        comp = ElSelect
        objMapToSet(attr, properties, defaultSelectProperties)
        break
      case 'radio':
        comp = ElRadioGroup
        objMapToSet(attr, properties, defaultRadioGroupProperties)
        break
      case 'checkbox':
        comp = ElCheckboxGroup
        objMapToSet(attr, properties, defaultCheckboxGroupProperties)
        break
      case 'datePicker':
        comp = ElDatePicker
        objMapToSet(attr, properties, defaultDatePickerProperties)
        break
      case 'timePicker':
        comp = ElTimePicker
        objMapToSet(attr, properties, defaultTimePickerProperties)
        break
      case 'upload':
        comp = ElUpload
        objMapToSet(attr, properties, defaultUploadProperties)
        break
      default:
        comp = ElAlert
    }

    let defaultSlot: VNode[] | VNode | null = null

    if (['select', 'checkbox', 'radio'].findIndex((item) => item === componentType) > -1) {
      // 生成默认options插槽
      let optionNode: VNode | DefineComponent | Function
      switch (componentType) {
        case 'select':
          optionNode = ElOption
          break
        case 'checkbox':
          optionNode = ElCheckbox
          break
        case 'radio':
          optionNode = ElRadio
          break
        default:
          break
      }

      const optionNodeFactory = (
        optionAttr: { key?: string; label?: string; value?: string },
        componentType: string
      ) => {
        if (componentType == 'select') {
          return h(optionNode as VNode, { ...optionAttr })
        } else {
          return h(
            optionNode as VNode,
            { label: optionAttr.value },
            { default: () => optionAttr.label }
          )
        }
      }
      let optionsArr = null
      if (extendAttributes.remote) {
        optionsArr = data.map((item: { key?: string; label?: string; value?: string }) => {
          return optionNodeFactory(item, componentType)
        })
      } else {
        optionsArr = options?.map((item: { key?: string; label?: string; value?: string }) => {
          return optionNodeFactory(item, componentType)
        })
      }
      defaultSlot = optionsArr && optionsArr.length > 0 ? optionsArr : null
    } else if (componentType === 'upload') {
      // 上传组件
      defaultSlot =
        properties.buttonType === 'link'
          ? h(ElLink, { type: 'primary' }, properties.buttonText)
          : h(ElButton, { type: properties.buttonType }, { default: () => properties.buttonText })

      attr.fileList = data
      properties.limit ? (attr.limit = properties.limit) : null
      properties.accept && properties.accept.length > 0
        ? (attr.accept = properties.accept.join(','))
        : null
      attr['onUpdate:fileList'] = (val: { name: string; uid: string }[]) => {
        console.log('onUpdate: fileList')
        val.forEach((item) => {
          data.push({
            name: item.name,
            uid: item.uid
          })
        })
      }
      // 上传函数
      if (extendAttributes.uploadFunName) {
        attr.httpRequest = this.element.store.functions[extendAttributes.uploadFunName]
          ? (options: UploadRequestOptions) => {
              console.log(options)
              return this.element.store.functions[extendAttributes.uploadFunName].fun(options.file)
            }
          : () => {
              throw new Error('请配置上传函数')
            }
      }
      attr.onChange = (val: any) => {
        console.log('upload change')
        console.log(val)
      }
      attr.onSuccess = (response, uploadFile, uploadFiles) => {
        this.element.getModel().push({
          name: response.name,
          uid: response.uid
        })
      }
      attr.onRemove = (uploadFile, uploadFiles) => {
        console.log('upload remove')
        console.log(uploadFile)
        console.log(uploadFiles)
        const index = this.element.getModel().findIndex((item) => item.uid === uploadFile.uid)
        if (index > -1) {
          this.element.getModel().splice(index, 1)
        }
      }
      let tipString = ''
      if (properties.limit) {
        tipString += `最多上传${properties.limit}个文件`
      }
      if (properties.accept && properties.accept.length > 0) {
        tipString += `， 限定${properties.accept.join(',')}`
      }
      if (properties.limitSize) {
        tipString += `，文件大小不能超过${properties.limitSize}kb`
      }
      slots.tip = () => h('div', {}, tipString)
    }
    slots.default = defaultSlot ? () => defaultSlot : null

    // 生成默认插槽

    return h(
      comp,
      {
        modelValue: this.model,
        'onUpdate:modelValue': (val: any) => {
          this.model = val
        },
        ...attr
      },
      slots
    )
  }
})
</script>

<style scoped></style>
