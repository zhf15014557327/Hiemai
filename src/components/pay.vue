<template>
  <div class="conten-pay">
    <div class="center">
      <div class="el-row">
        <div class="el-col el-col-24">
          <div class="comp">
            <div class="goodsinfo routeanimate">
              <div class="section">
                <div class="location">
                  <span>当前位置：</span>
                  <a href="/index.html">首页</a> &gt;
                  <a href="javascript:;">支付中心</a>
                </div>
              </div>
              <div class="section">
                <div class="wrapper">
                  <div class="bg-wrap">
                    <div class="nav-tit pay">
                      <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="msg-tips">
                      <div class="icon">
                        <i class="iconfont icon-check"></i>
                      </div>
                      <div class="info">
                        <strong>订单已支付成功！</strong>
                        <p>
                          <span class="jishi">{{this.num}}s后</span>进入购物车
                          您可以点击这里进入
                          <router-link to="/vipCenter" class="vip">会员中心</router-link>
                         查看订单状态！
                        </p>
                        <p>如有其它问题，请立即与我们客服人员联系。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template><script>
export default {
  name: "pay",
  data(){
      return{
        // 倒计时
        num:10,
        // 定时器id
      intim:0
      }
  },
  created() {
    this.intim = setInterval(() => {
        this.num--;
        if(this.num === 0){
          // 时间等于0时跳转
          this.$router.push('/index')
        }
      }, 1000);
  },
     // 准备销毁
    destroyed(){
        // 清除定时器
        clearInterval(this.intim);
    }
};
</script>
<style lang="scss">
.conten-pay{
  .jishi{
    font-size: 28px;
    color: red;
  }
  .vip{
    background-color: green;
  }
}
</style>
