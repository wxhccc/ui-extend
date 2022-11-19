<script setup lang="ts">
import { ref, reactive, computed, watch, useAttrs } from 'vue'
import { isFunction } from 'lodash-es'
import CopyClipboard from '@/components/copy-clipboard'
import {
  UeForm,
  UeRow,
  UeCol,
  UeButton,
  UeImage,
  UeTooltip,
  UeButtonProps,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FORM_ITEM_NAME
} from '@/ui-comps'
import { AnyObject, StrOrNum, vueTypeProp } from '@wxhccc/ue-shared'
import FormFieldItem, { FormFieldItemOption } from '@/components/form-field-item'
import { InfoTableProps, CellItem } from './types'

type ITPWithDef = Required<InfoTableProps>

const props = defineProps({
  title: vueTypeProp<InfoTableProps['title']>(String),
  editBtn: Boolean,
  editMode: vueTypeProp<ITPWithDef['editMode']>(String, 'manual'),
  data: vueTypeProp<ITPWithDef['data']>(Object, () => ({})),
  cells: vueTypeProp<ITPWithDef['cells']>(Array, () => []),
  column: vueTypeProp<ITPWithDef['column']>(Number, 3),
  modelValue: vueTypeProp<InfoTableProps['modelValue']>(Object),
  setEmptyCell: vueTypeProp<InfoTableProps['setEmptyCell']>([Boolean, Function], true),
  bordered: vueTypeProp<InfoTableProps['bordered']>(Boolean),
  valueNoWrap: vueTypeProp<InfoTableProps['valueNoWrap']>(Boolean),
  labelWidth: vueTypeProp<InfoTableProps['labelWidth']>([Number, String])
})
const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'update:modelValue', value: AnyObject): void
  (e: 'change', value: AnyObject): void
}>()
const attrs = useAttrs()

const getFormData = () => ({ ...(props.modelValue || props.data) })
const formData = ref(getFormData())
const editFlags = reactive<Record<string, boolean>>({})
const secretFlags = reactive<Record<string, boolean>>({})

const handleCells = computed(() => {
  return props.cells.filter((item) => {
    if (typeof item.hide === 'boolean') {
      return !item.hide
    }
    if (item.hide instanceof Function) {
      return !item.hide(props.data)
    }
    return true
  })
})
const labelStyle = computed(() => {
  const { labelWidth } = props
  return labelWidth
    ? { width: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth }
    : {}
})
const compSize = computed(() => (attrs.size as UeButtonProps['size']) || 'small')

const valueOrData = computed(() => props.modelValue || props.data)

const defCellSpan = computed(() => {
  const { column = 3 } = props
  if (typeof column === 'number') {
    return { span: 24 / column }
  }
  return Object.keys(column).reduce((acc, key) => {
    acc[key] = Math.floor(24 / (column[key] as number))
    return acc
  }, {} as AnyObject)
})

// 获取单元格的key
const getItemKey = (item: CellItem) => item.key || item.prop || Math.random()
// 检测单元格是否可编辑
const checkItemCanEdit = (item: CellItem) => item.canEdit && item.prop !== undefined
// 获取编辑表单域的props
const getItemFieldProps = (item: CellItem, size = 'small') => {
  const { field, ...rest } = item.formItem || {}
  return {
    [FORM_ITEM_NAME]: item.prop,
    wrapperCol: { span: 24 },
    ...rest,
    field: { size, ...field }
  } as FormFieldItemOption
}

const handleCellProp = (item: CellItem) => {
  const { span, props: itemProps } = item
  const countSpan = span ? { span } : defCellSpan.value
  const handleProps = itemProps instanceof Function ? itemProps(props.data, item) : itemProps
  return { ...countSpan, ...handleProps }
}
const getItemValue = (item: CellItem, isSecretShow?: boolean) => {
  const { value, prop, formatter } = item
  const dataValue = prop && props.data[prop] !== undefined ? props.data[prop] : ''
  if (item.isSecret && !isSecretShow) {
    return Array(String(dataValue).length || 6)
      .fill('*')
      .join('')
  }
  const showValue =
    value !== undefined
      ? value
      : formatter instanceof Function
      ? formatter(dataValue, props.data, item)
      : dataValue
  const { setEmptyCell: emptyCell } = props
  const isEmpty = showValue === undefined || showValue === null || showValue === ''
  return isEmpty && emptyCell
    ? emptyCell instanceof Function
      ? emptyCell(dataValue, props.data, item)
      : '-'
    : showValue
}
// 切换单元格可隐藏值的显隐
const switchSecretHidden = (item: CellItem) => {
  const key = getItemKey(item)
  if (!key) {
    return
  }
  secretFlags[key] = !secretFlags[key]
}
// 获取当前单元格是否在编辑状态
const getItemEditFlag = (item: CellItem) => {
  const key = getItemKey(item)
  if (!key || !item.canEdit || !item.prop) {
    return false
  }
  return editFlags[key]
}
// 设置单元格的编辑状态
const setEditFlag = (item: CellItem, bool?: boolean) => {
  const key = getItemKey(item)
  if (!key) {
    return
  }
  editFlags[key] = typeof bool === 'boolean' ? bool : !editFlags[key]
}
// 开始编辑单元格
const editItem = (item: CellItem) => {
  const prop = item.prop as StrOrNum
  if (prop === undefined) {
    return
  }
  formData.value[prop] = valueOrData.value[prop]
  setEditFlag(item, true)
}
const getFieldValue = (name?: StrOrNum) => {
  if (name !== undefined) {
    return formData.value[name]
  }
  return formData.value
}
// 更新内部表单数据对象，非手动更新模式下会自动对外更新
const setFieldValue = (name: StrOrNum | undefined, val: any) => {
  if (name) {
    formData.value[name] = val
  } else {
    formData.value = val
  }
  if (props.editMode === 'alaways') {
    updateValue()
  }
}
// 更新编辑内容
const updateValue = (item?: CellItem) => {
  emit('update:modelValue', { ...formData.value })
  emit('change', { ...formData.value })
  item && setEditFlag(item, false)
}
watch(valueOrData, () => {
  formData.value = getFormData()
})
</script>
<script lang="ts">
export default { name: 'UeInfoTable' }
</script>

<template>
  <ue-form class="ue-info-table" :model="formData">
    <div v-if="title || $slots.title" class="table-header">
      <div class="header-title">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </div>
      <slot name="extra">
        <ue-button v-if="editBtn" type="link"  @click="$emit('edit')">
          <template #icon>
            <EditOutlined />
          </template>
          编辑
        </ue-button>
      </slot>
    </div>
    <ue-row :class="['info-table', { 'is-bordered': bordered }]">
      <ue-col
        v-for="item in handleCells"
        :key="getItemKey(item)"
        :class="['info-item-cell', { 'no-wrap-cell': valueNoWrap }]"
        v-bind="handleCellProp(item)"
      >
        <span v-if="item.label" class="label-td" :style="labelStyle">
          <slot name="label" :cell="item" :data="data">
            <component class="label-icon" :is="item.icon" v-if="item.icon" />
            <component v-if="isFunction(item.label)" :is="item.label(item, data)"></component>
            <template v-else>{{ item.label }}</template>
          </slot>
        </span>
        <div class="value-td">
          <slot v-if="item.slotName" :name="item.slotName" :cell="item" :data="data"></slot>
          <form-field-item
            v-else-if="(editMode === 'alaways' || getItemEditFlag(item)) && item.formItem"
            class="info-table-field-item"
            v-bind="getItemFieldProps(item, compSize)"
            :model-value="getFieldValue(item.prop)"
            @update:model-value="(val: any) => setFieldValue(item.prop, val)"
          >
          </form-field-item>
          <template v-else-if="!getItemEditFlag(item)">
            <ue-image v-if="item.isImage" class="info-image" :src="getItemValue(item)" />
            <a v-else-if="item.link" class="ue-primary-link" :href="item.link" target="_blank">{{
              getItemValue(item)
            }}</a>
            <template v-else>
              <span v-if="valueNoWrap" class="info-text ue-text-ellipsis">
                <ue-tooltip :title="getItemValue(item, secretFlags[getItemKey(item)])">
                  {{ getItemValue(item, secretFlags[getItemKey(item)]) }}
                </ue-tooltip>
              </span>
              <span v-else class="info-text">{{
                getItemValue(item, secretFlags[getItemKey(item)])
              }}</span>
              <copy-clipboard
                v-if="item.canCopy"
                class="ope-btn copy-btn"
                :text="getItemValue(item)"
              />
              <ue-button
                v-if="item.isSecret"
                class="ope-btn view-btn"
                type="link"
                @click="switchSecretHidden(item)"
              >
                <eye-outlined />
              </ue-button>
            </template>
          </template>
          <div v-if="checkItemCanEdit(item) && editMode === 'manual'" class="edit-btns">
            <template v-if="getItemEditFlag(item)">
              <ue-button type="link" :size="compSize" @click="setEditFlag(item, false)">
                <close-outlined />
              </ue-button>
              <ue-button type="link" :size="compSize" @click="updateValue(item)">
                <check-outlined />
              </ue-button>
            </template>
            <ue-button v-else type="link" :size="compSize" @click="editItem(item)">
              <edit-outlined />
            </ue-button>
          </div>
        </div>
      </ue-col>
    </ue-row>
  </ue-form>
</template>

<style lang="scss">
.ue-info-table {
  align-items: stretch;
  margin-left: 1px;
  --ue-text-color: var(--ant-primary-color, #000000);
  --ue-label-text-color: var(--ant-text-color-secondary, rgba(#000000, 0.45));
  --ue-border-color: var(--ant-border-color, #ebeef5);

  .info-image {
    max-width: 120px;
  }

  .table-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    justify-content: space-between;
  }

  .header-title {
    font-size: 14px;
    font-weight: bold;
  }

  .info-item-cell {
    display: flex;
    margin-top: -1px;
    margin-left: -1px;
  }

  .is-bordered {
    .info-item-cell {
      border: 1px solid var(--ue-border-color);
    }

    .label-td {
      color: var(--ue-label-text-color);
      background: rgba(#000000, 0.02);
      border-right: 1px solid rgba(#000000, 0.08);
    }

    .label-td,
    .value-td {
      padding: 12px 10px;
    }

    .label-td {
      width: 120px;
    }
  }

  .label-td,
  .value-td {
    display: inline-block;
    overflow: hidden;
    padding: 6px 10px 6px 0;
  }

  .ope-btn {
    margin-top: -4px;
  }

  .value-td {
    display: flex;
    align-items: baseline;
    flex: 1;

    &.no-wrap-cell {
      align-items: center;
    }
  }

  .label-td {
    flex-shrink: 0;
    position: relative;
    color: var(--ue-label-text-color);
  }

  .label-icon {
    margin-right: 10px;
  }

  .operation-btns {
    flex: 1;
  }

  .edit-btns {
    display: flex;

    .ant-btn-link {
      height: auto;
      margin-left: 10px;
      padding: 0;
      line-height: 1;
    }
  }

  .info-table-field-item {
    flex: 1;
    margin-bottom: 0;

    .ant-form-item-control {
      line-height: 1;
    }

    .ant-form-item-control-input {
      min-height: auto;
    }

    .ant-form-explain {
      position: absolute;
    }
  }
}
</style>
