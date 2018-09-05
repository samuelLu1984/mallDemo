<template>
  <header class="header">
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-arrow-short" viewBox="0 0 25 32">
          <title>arrow-short</title>
          <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
        </symbol>
        <symbol id="icon-status-ok" viewBox="0 0 32 32">
          <title>status-ok</title>
          <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
          <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
        </symbol>
        <symbol id="icon-cart" viewBox="0 0 38 32">
          <title>cart</title>
          <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
          <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
          <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
          <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        </symbol>
      </defs>
    </svg>
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="static/img/logo1.png"></a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <a  class="navbar-link" v-if="userId" >{{userName}}</a>
          <a href="javascript:;" v-if="!userId" @click="openRegister=true;errorTip=''">注册</a>
          <span class="navbar-link"></span>
          <a href="javascript:;" class="navbarlink" v-if="userId" @click="loginOut()">退出</a>
          <span class="navbar-link"></span>
          <a href="javascript:void(0)" class="navbar-link" @click="openLogin=true;errorTip=''" v-if="!userId">登录</a>
          <!--<a href="javascript:void(0)" class="nav-bar-link">退出</a>-->
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-if="userId" >{{cartCount}}</span>
            <router-link class="navbar-link navbar-cart-link" to="/cart" v-if="userId">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
   <modal  :mdFlag="openLogin"  @close="closeModal">
     <div slot="md-title" class="md-title"> 登录</div>
       <div slot="modal-msg" >
          <div class="error-wrap">
             <span class="error error-show" v-text="errorTip">用户名或者密码错误</span>
          </div>
          <ul>
             <li class="regi_form_input">
             <i class="icon IconPeople"></i>
             <input type="text" tabindex="1" name="loginname" v-model="userEmail" class="regi_login_input regi_login_input_left" placeholder="User Email" data-type="loginname">
             </li>
            <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
              <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
            </li>
          </ul>
       </div>
       <a href="javascript:;" class="btn-login" @click="login" slot="modal-btn">登  录</a>
   </modal>
   <modal  :mdFlag="openRegister" @close="closeModal">
       <div slot="md-title" class="md-title"> 快速注册</div>
       <div slot="modal-msg" >

          <div class="error-wrap">

             <span class="error error-show" v-text="errorTip"></span>
          </div>
          <ul>
             <li class="regi_form_input">
              <i class="icon IconPeople"></i>
              <input type="text" tabindex="1" name="userEmail" v-model="userEmail" class="regi_login_input regi_login_input_left" placeholder="输入您的邮箱" >
             </li>
             <li class="regi_form_input">
              <i class="icon IconPeople"></i>
              <input type="text" tabindex="2" name="userName" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="输入您的用户名" >
             </li>

             <li class="regi_form_input noMargin">
              <i class="icon IconPwd"></i>
              <input type="password" tabindex="3"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="输入密码" >
            </li>
             <li class="regi_form_input noMargin">
              <i class="icon IconPwd"></i>
              <input type="password" tabindex="4"  name="password" v-model="checkPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="确认密码" @keyup.enter="register">
            </li>
          </ul>
       </div>
       <div slot="modal-btn">
         <a href="javascript:;"  class="btn-login" @click="register" >注册</a>
       </div>
   </modal>
  </header>

</template>

<script>
  // import '../../static/css/nav.css'
  import axios from 'axios'
    export default {
        data(){
          return {
            openLogin:false,
            openRegister:false,
            errorTip:'',
            userEmail:'',
            userPwd:'',
            checkPwd:''

          }
        },
      computed:{
          userName(){
            return this.$store.state.user.userName
          },
          userId(){
            return this.$store.state.user.userId
          },
          cartCount(){
            return this.$store.state.cartCount
          }
      },
      mounted(){
          this.checkLogin()
      },
      methods:{
        checkLogin(){
          if (sessionStorage.userId &&sessionStorage.userName) {
            this.$store.commit('updateUser',{
            userId:sessionStorage.userId,
            userName:sessionStorage.userName
            }
          )}

        },
        register(){
          if (!this.userEmail||!this.userName||!this.userPwd){
            this.errorTip='用户名、密码和邮箱不能为空'
            return
          }
          if (this.userPwd !==this.checkPwd) {
            this.errorTip='两次输入密码必须相同'
            this.userPwd =this.checkPwd= ''
            return
          }
          axios.post('/user/register',{
            userEmail:this.userEmail,
            userName:this.userName,
            userPwd:this.userPwd,
          }).then(res=>{
            if (res.data.status==='1') {
              this.errorTip=res.data.msg
            }else if (res.data.status==='0'){
              this.openRegister=false
              alert('注册成功')
            }
          })
        },
        login(){
          if (!this.userEmail||!this.userPwd){
              return this.errorTip='用户和密码不能为空'
          }
          axios.post('/user/login',{
            userEmail:this.userEmail,
            userPwd:this.userPwd
          }).then(res=>{
              if (res.data.status==='1'){
                 return this.errorTip=res.data.msg
              }
              if (res.data.status==='0') {
                sessionStorage['userId']=res.data.result.user.userId
                sessionStorage['userName']=res.data.result.user.userName
                // this.userId=sessionStorage.userId
                // this.userName=sessionStorage.userName
                this.$store.commit('updateUser',res.data.result.user)
                this.openLogin=false

              }
          })
        },

        loginOut(){
          sessionStorage.clear()
          this.$store.commit('updateUser',{userId:'',userName:''})
          this.$router.push('/')
        },
        closeModal(){
          this.openLogin=false;
          this.openRegister=false;
        }
      }
    }
</script>
<style scoped>
  .header {
    width: 100%;
    background-color: white;
    font-family: "moderat",sans-serif;
    font-size: 16px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }
  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
  }
  .navbar-brand-logo {
    /*width: 120px;*/
  }
  .header a, .footer a {
    color: #666;
    text-decoration: none;
  }
  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }
  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }
  .navbar-link {
    padding-left: 15px;
  }
  .navbar-cart-container {
    position: relative;
  }
  .navbar-cart-count {
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -9px;
    right: -11px;
    width: 20px;
    border-radius: 10px;
    color: white;
    background-color: #eb767d;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .navbar-cart-logo {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
  }
</style>


