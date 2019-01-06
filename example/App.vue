<template>
  <el-container class="container">
    <el-header>
      <h1>Element Patch</h1>
    </el-header>

    <el-container>
      <el-aside width="200px" ref="aside" :style="asideStyle">
        <elx-menu-renderer
          :router="true"
          :default-openeds="['2']"
          default-active="1"
          :content="menuData">
        </elx-menu-renderer>
      </el-aside>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        asideStyle: {
          position: 'absolute'
        },
        menuData: [{
          label: '开始',
          route: {path: '/start'}
        }, {
          label: 'Components',
          subMenu: [{
            title: '元组件',
            content: [{
              label: '标签选择器',
              route: {path: '/tag-select'}
            }]
          }, {
            title: '复合组件',
            content: [{
              label: '菜单渲染器',
              route: {path: '/menu-renderer'}
            }, {
              label: '表单渲染器',
              route: {path: '/form-renderer'}
            }, {
              label: '表格',
              route: {path: '/table'}
            }, {
              label: '树选择',
              route: {path: '/tree-select'}
            }]
          }]
        }]
      }
    },
    methods: {
      onScroll (e) {
        this.asideStyle = window.scrollY > 60
          ? {
            position: 'fixed',
            top: '0'
          } : {
            position: 'absolute'
          }
      }
    },
    created () {
      window.addEventListener('scroll', this.onScroll)
    },
    beforeDestory () {
      window.removeEventListener('scroll', this.onScroll)
    }
  }
</script>

<style scoped>
  .container {
    width: 1140px;
    padding: 0;
    margin: 0 auto;
  }
  .el-main {
    margin-left: 200px;
  }
</style>
