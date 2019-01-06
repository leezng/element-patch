<style scoped>
  .elx-tree-select {
    width: 200px;
  }
</style>
<script>
  export default {
    data () {
      return {
        data: [{
          label: '一级 1',
          value: '1',
          children: [{
            label: '二级 1-1',
            value: '2',
          }, {
            label: '二级 1-2',
            value: '3',
          }]
        }, {
          label: '一级 2',
          value: '4',
          children: [{
            label: '二级 2-1',
            value: '5'
          }, {
            label: '二级 2-2',
            value: '6'
          }, {
            label: '二级 2-3',
            value: '7'
          }]
        }],
        value1: '2',
        value2: [{
          label: '二级 1-1',
          value: '2'
        }]
      }
    }
  }
</script>

## TreeSelect 树选择

树型选择组件

### 代码演示

:::demo 基础单选
```html
<template>
  <elx-tree-select
    :data="data"
    :default-expand-all="true"
    v-model="value1">
  </elx-tree-select>
</template>
<script>
  data () {
    return {
      data: [{
        label: '一级 1',
        value: '1',
        children: [{
          label: '二级 1-1',
          value: '2',
        }, {
          label: '二级 1-2',
          value: '3',
        }]
      }, {
        label: '一级 2',
        value: '4',
        children: [{
          label: '二级 2-1',
          value: '5'
        }, {
          label: '二级 2-2',
          value: '6'
        }, {
          label: '二级 2-3',
          value: '7'
        }]
      }],
      value1: '2',
    }
  }
</script>
```
:::

:::demo 多选
```html
<template>
  <elx-tree-select :data="data" v-model="value2" multiple></elx-tree-select>
</template>
<script>
  data () {
    return {
      data: [{
        label: '一级 1',
        value: '1',
        children: [{
          label: '二级 1-1',
          value: '2',
        }, {
          label: '二级 1-2',
          value: '3',
        }]
      }, {
        label: '一级 2',
        value: '4',
        children: [{
          label: '二级 2-1',
          value: '5'
        }, {
          label: '二级 2-2',
          value: '6'
        }, {
          label: '二级 2-3',
          value: '7'
        }]
      }],
      value2: [{
        label: '二级 1-1',
        value: '2'
      }]
    }
  }
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| ---- | ---- | ---- | ---- | ---- |
| value | 当前值 | 单选时对应data某一项的类型，多选时为ObjectArray | — | — |
| data | 可选列表 | ObjectArray | — | — |
| emptyText | 可选列表为空时展示的文本 | String | — | '无数据' |
| multiple | 是否多选 | Boolean | — | false |
| defaultExpandAll | 是否默认展开所有 | Boolean | — | false |
