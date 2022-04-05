<template>
  <div class="student-container">

    <div class="title-container">
      <h3 class="title">课程成绩预发布系统</h3>
    </div>

    <div align="center">
      <el-button @click="back">返回</el-button>
      <br/>
      <br/>
      <el-table class="table-container" :data="gradeData" style="width: 100%">
        <el-table-column prop="studentId" label="学号" width="180"></el-table-column>
        <el-table-column prop="studentName" label="学生姓名" width="180"></el-table-column>
        <el-table-column prop="gradeStatus" label="成绩单状态" width="150">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===0">
              待发布
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
        <el-table-column prop="totalScore" label="总成绩" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===2||scope.row.gradeStatus===3">
              <el-input v-model="scope.row.totalScore" disabled="true"></el-input>
            </p>
            <p v-else>
              <el-input v-model="scope.row.totalScore"></el-input>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="usualScore" label="平时成绩" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===2||scope.row.gradeStatus===3">
              <el-input v-model="scope.row.usualScore" disabled="true"></el-input>
            </p>
            <p v-else>
              <el-input v-model="scope.row.usualScore"></el-input>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="midScore" label="期中成绩" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===2||scope.row.gradeStatus===3">
              <el-input v-model="scope.row.midScore" disabled="true"></el-input>
            </p>
            <p v-else>
              <el-input v-model="scope.row.midScore"></el-input>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="finalScore" label="期末成绩" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===2||scope.row.gradeStatus===3">
              <el-input v-model="scope.row.finalScore" disabled="true"></el-input>
            </p>
            <p v-else>
              <el-input v-model="scope.row.finalScore"></el-input>
            </p>
          </template>
        </el-table-column>
        <el-table-column width="50"/>
        <el-table-column width="120">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===2||scope.row.gradeStatus===3">
              <el-button disabled="true">提交成绩</el-button>
            </p>
            <p v-else-if="scope.row.gradeStatus===0">
              <el-button @click="submitGrade(scope.row.gradeId,scope.row.totalScore,scope.row.usualScore,scope.row.midScore,scope.row.finalScore)">发布成绩</el-button>
            </p>
            <p v-else>
              <el-button @click="submitGrade(scope.row.gradeId,scope.row.totalScore,scope.row.usualScore,scope.row.midScore,scope.row.finalScore)">更新成绩</el-button>
            </p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot-scope="scope">
            <p v-if="scope.row.gradeStatus===2">
              <el-button @click="gradeReview(scope.row.gradeId)">查看反馈</el-button>
            </p>
            <p v-else>
              <el-button disabled="true">查看反馈</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherGrade",
  data() {
    return {
      gradeData: [],
      isRelease: false
    }
  },
  created() {
    var params = new URLSearchParams();
    params.append('course_id', sessionStorage.getItem('course_id'));
    this.axios.post('/grade/get-course', params)
      .then((res) => {
        console.log(res.data);
        this.gradeData = res.data.data;
        console.log(this.gradeData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    back() {
      this.$router.push("/teacher");
    },
    submitGrade(grade_id,total_score,usual_score,mid_score,final_score) {
      var params = new URLSearchParams();
      params.append('grade_id', grade_id);
      params.append('total_score', total_score);
      params.append('usual_score', usual_score);
      params.append('mid_score', mid_score);
      params.append('final_score', final_score);
      this.axios.post('/grade/update', params)
        .then((res) => {
          console.log(res.data);
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$message.info("提交成功");
    },
    gradeReview(grade_id) {
      sessionStorage.setItem('grade_id', grade_id);
      this.$router.push('/teacher/review');
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

  .input {
    width: 50px;
  }
}

</style>
