## FormBtns 表单操作按钮

常见场景下的表单按钮的封装，包含**提交**、**重置**/**取消**按钮。内置表单验证和提交确认操作。

### 基础用法

::: demo Base
@[code](../.vuepress/demo/form-btns/Base.vue)
:::

### 有Form组件的场景和修改按钮顺序

::: demo with-form FromBtns组件可以放在ElFormItem组件内，也可以不放。放置在ElFormItem组件内会继承Form的部分属性，具体见文档
@[code](../.vuepress/demo/form-btns/with-form.vue)
:::

### 提交前确认和定制文本内容

::: demo confirm-custom 组件未放置在Form里，因此可以放在在页面的fixed容器中方便操作。
@[code](../.vuepress/demo/form-btns/confirm-custom.vue)
:::

::: tip 相关文档
Form组件文档参照 <element-link component="Form"></element-link>
:::


!!!include(form-btns/index.zh-CN.md)!!!