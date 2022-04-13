<template>
  <div class="student-container">

    <div class="title-container">
      <h3 class="title">课程成绩预发布系统</h3>
    </div>

    <div align="center">
      <el-button @click="back">返回成绩单列表</el-button>
      <br/>
      <br/>
      学生反馈意见如下
      <br/>
      <br/>
      <el-input v-model="objection" :rows="5" disabled="true" class="reviewText" type="textarea"></el-input>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <p v-if="isHandle">
        您已处理完毕，处理意见如下
        <br/>
        <br/>
        <el-input v-model="reviewOpinion" placeholder="请输入处理意见" :rows="5" class="input" type="textarea"
                  disabled="true"></el-input>
        <br/>
        <br/>
        请等待学生处理
      </p>
      <p v-else>
        请输入处理意见 并选择驳回或修改成绩
        <br/>
        <el-input v-model="reviewOpinion" placeholder="请输入处理意见" :rows="5" class="input" type="textarea"></el-input>
        <br/>
        <br/>
        <el-button @click="reject">驳回反馈</el-button>
        <br/>
        <el-table class="table-container" :data="gradeData" style="width: 100%">
          <el-table-column prop="studentId" label="学号" width="180"></el-table-column>
          <el-table-column prop="studentName" label="学生姓名" width="180"></el-table-column>
          <el-table-column prop="gradeStatus" label="成绩单状态" width="150">
            反馈中
          </el-table-column>
          <el-table-column prop="totalScore" label="总成绩" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.totalScore"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="usualScore" label="平时成绩" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.usualScore"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="midScore" label="期中成绩" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.midScore"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="finalScore" label="期末成绩" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.finalScore"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="50"/>
          <el-table-column width="150">
            <el-button @click="update">更新成绩</el-button>
          </el-table-column>
        </el-table>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherReview",
  data() {
    return {
      gradeData: [],
      objection: '',
      reviewOpinion: '',
      isHandle: false,
    }
  },
  created() {
    var params = new URLSearchParams();
    params.append('grade_id', sessionStorage.getItem('grade_id'));
    this.axios.post('/grade/get', params)
      .then((res) => {
        console.log(res.data);
        this.gradeData.push(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.axios.post('/review/get', params)
      .then((res) => {
        console.log(res.data);
        this.objection = res.data.data['objectionDescribe'];
        this.isHandle = res.data.data['reviewStatus'] === 2 || res.data.data['reviewStatus'] === 3;
        this.reviewOpinion = res.data.data['reviewOpinion'];
        console.log(this.objection);
        console.log(this.isHandle);
      })
  },
  methods: {
    back() {
      this.$router.push("/teacher/grade");
    },
    reject() {
      var params = new URLSearchParams();
      params.append('grade_id', sessionStorage.getItem('grade_id'));
      params.append('review_opinion', this.reviewOpinion);
      params.append('is_update_grade', '0');
      this.axios.post('/review/teacher', params)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            this.$message.info("提交成功")
            this.$router.push('/teacher/grade');
          } else {
            this.$message.error(res.data.message);
          }
        })
    },
    update() {
      var params = new URLSearchParams();
      params.append('grade_id', sessionStorage.getItem('grade_id'));
      params.append('total_score', this.gradeData[0]['totalScore']);
      params.append('usual_score', this.gradeData[0]['usualScore']);
      params.append('mid_score', this.gradeData[0]['midScore']);
      params.append('final_score', this.gradeData[0]['finalScore']);
      this.axios.post('/grade/update', params)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            params = new URLSearchParams();
            params.append('grade_id', sessionStorage.getItem('grade_id'));
            params.append('review_opinion', this.reviewOpinion);
            params.append('is_update_grade', '1');
            this.axios.post('/review/teacher', params)
              .then((res) => {
                console.log(res.data);
                if (res.data.code === 200) {
                  this.$message.info("提交成功");
                  this.$router.push('/teacher/grade');
                } else {
                  this.$message.error(res.data.message);
                }
              })
          } else {
            this.$message.error(res.data.message);
          }
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
    width: 30%;
    margin-top: 21px;
  }

  .reviewText {
    width: 30%;
    height: 50px;
  }

}

</style>
