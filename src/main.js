
// 导入vue
import Vue from 'vue'
// 导入App.vue
import App from './App.vue'
// 导入样式
import "./assets/css/style.css"  

// 导入饿了吗ui插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 导入iview插件
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

// 导入放大镜組建
import ProductZoomer from 'vue-product-zoomer'

Vue.use(ProductZoomer)

// 导入 moment.js
import moment from "moment";
// 抽取过滤器为全局过滤器
Vue.filter('shortTime', function (value) {
  return moment(value).format("YYYY-MM-DD👍");
})
// 过滤器 2
Vue.filter('shortTimes', function (value) {
  return moment(value).format("YYYY/MM/DD T HH:mm:ss");
})

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
//   // vue实例化前判断是否登录
//  async beforeCreate(){
//     let res = await this.$axios.get('site/account/islogin');
//     console.log( res );
//     if(res.data.code === "logined"){
//     //   // 提交载荷保存登录状态
//     this.$store.commit('upLogin',true)
//     }else{
//        this.$store.commit('upLogin',false)
//     }
//   },
  render: h => h(App),
}).$mount('#app')
