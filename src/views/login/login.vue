<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">课程成绩预发布系统</h3>
      </div>

      <el-form-item prop="user_id">
        <el-input
          class="textarea"
          ref="user_id"
          v-model="loginForm.user_id"
          placeholder="请输入学号/教工号"
          type="text"
          name="user_id"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          class="textarea"
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button class="loginBtn" :loading="loading" type="primary"
                 @click="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        user_id: '',
        password: ''
      },
      loginRules: {
        user_id: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  methods: {
    handleLogin() {
      var params = new URLSearchParams();
      params.append('user_id', this.loginForm.user_id);
      params.append('password',this.loginForm.password);
      this.axios.post('/user/login', params)
        .then((res)=>{
          if (res.data.code === 404) {
            this.$message.error(res.data.message)
          }
          if (res.data.code === 200){
            console.log("登录成功")
            localStorage.clear()
            localStorage.setItem('info',1)
            localStorage['flag']=1
            sessionStorage.clear()
            sessionStorage.setItem('user_id',res.data.data.userId)
            sessionStorage.setItem('type',res.data.data.type)
            if (res.data.data.type === 0) {
              console.log("type: senator")
              this.$router.push("/senator");
            }
            if (res.data.data.type === 1) {
              console.log("type: student")
              this.$router.push("/student");
            }
            if (res.data.data.type === 2) {
              console.log("type: teacher")
              this.$router.push("/teacher");
            }
          }
        })
        .catch((res)=>{
          console.log(res.data.message);
        });
    }
  }
}
</script>

<style lang="scss" scoped>

$bg: #ffffff;
$dark_gray:#889aa4;
$light_gray:#eee;
$black: #000000;

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

    .textarea>>>.el-input__inner {
      margin: 0.4em 0 0.4em 0;
      height: 50px;
      font-size: 16px !important;
      color: #000000 !important;
    };
  }

  .loginBtn {
    position: relative;
    left: 120px;
    width: 50%;
    margin: 2em 0 30px;
    height: 50px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 40px;
      color: $black;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
