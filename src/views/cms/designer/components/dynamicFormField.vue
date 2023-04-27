<script lang="ts">
import {
  defaultCheckboxGroupAttributes,
  defaultDatePickerAttributes,
  defaultInputAttributes,
  defaultRadioGroupAttributes,
  defaultSelectAttributes,
  defaultTimePickerAttributes
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
  ElTimePicker
} from 'element-plus'
import { defineComponent, h, type VNode, type Slots, type DefineComponent } from 'vue'

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
  data: () => {
    return {
      value: null
    }
  },
  setup(props) {},
  // watch: {
  //   modelValue(val) {
  //     console.log('modelValue:: ', val)
  //   }
  // },
  render() {
    let comp: VNode | DefineComponent | Function
    let slots: Slots | null = null
    let attr: any = {}
    const { componentType, options, properties } = this.element!
    const { modelValue } = this
    switch (componentType) {
      case 'input':
        comp = ElInput
        objMapToSet(attr, properties, defaultInputAttributes)
        break
      case 'select':
        comp = ElSelect
        objMapToSet(attr, properties, defaultSelectAttributes)
        break
      case 'radio':
        comp = ElRadioGroup
        objMapToSet(attr, properties, defaultRadioGroupAttributes)
        break
      case 'checkbox':
        comp = ElCheckboxGroup
        objMapToSet(attr, properties, defaultCheckboxGroupAttributes)
        break
      case 'datePicker':
        comp = ElDatePicker
        objMapToSet(attr, properties, defaultDatePickerAttributes)
        break
      case 'timePicker':
        comp = ElTimePicker
        objMapToSet(attr, properties, defaultTimePickerAttributes)
        break
      default:
        comp = ElAlert
    }

    let defaultSlot: VNode[] | null = null
    if (['select', 'checkbox', 'radio'].findIndex((item) => item === componentType) > -1) {
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

      defaultSlot =
        options?.map((item: { key?: string; label?: string; value?: string }) => {
          return optionNodeFactory(item, componentType)
        }) || null
    }

    return h(
      comp,
      {
        modelValue: this.model,
        'onUpdate:modelValue': (val: any) => {
          this.model = val
        },
        ...attr
      },
      {
        default: defaultSlot ? () => defaultSlot : null
      }
    )
  }
})
</script>

<style scoped></style>
