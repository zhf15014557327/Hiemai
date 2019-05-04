// 导入vue
import Vue from 'vue'
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