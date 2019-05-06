<template>
  <div class="conten-downOrder">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div id="orderForm" name="orderForm" url>
              <!-- 使用饿了吗ui -->
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <!-- 用户名 -->
                <el-form-item label="用户名称" prop="accept_name">
                  <el-input class="my-input" v-model="ruleForm.accept_name"></el-input>
                </el-form-item>
                <!-- 地区 -->
                <el-form-item label="地区">
                  <v-distpicker
                    @selected="selectedAere"
                    :province="ruleForm.area.province.value"
                    :city="ruleForm.area.city.value"
                    :area="ruleForm.area.area.value"
                  ></v-distpicker>
                </el-form-item>
                <!-- 详细地址 -->
                <el-form-item label="详细地址" prop="address">
                  <el-input class="my-input" v-model="ruleForm.address"></el-input>
                </el-form-item>
                <!-- 手机号 -->
                <el-form-item label="手机号" prop="mobile">
                  <el-input class="my-input" v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <!-- 邮箱地址 -->
                <el-form-item label="邮箱地址" prop="email">
                  <el-input class="my-input" v-model="ruleForm.email"></el-input>
                </el-form-item>
                <!-- 邮编 -->
                <el-form-item label="邮编" prop="post_code">
                  <el-input class="my-input-min" v-model="ruleForm.post_code"></el-input>
                </el-form-item>

                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <el-radio v-model="ruleForm.payment_id" :label="ruleForm.payment_id">在线支付</el-radio>
                      <em>手续费：0.00元</em>
                    
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                   <el-radio v-model="ruleForm.express_id" label="1" @change="ruleForm.expressMoment=24">顺丰快递</el-radio>
                      <em>运费：24元</em>
                  </li>
                  <li>
                   <el-radio v-model="ruleForm.express_id" label="2"  @change="ruleForm.expressMoment=12">圆通快递</el-radio>
                      <em>运费：12元</em>
                  </li>
                  <li>
                   <el-radio v-model="ruleForm.express_id" label="3"  @change="ruleForm.expressMoment=8">韵达快递</el-radio>
                      <em>运费：8元</em>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="8"
                  cellspacing="0"
                  class="cart-table"
                >
                  <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="center">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="center">金额(元)</th>
                    </tr>
                    <tr v-for="(item) in goodsinof" :key="item.id">
                      <td width="100" align="center">
                        <router-link :to="'/goodsDetails/'+item.id">
                          <img :src="item.img_url" class="img">
                        </router-link>
                      </td>
                      <td align="center">
                        <router-link :to="'/goodsDetails/'+item.id">{{item.title}}</router-link>
                      </td>
                      <td align="center">
                        <span class="red">￥{{item.sell_price}}</span>
                      </td>
                      <td align="center">{{item.buycount}}</td>
                      <td align="center">
                        <span class="red">￥{{item.sell_price*item.buycount}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea name="message" v-model="ruleForm.message" class="input" style="height:35px;"></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{totalname}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label
                        id="goodsAmount"
                        class="price"
                      >{{totalprice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label id="totalAmount" class="price">{{totalprice+ruleForm.expressMoment}}</label>
                    </p>
                    <p class="btn-box">
                      <router-link class="btn button" to="/shoppingCart">返回购物车</router-link>
                    
                      <a id="btnSubmit" @click="submit('ruleForm')" class="btn submit">确认提交</a>
                    </p>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入省事联动插件
import VDistpicker from "v-distpicker";
export default {
  name: "downOrder",
  //   注册省市联动组件
  components: { VDistpicker },
  // 数据
  data() {
    //   自定义校验规则
    // 验证手机号
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的是手机号"));
        }
      }
    };
    // 验证邮箱地址
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱地址"));
      } else {
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱地址"));
        }
      }
    };
    // 验证邮邮编
    var validatePost_code = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮编"));
      } else {
        let reg = /^[1-9]\d{5}(?!\d)$/;

        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮编"));
        }
      }
    };
    return {
      // 商品id
      ids:'',
      // 选定商品数据
      goodsinof: [],
      // 总个数
      totalname: 0,
      // 总价格
      totalprice: 0,
      //   表单信息
      ruleForm: {
        //   用户名
        accept_name: "玩玩儿",
        //   收货地址
        address: "深圳市宝安区福永镇塘尾村13区5巷1号",
        // 手机号
        mobile: "18686868688",
        //邮箱地址
        email: "660306@qq.con",
        // 邮政编码
        post_code: "440306",
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
        // 支付方式
        payment_id:'6',
        // 快递方式
        express_id:'1',
        // 快递费
        expressMoment:24,
        // 备注信息
        message:"贵重物品,请打包好,尽快发货!",
      },
      //   规则
      rules: {
        //验证用户名
        accept_name: [
          { required: true, message: "请输入用户名称", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        //验证收货地址
        address: [
          { required: true, message: "请输入收货的地址", trigger: "change" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "change"
          }
        ],
        //   验证手机号
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePost_code, trigger: "change" }]
      }
    };
  },

  methods: {
    //   同步更新表单数据
    selectedAere(Area) {
      // console.log(area);在这里选完省和区都会执行不知为什么
      this.ruleForm.area = Area;
    },
    // 提交订单
    submit(formName){
      // 表单终极验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 验证通过
                  // 准备数据
                  // 商品总额
                  this.ruleForm.goodsAmount = this.totalprice;
                  // 商品id
                  this.ruleForm.goodsids = this.ids;
                  //商品id数量键值对
                  let obj={};
                  this.goodsinof.forEach(v=>{
                          obj[v.id]=v.buycount
                  })
                this.ruleForm.cargoodsobj = obj
                  // 发请求
                  this.$axios.post("site/validate/order/setorder",this.ruleForm).then(res=>{
                    // console.log( res );
                    //  判断订单提交
                    if(res.data.status == 0){
                      //  成功提示,
                          this.$notify({
                      title: '成功',
                      message: '订单提交成功',
                      type: 'success',
                      duration:2000
                    });
                    // 订单提交成功,删除vuex保存的商品信息
                  this.goodsinof.forEach(v=>{
                           this.$store.commit('dlegoods',v.id)
                  })
                    // console.log( res.data.message.orderid );
                    // 跳转支付
                      this.$router.push("/shoppingOrderDrtails/"+ res.data.message.orderid);
                    }else{
                          this.$notify({
                      title: '失败',
                      message: '订单提交失败',
                      type: 'warning',
                      duration:2000
                    });
                    }
                  })
          } else {
            // 验证未通过提示
           this.$message("表单未填写完整!");
            return false;
          }
        });
     
    }
   
   
  },

  created() {
    // 获取选中商品id
     this.ids = this.$route.params.ids;
    //  console.log( ids );

    // 请求选定商品数据
    this.$axios.get(`site/validate/order/getgoodslist/${this.ids}`).then(res => {
      // console.log(res);
      res.data.message.forEach(v => {
        v.buycount = this.$store.state.cartData[v.id];
        // 计算总个数
        this.totalname += v.buycount;
        // 计算总价格
        this.totalprice += v.buycount * v.sell_price;
      });

      this.goodsinof = res.data.message;
      // console.log( this.goodsinof );


    });
  },

};
</script>
<style lang="scss">
.conten-downOrder {
    .demo-ruleForm{
        .my-input{
            .el-input__inner{
                width: 50%;
            }
        }
        .my-input-min{
            .el-input__inner{
                width: 10%;
            }
        }
    }
}
</style>
