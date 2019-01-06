import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router-config'
import ElementUI from 'element-ui'
import ElementPatch from 'src'
import 'element-ui/lib/theme-chalk/index.css'
import DemoBlock from './demo-block.vue'
import App from './App.vue'

Vue.component('demo-block', DemoBlock)

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(ElementPatch)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router: new VueRouter(routerConfig),
  components: { App }
})
