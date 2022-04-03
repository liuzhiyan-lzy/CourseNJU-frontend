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
      <el-table class="table-container" :data="gradeData" style="width: 100%">
        <el-table-column prop="courseId" label="课程号" width="180"></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="180"></el-table-column>
        <el-table-column prop="courseStatus" label="课程状态" width="180">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===0">
              未发布
            </p>
            <p v-else-if="scope.row.gradeStatus===1">
              待确认
            </p>
            <p v-else-if="scope.row.gradeStatus===2">
              反馈中
            </p>
            <p v-else>
              已确认
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="totalScore" label="总分" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===0">
              \
            </p>
            <p v-else>
              {{scope.row.totalScore}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="usualScore" label="平时分数" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===0">
              \
            </p>
            <p v-else>
              {{scope.row.usualScore}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="midScore" label="期中分数" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===0">
              \
            </p>
            <p v-else>
              {{scope.row.midScore}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="finalScore" label="期末分数" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===0">
              \
            </p>
            <p v-else>
              {{scope.row.finalScore}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="" label="确认成绩" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===1">
              <el-button @click="confirmGrade(scope.row.gradeId)">确认</el-button>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="" label="反馈异议" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===1">
              <el-button @click="gradeReview(scope.row.gradeId)">反馈</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      gradeData: []
    }
  },
  created() {
    var params = new URLSearchParams();
    params.append('student_id', sessionStorage.getItem('user_id'));
    this.axios.post('/grade/get-student', params)
      .then((res) => {
        console.log(res.data);
        this.gradeData = res.data.data;
        delete(this.courseInfo['id']);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    toUserInfo() {
      this.$router.push("/student/info");
    },
    logOut() {
      this.$router.push("/");
    },
    confirmGrade(grade_id) {
      var params = new URLSearchParams();
      params.append('grade_id', grade_id);
      this.axios.post('/grade/confirm', params)
        .then((res) => {
          console.log(res.data);
          this.$message.info("确认成功");
          this.$router.push("/student");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    gradeReview(grade_id) {

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
