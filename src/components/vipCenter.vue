<template>
  <div class="conten-vipCenten">
    <div class="el-row">
      <div class="el-col el-col-24">
        <div class="comp">
          <div class="tmpl routeanimate">
            <div class="section">
              <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/user/center/index.html">会员中心</a>
                <a href="/user/center/index.html">{{dftitle}}</a>
              </div>
            </div>
            <div class="section clearfix">
              <div class="left-260">
                <div class="bg-wrap">
                  <div class="avatar-box">
                    <a href="/user/center/avatar.html" class="img-box">
                      <!-- <i class="iconfont icon-user-full"> -->
                      <router-link to="/vipCenter">
                        <img src="../assets/logo.png" alt>
                      </router-link>
                      <!-- </i> -->
                    </a>
                    <h3>玩玩儿</h3>
                    <p>
                      <b>注册会员</b>
                    </p>
                  </div>
                  <div class="center-nav">
                    <ul>
                      <li>
                        <h2>
                          <i class="iconfont icon-order"></i>
                          <span>订单管理</span>
                        </h2>
                        <div class="list">
                          <p>
                            <router-link to="/vipCenter/vipOrderList">
                              <i class="iconfont icon-arrow-right"></i>交易订单
                            </router-link>
                            <!-- <a href="#/site/member/orderlist" class=""> -->
                            <!-- </a> -->
                          </p>
                        </div>
                      </li>
                      <li>
                        <h2>
                          <i class="iconfont icon-user"></i>
                          <span>账户管理</span>
                        </h2>
                        <div class="list">
                          <p>
                            <a href="#/site/member/center" class="router-link-exact-active">
                              <i class="iconfont icon-arrow-right"></i>账户资料
                            </a>
                          </p>
                          <p>
                            <a href="#/site/member/center" class="router-link-exact-active">
                              <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置
                            </a>
                          </p>
                          <p>
                            <a href="#/site/member/center" class="router-link-exact-active">
                              <i class="iconfont icon-arrow-right"></i>修改密码
                            </a>
                          </p>
                          <p>
                            <a href="javascript:void(0)" @click="OutLogin">
                              <i class="iconfont icon-arrow-right"></i>退出登录
                            </a>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="right-auto">
                <!-- 路由出口 -->
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vipCerten",
  data() {
    return {
      // 用户名
      userName: "",

      dftitle: ""
    };
  },
  created() {
    // console.log(this.$route);
    this.dftitle = this.$route.meta.dftitle;
  },
  watch: {
    $route(val, odlval) {
      this.dftitle = this.$route.meta.dftitle;
    }
  },
  methods: {
    //  登出事件
    OutLogin() {
      this.$confirm("真的要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
<style lang="scss">
.conten-vipCenten {
  .avatar-box {
    height: 80px;
  }
}
</style>

