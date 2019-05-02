// 导入vue
import Vue from 'vue'
// // 导入vuex
import Vuex from 'vuex'

Vue.use(Vuex)
// 创建一个仓库
const store = new Vuex.Store({
  // 装态(数据)
  state: {
    cartData:JSON.parse(window.localStorage.getItem('haimaiData'))||{},
    // 登录状态
    islogin:JSON.parse(window.sessionStorage.getItem('islogin')) || false,

  },
  // 方法
  mutations: {
    // 添加数据
    add2cart (state,data) {
      // 判断是否存在
     if(state.cartData[data.goodId]!=undefined){
      //  存在
      state.cartData[data.goodId]+=data.goodName;
     }else{
      //  不存在動態添加啊
      //  vue无法识别这种添加属性
      // state.cartData[data.goodId]=data.goodName;
      // 动态添加的属性没有get,set属性,vue无法跟踪实现数据绑定
      // 使用Vue.set(添加对象,键,值)这种方式添加才有get,set属性
      Vue.set(state.cartData,data.goodId,data.goodName)
     }
    },
    // 修改数据
    update(state,obj){
         state.cartData = obj
    },
    // 改变登录状态
    upLogin(state,isStatu ){
      state.islogin=isStatu
    }
  },
  // 计算属性
  getters:{
      totalname(state){
        let num=0; 
        for (const key in state.cartData) { 
               num+=state.cartData[key] 
        }
        return num;
      }
  }
})

// 实现数据常驻
// 在页面关闭时执行缓存数据onbeforeunload
window.onbeforeunload=function(){
  window.localStorage.setItem('haimaiData',JSON.stringify(store.state.cartData))
  window.sessionStorage.setItem('islogin',JSON.stringify(store.state.islogin))
  
}


  export default store