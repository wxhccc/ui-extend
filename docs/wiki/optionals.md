---
sidebarDepth: 3
---

## 使用方法

Optionals主要是提供了**可选**的便捷函数，可以更方便得使用本组件库。


``` js
import { createOption } from '@wxhccc/ui-extend'
```

## 方法列表

### createOption

创建标准格式的option数据对象，通常用来生成下拉选项里的“全部”选项

**类型定义**: 
```ts
declare const createOption = (value: null | undefined | string | number, label?: string) => Option
```

**参数**:

* `value`  返回对象的value值，默认为: 0
* `label`  返回对象的label值，默认为: '全部'

**示例**:

```ts
import { createOption } from '@wxhccc/ui-extend'

createOption('')
// log { value: '', label: '全部' }

```

::: tip 类型定义中的相关接口/类型说明，下同

* `FormItemProps`: 组建库的FormItem组建的props类型
* `CommonFieldProps`: CommonField组件的props类型
* `NamePath(string | number)`: FormItem组件的name/prop属性，同时也是对应表单域绑定值的key
* `FormFieldItemProps`: FormFieldItem组件的props类型
* `RuleObject`: FormItem组件props的rules属性的规则项
* `StrOrProps`: 字符串或者属性对象

:::


### `createFFIRulesProps`

生成`FormFieldItem`组件带验证规则的props属性对象

**类型定义**: 
```ts
type RuleRequired = boolean | string | [boolean | string | undefined, RuleObject['type']]

function createFFIRulesProps(
  label: string,
  requiredOrMsgOrWithType: RuleRequired = true,
  rules: RuleObject[] = [],
  others?: Partial<FormItemProps>
): FormItemProps
```

**参数**:

* `label`     表单项label内容。
* `required`  是否必填 / 未填时特定的提示文字 / [前两者，（数据的类型，默认string）]
* `rules`     表单项额外的rules数组
* `others`    配置对象中的其他属性，可覆盖已配置属性，当需要使用此选项时，直接写FormItemProps对象可能更直观。


**示例**

```ts
import { createFFIRulesProps } from '@wxhccc/ui-extend'

createFFIRulesProps('姓名')
/** log 
{
  label: '姓名',
  rules: [
    { required: true, message: '请输入姓名' }
  ]
}
**/
createFFIRulesProps('年龄', '请选择年龄', [{ type: 'number', min: 10, message: '抱歉你的年龄小于10岁', trigger: 'change' }], { size: 'small' })
/** log 
{
  label: '姓名',
  rules: [
    { required: true, message: '请选择年龄' },
    { type: 'number', min: 10, message: '抱歉你的年龄小于10岁', trigger: 'change' }
  ],
  size: 'small'
}
**/
```

### `createFormFieldItem`

生成`FormFieldItem`使用的配置数据对象

**类型定义**: 
```ts
function createFormFieldItem <FP, V>(
  component: Component,
  labelOrProps?: StrOrProps<FormItemProps>,
  name?: NamePath,
  fieldExtra?: Partial<CommonFieldProps<V, FP>>,
  extraProps?: Partial<FormFieldItemProps>
): FormFieldItemProps
```

**参数**:

* `component`     配置数据中field对象中的component属性，可以用组件字符串或传入组件对象。
* `labelOrProps`  表单项的label字符串，或者props参数对象
* `name`          配置对象的prop/name属性
* `fieldExtra`    配置对象的field对象中的其他属性，可覆盖已配置属性
* `extraProps`    配置对象中的其他属性，可覆盖已配置属性


**示例**

```ts
import { createFormFieldItem } from '@wxhccc/ui-extend'

import CustomField from '...'

createFormFieldItem('ElInput', '姓名', 'name', { placeholder: '请输入' })
/** log 
{
  props: { label: '姓名' },
  name: 'name',
  field: {
    component: 'ElInput',
    placeholder: '请输入'
  }
}
**/
createFormFieldItem(CustomField, { label: '自定义组件', rules: [] }, 'foo', { props: { data: [] } })
/** log 
{
  props: { label: '自定义组件', rules: [] },
  name: 'foo',
  field: {
    component: CustomField,
    // 和CommonFiled组件冲突的component组件的props，可以使用props传入
    props: {
      data: []
    }
  }
}
**/
```


### `createInputFormItem`

基于[createFormFieldItem](#createformfielditem)函数定制，用于创建输入框表单项配置数据。

**类型定义**: 
```ts
function createInputFormItem(
  labelOrProps: StrOrProps<FormItemProps>,
  name?: NamePath,
  phOrFieldProps?: StrOrProps<Partial<CommonFieldProps<string, InputProps>>>,
  extraProps: Partial<FormFieldItemProps>
): FormFieldItemProps
```

**参数**:

* `labelOrProps`    表单项的label字符串，或者props参数对象
* `name`            配置对象的name/prop属性
* `phOrFieldProps`  filed对象的props参数对象，或者filed.props对象placeholder参数
* `extraProps`      配置对象中的其他属性，可覆盖已配置属性

**示例**

```ts
import { createInputFormItem } from '@wxhccc/ui-extend'

const props = createFFIRulesProps('金额', true)

createInputFormItem(props, 'money', '请输入金额', { prevProp: ['people'] })
/** log 
{
  props: {
    label: '金额',
    rules: [
      { required: true, message: '请输入金额', trigger: 'blur'}
    ]
  },
  name: 'money',
  field: {
    component: ElInput / AInput,
    props: { placeholder: '请输入金额' }
  },
  prevProp: ['people']
}
**/
```

::: tip 后续函数的统一接口类型
```ts
interface CreateHasDataFormItem<FE = Partial<CommonFieldProps>> {
  (

    /** label 或FormItem组件props */
    labelOrProps: StrOrProps<FormItemProps>,
    /** 配置对象的name/prop属性 */
    name?: NamePath,
    /** 数据项数组 */
    data?: SelectOption[] | Option[],
    /** 对应表单域的CommonFieldProps */
    fieldExtra?: FE,
    /** FormFieldItem组件的其他props */
    extraProps?: Partial<FormFieldItemProps>
  ): FormFieldItemProps
}
```
:::

### `createRadioGroupFormItem`

基于[createFormFieldItem](#createFormFieldItem)函数定制，用于创建RadioGroup表单项配置数据。

**类型定义**: 
```ts
type createRadioGroupFormItem = CreateHasDataFormItem<
  Partial<CommonFieldProps<any, RadioGroupProps>>
>
```

**参数**:

* `labelOrProps` {String/Object} 表单项的label字符串，或者props参数对象
* `prop` {String} 配置对象的prop属性
* `data` {Array} filed对象的data参数对象数组
* `fieldExtra` {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性
* `extraProps` {Object} 配置对象中的其他属性，可覆盖已配置属性


### `createCheckboxGroupFormItem`

用于创建CheckboxGroup表单项配置数据。

**类型定义**: 
```ts
type createRadioGroupFormItem = CreateHasDataFormItem<
  Partial<CommonFieldProps<any, CheckboxGroup>>
>
```
  

### `createSelectFormItem`

用于创建Select表单项配置数据。

**类型定义**: 
```ts
function createSelectFormItem(
  labelOrProps: StrOrProps<FormItemProps>,
  name?: NamePath,
  data?: SelectOption[],
  phOrFieldProps?: StrOrProps<Partial<CommonFieldProps<StrOrNum, SelectProps>>>,
  extraProps?: Partial<FormFieldItemProps>
)
```

**参数**:

* `labelOrProps`    表单项的label字符串，或者props参数对象
* `name`            配置对象的prop属性
* `data`            filed对象的data参数对象数组
* `phOrFieldProps`  filed对象的props参数对象，或者filed.props对象placeholder参数
* `fieldExtra`      配置对象的field对象中的其他属性，可覆盖已配置属性
* `extraProps`      配置对象中的其他属性，可覆盖已配置属性
  


### `createDateFormItem`

基于[createFormFieldItem](#createformfielditem)函数定制，用于创建日期选择器表单项配置数据。

**类型定义**: 
```ts
reateDateFormItem(labelOrProps, prop, [typeOrFieldProps, fieldExtra, extraProps])
```

**参数**:

* `labelOrProps` {String/Object} 表单项的label字符串，或者props参数对象
* `prop` {String} 配置对象的prop属性
* `typeOrFieldProps` {String/Object} 时间选择器的类型，可选值有'date'、'daterange'，也可以传入完整对象
* `fieldExtra` {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性
* `extraProps` {Object} 配置对象中的其他属性，可覆盖已配置属性


::: tip type值说明
date：默认时间选择组件，设定绑定值为数字时间戳
daterange：日期范围选择，设定绑定值格式为日期字符串数组
:::

### `createTableColumn`

用于创建简单表格列配置数据对象。

**类型定义**: 
```ts
reateTableColumn(label, prop[, others])
```

**参数**:

* `label` {String} 列配置对象label属性
* `prop` {String} 配置对象的prop属性
* `others` {Object} 配置对象中的其他属性，可覆盖已配置属性
  
**返回值**: object
