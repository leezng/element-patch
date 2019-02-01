## 开始

基于 vue, [element-ui](https://github.com/ElemeFE/element) 的扩展包。我们对一些组件，例如 Table, Menu, Form 等进行扩展，丰富其特性与功能，同时增加了一些常用组件与场景，便于进行快速的方案构建。

### 安装

```html
// Make sure you have properly installed element-ui and used it correctly.
yarn add element-patch
or
npm i element-patch -S
```

### 完整引入

```html
import Vue from 'vue';
import ElementUI from 'element-ui';
import ElementPatch from 'element-patch';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-patch/index.css';
import App from './App.vue';

Vue.use(ElementUI);
Vue.use(ElementPatch);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### 按需引入

```html
import ElxTable from 'element-patch/lib/table';
import ElxFormRenderer from 'element-patch/lib/form-renderer';

export default {
    components: {
        ElxTable,
        ElxFormRenderer
    }
}
```
