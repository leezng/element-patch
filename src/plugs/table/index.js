import Table from 'element-ui/lib/table'
import { addClass, removeClass } from 'src/utils/dom'
import './index.scss'

function ElxTable (WrappedComponent) {
  return {
    name: 'ElxTable',
    props: {
      ...WrappedComponent.props,
      // 拖拽开关
      draggable: {
        type: Boolean,
        default: false
      },
      // 是否需要分页
      showPagination: {
        type: Boolean,
        default: false
      },
      // 分页参数, 来自el-pagination
      pagination: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        // 拖拽相关参数
        dragInfo: {
          // 起始索引
          start: 0,
          end: 0,
          // 所有可拖拽的tr列表
          trList: [],
          // dom元素: tbody
          tbody: ''
        },
        // 分页默认值
        defaultPagination: {
          layout: 'total, sizes, ->, prev, pager, next, jumper',
          pageSize: 10,
          currentPage: 1
        },
        // 分页相关参数是否被分页器更新
        updatedPagination: {}
      }
    },
    mounted () {
      this.$nextTick(() => {
        // proxy
        Object.keys(Table.methods).forEach((item) => {
          this[item] = this.$refs.elxTable[item]
        })
        // set draggable
        if (this.draggable) {
          this.setDraggable()
        }
      })
    },
    destroyed () {
      // remove draggable listener
      if (this.draggable) {
        this.tbody.removeEventListener('dragstart', this.onDragStart)
        this.tbody.removeEventListener('dragenter', this.onDragEnter)
        this.tbody.removeEventListener('dragover', this.onDragOver)
        this.tbody.removeEventListener('dragleave', this.onDragLeave)
        this.tbody.removeEventListener('drop', this.onDrop)
      }
    },
    computed: {
      // 所有数据
      tableData: {
        get () {
          return this.data
        },
        set (val) {
          this.$emit('update:data', val)
        }
      },
      // 具有传递值与默认值的分页参数
      basePagination () {
        return {
          ...this.defaultPagination,
          ...this.pagination,
          ...this.updatedPagination
        }
      },
      // 当前页的数据
      currentTableData () {
        if (!this.showPagination) return this.tableData
        const { pageSize, currentPage } = this.basePagination
        const start = (currentPage - 1) * pageSize
        const end = currentPage * pageSize
        return this.tableData.slice(start, end)
      }
    },
    methods: {
      // 拖拽初始化
      setDraggable () {
        const table = this.$refs.elxTable.$el
        this.tbody = table.querySelector('.el-table__body tbody')
        this.trList = Array.from(this.tbody.querySelectorAll('tr'))
          .map(item => {
            item.draggable = true
            return item
          })

        this.tbody.addEventListener('dragstart', this.onDragStart)
        this.tbody.addEventListener('dragenter', this.onDragEnter)
        this.tbody.addEventListener('dragover', this.onDragOver)
        this.tbody.addEventListener('dragleave', this.onDragLeave)
        this.tbody.addEventListener('drop', this.onDrop)
      },
      onDragStart (e) {
        this.dragInfo.start = this.trList.indexOf(e.target)
      },
      onDragEnter (e) {
        e.preventDefault()
        let el = e.target
        while (!el.draggable) {
          el = el.parentNode
          if (el === this.tbody) return
        }
        if (el === this._currentTr) return

        // 缓存当前tr
        this._currentTr = el
        const targetIndex = this.trList.indexOf(el)
        if (this.dragInfo.start < targetIndex) {
          addClass(el, 'after-dom')
        } else if (this.dragInfo.start > targetIndex) {
          addClass(el, 'before-dom')
        }
      },
      onDragOver (e) {
        e.preventDefault()
      },
      onDragLeave (e) {
        let el = e.target
        while (!el.draggable) {
          el = el.parentNode
          if (el === this.tbody) return
        }
        if (el === this._currentTr) return

        removeClass(el, 'before-dom after-dom')
      },
      onDrop (e) {
        e.preventDefault()
        let el = this._currentTr || e.target
        while (el.tagName !== 'TR') {
          el = el.parentNode
          if (el === this.tbody) return
        }

        removeClass(el, 'before-dom after-dom')
        this.dragInfo.end = this.trList.indexOf(el)
        const { start, end } = this.dragInfo
        this.tableData.splice(end, 0, ...this.tableData.splice(start, 1))
      },
      renderTable (h) {
        const slots = Object.keys(this.$slots)
          .reduce((result, name) => result.concat(this.$slots[name]), [])
          .map(vnode => {
            vnode.context = this._self
            return vnode
          })

        return h(WrappedComponent, {
          ref: 'elxTable',
          props: {
            ...this.$props,
            data: this.currentTableData
          },
          on: this.$listeners,
          scopedSlots: this.$scopedSlots,
          attrs: this.$attrs
        }, slots)
      },
      renderPagination (h) {
        // 分页相关事件监听在原有基础上添加pagination-前缀
        const on = ['size-change', 'current-change', 'prev-click', 'next-click'].reduce((result, key) => {
          const listener = this.$listeners[`pagination-${key}`]
          if (listener) result[key] = listener
          return result
        }, {
          // page-size.sync
          'update:pageSize': val => {
            val !== this.basePagination.pageSize && (this.updatedPagination = {
              ...this.updatedPagination,
              pageSize: val
            })
          },
          // current-page.sync
          'update:currentPage': val => {
            val !== this.basePagination.currentPage && (this.updatedPagination = {
              ...this.updatedPagination,
              currentPage: val
            })
          }
        })

        return h('el-pagination', {
          props: this.basePagination,
          on
        })
      }
    },
    render (h) {
      return h('div', {
        'class': 'elx-table'
      }, [
        this.renderTable(h),
        this.showPagination && this.renderPagination(h)
      ])
    }
  }
}

export default ElxTable(Table)
