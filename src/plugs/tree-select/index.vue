<template>
  <el-dropdown class="elx-tree-select" trigger="click" ref="dropdown">
    <div class="input-wrapper">
      <div v-if="multiple" class="multi-result" ref="multiResult">
        <transition-group @after-leave="resetInputHeight">
          <el-tag
            v-for="item in value"
            :key="item.value"
            type="info"
            closable
            size="mini"
            @close="removeItem(item)">
            {{item.label}}
          </el-tag>
        </transition-group>
      </div>

      <input
        ref="input"
        class="el-input__inner"
        :value="!multiple ? currentItem.label : ''"
        :placeholder="!value || !value.length ? '请选择' : ''"
        tabindex="-1"
        readonly>
      <i class="el-icon-arrow-down el-icon--right drop-icon"></i>
    </div>

    <el-dropdown-menu slot="dropdown" ref="dropdownMenu">
      <el-tree
        ref="tree"
        :data="data"
        node-key="value"
        :style="`padding: 0 15px; box-sizing: border-box; min-width: ${minWidth};`"
        :empty-text="emptyText"
        :expand-on-click-node="false"
        :current-node-key="!multiple ? value : ''"
        :show-checkbox="multiple"
        :highlight-current="!multiple"
        :default-expand-all="defaultExpandAll"
        :default-checked-keys="defaultChecked"
        @current-change="currentChange"
        @check="onCheck">
      </el-tree>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import ElTree from 'element-ui/lib/tree'
  import ElTag from 'element-ui/lib/tag'
  import ElDropdown from 'element-ui/lib/dropdown'
  import ElDropdownMenu from 'element-ui/lib/dropdown-menu'
  import './index.scss'

  export default {
    name: 'ElxTreeSelect',
    components: {
      ElTree,
      ElTag,
      ElDropdown,
      ElDropdownMenu
    },
    props: {
      value: {},
      data: {
        type: Array,
        default: () => []
      },
      emptyText: {
        type: String,
        default: '无数据'
      },
      // 是否多选, 默认单选
      multiple: {
        type: Boolean,
        default: false
      },
      // 默认展开所有
      defaultExpandAll: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // 树选择列表宽度
        minWidth: '',
        // 单选时当前选中对象
        currentItem: {},
        // 多选时默认选中的keys
        defaultChecked: []
      }
    },
    created () {
      if (this.multiple) {
        this.defaultChecked = this.value.map(item => item.value)
      } else {
        this.currentItem = this.getCurrentItem(this.data, this.value)
      }
    },
    mounted () {
      this.minWidth = getComputedStyle(this.$refs.input).width
    },
    methods: {
      // 在data中找到当前项
      getCurrentItem (data, value) {
        let arr = [...data]
        while (arr.length) {
          const item = arr.shift()
          if (item.value === value) return item
          if (item.children) {
            arr = arr.concat([...item.children])
          }
        }
      },
      // 多选时根据keys列表，得到完整对象数组
      getMultiResult (checkedKeys, data = this.data) {
        return data.reduce((acc, cur) => {
          if (checkedKeys.includes(cur.value)) {
            acc.push({
              label: cur.label,
              value: cur.value
            })
          } else if (cur.children) {
            acc = acc.concat(this.getMultiResult(checkedKeys, cur.children))
          }
          return acc
        }, [])
      },
      // 多选选中
      onCheck (item, result) {
        if (!this.multiple) return
        const value = this.getMultiResult(result.checkedKeys)
        this.$emit('input', value)
      },
      // 单选选中
      currentChange (item, node) {
        if (this.multiple) return
        this.currentItem = item
        // close dropdown
        this.$refs.dropdown.hide()
        this.$emit('input', item.value)
      },
      // 移除已选的多选项
      removeItem (item) {
        const value = [...this.value]
        value.splice(value.indexOf(item), 1)
        const keys = value.map(item => item.value)
        // update tree value
        this.$refs.tree.setCheckedKeys(keys)
        this.$emit('input', value)
      },
      // 重置输入框高度及下拉框位置
      //    多选操作tags数控制
      resetInputHeight () {
        const height = this.$refs.multiResult.clientHeight
        const newHeight = Math.max(40, height + 10)
        this.$refs.input.style.height = newHeight + 'px'
        this.$refs.dropdownMenu.updatePopper()
      }
    },
    watch: {
      value () {
        if (this.multiple) {
          this.$nextTick(() => {
            this.resetInputHeight()
          })
        }
      }
    }
  }
</script>
