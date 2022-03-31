<template>
  <div>
    <el-form :model="loginForm" :rules="loginRules">

      <div class="title-container">
        <h3 class="title">课程成绩预发布系统</h3>
      </div>

      <el-form-item label="账号" prop="user_id">
        <el-input v-model="loginForm.user_id" placeholder="请输入学号/教工号" type="text"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="passwordType" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-button @click="handleLogin">登录</el-button>

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
        user_id: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }]
      }
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
            console.log("用户不存在")
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

<style scoped>

</style>
