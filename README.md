# element-patch

An [element-ui](https://github.com/ElemeFE/element) based extension package. We extend some components, such as Table, Menu, Form, etc., to enrich their features and functions, such as dynamically rendered forms and menus, draggable tables, and more. At the same time, we have added some common components and scenarios, such as tree selectors, to provide a fast solution.

From `el-form-renderer` to `element-patch`, `el-form-renderer` has become a historically independent [branch](https://github.com/leezng/element-patch/tree/el-form-renderer) that will no longer be maintained separately, and subsequent `element-patch` will provide an on-demand installation.

## Links

- [Docs](https://leezng.github.io/element-patch/)
- [中文介绍](./README.zh-CN.md)

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

- Dynamically rendered Form
- Dynamically rendered Menus
- Draggable Table
- Table supporting pagination
- Menu that supports permission control
- Tree selector
- Tag selector
...

