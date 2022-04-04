<template>
  <div class="student-container">

    <div class="title-container">
      <h3 class="title">课程成绩预发布系统</h3>
    </div>

    <div align="center">
      <el-button @click="back">返回成绩单列表</el-button>
      <br/>
      <el-table class="table-container" :data="gradeData" style="width: 100%">
        <el-table-column prop="courseId" label="课程号" width="180"></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="180"></el-table-column>
        <el-table-column prop="totalScore" label="总分" width="180"></el-table-column>
        <el-table-column prop="usualScore" label="平时分数" width="180"></el-table-column>
        <el-table-column prop="midScore" label="期中分数" width="180"></el-table-column>
        <el-table-column prop="finalScore" label="期末分数" width="180"></el-table-column>
      </el-table>
      <p v-if="gradeStatus===1">
        <el-input v-model="objection" placeholder="请输入成绩反馈意见" :rows="8" class="input" type="textarea"></el-input>
        <br/>
        <br/>
        <el-button @click="addReview">提交反馈</el-button>
      </p>
      <p v-else-if="gradeReviewStatus===1">
        已提交反馈，等待教师处理
        <br/>
        <br/>
        <el-button @click="deleteReview">取消反馈</el-button>
      </p>
      <p v-else-if="gradeReviewStatus===2 && !inputReview">
        教师已驳回反馈，处理意见如下
        <br/>
        <br/>
        <el-input v-model="gradeReviewData.reviewOpinion" :rows="5" disabled="true" class="reviewText" type="textarea"></el-input>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        请选择继续反馈或确认成绩
        <br/>
        <br/>
        <el-button @click="confirmGrade">确认成绩</el-button>
        <el-button @click="continueReview">继续反馈</el-button>
      </p>
      <p v-else-if="gradeReviewStatus===2">
        <el-button @click="backReview">返回反馈详情</el-button>
        <br/>
        <br/>
        <el-input v-model="objection" placeholder="请输入成绩反馈意见" :rows="8" class="input" type="textarea"></el-input>
        <br/>
        <br/>
        <el-button @click="addObjection">提交反馈</el-button>
      </p>
      <p v-else-if="!inputReview">
        教师已查看反馈并修改成绩，处理意见如下
        <br/>
        <br/>
        <el-input v-model="gradeReviewData.reviewOpinion" :rows="5" disabled="true" class="reviewText" type="textarea"></el-input>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        请选择继续反馈或确认成绩
        <br/>
        <br/>
        <el-button @click="confirmGrade">确认成绩</el-button>
        <el-button @click="continueReview">继续反馈</el-button>
      </p>
      <p v-else>
        <el-button @click="backReview">返回反馈详情</el-button>
        <br/>
        <br/>
        <el-input v-model="objection" placeholder="请输入成绩反馈意见" :rows="8" class="input" type="textarea"></el-input>
        <br/>
        <br/>
        <el-button @click="addObjection">提交反馈</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentGrade",
  data() {
    return {
      gradeData: [],
      gradeReviewData: [],
      gradeStatus: 0,
      gradeReviewStatus: 0,
      objection: '',
      inputReview: false
    }
  },
  created() {
    var params = new URLSearchParams();
    params.append('grade_id', sessionStorage.getItem('grade_id'));
    this.axios.post('/grade/get', params)
      .then((res) => {
        console.log(res.data);
        this.gradeStatus = res.data.data.gradeStatus;
        this.gradeData.push(res.data.data);
        console.log(this.gradeData);
        if (this.gradeStatus === 2) {
          this.axios.post('/review/get', params)
            .then((res) => {
              console.log(res.data);
              this.gradeReviewData = res.data.data;
              this.gradeReviewStatus = res.data.data.reviewStatus;
            })
            .catch((error) => {
              console.log(error);
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    back() {
      this.$router.push("/student");
    },
    addReview() {
      var params = new URLSearchParams();
      params.append('grade_id', sessionStorage.getItem('grade_id'))
      params.append('objection_describe', this.objection);
      this.axios.post('/review/add', params)
        .then((res) => {
          console.log(res.data);
          this.$message.info("提交反馈成功");
          this.$router.push('/student');
        })
        .catch((error) => {
          console.log(error);
        })
    },
    deleteReview() {
      var params = new URLSearchParams();
      params.append('grade_id', sessionStorage.getItem('grade_id'))
      this.axios.post('review/delete', params)
        .then((res) => {
          console.log(res.data);
          this.$message.info("撤销反馈成功");
          this.$router.push('/student');
        })
        .catch((error) => {
          console.log(error);
        })
    },
    confirmGrade() {
      var params = new URLSearchParams();
      params.append('grade_id', sessionStorage.getItem('grade_id'))
      this.axios.post('/review/confirm', params)
        .then((res) => {
          console.log(res.data);
          this.$message.info("确认成功");
          this.$router.push('/student');
        })
    },
    continueReview() {
      this.inputReview = true;
      this.$router.push('/student/grade');
    },
    backReview() {
      this.inputReview = false;
      this.$router.push('/student/grade');
    },
    addObjection() {
      var params = new URLSearchParams();
      params.append('grade_id', sessionStorage.getItem('grade_id'))
      params.append('objection_describe', this.objection);
      this.axios.post('/review/objection', params)
        .then((res) => {
          console.log(res.data);
          this.$message.info("提交反馈成功");
          this.$router.push('/student');
        })
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
    width: 50%;
    margin-top: 21px;
  }

  .reviewText {
    width: 30%;
    height: 50px;
  }

}

</style>
