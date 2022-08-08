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

**语法**: `createOption(value[, label])`

**参数**:

* `value` {String/Number} 返回对象的value值，默认为: 0
* `label` {String} 返回对象的label值，默认为: '全部'

**返回值**: object

**示例**:

```js
import { createOption } from '@wxhccc/ui-extend/lib/optionals'

createOption('')
// log { value: '', label: '全部' }

```

### `dateFormatter`

返回表格列配置中formatter对应的格式化函数，用来格式化时间。

时间格式化使用的是Utils里的`dateFormat`

**语法**: `dateFormatter(format)`

**参数**:

* `format` {String} 格式化字符串，默认值为：'YYYY-MM-DD HH:mm:ss'

**返回值**: function

**示例**

```js
import { dateFormatter } from '@wxhccc/ui-extend/lib/optionals'

const columns = [
  {
    label: '日期',
    prop: 'time',
    formatter: dateFormatter('date')
  }
]
```

### `createFormFieldItem`

生成`FormFieldItem`使用的配置数据对象

**语法**: `createFormFieldItem(component, labelOrProps, prop[, fieldExtra, extraProps])`

**参数**:

* `component` {Component/ComponentString} 配置数据中field对象中的component属性，可以用组件字符串或传入组件对象。
* `labelOrProps` {String/Object} 表单项的label字符串，或者props参数对象
* `prop` {String} 配置对象的prop属性
* `fieldExtra` {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性
* `extraProps` {Object} 配置对象中的其他属性，可覆盖已配置属性

**返回值**: object

**示例**

```js
import { createFormFieldItem } from '@wxhccc/ui-extend/lib/optionals'

createFormFieldItem('ElInput', '姓名', 'name')
/** log 
{
  props: { label: '姓名' },
  prop: 'name',
  field: {
    component: 'ElInput'
  }
}
**/
```

### `createFfiRulesProps`

生成`FormFieldItem`组件的props属性对象

**语法**: `createFfiRulesProps(label, required[, rules, others])`

**参数**:

* `label` {String} 表单项label内容。
* `required` {Boolean/String} 是否必填，或者设定未填时的提示文案
* `rules` {String} 表单项额外的rules数组
* `others` {Object} 配置对象中的其他属性，可覆盖已配置属性

**返回值**: object

**示例**

```js
import { createFfiRulesProps } from '@wxhccc/ui-extend/lib/optionals'

createFfiRulesProps('姓名', true)
/** log 
{
  label: '姓名',
  rules: [
    { required: true, message: '请输入姓名', trigger: 'blur'}
  ]
}
**/
createFfiRulesProps('年龄', '请选择年龄', [{ type: number, min: 10, message: '抱歉你的年龄小于10岁', trigger: 'change' }], { size: 'small' })
/** log 
{
  label: '姓名',
  rules: [
    { required: true, message: '请选择年龄', trigger: 'blur'},
    { type: number, min: 10, message: '抱歉你的年龄小于10岁', trigger: 'change' }
  ],
  size: 'small'
}
**/
```


### `createInputFormItem`

基于[createFormFieldItem](#createformfielditem)函数定制，用于创建输入框表单项配置数据。

**语法**: `createInputFormItem(labelOrProps, prop, phOrFieldProps, [, extraProps, textOrslots])`

**参数**:

* `labelOrProps` {String/Object} 表单项的label字符串，或者props参数对象
* `prop` {String} 配置对象的prop属性
* `phOrFieldProps` {String/Object} filed对象的props参数对象，或者filed.props对象placeholder参数
* `extraProps` {Object} 配置对象中的其他属性，可覆盖已配置属性
* `textOrslots` {String/Object} 输入框append插槽内的文字，或者传入插槽对象（[详见field.slots](/component/common-field#field)）
  

**返回值**: object

**示例**

```js
import { createInputFormItem } from '@wxhccc/ui-extend/lib/optionals'

const props = createFfiRulesProps('金额', true)

createInputFormItem(props, 'money', '请输入金额', { prevProp: ['people'] }, '元')
/** log 
{
  props: {
    label: '金额',
    rules: [
      { required: true, message: '请输入金额', trigger: 'blur'}
    ]
  },
  prop: 'money',
  field: {
    component: 'ElInput',
    props: { placeholder: '请输入金额' },
    slots: { 'append': { component: 'div', text: '元' } }
  },
  prevProp: ['people']
}
**/
```

### `createRadiosFormItem`

基于[createFormFieldItem](#createformfielditem)函数定制，用于创建Radio表单项配置数据。

**语法**: `createRadiosFormItem(labelOrProps, prop, data[, fieldExtra, extraProps])`

**参数**:

* `labelOrProps` {String/Object} 表单项的label字符串，或者props参数对象
* `prop` {String} 配置对象的prop属性
* `data` {Array} filed对象的data参数对象数组
* `fieldExtra` {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性
* `extraProps` {Object} 配置对象中的其他属性，可覆盖已配置属性
  

**返回值**: object


### `createSelectFormItem`

基于[createFormFieldItem](#createformfielditem)函数定制，用于创建Select表单项配置数据。

**语法**: `createSelectFormItem(labelOrProps, prop, data[allDef, phOrFieldProps, fieldExtra, extraProps])`

**参数**:

* `labelOrProps` {String/Object} 表单项的label字符串，或者props参数对象
* `prop` {String} 配置对象的prop属性
* `data` {Array} filed对象的data参数对象数组
* `allDef` {Boolean/String/Number} 是否在data前添加“全部”选项，或者设置全部选项的value值
* `phOrFieldProps` {String/Object} filed对象的props参数对象，或者filed.props对象placeholder参数
* `fieldExtra` {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性
* `extraProps` {Object} 配置对象中的其他属性，可覆盖已配置属性
  

**返回值**: object


### `createDateFormItem`

基于[createFormFieldItem](#createformfielditem)函数定制，用于创建日期选择器表单项配置数据。

**语法**: `createDateFormItem(labelOrProps, prop, [typeOrFieldProps, fieldExtra, extraProps])`

**参数**:

* `labelOrProps` {String/Object} 表单项的label字符串，或者props参数对象
* `prop` {String} 配置对象的prop属性
* `typeOrFieldProps` {String/Object} 时间选择器的类型，可选值有'date'、'daterange'，也可以传入完整对象
* `fieldExtra` {Object} 配置对象的field对象中的其他属性，可覆盖已配置属性
* `extraProps` {Object} 配置对象中的其他属性，可覆盖已配置属性
  
**返回值**: object

::: tip type值说明
date：默认时间选择组件，设定绑定值为数字时间戳
daterange：日期范围选择，设定绑定值格式为日期字符串数组
:::

### `createTableColumn`

用于创建简单表格列配置数据对象。

**语法**: `createTableColumn(label, prop[, others])`

**参数**:

* `label` {String} 列配置对象label属性
* `prop` {String} 配置对象的prop属性
* `others` {Object} 配置对象中的其他属性，可覆盖已配置属性
  
**返回值**: object
