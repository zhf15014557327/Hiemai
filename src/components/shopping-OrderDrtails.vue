<template>
  <div class="conten-OrderDetails">
    <div>
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
            <div class="form-box payment">
              <div class="el-row">
                <div class="el-col el-col-18">
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>订 单 号：</dt>
                        <dd>{{orderidList.order_no}}</dd>
                      </dl>
                    </div>
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>收货人姓名：</dt>
                        <dd>{{orderidList.accept_name}}</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>送货地址：</dt>
                        <dd>{{orderidList.address}}</dd>
                      </dl>
                    </div>
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>手机号码：</dt>
                        <dd>{{orderidList.mobile}}</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>支付金额：</dt>
                        <dd>{{orderidList.order_amount}} 元</dd>
                      </dl>
                    </div>
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>支付方式：</dt>
                        <dd>在线支付</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                        <dd>{{orderidList.message}}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="el-col el-col-6">
                  <div id="container2">
                    <qrcode
                      :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderid"
                      :options="{ width: 300 }"
                    ></qrcode>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
// 注册全局组件
// Vue.component(VueQrcode.name, VueQrcode);
export default {
  name: "OrderDetails",
  // 注册局部组件
  components: {
    [VueQrcode.name]: VueQrcode
  },
  data() {
    return {
      orderid: "",
      // 订单详情
      orderidList: {},
      // 定时器id
      intimId: 0
    };
  },
  created() {
    // console.log( this.$route );
    this.orderid = this.$route.params.orderId;
    this.$axios
      .get(`site/validate/order/getorder/${this.orderid}`)
      .then(res => {
        // console.log( res );
        // 订单详情
        this.orderidList = res.data.message[0];
        // console.log(  this.orderidList );
      });
    // ajax轮寻
    this.intimId = setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/${this.orderid}`)
        .then(res => {
          //  判断付款是否成功
          if (res.data.message[0].status === 2) {
            //   成功提示
            this.$message({
              message: "付款成功,请记得收快递哦!!!",
              type: "success"
            });
            // 跳转到支付成功页面
            this.$router.push("/pay");
          }
        });
    }, 2000);
  },
  // 准备销毁
  destroyed() {
    // 清除定时器
    clearInterval(this.intimId);
  }
};
</script>
<style lang="scss">
</style>
