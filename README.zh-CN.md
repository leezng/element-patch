# element-patch

基于 [element-ui](https://github.com/ElemeFE/element) 的扩展包。我们对一些组件，例如 Table, Menu, Form 等进行扩展，丰富其特性与功能，例如动态渲染的表单与菜单，可拖拽的表格等。同时增加了一些常用组件与场景，例如树型选择器等，致力于提供一套快速的解决方案。

从 `el-form-renderer` 升级到 `element-patch`，`el-form-renderer` 已成为一个历史[独立分支](https://github.com/leezng/element-patch/tree/el-form-renderer)，将不再进行单独维护，后续 `element-patch` 将提供按需加载方式。

## Links

- [文档与例子](https://leezng.github.io/element-patch/)
- [Introduce](./README.md)

## Quick start

```html
// Step1: Install
// Make sure you have properly installed element-ui and used it correctly.
yarn add element-patch

// Step2
import ElementPatch from 'element-patch'
import 'element-patch/index.css'

Vue.use(ElementPatch)
```

## Features

- 通过动态数据渲染的表单
- 可拖拽的表格
- 集成分页功能的表格
- 通过动态数据渲染的菜单
- 支持权限控制的菜单
- 树型选择器
- 标签选择器
...

