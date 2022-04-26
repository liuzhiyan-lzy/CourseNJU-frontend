<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">

      <div class="title-container">
        <h3 class="title">课程成绩预发布系统</h3>
      </div>

      <el-form-item prop="user_id">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="user_id" v-model="loginForm.user_id" placeholder="请输入学号/教工号" type="text" name="user_id"
          tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="password" v-model="loginForm.password" type="password" placeholder="请输入密码" name="password"
          tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />

      </el-form-item>
      </el-form-item>

      <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click="handleLogin">登录</el-button>


      <!--div class="tips">
        <a class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
          @click="handregister">注册</a>
      </div-->

    </el-form>
  </div>
</template>

<script>
  import {
    userLogin
  } from '@/api/login'
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          user_id: '',
          password: ''
        },
        loginRules: {
          user_id: [{
            required: true,
            message: '请填写用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          }]
        },
        loading: false,
        redirect: undefined
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      async handleLogin() {

        var params = new URLSearchParams();
        params.append('user_id', this.loginForm.user_id);
        params.append('password', this.loginForm.password);
        try {
          const data = await userLogin(params)
          
          console.log(data)
          if (data.data.code === 404) {
          this.$message.error(data.data.message)
        }
        if (data.data.code === 200) {
          console.log("登录成功")
          this.$message.success('登录成功')
          localStorage.clear()
          localStorage.setItem('info', 1)
          localStorage['flag'] = 1
          sessionStorage.clear()
          sessionStorage.setItem('user_id', data.data.data.userId)
          sessionStorage.setItem('type', data.data.data.type)
          console.log("1")
          if (data.data.data.type === 0) {
            console.log("type: senator")
            this.$router.push('/adminindex')
          }
          if (data.data.data.type === 1) {
            console.log("type: student")
            this.$router.push("/studentindex");
          }
          if (data.data.data.type === 2) {
            console.log("type: teacher")
            this.$router.push("/teacherindex");
          }
        }
           //alert(1)
        } catch (error) {
          //alert(error)
           this.$message.error('登录失败')
        }
        
        
      },
      handregister() {
        this.$message.success('注册成功')
        this.$router.push('/login')
      }
    }
  }

</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#19f9d8;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 15px;
      color: aqua;

      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

</style>
