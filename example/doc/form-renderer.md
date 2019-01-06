<script>
  export default {
    data () {
      return {
        // 描述
        content: [
          {
            $type: 'input',
            $id: 'name',
            label: '活动名称',
            $default: 'aaaa2',
            $el: {
              size: 'mini',
              placeholder: 'test placeholder'
            },
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          }, {
            $type: 'select',
            $id: 'region',
            label: '活动区域',
            $options: [{
              label: '区域一',
              value: 'shanghai'
            }, {
              label: '区域二',
              value: 'beijing'
            }],
            rules: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ]
          }, {
            $type: 'date-picker',
            $id: 'date',
            label: '活动时间',
            $el: {
              type: 'datetime',
              placeholder: '请选择'
            },
            rules: [
              { type: 'date', required: true, message: '请选择日期时间', trigger: 'change' }
            ]
          }, {
            $type: 'switch',
            $id: 'delivery',
            label: '即时配送'
          }, {
            // 增加的 enableWhen 示例, 与 element 无关
            $type: 'input',
            $id: 'enableWhenDelivery',
            $el: {
              placeholder: '如果你选择即时配送就看到我啦'
            },
            label: '隐藏项demo',
            $enableWhen: { delivery: true }
          }, {
            $type: 'checkbox-group',
            $id: 'type',
            label: '活动性质',
            $default: [],
            $options: [{
              label: '美食/餐厅线上活动'
            }, {
              label: '地推活动'
            }, {
              label: '线下主题活动'
            }, {
              label: '单纯品牌曝光'
            }],
            rules: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ]
          }, {
            $type: 'radio-group',
            $id: 'resource',
            label: '特殊资源',
            $options: [{
              label: '线上品牌商赞助'
            }, {
              label: '线下场地免费'
            }],
            rules: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ]
          }, {
            $type: 'input',
            $id: 'desc',
            label: '活动形式',
            $el: {
              type: 'textarea'
            },
            rules: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        ]
      }
    },
    methods: {
      addFormGroup () {
        const index = this.content.findIndex(item => item.isGroup)
        if (index !== -1) {
          this.$message.warning('自定义group表单项已存在！')
          return
        }
        this.content.unshift({
          isGroup: true, // 只是用于demo移除查找, 无实际作用
          $type: 'group',
          $id: 'aaaaa',
          $items: [{
            $type: 'input',
            $id: 'group1',
            $default: 'aaaa',
            label: 'group1',
            rules: [
              { required: true, message: 'sss', trigger: 'change' }
            ]
          }, {
            $type: 'select',
            $id: 'group2',
            label: 'group2',
            $options: [{
              label: '区域一',
              value: 'shanghai'
            }, {
              label: '区域二',
              value: 'beijing'
            }]
          }]
        })
        this.$message.success('操作成功！')
      },
      removeFormGroup () {
        const index = this.content.findIndex(item => item.isGroup)
        if (index !== -1) {
          this.content.splice(index, 1)
          this.$message.success('操作成功！')
        } else this.$message.error('请先添加自定义group表单项！')
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

## FormRenderer 表单渲染器

配置式表单生成方案，继承 `el-form` 的 `Attribute`，`Methods` 与 `Events`

### 代码演示

:::demo 基础用法
```html
<template>
  <elx-form-renderer label-width="100px" :content="content" ref="ruleForm">
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </elx-form-renderer>
</template>
<script>
  data () {
    return {
      content: [
        {
          $type: 'input', // 类型，element-ui 提供的所有表单类型，即 el-xxx
          $id: 'name', // 每一个原子都存在id，用于存储该原子的值，注意不能重复
          label: '活动名称',
          $attrs: { 'data-name': 'form1' }, // 可选, 写法与 Vue 的 Render 函数规范保持一致
          $default: 'aaaa2',
          $el: {
            size: 'mini',
            placeholder: 'test placeholder'
          },
          rules: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }, {
          $type: 'select',
          $id: 'region',
          label: '活动区域',
          // $options 具有选择功能的原子表单可用此定义可选项，例如: select, radio-group, radio-button, checkbox-group, checkbox-button
          $options: [{
            label: '区域一',
            value: 'shanghai'
          }, {
            label: '区域二',
            value: 'beijing'
          }],
          rules: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        }, {
          $type: 'date-picker',
          $id: 'date',
          label: '活动时间',
          $el: {
            type: 'datetime',
            placeholder: '请选择'
          },
          rules: [
            { type: 'date', required: true, message: '请选择日期时间', trigger: 'change' }
          ]
        }, {
          $type: 'switch',
          $id: 'delivery',
          label: '即时配送'
        }, {
          // 增加的 enableWhen 示例, 与 element-ui 无关
          $type: 'input',
          $id: 'enableWhenDelivery',
          $el: {
            placeholder: '如果你选择即时配送就看到我啦'
          },
          label: '隐藏项demo',
          $enableWhen: { delivery: true } // 可选属性，表示当 delivery 的值为 true 时显示 
        }, {
          $type: 'checkbox-group',
          $id: 'type',
          label: '活动性质',
          $default: [],
          $options: [{
            label: '美食/餐厅线上活动'
          }, {
            label: '地推活动'
          }, {
            label: '线下主题活动'
          }, {
            label: '单纯品牌曝光'
          }],
          rules: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ]
        }, {
          $type: 'radio-group',
          $id: 'resource',
          label: '特殊资源',
          $options: [{
            label: '线上品牌商赞助'
          }, {
            label: '线下场地免费'
          }],
          rules: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        }, {
          $type: 'input',
          $id: 'desc',
          label: '活动形式',
          $el: {
            type: 'textarea'
          },
          rules: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      ]
    }
  }
</script>
```
:::

此外，我们为 `$type` 属性增加了一个可选值: `group`，可用于创建更为复杂的表单数据类型:

```js
// 该例将获得对象数据结构:
// group1: {
//   input1: '',
//   input2: ''
// }
{
  $id: "group1", // 遵循同一层级的ID不重复的原则，实质上相当于对象的键
  $type: "group",
  label: "这是一个对象数据",
  $items: [{
    $id: "input1",
    $type: "input",
    label: "输入框1",
    $default: "这是默认值"
  }, {
    $id: "input2",
    $type: "input",
    label: "输入框2",
    $default: "这是默认值",
  }]
}
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| ---- | ---- | ---- | ---- | ---- |
| content | 表单描述数据 | ObjectArray | - | -
| disabled | 是否全局禁用 | Boolean | - | false |

### Methods

| 方法名 | 描述 | 参数 |
| ---------- | -------- | ---------- |
| getFormValue | 获取当前表单的值 | - |
| updateValue  | 手动更新表单的值 | ({ id, value }) |

### Slot

* 支持通过默认 `slot` 往表单尾部插入自定义 `VNode`。
