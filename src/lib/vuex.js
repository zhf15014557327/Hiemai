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
    },
    // 删除数据
  dlegoods(state,id){
    // 必须使用Vue.delete Vue才能跟踪
    Vue.delete(state.cartData,id)
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
  window.localStorage.setItem('haimaiData',JSON.stringify(store.state.cartData));
  //(1)bug在每次关闭网站的时候用户不可能每次都会正常退出,服务器端不知道用户是否退出,会一直保持登录装态,再次打开是没有登录
  // 再次询问服务器登录装态时已经登陆了,这样会泄露与用户的信息,所以每次关闭网站,自动改变登录状态为未登录设置为false同时同步通知服务器未登录
  // (2)如果设置浏览器关闭同时同步登录状态,每关闭次刷新页面都要重新登录,并没有达到效果,后来发现关闭端口服务器自动设置了登录状态,
  // 可能是服务器端应该设置了判断关闭同步登录状态
  window.sessionStorage.setItem('islogin',JSON.stringify(store.state.islogin))
  // Vue.prototype.$axios.get('site/account/logout');
  // window.sessionStorage.setItem('islogin',JSON.stringify(false));
  
}


  export default store