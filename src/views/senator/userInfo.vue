<template>
  <div>
    <el-button @click="back">返回</el-button>
    <el-form :model="updateForm" :rules="updateRules">

      <div class="title-container">
        <h3 class="title">用户信息</h3>
      </div>
      <div>
        <h3>学号：{{userInfo.userId}}</h3>
      </div>

      <div v-if="isUpdate === 0">
        <h3>密码: {{userInfo.password}}</h3>
        <h3>姓名: {{userInfo.userName}}</h3>
        <h3>身份证号: {{userInfo.identityId}}</h3>
        <h3>性别:
          <div v-if="userInfo.userSex === 1">
            男
          </div>
          <div v-else>
            女
          </div>
        </h3>
        <h3>学院: {{userInfo.college}}</h3>
        <h3>邮箱: {{userInfo.email}}</h3>
        <el-button @click="updateInfo">更新信息</el-button>
      </div>


      <div v-else>
        <el-form-item label="密码" prop="password">
          <el-input v-model="updateForm.password" type="text" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="user_name">
          <el-input v-model="updateForm.user_name" type="text" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="身份证号" prop="identity_id">
          <el-input v-model="updateForm.identity_id" type="text" placeholder="请输入身份证号"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="user_sex">
          <el-input v-model="updateForm.user_sex" type="number" placeholder="请输入性别: 1为男, 2为女"></el-input>
        </el-form-item>

        <el-form-item label="学院" prop="college">
          <el-input v-model="updateForm.college" type="text" placeholder="请输入学院"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email" type="text" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-button @click="checkInfo">返回查看</el-button>
        <el-button @click="submitUpdate">确认更新</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isUpdate: 0,
      userInfo: [],
      updateForm: {
        password: '',
        user_name: '',
        identity_id: '',
        user_sex: 1,
        college: '',
        email: ''
      },
      updateRules: {
        password: [{required: true, message: '密码', trigger: 'blur'}],
        user_name: [{required: true, message: '姓名', trigger: 'blur'}],
        identity_id: [{required: true, message: '身份证号', trigger: 'blur'}],
        user_sex: [{required: true, message: '性别', trigger: 'blur'}],
        college: [{required: true, message: '学院', trigger: 'blur'}],
        email: [{required: true, message: '邮箱', trigger: 'blur'}]
      }
    }
  },
  created() {
    var params = new URLSearchParams();
    params.append('user_id', sessionStorage.getItem('user_info_id'));
    this.axios.post('/user/get', params)
      .then((res) => {
        console.log(res.data);
        this.userInfo = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    back() {
      this.$router.push("/senator");
    },
    updateInfo() {
      this.isUpdate = 1;
    },
    checkInfo() {
      this.isUpdate = 0;
    },
    submitUpdate() {
      var params = new URLSearchParams();
      params.append('user_id', this.userInfo.userId);
      params.append('password', this.updateForm.password);
      params.append('user_name', this.updateForm.user_name);
      params.append('identity_id', this.updateForm.identity_id);
      params.append('user_sex', this.updateForm.user_sex);
      params.append('college', this.updateForm.college);
      params.append('email', this.updateForm.email);
      this.axios.post('/user/update', params)
        .then((res) => {
          console.log(res.data);
          this.$router.push("/senator/user/info");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>
