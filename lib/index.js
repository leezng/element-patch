import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import RenderFormItem from './render-form-item';
import RenderFormGroup from './render-form-group';
import { Form } from 'element-ui';

export default {
  render: function render(h) {
    var _this = this;

    return h('el-form', {
      props: _Object$assign({}, this._props, {
        model: this.value // 用于校验
      }),
      ref: 'elForm'
    }, this.content.map(function (item, index) {
      // handle default value
      if (item.$id && _this.value[item.$id] === undefined && item.$default !== undefined) {
        _this.updateValue({ id: item.$id, value: item.$default });
      }
      var data = {
        props: {
          key: index,
          data: item,
          value: _this.value,
          itemValue: _this.value[item.$id],
          disabled: _this.disabled
        },
        on: {
          updateValue: _this.updateValue
        }
      };
      if (item.$type === 'group') return h('render-form-group', data);else return h('render-form-item', data);
    }).concat(this.$slots.default));
  },

  components: {
    RenderFormItem: RenderFormItem,
    RenderFormGroup: RenderFormGroup
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _Object$keys(Form.methods).forEach(function (item) {
        _this2[item] = _this2.$refs.elForm[item];
      });
    });
  },

  props: _Object$assign({}, Form.props, {
    content: {
      type: Array,
      required: true
    },
    // 禁用所有表单
    disabled: {
      type: Boolean,
      default: false
    }
  }),
  data: function data() {
    return {
      value: {} // 表单数据对象
    };
  },

  methods: {
    /**
     * 更新表单数据
     * @param  {String} options.id 表单ID
     * @param  {All} options.value 表单数据
     */
    updateValue: function updateValue(_ref) {
      var id = _ref.id,
          value = _ref.value;

      this.value = _Object$assign({}, this.value, _defineProperty({}, id, value));
    },

    // 对外提供获取表单数据的函数
    getFormValue: function getFormValue() {
      return this.value;
    }
  }
};