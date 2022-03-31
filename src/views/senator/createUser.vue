<template>
  <div>
    <el-button @click="back">返回</el-button>
    <el-form :model="registerForm" :rules="registerRules">

      <div class="title-container">
        <h3 class="title">请输入用户信息</h3>
      </div>

      <el-form-item label="类别" prop="type">
        <el-input v-model="registerForm.type" placeholder="请输入类别: 1为学生, 2为教师" type="number"></el-input>
      </el-form-item>

      <el-form-item label="账号" prop="user_id">
        <el-input v-model="registerForm.user_id" placeholder="请输入学号/教工号" type="text"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="password">
        <el-input v-model="registerForm.user_name" type="text" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="身份证号" prop="identity_id">
        <el-input v-model="registerForm.identity_id" type="text" placeholder="请输入身份证号"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="user_sex">
        <el-input v-model="registerForm.user_sex" type="number" placeholder="请输入性别: 1为男, 2为女"></el-input>
      </el-form-item>

      <el-form-item label="学院" prop="college">
        <el-input v-model="registerForm.college" type="text" placeholder="请输入学院"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" type="text" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-button @click="handleRegister">注册用户</el-button>
      <el-button @click="handleImport">上传文件</el-button>

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
      },
      registerRules: {
        type: [{ required: true, message: '类型', trigger: 'blur' }],
        user_id: [{ required: true, message: '学号', trigger: 'blur' }],
        user_name: [{ required: true, message: '姓名', trigger: 'blur' }],
        identity_id: [{ required: true, message: '身份证号', trigger: 'blur' }],
        user_sex: [{ required: true, message: '性别', trigger: 'blur' }],
        college: [{ required: true, message: '学院', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱', trigger: 'blur' }]
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

<style scoped>

</style>
