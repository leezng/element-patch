import Menu from 'element-ui/lib/menu'

export default {
  name: 'ElxMenuRenderer',
  props: {
    ...Menu.props,
    // 无权限时菜单的展现形式: hidden|disabled
    noAuthStyle: {
      type: String,
      default: 'hidden'
    },
    // 当前权限
    auth: {
      type: String,
      default: ''
    },
    // 菜单数据
    content: {
      type: Array,
      default: () => []
    }
  },
  render (h) {
    return this.renderMenu(h, 'el-menu', this.content, {
      props: this._props,
      ref: 'elxMenu',
      // 事件监听向上传递
      on: ['select', 'open', 'close'].reduce((result, name) => {
        result[name] = (...args) => this.$emit(name, ...args)
        return result
      }, {})
    })
  },
  mounted () {
    this.$nextTick(() => {
      // proxy
      Object.keys(Menu.methods).forEach((item) => {
        this[item] = this.$refs.elxMenu[item]
      })
    })
  },
  methods: {
    renderMenuItem (h, item, id) {
      const props = {
        ...item,
        index: item.value || id
      }
      return h('el-menu-item', {
        props
      }, item.label)
    },

    renderMenuItemGroup (h, item, id) {
      const options = {
        props: {
          title: item.title
        }
      }
      return this.renderMenu(h, 'el-menu-item-group', item.content, options, id)
    },

    renderSubMenu (h, item, id) {
      const title = h('template', { slot: 'title' }, item.label)
      const options = {
        props: {
          ...item,
          index: item.value || id
        }
      }
      return this.renderMenu(h, 'el-submenu', item.subMenu, options, id, title)
    },

    /**
     * 渲染主函数
     * @param  {String} tag      标签名
     * @param  {Array} menuData  数组数据
     * @param  {Object} options  render-options参数
     * @param  {String|Number} id
     * @param  {VNode} before    数组数据之前插入
     * @param  {VNode} after     数组数据之后插入
     */
    renderMenu (h, tag, menuData, options = {}, id = null, before = null, after = null) {
      return h(
        tag, options, [
          before,
          ...menuData.reduce((acc, itm, idx) => {
            const item = {...itm}
            // 无权限
            if (Array.isArray(item.auth) && !item.auth.includes(this.auth)) {
              if (this.noAuthStyle === 'disabled') {
                item.disabled = true
              } else {
                // 默认hidden
                return acc
              }
            }

            const newId = id ? `${id}-${idx + 1}` : `${idx + 1}`
            // 优先级定义: subMenu > content
            if (item.subMenu) {
              acc.push(this.renderSubMenu(h, item, newId))
            } else if (item.content) {
              acc.push(this.renderMenuItemGroup(h, item, newId))
            } else {
              acc.push(this.renderMenuItem(h, item, newId))
            }
            return acc
          }, []),
          after
        ]
      )
    }
  }
}
