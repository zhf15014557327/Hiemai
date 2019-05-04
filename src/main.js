
// 导入vue
import Vue from 'vue'

// 导入App.vue
import App from './App.vue'

// 导入全局样式
import "./assets/css/style.css"  

// 导入过插件
import "./lib/Plugins"

// 导入过滤器
import "./lib/filter"

// 导入抽取vue-router
import router from "./lib/vue-router" 

// 导入封装的axios
import VueAxios from "./lib/vue-axios"
Vue.use(VueAxios)

// 导入仓库
import store from './lib/vuex'

Vue.config.productionTip = false

new Vue({
   // 挂载仓库
  store,
  // 挂载路由
  router,
  render: h => h(App),
}).$mount('#app')
