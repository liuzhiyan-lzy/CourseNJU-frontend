<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card class="page-tools">
        <el-button @click="toUserInfo" type="primary">个人信息</el-button>
        </el-row>
        <el-divider />
        <el-table class="table-container" :data="courseData" style="width: 100%">
          <el-table-column prop="courseId" label="课程号"></el-table-column>
          <el-table-column prop="courseName" label="课程名"></el-table-column>
          <el-table-column prop="courseStatus" label="查看成绩单">
            <template slot-scope="scope">
              <el-button type="primary" @click="courseGrade(scope.row.courseId)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider />
        <!-- </el-row> -->
      </el-card>
      <el-dialog title="查看成绩单" :visible="isShowDialog" @close="btnCandel">
        <el-table class="table-container" :data="gradeData2" style="width: 100%">
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
          <el-table-column width="50" />
          <el-table-column width="120">
            <template slot-scope="scope">
              <p v-if="scope.row.gradeStatus===2||scope.row.gradeStatus===3">
                <el-button disabled="true">提交成绩</el-button>
              </p>
              <p v-else-if="scope.row.gradeStatus===0">
                <el-button type="primary"
                  @click="submitGrade(scope.row.gradeId,scope.row.totalScore,scope.row.usualScore,scope.row.midScore,scope.row.finalScore)">
                  发布成绩</el-button>
              </p>
              <p v-else>
                <el-button type="primary"
                  @click="submitGrade(scope.row.gradeId,scope.row.totalScore,scope.row.usualScore,scope.row.midScore,scope.row.finalScore)">
                  更新成绩</el-button>
              </p>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope">
              <p v-if="scope.row.gradeStatus===2">
                <el-button type="primary" @click="gradeReview(scope.row.gradeId)">查看反馈</el-button>
              </p>
              <p v-else>
                <el-button type="primary" disabled="true">查看反馈</el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="用户详情" :visible="userInfoDialog" @close="btnCandel">
        <el-form :model="userInfo" class="info-container">
          <el-form-item class="textarea" label="类别 (教务员/学生/教师)" prop="type">
            <el-input v-model="userInfo.type" disabled="true" placeholder="请输入类别" type="text"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="账号" prop="user_id">
            <el-input v-model="userInfo.userId" disabled="true" placeholder="请输入学号/教工号" type="text"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="姓名" prop="password">
            <el-input v-model="userInfo.userName" disabled="true" type="text" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="身份证号" prop="identity_id">
            <el-input v-model="userInfo.identityId" disabled="true" type="text" placeholder="请输入身份证号"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="性别 (男/女)" prop="user_sex">
            <el-input v-model="userInfo.userSex" disabled="true" type="text" placeholder="请输入性别"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="学院" prop="college">
            <el-input v-model="userInfo.college" disabled="true" type="text" placeholder="请输入学院"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="邮箱" prop="email">
            <el-input v-model="userInfo.email" disabled="true" type="text" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item class="textarea" label="密码" prop="password">
            <el-input v-model="userInfo.password" type="text" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitUserUpdate">确认更新</el-button>
        </el-form>

      </el-dialog>
      <el-dialog title="提交反馈" :visible="viewGDialog" @close="btnCandel">

        <el-button @click="back">返回成绩单列表</el-button>

        学生反馈意见如下

        <el-input v-model="objection" :rows="5" disabled="true" class="reviewText" type="textarea"></el-input>

        <p v-if="isHandle">
          您已处理完毕，处理意见如下

          <el-input v-model="reviewOpinion" placeholder="请输入处理意见" :rows="5" class="input" type="textarea"
            disabled="true"></el-input>

          请等待学生处理
        </p>
        <p v-else>
          请输入处理意见 并选择驳回或修改成绩

          <el-input v-model="reviewOpinion" placeholder="请输入处理意见" :rows="5" class="input" type="textarea"></el-input>

          <el-button @click="reject">驳回反馈</el-button>

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
            <el-table-column width="50" />
            <el-table-column width="150">
              <el-button @click="update">更新成绩</el-button>
            </el-table-column>
          </el-table>
        </p>

      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    courseList,
    getStudentGrade,
    listTeacherCourse,
    teacherGrade
  } from '@/api/course'
  export default {
    name: "Senator",
    data() {
      return {
        page_type: 0,
        userData: [],
        courseData: [],
        gradeData: [],
        gradeData2: [],
        isShowDialog: false,
        updateUserDialog: false,
        userInfo: [],
        userInfoDialog: false,
        viewGDialog: false,
        objection: '',
        reviewOpinion: '',
        isHandle: false,
      }
    },
    created() {
      this.axios.post('/user/list')
        .then((res) => {
          //console.log(res.data);
          this.userData = res.data.data
        })
        .catch((error) => {
          console.log(error);
        });
      this.loadcouerse();
    },
    methods: {
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
                  } else {
                    this.$message.error(res.data.message);
                  }
                })
            } else {
              this.$message.error(res.data.message);
            }
          })
      },
      submitUserUpdate() {
        var params = new URLSearchParams();
        params.append('user_id', this.userInfo['userId']);
        params.append('password', this.userInfo['password']);
        this.axios.post('/user/update-pwd', params)
          .then((res) => {
            //console.log(res.data);
            this.$message.success("修改密码成功");
            this.userInfoDialog = false
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async loadcouerse() {
        var params = new URLSearchParams();
        params.append('user_id', sessionStorage.getItem('user_id'));
        let result = await listTeacherCourse(params)
        console.log(result.data.data);
        this.courseData = result.data.data;
        console.log(this.courseData);
      },
      async courseGrade(course_id) {

        var params = new URLSearchParams();
        params.append('course_id', course_id);
        //this.$router.push("/teacher/grade");
        let result = await teacherGrade(params);
        this.gradeData2 = result.data.data;
        this.isShowDialog = true;
      },
      btnCandel() {
        this.isShowDialog = false;
        this.userInfoDialog = false;
        this.viewGDialog = false;
      },
      confirmGrade(grade_id) {
        var params = new URLSearchParams();
        params.append('grade_id', grade_id);
        this.axios.post('/grade/confirm', params)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        this.$message.success("确认成功");
      },
      submitGrade(grade_id, total_score, usual_score, mid_score, final_score) {
        var params = new URLSearchParams();
        params.append('grade_id', grade_id);
        params.append('total_score', total_score);
        params.append('usual_score', usual_score);
        params.append('mid_score', mid_score);
        params.append('final_score', final_score);
        this.axios.post('/grade/update', params)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        this.$message.success("发布成功");
      },
      toUserInfo() {
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
        this.userInfoDialog = true
      },
      toUserPage() {
        this.page_type = 1
      },
      toCoursePage() {
        this.page_type = 2
      },
      back() {
         this.viewGDialog = false;
         this.isShowDialog =true;
      },
      logOut() {
        this.$router.push("/");
      },
      gradeReview(grade_id) {
        sessionStorage.setItem('grade_id', grade_id);
        var params = new URLSearchParams();
        params.append('grade_id', grade_id);
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
            this.viewGDialog = true;
          })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .page-tools {
    margin: 10px;
  }

  .dashboard {
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .disable {
    ::v-deep .el-upload--picture-card {
      display: none;
    }
  }

  .el-dialog {
    width: 95%
  }

</style>
