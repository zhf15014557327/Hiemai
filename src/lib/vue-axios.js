// 导入axios
import axios from 'axios';
// 设置基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
// 设置带上cookie
axios.defaults.withCredentials = true; //让ajax携带cookie

// 暴露出去 (Vue的插件)
export default {
    install(Vue) {
      // 4. 添加实例方法
      Vue.prototype.$axios = axios;
    }
  }




