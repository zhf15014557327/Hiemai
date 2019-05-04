<template>
  <div class="conten-OderList">
    <div class="bg-wrap" style="min-height: 765px;">
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
          <tbody>
            <tr>
              <th width="16%" align="left">订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="15%">下单时间</th>
              <th width="10%">状态</th>
              <th width="15%">操作</th>
            </tr>
            <tr  v-for="(item) in OderinofList" :key="item.id">
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br>在线支付
              </td>
              <td align="left">{{item.complete_time | shortTimes }}</td>
              <td align="left">{{item.statusName}}</td>
              <td align="left">
                <a href="javascript:void(0)" @click="getOrderDetall(item.id)" class >查看订单</a>
              
                <a href="javascript:void(0)" @click="getPay(item.id)" class v-show="item.status == 1">去付款</a>
                <!-- <a href="javascript:void(0)"  class v-show="item.status == 4">已签收</a> -->
              
                <a href="javascript:void(0)">取消</a>
              
              </td>
            </tr>
            <!-- 分页 -->
          </tbody>
        </table>
        <div class="page-foot">
          <el-pagination
              @size-change="pageSizeChange"
              @current-change="pageIndexChange"
               :current-page="pageIndex"
              :page-sizes="[5,10,15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalcount"
              background
            ></el-pagination></div>
      </div>
    </div>
    <!-- 太lov使用导航守卫代替 -->
      <BackTop>
      <span class="ding">🚀</span>
    </BackTop>
  </div>
</template>
<script>
export default {
  name: "OderList",
  data() {
    return {
      // 订单数据
      OderinofList: [],
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      // 订单总数量
      totalcount: 0,
      // 订单状态
      status: 0
    };
  },
  methods: {
    // 获取订单页数据
    getOrderinof(){
          this.$axios
      .get(
        `site/validate/order/userorderlist?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}`
      )
      .then(res => {
        // console.log( res );
        //  订单数据
        this.OderinofList = res.data.message;
        // 页码
        this.pageIndex = res.data.pageIndex;
        // 页容量
        this.pageSize = res.data.pageSize;
        // 订单总数量
        this.totalcount = res.data.totalcount;
           // 订单状态
        this.status = res.data.status;
      });
    },
    // 查看订单详情   
    getOrderDetall(orderId){
            this.$router.push("/vipCenter/vipOrderDetails/"+ orderId);
    },
    // 去付款
    getPay(id) {
      this.$router.push("/shoppingOrderDrtails/"+ id);
    },
    // 改变页容量事件
    pageSizeChange(size){
        this.pageSize = size
        // 重新获取页容量,获取数据
        // 重置页码为第一页(因为之前切换或页容量,
        // 再次切换是之前选中的页码已近不在现在的页码范围内了所以会出现没有数据的现象)
        this.pageIndex=1;
          this.getOrderinof()
    },
    // 当前第几页事件
    pageIndexChange(index){
        this.pageIndex = index
          this.getOrderinof()
    }
  },
  created() {
    // 请求获取交易订单数据
    this.getOrderinof()
  }
};
</script>
<style lang="scss">
.conten-OderList {
  td a{
    display:block;
  }
  .sub-tit {
    height: 80px;
  }
   .ding {
    font-size: 100px;
    transform: rotateZ(-45deg);
    display: block;
  }
}
</style>
