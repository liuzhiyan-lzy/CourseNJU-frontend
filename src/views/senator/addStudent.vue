<template>
  <div class="container" align="center">
    <el-form :model="addStudentInfo">

      <div class="title-container">
        <h3 class="title">请输入学生信息</h3>
      </div>

      <el-button class="button" @click="back">返回</el-button>
      <br/>
      <br/>

      <el-form-item class="textarea" label="请输入需要添加的学号 或 上传学号名单" prop="student_id">
        <el-input v-model="addStudentInfo.student_id" placeholder="请输入学号" type="text"></el-input>
      </el-form-item>

      <br/>
      <br/>
      <br/>
      <br/>
      <el-button class="button" @click="addStudent">添加学生</el-button>
      <br/>
      <br/>
      <br/>
      <el-button class="button" @click="addFile">上传文件</el-button>
      <br/>
      <br/>
      <br/>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddStudent",
  data() {
    return {
      addStudentInfo: {
        student_id: ''
      }
    }
  },
  methods: {
    addStudent() {
      var params = new URLSearchParams();
      params.append('course_id', sessionStorage.getItem('course_info_id'));
      params.append('student_id', this.addStudentInfo.student_id);
      this.axios.post('/course/add-student', params)
        .then((res) => {
          console.log(res.data);
          this.$message.info("添加成功");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addFile() {

    },
    back() {
      this.$router.push("/senator/course/info");
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
