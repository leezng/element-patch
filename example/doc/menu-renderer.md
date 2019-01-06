<script>
  export default {
    data () {
      return {
        list1: [{
           label: '处理中心'
        }, {
          label: '我的工作台',
          subMenu: [{
            label: '选项1'
          }, {
            label: '选项2'
          }, {
            label: '选项3',
            disabled: true
          }, {
            label: '选项4',
            subMenu: [{
              label: '选项4-1'
            }]
          }]
        }, {
           label: '消息中心'
        }, {
           label: '订单管理',
           subMenu: [{
             label: '选项333'
           }]
        }],

        list2: [{
          label: '导航1',
          subMenu: [{
            title: '分组1',
            content: [{
              label: '11'
            }, {
              label: '22'
            }]
          }, {
            title: '分组2',
            content: [{
              label: '33'
            }, {
              label: '44'
            }]
          }]
        }, {
           label: '导航2'
        }, {
           label: '导航3',
           subMenu: [{
             label: '选项333'
           }]
        }],

        auth: 'dev',
        noAuthStyle: 'hidden',
        list3: [{
           label: '处理中心'
        }, {
          label: '我的工作台',
          subMenu: [{
            label: '选项1'
          }, {
            label: '选项2'
          }, {
            label: '选项3',
            disabled: true
          }, {
            label: '选项4',
            subMenu: [{
              label: '选项4-1'
            }]
          }]
        }, {
           label: '消息中心'
        }, {
           label: '订单管理',
           auth: ['admin'],
           subMenu: [{
             label: '选项333'
           }]
        }],
      }
    },
    methods: {
      onSelect (index, indexPath) {
        console.log('onSelect: ', index, indexPath)
      }
    }
  }
</script>

## MenuRenderer 菜单渲染器

配置式菜单生成方案，继承 `el-menu` 的 `Attribute`，`Methods` 与 `Events`

### 代码演示

:::demo 基础用法
```html
<template>
  <elx-menu-renderer
    mode="horizontal"
    default-active="1"
    :content="list1"
    @select="onSelect">
  </elx-menu-renderer>
</template>
<script>
  data () {
    return {
      list1: [{
        label: '处理中心'
      }, {
        label: '我的工作台',
        subMenu: [{
          label: '选项1'
        }, {
          label: '选项2'
        }, {
          label: '选项3',
          disabled: true
        }, {
          label: '选项4',
          subMenu: [{
            label: '选项4-1'
          }]
        }]
      }, {
         label: '消息中心'
      }, {
         label: '订单管理',
         subMenu: [{
           label: '选项333'
         }]
      }]
    }
  }
</script>
```
:::

:::demo 分组与其他属性
```html
<template>
  <el-row :gutter="30">
    <el-col :span="6">
      <elx-menu-renderer default-active="2" :content="list2"></elx-menu-renderer>
    </el-col>
    <el-col :span="6">
      <elx-menu-renderer
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        default-active="2"
        :content="list2">
      </elx-menu-renderer>
    </el-col>
  </el-row>
</template>
<script>
  data () {
    return {
      list2: [{
        label: 'A类别',
        value: 'a'
      }, {
        label: 'B类别',
        value: 'b'
      }, {
        label: 'C类别',
        value: 'c'
      }]
    }
  }
</script>
```
:::

:::demo 权限控制
```html
<template>
  <div>
    <span>auth(当前权限)</span>
    <el-radio-group v-model="auth" size="mini">
      <el-radio-button label="admin"></el-radio-button>
      <el-radio-button label="dev"></el-radio-button>
    </el-radio-group>
    <span style="margin-left: 15px;">noAuthStyle(无权限时的展示方式)</span>
    <el-radio-group v-model="noAuthStyle" size="mini">
      <el-radio-button label="hidden"></el-radio-button>
      <el-radio-button label="disabled"></el-radio-button>
    </el-radio-group>
    <el-row :gutter="30">
      <el-col :span="6">
        <elx-menu-renderer
          default-active="1"
          :no-auth-style="noAuthStyle"
          :auth="auth"
          :content="list3">
        </elx-menu-renderer>
      </el-col>
      <el-col :span="6">
        <elx-menu-renderer
          default-active="1"
          :no-auth-style="noAuthStyle"
          :auth="auth"
          :content="list3">
        </elx-menu-renderer>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  data () {
    return {
      auth: 'dev',
      noAuthStyle: 'hidden',
      list3: [{
        label: '处理中心'
      }, {
        label: '我的工作台',
        subMenu: [{
          label: '选项1'
        }, {
          label: '选项2'
        }, {
          label: '选项3',
          disabled: true
        }, {
          label: '选项4',
          subMenu: [{
            label: '选项4-1'
          }]
        }]
      }, {
         label: '消息中心'
      }, {
         label: '订单管理',
         auth: ['admin'],
         subMenu: [{
           label: '选项333'
         }]
      }]
    }
  }
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| ---- | ---- | ---- | ---- | ---- |
| content | 菜单数据 | ObjectArray | - | -
| auth | 当前权限 | String | - | ''
| noAuthStyle | 无权限时的展示方式 | String | hidden, disabled | hidden |
