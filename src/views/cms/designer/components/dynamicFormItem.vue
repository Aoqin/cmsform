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
    element: Object,
    modelValue: [Object, String, Number, Array, Boolean]
  },
  emits: ['update:modelValue'],
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
    const { componentType, options, attributes } = this.element!
    const { modelValue } = this
    switch (componentType) {
      case 'input':
        comp = ElInput
        objMapToSet(attr, attributes, defaultInputAttributes)
        break
      case 'select':
        comp = ElSelect
        objMapToSet(attr, attributes, defaultSelectAttributes)
        break
      case 'radio':
        comp = ElRadioGroup
        objMapToSet(attr, attributes, defaultRadioGroupAttributes)
        break
      case 'checkbox':
        comp = ElCheckboxGroup
        objMapToSet(attr, attributes, defaultCheckboxGroupAttributes)
        break
      case 'datePicker':
        comp = ElDatePicker
        objMapToSet(attr, attributes, defaultDatePickerAttributes)
        break
      case 'timePicker':
        comp = ElTimePicker
        objMapToSet(attr, attributes, defaultTimePickerAttributes)
        break
      default:
        comp = ElAlert
    }

    if (['select', 'checkbox', 'radio'].findIndex((item) => item === componentType) > -1) {
      let defaultSlot: VNode[] | null
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

      defaultSlot =
        options?.map((item: { key?: string; label?: string; value?: string }) =>
          h(optionNode as VNode, { ...item })
        ) || null

      if (defaultSlot) {
        slots = {
          default: () => defaultSlot
        }
      }
    }

    return h(
      comp,
      {
        modelValue,
        'onUpdate:modelValue': (val: any) => {
          console.log(`update:modelValue:: ${val}`)
          this.$emit('update:modelValue', val)
        },
        ...attr
      },
      {
        ...slots
      }
    )
  }
})
</script>

<style scoped></style>
