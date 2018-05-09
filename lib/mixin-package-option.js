import _Object$assign from 'babel-runtime/core-js/object/assign';
/**
 * 扩展表单组件的 option 属性
 */
function controller(h, tag, props) {
  return h(tag, {
    props: props
  });
}

function controllerVariation(h, tag, props) {
  return h(tag, {
    props: _Object$assign({}, props, {
      key: props.value || props.label,
      label: props.value || props.label
    })
  }, props.label);
}

export default {
  methods: {
    select_opt: function select_opt(item) {
      return controller(this.$createElement, 'el-option', item);
    },
    radioGroup_opt: function radioGroup_opt(item) {
      return controllerVariation(this.$createElement, 'el-radio', item);
    },
    radioButton_opt: function radioButton_opt(item) {
      return controllerVariation(this.$createElement, 'el-radio-button', item);
    },
    checkboxGroup_opt: function checkboxGroup_opt(item) {
      return controllerVariation(this.$createElement, 'el-checkbox', item);
    },
    checkboxButton_opt: function checkboxButton_opt(item) {
      return controllerVariation(this.$createElement, 'el-checkbox-button', item);
    }
  }
};