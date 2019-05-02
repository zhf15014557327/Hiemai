<template>
    <div class="conten-login">
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" name="txtUserName" v-model.trim="UserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" name="txtPassword" v-model.trim="Password" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录" @click="login">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data() {
        return {
            // 用户名
            UserName:'',
            // 密码
            Password:''
        }
    },
    created() {
        
    },
    methods: {
        // 登录
       async login(){
            if(this.UserName=="" || this.Password==""){
                     this.$message({
                        message: "用户名或密码不能为空",
                        type: "warning"
                     })
                     return;
            }
       let res = await this.$axios.post("site/account/login",{user_name:this.UserName,password:this.Password});
        //   console.log( res );
        //   判断是否登录
          if(res.data.status==0){
            //   登录成功
                this.$message({
                        message: res.data.message,
                        type: "success"
                     })
                      //  提交载荷记录登陆状态
                     this.$store.commit('upLogin',true)
                    //  从哪里来回哪里去
         this.$router.go(-1) || this.$router.push('/')
          }else{
            //   登录异常
                 this.$message({
                        message: res.data.message,
                        type: "warning"
                     })
          }

        }
    },
}
</script>
<style lang="scss">
    .conten-login{

    }


</style>

