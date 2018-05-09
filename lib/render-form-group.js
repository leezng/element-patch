import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import ElFormItemRenderer from './render-form-item';

export default {
  components: {
    ElFormItemRenderer: ElFormItemRenderer
  },
  props: {
    data: Object,
    itemValue: {},
    value: Object,
    disabled: Boolean
  },
  render: function render(h) {
    var _this = this;

    return h('div', {}, this.data.$items.map(function (item, index) {
      var itemValue = _this.itemValue || {};
      return h('el-form-item-renderer', {
        props: {
          key: index,
          data: item,
          value: _this.value,
          itemValue: itemValue[item.$id],
          disabled: _this.disabled
        },
        on: {
          updateValue: function updateValue(_ref) {
            var id = _ref.id,
                value = _ref.value;

            var val = _Object$assign({}, itemValue, _defineProperty({}, id, value));
            _this.$emit('updateValue', {
              id: _this.data.$id,
              value: val
            });
          }
        }
      });
    }));
  }
};