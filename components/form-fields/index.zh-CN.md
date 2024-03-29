### Attributes

| 参数          | 类型     | 说明                                                                                         | 可选值 | 默认值 |
| :------------ | :------- | :------------------------------------------------------------------------------------------- | :----- | :----- |
| value/v-model | object   | 表单项组绑定值，绑定值必须是一个对象。                                                       | --     | --     |
| items         | object[] | 表单项配置数据对象数组，具体结构见[item](#item)                                              | --     | --     |
| delay-update  | boolean  | 是否在数据更新时使用延迟赋值。用于处理瞬时多字段赋值的特殊情况，例如浏览器自动填充账号密码。 | --     | --     |

### item

::: warning 提示
**item**对象可以默认使用`FormFieldItem`组件渲染。对象内`FormFieldItem`组件支持的prop属性会自动绑定到组件上。
也可以通过`component`字段使用自定义表单项组件，使用自定义表单项组件时，只有部分字段会被传递给组件。
:::

| 参数           | 类型                                         | 说明                                                                                                                                             | 可选值 | 默认值    |
| :------------- | :------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :----- | :-------- |
| --             | --                                           | 以下为公共参数。                                                                                                                                 | --     | --        |
| hide           | boolean/function                             | 表单项是否隐藏（不渲染）。                                                                                                                       | --     | --        |
| props          | object/function                              | 表单项组绑定参数对象或返回对象的函数。会自己绑定到组件上。                                                                                       | --     | --        |
| prop           | string/number                                | 表单项绑定值在`value`中对应的键名。使用`children`字段时可缺省，`children`数组对象中的`prop`属性会作为键名，具体见`FormFieldItem`组件。           | --     | --        |
| key            | string/number                                | 表单项组件的`key`，缺省时使用`prop`属性。如果`prop`缺省时会使用数组索引，为了性能`prop`缺省时请设置`key`                                         | --     | --        |
| cascadeModel   | string/number                                | 当前表单项需要监听的表单项的`prop`属性。                                                                                                         | --     | --        |
| cascadeData    | object                                       | 指定结构的级联数据。具体结构说明见[级联数据结构](/wiki/data/#数据级联)                                                                                               | --     | --        |
| cascadeHandler | Function(changeValue, prop, modelData, item) | 自定义级联处理逻辑。参数分别为被监听项改变后的值，当前表单项的prop，匹配到的级联数据数组，当前表单项原始数据对象。**函数会绑定组件上下文允许**。 | --     | --        |
| spliceStart    | number                                       | `field.data`字段在更新时，开始替换的索引值                                                                                                       | --     | 0         |
| clearValue     | object                                       | 被监听项发生变化时，监听项绑定值会被重置的值。                                                                                                   | --     | undefined |
| --             | --                                           | 使用`FormFieldItem`组件渲染支持组件所有props参数，具体见文档。                                                                                   | --     | --        |
| --             | --                                           | 使用自定义组件时支持的参数。                                                                                                                     | --     | --        |
| component      | string(ComponentName)<br/>/Component         | 自定义组件对象或组件名字符串。                                                                                                                   | --     | --        |
| fieldEvents      | object         | 自定义组件内表单域绑定的事件监听对象，会合并上级联的`change`的事件(如果有)后绑定到自定义组件上。                                                                                                                   | --     | --        |

### Methods

| 方法名          | 说明                                 | 参数                       |
| :-------------- | :----------------------------------- | :------------------------- |
| callItemMethod | 调用表单项实例上的方法，可传递参数 | (prop:String,fnName:String, ...args[]) |

::: tip 提示
可以通过组件的实例上的$refs获取到各表单项的实例。注意获取到的是数组（因为循环的原因）。可以使用实例调用组件上的方法。
:::

### Slots

| name | 说明                               | 作用域数据 |
| :--- | :--------------------------------- | :--------- |
| -- | 放置于表单项组后面的内容 | --         |

