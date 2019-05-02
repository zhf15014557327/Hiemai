import Vue from 'vue'
// 导入router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入首页
import index from "../components/index.vue"
// 导入登录页
import login from "../components/login.vue"
// 导入结算页
import pay from "../components/pay.vue"
// 导入购物车页
import shoppingCart from "../components/shopping-cart.vue"
// 导入下订单页
import shoppingDownOrder from "../components/shopping-downOrder.vue"
// 导入定单详情页
import shoppingOrderDrtails from "../components/shopping-OrderDrtails.vue"
// 导入商品详情页
import goodsDetails from "../components/goods-details.vue"
// 导入会员中心页
import vipCenter from "../components/vipCenter.vue"
// 初始化路由
let router = new VueRouter({
  // 规则
  routes:[
    {
      path:'/',
      // 路由重定向
      redirect:'index',
    },
    // 首页
    {
      path:'/index',
      component:index,
    },
    // 商品详情
    {
      path:'/goodsDetails/:id',
      component:goodsDetails,
    },
    // 登录
    {
      path:'/login',
      component:login,
    },
    // 结算
    {
      path:'/pay',
      component:pay,
    },
    // 购物车
    {
      path:'/shoppingCart',
      component:shoppingCart,
     
    },
    // 下订单
    {
      path:'/shoppingDownOrder/:ids',
      component:shoppingDownOrder,
       // 路由元信息
       meta:{
        // 判断是否检查登录状态
      checkLogin:true
    }
    },
    // 订单详情
    {
      path:'/shoppingOrderDrtails/:orderId',
      component:shoppingOrderDrtails,
       meta:{
      checkLogin:true
    }
    },
    // 会员中心
    {
      path:'/vipCenter',
      // 携带参数跳转
      component:vipCenter,
      // 嵌套路由
      // children: [
      //   {
      //     // 当 /user/:id/profile 匹配成功，
      //     // UserProfile 会被渲染在 User 的 <router-view> 中
      //     path: 'profile',
      //     component: UserProfile
      //   },
      // ]
    },
   
  ]
});
// 导航守卫
router.beforeEach((to, from, next) => {
  next()
  // console.log(to.path  );
  // if(to.path.indexOf('shoppingDownOrder')!=-1){
    // console.log( '触发了' );
    // 查看是否登录
    // 通过路由元信息判断是否检查登录状态
    if(to.meta.checkLogin == true){
    Vue.prototype.$axios.get('site/account/islogin').then(res=>{
            // console.log( res );
        if(res.data.code === "logined"){
            next()
          }else{  
            Vue.prototype.$message({
              message: '别急先登录吧!',
              type: "warning"
           })  
          //打回登录页
          next('/login');
          }
    })
  }else{
    next()
  }
})
// 暴露出去
export default router