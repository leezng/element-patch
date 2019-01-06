<script>
  export default {
    data () {
      return {
        list: [{
          label: 'A类别',
          value: 'a'
        }, {
          label: 'B类别',
          value: 'b'
        }, {
          label: 'C类别',
          value: 'c'
        }],
        value: []
      }
    }
  }
</script>

## TagSelect 标签选择器

标签多选组件

### 代码演示

:::demo 基础用法
```html
<template>
  <elx-tag-select :data="list" v-model="value"></elx-tag-select>
</template>
<script>
  data () {
    return {
      list: [{
        label: 'A类别',
        value: 'a'
      }, {
        label: 'B类别',
        value: 'b'
      }, {
        label: 'C类别',
        value: 'c'
      }],
      value: []
    }
  }
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| ---- | ---- | ---- | ---- | ---- |
| value | 当前值 | ObjectArray | — | — |
| data | 可选列表 | ObjectArray | — | — |
