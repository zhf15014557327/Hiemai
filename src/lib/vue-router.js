import Vue from 'vue'
// 导入router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// // 导入首页
// import index from "../components/index.vue"
// // 导入登录页
// import login from "../components/login.vue"
// // 导入结算页
// import pay from "../components/pay.vue"
// // 导入购物车页
// import shoppingCart from "../components/shopping-cart.vue"
// // 导入下订单页
// import shoppingDownOrder from "../components/shopping-downOrder.vue"
// // 导入定单详情页
// import shoppingOrderDrtails from "../components/shopping-OrderDrtails.vue"
// // 导入商品详情页
// import goodsDetails from "../components/goods-details.vue"
// // 导入会员中心页
// import vipCenter from "../components/vipCenter.vue"
// // 中心首页
// import vipCertenIndex from "../components/vipcenter-children/vipCerten-index.vue"
// // 订单列表
// import vipOrderList from "../components/vipcenter-children/vip-orderList.vue"
// // 订单详情
// import vipOrderDetails from "../components/vipcenter-children/vip-orderDetails.vue"


// 路由懒加载   const Foo = () => import('./Foo.vue')
// 导入首页
const index = () =>import("../components/index.vue")
// 导入登录页
const login = () =>import("../components/login.vue")
// 导入结算页
const pay = () =>import("../components/pay.vue")
// 导入购物车页
const shoppingCart = () =>import("../components/shopping-cart.vue")
// 导入下订单页
const shoppingDownOrder = () =>import("../components/shopping-downOrder.vue")
// 导入定单详情页
const shoppingOrderDrtails = () =>import("../components/shopping-OrderDrtails.vue")
// 导入商品详情页
const goodsDetails = () =>import("../components/goods-details.vue")
// 导入会员中心页
const vipCenter = () =>import("../components/vipCenter.vue")
// 中心首页
const vipCertenIndex = () =>import("../components/vipcenter-children/vipCerten-index.vue"
)// 订单列表
const vipOrderList = () =>import("../components/vipcenter-children/vip-orderList.vue")
// 订单详情
const vipOrderDetails = () =>import("../components/vipcenter-children/vip-orderDetails.vue")
// 初始化路由
let router = new VueRouter({
     // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
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
      meta:{
        // 判断是否检查登录状态
      checkLogin:true
    }

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
      meta:{
        checkLogin:true
      },
      // 嵌套路由
      children: [
        {
            //重定向
            path:'',
            redirect:'vipCertenIndex',
            meta:{
              checkLogin:true
            }
        },
        {
            // 首页
            path:'vipCertenIndex',
            component:vipCertenIndex,
            meta:{
              dftitle:"中心首页",
              checkLogin:true
            }
        },
        {
            // 订单列表
            path:'vipOrderList',
            component:vipOrderList,
            meta:{
              dftitle:"订单列表"
            }
            
        },
        {
            //订单详情
            path:'vipOrderDetails/:orderId',
            component:vipOrderDetails,
            meta:{
              dftitle:"订单详情"
            }
        },
      ]
    },
  ],
 
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