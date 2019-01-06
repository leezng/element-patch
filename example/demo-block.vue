<template>
  <div class="docs-demo-wrapper">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="title">
      <slot name="title"></slot>
      <el-tooltip class="item" effect="dark" :content="isExpand ? '隐藏代码' : '显示代码'" placement="top">
        <i class="el-icon-more docs-demo-controller" @click="toggle"></i>
      </el-tooltip>
    </div>
    <div v-show="isExpand" class="demo-container">
      <div class="docs-demo-code">
        <slot name="highlight"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isExpand: false
      }
    },
    methods: {
      toggle () {
        this.isExpand = !this.isExpand
      }
    }
  }
</script>

<style lang="scss">
  .docs-demo-wrapper {
    margin: 20px 0;
    border: 1px solid #e6e6e6;
    .title,
    .source,
    .demo-container {
      position: relative;
      padding: 15px;
    }
    .title > *:first-child {
      font-weight: 500;
    }
    .source {
      border-bottom: 1px solid #e9e9e9;
    }
    .docs-demo-code {
      width: 100%;
      font-size: 14px;
      background-color: #F7F7F7;
      padding: 15px;
      pre {
        display: block;
      }
      code,
      pre {
        line-height: 18px;
        border: none;
        margin: 0;
        padding: 0;
        background: none;
        font-family: Consolas, Menlo, Courier, monospace;
      }
    }
    .docs-demo-controller {
      position: absolute;
      top: 20px;
      right: 15px;
      cursor: pointer;
    }
  }
</style>
