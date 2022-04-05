<template>
  <div class="student-container">

    <div class="title-container">
      <h3 class="title">课程成绩预发布系统</h3>
    </div>

    <div align="center">
      <el-button @click="logOut">登出</el-button>
      <br/>
      <br/>
      <el-button @click="toUserInfo">个人信息</el-button>
      <el-table class="table-container" :data="courseData" style="width: 100%">
        <el-table-column prop="courseId" label="课程号" width="180"></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="180"></el-table-column>
        <el-table-column prop="courseStatus" label="查看成绩单" width="150">
          <template slot-scope="scope">
            <el-button @click="courseGrade(scope.row.courseId)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Teacher",
  data() {
    return {
      courseData: []
    }
  },
  created() {
    var params = new URLSearchParams();
    params.append('user_id', sessionStorage.getItem('user_id'));
    this.axios.post('/course/list-teacher', params)
      .then((res) => {
        console.log(res.data);
        this.courseData = res.data.data;
        console.log(this.gradeData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    toUserInfo() {
      this.$router.push("/teacher/info");
    },
    logOut() {
      this.$router.push("/");
    },
    courseGrade(course_id) {
      sessionStorage.setItem('course_id', course_id);
      this.$router.push("/teacher/grade");
    }
  }
}
</script>

<style lang="scss" scoped>

.student-container {
  min-height: 100%;
  width: 100%;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  max-width: 100%;
  padding: 100px 35px 0;
  margin: 0 auto;

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

  .table-container {
    position: relative;
    margin: 2em 0 30px;
  }
}

</style>
