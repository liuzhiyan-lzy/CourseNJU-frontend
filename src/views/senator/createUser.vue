<template>
  <div class="container" align="center">
    <el-form :model="registerForm">

      <div class="title-container">
        <h3 class="title">请输入用户信息</h3>
      </div>

      <el-button class="button" @click="back">返回</el-button>
      <br/>

      <el-form-item class="textarea" label="类别" prop="type">
        <el-input v-model="registerForm.type" placeholder="请输入类别: 1为学生, 2为教师" type="number"></el-input>
      </el-form-item>

      <el-form-item class="textarea" label="账号" prop="user_id">
        <el-input v-model="registerForm.user_id" placeholder="请输入学号/教工号" type="text"></el-input>
      </el-form-item>

      <el-form-item class="textarea" label="姓名" prop="password">
        <el-input v-model="registerForm.user_name" type="text" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item class="textarea" label="身份证号" prop="identity_id">
        <el-input v-model="registerForm.identity_id" type="text" placeholder="请输入身份证号"></el-input>
      </el-form-item>

      <el-form-item class="textarea" label="性别" prop="user_sex">
        <el-input v-model="registerForm.user_sex" type="number" placeholder="请输入性别: 1为男, 2为女"></el-input>
      </el-form-item>

      <el-form-item class="textarea" label="学院" prop="college">
        <el-input v-model="registerForm.college" type="text" placeholder="请输入学院"></el-input>
      </el-form-item>

      <el-form-item class="textarea" label="邮箱" prop="email">
        <el-input v-model="registerForm.email" type="text" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <br/>
      <br/>
      <br/>
      <el-button class="button" @click="handleRegister">注册用户</el-button>
      <br/>
      <br/>
      <el-button class="button" @click="handleImport">上传文件</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      registerForm: {
        type: 1,
        user_id: '',
        user_name: '',
        identity_id: '',
        user_sex: 1,
        college: '',
        email: ''
      }
    }
  },
  methods: {
    handleRegister() {
      var params = new URLSearchParams();
      params.append('type', this.registerForm.type);
      params.append('user_id',this.registerForm.user_id);
      params.append('user_name',this.registerForm.user_name);
      params.append('identity_id',this.registerForm.identity_id);
      params.append('user_sex', this.registerForm.user_sex);
      params.append('college', this.registerForm.college);
      params.append('email', this.registerForm.email);
      this.axios.post('/user/register', params)
        .then((res) => {
          console.log(res.data);
          this.$router.push("/senator");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleImport() {

    },
    back() {
      this.$router.push("/senator");
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  min-height: 100%;
  width: 100%;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  max-width: 100%;
  padding: 60px 35px 0;

  .button {
    margin: 0 auto -20px auto;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 40px;
      color: #000000;
      margin: 0 auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .textarea {
    width: 30%;
    margin: 40px 0 0 0;
    height: 40px;
    font-size: 16px !important;
    color: #000000 !important;
  }
}

</style>
