<template>
  <div class="conten-details">
    <div>
      <div class="section">
        <div class="location">
          <span>当前位置：</span>
          <a href="/index.html">首页</a> &gt;
          <a href="/goods.html">购物商城</a> &gt;
          <a href="/goods/42/1.html">商品详情</a>
        </div>
      </div>
      <div class="section">
        <div class="wrapper clearfix">
          <div class="wrap-box">
            <div class="left-925">
              <div class="goods-box clearfix">
                <div class="pic-box">
                  <!-- 放大镜 -->
                  <ProductZoomer
                    v-if="images.normal_size.length!=0"
                    :base-images="images"
                    :base-zoomer-options="zoomerOptions"
                  />
                </div>
                <div class="goods-spec">
                  <h1>{{goodsinfo.title}}</h1>
                  <p class="subtitle">{{goodsinfo.sub_title}}</p>
                  <div class="spec-box">
                    <dl>
                      <dt>货号</dt>
                      <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                    </dl>
                    <dl>
                      <dt>市场价</dt>
                      <dd>
                        <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                      </dd>
                    </dl>
                    <dl>
                      <dt>销售价</dt>
                      <dd>
                        <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                      </dd>
                    </dl>
                  </div>
                  <div class="spec-box">
                    <dl>
                      <dt>购买数量</dt>
                      <dd>
                        <div class="stock-box">
                          <div class="el-input-number el-input-number--small">
                            <el-input-number
                              v-model="buycount"
                              :min="1"
                              :max="goodsinfo.stock_quantity"
                              label="描述文字"
                            ></el-input-number>
                          </div>
                        </div>
                        <span class="stock-txt">
                          库存
                          <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                        </span>
                      </dd>
                    </dl>
                    <dl>
                      <dd>
                        <div id="buyButton" class="btn-buy">
                            
                          <button  class="buy">立即购买</button>
                          <button @click="add2cart" class="add">加入购物车</button>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div id="goodsTabs" class="goods-tab bg-wrap">
                <!-- 使用iview图钉 -->
                <Affix>
                  <div
                    id="tabHead"
                    class="tab-head"
                    style="position: static; top: 517px; width: 925px;"
                  >
                    <ul>
                      <li>
                        <a
                          href="javascript:;"
                          :class="{selected:tab=='fist'}"
                          @click="tab='fist'"
                        >商品介绍</a>
                      </li>
                      <li>
                        <a
                          href="javascript:;"
                          :class="{selected:tab=='tow'}"
                          @click="tab='tow'"
                        >商品评论</a>
                      </li>
                    </ul>
                  </div>
                </Affix>
                <div
                  class="tab-content entry"
                  style="display: block;"
                  v-show="tab=='fist'"
                  v-html="goodsinfo.content"
                ></div>
                <div class="tab-content" style="display: block;" v-show="tab=='tow'">
                  <div class="comment-box">
                    <div id="commentForm" name="commentForm" class="form-box">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="conn-box">
                        <div class="editor">
                          <textarea
                            v-model.trim="comment"
                            id="txtContent"
                            name="txtContent"
                            sucmsg=" "
                            data-type="*10-1000"
                            nullmsg="请填写评论内容！"
                          ></textarea>
                          <span class="Validform_checktip"></span>
                        </div>
                        <div class="subcon">
                          <input
                            id="btnSubmit"
                            name="submit"
                            @click="addPinLun"
                            type="submit"
                            value="提交评论"
                            class="submit"
                          >
                          <span class="Validform_checktip"></span>
                        </div>
                      </div>
                    </div>
                    <p
                      v-show="totalcount==0"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <ul id="commentList" class="list-box" v-show="totalcount!=0">
                      <li v-for="(item, index) in contenInof" :key="item.article_id">
                        <div class="avatar-box">
                          <i class="iconfont icon-user-full"></i>
                        </div>
                        <div class="inner-box">
                          <div class="info">
                            <span>{{item.user_name}}</span>
                            <span>{{item.add_time | shortTimes }}</span>
                          </div>
                          <p>{{item.content}}</p>
                        </div>
                      </li>
                    </ul>
                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                      <div id="pagination" class="digg">
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :page-sizes="[2, 4, 6, 8,10]"
                          :page-size="pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="totalcount"
                        ></el-pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="left-220">
              <div class="bg-wrap nobg">
                <div class="sidebar-box">
                  <h4>推荐商品</h4>
                  <ul class="side-img-list">
                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                      <div class="img-box">
                        <router-link :to="'/goodsDetails/'+item.id">
                          <img :src="item.img_url">
                        </router-link>
                      </div>
                      <div class="txt-box">
                        <!-- <a href="#">{{item.title}}</a> -->
                        <router-link :to="'/goodsDetails/'+item.id">{{item.title}}</router-link>
                        <span>{{item.add_time | shortTime}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- iview返回顶部 -->
    <BackTop>
      <span class="ding">🚀</span>
    </BackTop>
  </div>
</template>
<script>
export default {
  name: "Details",
  data() {
    return {
      infoId: "",
      //  商品详情
      goodsinfo: {},
      // 推荐商品
      hotgoodslist: [],
      // 商品图片列表
      imglist: [],
      // 购买数量
      buycount:1,
      // tab栏显示
      tab: "fist",
      // 请求的评论内容
      contenInof: [],
      // 业容量
      pageSize: 4,
      // 页码
      pageIndex: 1,
      // 总条数
      totalcount: 7,
      //  提交的评论内容
      comment: "",
      //   放大镜数据
      images: {
        normal_size: []
      },
      //   放大镜参数
      zoomerOptions: {
        zoomFactor: 8,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  // 方法
  methods: {
    // 获取商品详情
    getDetails() {
      // 每次渲染前重置计数器数量
      this.buycount=0;
      //   // 获取url id
      this.infoId = this.$route.params.id;
      // 请求数据
      this.$axios.get(`site/goods/getgoodsinfo/${this.infoId}`).then(resl => {
        // console.log(resl);
        //  商品详情
        this.goodsinfo = resl.data.message.goodsinfo;
        // 推荐商品
        this.hotgoodslist = resl.data.message.hotgoodslist;
        // 商品图片列表
        this.imglist = resl.data.message.imglist;
        this.images.normal_size = [];
        // 循环添加数据 
        this.imglist.forEach(v=>{
              this.images.normal_size.push({
                  id:v.id,
                  url:v.original_path
              })
          })
      });
      //  重新获取评论数据
      this.getPingLun();
    },
    // 获取评论信息
    getPingLun() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.infoId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          // console.log(res  );
          // 评论信息
          this.contenInof = res.data.message;
          // 评论页容量
          this.pageSize = res.data.pageSize;
          // 评论总条数
          this.totalcount = res.data.totalcount;
        });
    },
    // 分页的页容量事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPingLun();
    },

    // 分页的页码跳转事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getPingLun();
    },
    // 添加评论
    addPinLun() {
      //   console.log(this.comment);
      if (this.comment == "") {
        this.$message("哥们写点东西呗!!");
        return;
      }
      //   提交品论内容
      this.$axios
        .post(`site/validate/comment/post/goods/${this.infoId}`, {
          commenttxt: this.comment
        })
        .then(res => {
          if (res.data.status == 0) {
            //   成功提示
            this.$message({
              message: "评论成功",
              type: "success"
            });
            // 重新获取信息
            this.getPingLun();
            // 提交完成清空文本内容
            this.comment = "";
          } else {
            //   失败提示
            this.$message({
              message: "评论失败",
              type: "warning"
            });
          }
        });
    },
    // 添加商品事件
    add2cart(){
      this.$store.commit('add2cart',{
        goodId:this.infoId,
        goodName:this.buycount,
      })
    }
  
  },
  // 生命周期函数
  created() {
    // 渲染页面
    this.getDetails();
    // 获取评论数据
    this.getPingLun();
  },
  // 侦听器
  watch: {
    $route: function(newvul, oldvul) {
      // 重新渲染页面
      this.getDetails();
      // 监听图片数据
      this.images.normal_size = [];
    }
  }
};
</script>
<style lang="scss" >
.conten-details {
  // 修改商品介绍布局
  .tab-content img {
    display: block;
    max-width: 100%;
  }
  //   返回顶部样式
  .ding {
    font-size: 100px;
    transform: rotateZ(-45deg);
    display: block;
  }
  .inline-zoomer-zoomer-box {
      padding-right: 10px;
    width: 395px;
    .preview-box {
      width: 380px;
      img {
        width: 380px;
      }
    }
    .control-box {
      .thumb-list {
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
}
</style>
