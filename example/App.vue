<template>
  <el-container class="container">
    <el-header>
      <h1 style="font-family: fantasy; color: #409EFF;">Element Patch</h1>
    </el-header>

    <el-container>
      <el-aside width="240px" ref="aside" :style="asideStyle">
        <elx-menu-renderer
          :router="true"
          :default-openeds="['3']"
          :default-active="currentAcitve"
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
        currentAcitve: '1',
        asideStyle: {
          position: 'absolute'
        },
        menuData: [{
          label: '开始',
          route: {path: '/start'}
        }, {
          label: '更新日志',
          route: {path: '/changelog'}
        }, {
          label: 'Components',
          subMenu: [{
            title: '元组件',
            content: [{
              label: 'TagSelect 标签选择器',
              route: {path: '/tag-select'}
            }]
          }, {
            title: '复合组件',
            content: [{
              label: 'MenuRenderer 菜单渲染器',
              route: {path: '/menu-renderer'}
            }, {
              label: 'FormRenderer 表单渲染器',
              route: {path: '/form-renderer'}
            }, {
              label: 'Table 表格',
              route: {path: '/table'}
            }, {
              label: 'TreeSelect 树选择',
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
    watch: {
      '$route.path' (val) {
        // this.currentAcitve = '2'
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
    width: 1190px;
    padding: 0;
    margin: 0 auto;
  }
  .el-main {
    margin-left: 240px;
  }
</style>
