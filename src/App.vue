<template>
  <div id="app">
    <div class="header">
      <!-- 1.0 导航栏头部 -->
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>黑马买买买</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <span v-show="$store.state.islogin == false">
              <router-link to="/login">登录</router-link>
              <strong>|</strong>
              <a href class>注册</a>
              <strong>|</strong>
            </span>
            <span v-show="$store.state.islogin == true">
              <router-link to="/vipCenter">会员中心</router-link>
              <strong>|</strong>
              <a @click="OutLogin">退出</a>
              <strong>|</strong>
            </span>
            <router-link to="/shoppingCart">
              <i class="iconfont icon-cart"></i>购物车(
              <span id="shoppingCartCount">
                <span>{{$store.getters.totalname}}</span>
              </span>)
            </router-link>
          </div>
        </div>
      </div>

      <!-- 2.0 导航条 -->
      <div class="head-nav">
        <div class="section">
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="#" class>
                  <span class="out" style="top: 0px;">首页</span>
                </a>
              </li>
              <li class="news">
                <a href="#" class>
                  <span class="out" style="top: 0px;">每日精选</span>
                </a>
              </li>
              <li class="photo">
                <a href="#" class>
                  <span class="out" style="top: 0px;">秒杀专区</span>
                </a>
              </li>
              <li class="video">
                <a href="#" class>
                  <span class="out" style="top: 0px;">黑马超市</span>
                </a>
              </li>
              <li class="down">
                <!-- <a href="#" class=""> -->
                <router-link to="/vipCenter">
                  <span class="out" style="top: 0px;">会员权益</span>
                </router-link>

                <!-- </a> -->
              </li>
              <li class="goods">
                <a href class="router-link-exact-active">
                  <span class="out" style="top: 0px;">购物商城</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input
                id="keywords"
                name="keywords"
                type="text"
                onkeydown="if(event.keyCode==13){};"
                placeholder="输入关健字"
                x-webkit-speech
              >
            </div>
            <a href="javascript:;">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <div class="section">
        <div class="foot-nav">
          <a href>关于我们</a>
          <strong>|</strong>
          <a href>联系我们</a>
          <strong>|</strong>
          <a href>联系客服</a>
          <strong>|</strong>
          <a href>合作招商</a>
          <strong>|</strong>
          <a href>商家帮助</a>
          <strong>|</strong>
          <a href>营销中心</a>
          <strong>|</strong>
          <a href>隐私政策</a>
        </div>
        <div class="foot-box">
          <div class="copyright">
            <p>版权所有 黑马买买买</p>
            <p>公司地址： 联系电话：</p>
            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
          </div>
          <div class="service">
            <p>周一至周日 9:00-24:00</p>
            <a href="#">
              <i class="iconfont icon-phone"></i>在线客服
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  //   方法
  methods: {
    //  登出事件
    OutLogin() {
      this.$axios.get("site/account/logout").then(res => {
        //  console.log( res );
        if (res.data.status == 0) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          //  提交载荷记录登陆状态
          this.$store.commit("upLogin", false);
          //   登出成功打回登录页
          this.$router.push("/login");
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
#app {
  // 去掉表单默认样式
  .login-box .input-box input {
    outline: none;
    margin-top: 6px;
  }
}
</style>
