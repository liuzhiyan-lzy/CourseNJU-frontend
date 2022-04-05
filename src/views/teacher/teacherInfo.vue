<template>
  <div class="container" align="center">

    <div class="title-container">
      <h3 class="title">个人信息</h3>
    </div>

    <el-button class="button" @click="back">返回</el-button>
    <el-form :model="userInfo" class="info-container">
      <el-col :span="12" v-for="(item,index) in userInfo" :key="index">
        <el-form-item :label="keyMap[index]" class="input-container">
          <div v-if="index!=='password'" class="input">
            <el-input v-model="userInfo[index]" disabled="true"></el-input>
          </div>
          <div v-else class="input">
            <el-input v-model="userInfo[index]"></el-input>
          </div>
        </el-form-item>
      </el-col>
    </el-form>

    <br/>
    <br/>
    <el-button @click="submitUpdate" align="center">修改密码</el-button>

  </div>
</template>

<script>
export default {
  name: "TeacherInfo",
  data() {
    return {
      keyMap: {
        userId: '学号',
        password: '密码',
        userName: '姓名',
        identityId: '身份证号',
        userSex: '性别',
        college: '学院',
        email: '邮箱',
        type: '类别'
      },
      userInfo: []
    }
  },
  created() {
    var params = new URLSearchParams();
    params.append('user_id', sessionStorage.getItem('user_id'));
    this.axios.post('/user/get', params)
      .then((res) => {
        console.log(res.data);
        this.userInfo = res.data.data;
        if (this.userInfo['userSex'] === 1)
          this.userInfo['userSex'] = '男';
        else
          this.userInfo['userSex'] = '女';
        this.userInfo['type'] = '教师';
        delete(this.userInfo['id']);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    back() {
      this.$router.push("/teacher");
    },
    submitUpdate() {
      var params = new URLSearchParams();
      params.append('user_id', this.userInfo['userId']);
      params.append('password', this.userInfo['password']);
      this.axios.post('/user/update-pwd', params)
        .then((res) => {
          console.log(res.data);
          this.$message.info("修改密码成功");
          this.$router.push("/teacher/info");
        })
        .catch((error) => {
          console.log(error);
        });
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

  .title-container {
    position: relative;

    .title {
      font-size: 40px;
      color: #000000;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .button {
    margin: 0 auto 20px auto;
  }

  .info-container {

    .info {
      padding-left: 500px;
      font-size: 20px;
      text-align: left;
      margin: 20px 0 0 0;
    }
  }


  .input-container {
    padding: 0 300px;

    .input {
      width: 80%;
      left: 100px;
      position: absolute;
    }
  }

}

</style>
