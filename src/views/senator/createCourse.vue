<template>
  <div class="container" align="center">
    <el-form :model="courseInfo">

      <div class="title-container">
        <h3 class="title">请输入课程信息</h3>
      </div>

      <el-button class="button" @click="back">返回</el-button>
      <br/>

      <el-form-item class="textarea" label="课程号" prop="course_id">
        <el-input v-model="courseInfo.course_id" placeholder="请输入课程编号" type="text"></el-input>
      </el-form-item>

      <el-form-item class="textarea" label="课程名" prop="course_name">
        <el-input v-model="courseInfo.course_name" placeholder="请输入课程名" type="text"></el-input>
      </el-form-item>

      <el-form-item class="textarea" label="教师工号" prop="teacher_id">
        <el-input v-model="courseInfo.teacher_id" type="text" placeholder="请输入教师工号"></el-input>
      </el-form-item>

      <el-form-item class="textarea" label="课程容量" prop="identity_id">
        <el-input v-model="courseInfo.capacity" type="text" placeholder="请输入课程容量"></el-input>
      </el-form-item>

      <br/>
      <br/>
      <br/>
      <el-button class="button" @click="handleCourse">添加课程</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "CreateCourse",
  data() {
    return {
      courseInfo: {
        course_id: '',
        course_name: '',
        teacher_id: '',
        capacity: ''
      }
    }
  },
  methods: {
    handleCourse() {
      var params = new URLSearchParams();
      params.append('course_id', this.courseInfo.course_id);
      params.append('course_name',this.courseInfo.course_name);
      params.append('teacher_id',this.courseInfo.teacher_id);
      params.append('capacity',this.courseInfo.capacity);
      this.axios.post('/course/add', params)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 404) {
            this.$message.error(res.data.message);
          } else {
            this.$message.info("创建成功");
            this.$router.push("/senator");
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
