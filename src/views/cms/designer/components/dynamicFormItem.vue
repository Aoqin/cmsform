<script lang="ts">
import {
  ElAlert,
  ElInput,
  ElOption,
  ElRadio,
  ElCheckbox,
  ElCheckboxGroup,
  ElRadioGroup,
  ElSelect
} from 'element-plus'
import { defineComponent, h, type VNode, type Slots, type DefineComponent } from 'vue'

export default defineComponent({
  props: {
    element: Object,
    modelValue: String
  },
  emits: ['update:modelValue'],
  data: () => {
    return {
      value: null
    }
  },
  setup(props) {},
  watch: {
    modelValue(val) {
      console.log('modelValue:: ', val)
      // this.value = val
    }
  },
  render() {
    console.log('render:: ', this)
    let comp: VNode | DefineComponent | Function
    let slots: Slots | null = null
    let attr: any = {}
    const { componentType, options } = this.element!
    const { modelValue } = this
    console.log(modelValue)
    switch (componentType) {
      case 'input':
        comp = ElInput
        break
      case 'select':
        comp = ElSelect
        break
      case 'radio':
        comp = ElRadioGroup
        break
      case 'checkbox':
        comp = ElCheckboxGroup
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
        options?.map((item: { key: string; label: string }) =>
          h(optionNode as VNode, { ...item })
        ) || null
      if (defaultSlot) {
        slots = {
          default: defaultSlot
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
      slots
    )
  }
})
</script>

<style scoped></style>
