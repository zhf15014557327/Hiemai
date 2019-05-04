<template>
  <div class="conten-cart">
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
                <li>
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
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-show="goodsList.length==0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-show="goodsList.length!=0" v-for="(item) in goodsList" :key="item.id">
                  <td width="80" align="center">
                    <!-- 开关 -->
                    <el-switch
                      v-model="item.isStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    ></el-switch>
                  </td>
                  <td align="center" colspan="2">
                    <img :src="item.img_url" alt>
                    <p>{{item.title}}</p>
                  </td>
                  <td width="84" align="center">¥{{item.sell_price}}</td>
                  <td width="104" align="center">x{{item.buycount}}</td>
                  <td width="104" align="center">¥{{item.sell_price*item.buycount}}</td>
                  <td width="200" align="center">
                    <el-input-number size="mini" v-model="item.buycount"></el-input-number>
                    <el-button type="danger" icon="el-icon-delete" circle @click="dlt(index)"></el-button>
                  </td>
                </tr>
                <tr>
                  <th  align="center" >
                    
                     <el-switch
                      v-model="CheckAll"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    ></el-switch>
                  </th>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{totalName}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{totalprc}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <!-- 携带ids跳转 -->
              <button class="submit" @click="getdowOrder" >立即结算</button>
             
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cart",
  data() {
    return {
      // 购物车商品详细信息
      goodsList: [],
   
        };
    },

    // 使用导航守卫代替
    // beforeCreate() {
    //     // 判断是否登录没登录打回登录页
    //     this.$axios.get("site/account/islogin").then(res=>{
    //             // console.log(res  );
    //             if(res.data.code=="nologin"){
    //                     this.$message({
    //                     message: "请先登录",
    //                     type: "warning"
    //         });
    //         // 打回登录页
    //         this.$router.push('/login');
    //             }
    //     })
    // },
    //   方法
    methods: {
        // 删除商品  
        dlt(index){
           this.$confirm("此操作将删除该商品, 是否删除?", "温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "继续保留",
        type: "warning"
      })
        .then(() => {
            // 直接传个下标过来,删除数组元素废弃下一个做法
             this.goodsList.splice(index, 1);
          // 删除数据
          // 删除当前这个组件中的数据
        //   this.goodsList.forEach((v, index) => {
        //     //   找到这个id的下标删除一个
        //     if (v.id == id) {
        //       this.goodsList.splice(index, 1);
        //     }
        //   });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
      getdowOrder(){
         if(this.checkedId == 0){
             this.$message("哥们还没有商品!!");
              return;  
         } 
         this.$router.push('/shoppingDownOrder/'+this.checkedId)
      }
    },
    // 生命周期函数
    async created() {
    // 获取id字符串
    let ids = "";
    for (const key in this.$store.state.cartData) {
      ids += key;
      ids += ",";
    }
    //    去掉最后面的,号
    ids = ids.slice(0, ids.length - 1);
    //    console.log(ids );
    // 请求购物车数据
    let res = await this.$axios.get(`site/comment/getshopcargoods/${ids}`);
    // console.log(res);
    // 动态添加属性先添加后赋值到vue的属性,vue会对每个属性添加get和set属性
    res.data.message.forEach(v => {
      v.buycount = this.$store.state.cartData[v.id];
      v.isStatus = true;
    });
    this.goodsList = res.data.message;
  },
//   侦听器
    watch: {
        goodsList: {
                handler: function (val,) { 
                    let obj={};
                    val.forEach(v=>{
                        obj[v.id]=v.buycount;
                    })
                    this.$store.commit('update',obj)
                },
                deep: true
        },
    },
//   计算属性
  computed: {
    //   总金额
      totalprc(){
          let prc=0;
        this.goodsList.forEach(v=>{
            if(v.isStatus){
              prc += v.buycount*v.sell_price
            }
        })
          return prc
      },
  
    //   选中商品
    totalName(){
        let num = 0;
        this.goodsList.forEach(v=>{
            if(v.isStatus){
               num+=v.buycount
            }
        })
         return num;
    },
    // 开关的全选和反选
      CheckAll:{
        //   反选
        get() {
        // 返回是否都被选中
        return this.goodsList.every(v => {
          return v.isStatus == true;
        });
      },
        //   全选
      set(value){
              this.goodsList.forEach(v=>{
                 v.isStatus=value
              })
          }

      },
      // 选中商品的id
      checkedId(){
        let ids = '';
        this.goodsList.forEach(v=>{
            if(v.isStatus){
                ids+=v.id;
                ids+=',';
            }
        })
        ids= ids.slice(0,-1);
        // console.log( ids );
        return ids;
      }
  },
};
</script>
<style lang="scss">
.conten-cart {
  tbody {
    tr {
      td {
        img {
          margin: 0 auto;
          display: block;
          width: 100px;
          height: 100px;
        }
      }
    }
  }
}
</style>
