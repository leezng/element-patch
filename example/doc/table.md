<script>
  export default {
    data () {
      return {
        pagination: {
          total: 100,
          pagerCount: 5,
          currentPage: 1,
          pageSize: 5,
          pageSizes: [5, 10, 20]
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }],
        tableData2: Array.from(Array(100)).map((item, index) => ({
          date: '2016-05-03',
          name: `王小虎${index + 1}`,
          address: '上海市普陀区金沙江路 1516 弄'
        }))
      }
    },
    methods: {
      handleSizeChange () {
        console.log('SizeChange')
      },
      handleCurrentChange () {
        console.log('CurrentChange', this.pagination)
      }
    },
    watch: {
      tableData: {
        handler (newVal) {
          console.log('tableData changed: ', newVal)
        },
        deep: true
      }
    }
  }
</script>

## Table 表格

扩展的el-table，继承 `el-table` 的 `Attribute`，`Methods` 与 `Events`。同时支持监听 `el-pagination` 相关分页事件，但需添加 `pagination-` 前缀，例如 `@prev-click="handle"` 事件应转化为 `@pagination-prev-click="handle"`

### 代码演示

:::demo 分页操作
```html
<template>
  <elx-table
    :data="tableData2"
    :show-pagination="true"
    :pagination="pagination"
    @pagination-size-change="handleSizeChange"
    @pagination-current-change="handleCurrentChange">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </elx-table>
</template>
<script>
  data () {
    return {
      pagination: {
        total: 100,
        pagerCount: 5,
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5, 10, 20]
      },
      tableData2: Array.from(Array(100)).map((item, index) => ({
        date: '2016-05-03',
        name: `王小虎${index}`,
        address: '上海市普陀区金沙江路 1516 弄'
      }))
    }
  }
</script>
```
:::

:::demo 拖拽排序
```html
<template>
  <elx-table
    :data.sync="tableData"
    :draggable="true">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </elx-table>
</template>
<script>
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| ---- | ---- | ---- | ---- | ---- |
| showPagination | 是否需要分页 | Boolean | - | false
| pagination | 分页参数，来自el-pagination | Object | - | -
| draggable | 拖拽开关 | Boolean | - | false
