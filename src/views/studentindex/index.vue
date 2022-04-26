<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card class="page-tools">
        <el-button @click="toUserInfo" type="primary">个人信息</el-button>
        </el-row>
        <el-divider />
        <el-table :data="gradeData" style="width: 100%">
          <el-table-column prop="courseId" label="课程号" width="180"></el-table-column>
          <el-table-column prop="courseName" label="课程名" width="180"></el-table-column>
          <el-table-column prop="courseStatus" label="课程状态" width="150">
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
          <el-table-column prop="totalScore" label="总分">
            <template slot-scope="scope">
              <p v-if="scope.row.gradeStatus===0">
                \
              </p>
              <p v-else>
                {{scope.row.totalScore}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="usualScore" label="平时分数">
            <template slot-scope="scope">
              <p v-if="scope.row.gradeStatus===0">
                \
              </p>
              <p v-else>
                {{scope.row.usualScore}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="midScore" label="期中分数">
            <template slot-scope="scope">
              <p v-if="scope.row.gradeStatus===0">
                \
              </p>
              <p v-else>
                {{scope.row.midScore}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="finalScore" label="期末分数">
            <template slot-scope="scope">
              <p v-if="scope.row.gradeStatus===0">
                \
              </p>
              <p v-else>
                {{scope.row.finalScore}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="" label="确认成绩">
            <template slot-scope="scope">
              <p v-if="scope.row.gradeStatus===1">
                <el-button type="primary" @click="confirmGrade(scope.row.gradeId)">确认</el-button>
              </p>
              <p v-else>
                <el-button type="primary" disabled="true" >确认</el-button>
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="" label="反馈异议">
            <template slot-scope="scope">
              <p v-if="scope.row.gradeStatus===1">
                <el-button type="primary" @click="gradeReview(scope.row.gradeId)">提交反馈</el-button>
              </p>
              <p v-else-if="scope.row.gradeStatus===2">
                <el-button type="primary" @click="gradeReview(scope.row.gradeId)">查看反馈</el-button>
              </p>
              <p v-else>
                <el-button type="primary" disabled="true">提交反馈</el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>
        <el-divider />
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
        <el-dialog title="提交反馈" :visible="subGDialog" @close="btnCandel">
          <el-table class="table-container" :data="gradeData3" style="width: 100%">
            <el-table-column prop="courseId" label="课程号" width="180"></el-table-column>
            <el-table-column prop="courseName" label="课程名" width="180"></el-table-column>
            <el-table-column prop="totalScore" label="总分" width="180"></el-table-column>
            <el-table-column prop="usualScore" label="平时分数" width="180"></el-table-column>
            <el-table-column prop="midScore" label="期中分数" width="180"></el-table-column>
            <el-table-column prop="finalScore" label="期末分数" width="180"></el-table-column>
          </el-table>
          <p v-if="gradeStatus===1">
            <el-input v-model="objection" placeholder="请输入成绩反馈意见" :rows="8" class="input" type="textarea"></el-input>
            <el-button @click="addReview">提交反馈</el-button>
          </p>
          <p v-else-if="gradeReviewStatus===1">
            已提交反馈，等待教师处理

            <el-button @click="deleteReview">取消反馈</el-button>
          </p>
          <p v-else-if="gradeReviewStatus===2 && !inputReview">
            教师已驳回反馈，处理意见如下

            <el-input v-model="gradeReviewData.reviewOpinion" :rows="5" disabled="true" class="reviewText"
              type="textarea"></el-input>

            请选择继续反馈或确认成绩

            <el-button @click="confirmGrade(gradeId)">确认成绩</el-button>
            <el-button @click="continueReview">继续反馈</el-button>
          </p>
          <p v-else-if="gradeReviewStatus===2">
            <el-button @click="backReview">返回反馈详情</el-button>

            <el-input v-model="objection" placeholder="请输入成绩反馈意见" :rows="8" class="input" type="textarea"></el-input>

            <el-button @click="addObjection">提交反馈</el-button>
          </p>
          <p v-else-if="!inputReview">
            教师已查看反馈并修改成绩，处理意见如下


            <el-input v-model="gradeReviewData.reviewOpinion" :rows="5" disabled="true" class="reviewText"
              type="textarea"></el-input>

            请选择继续反馈或确认成绩

            <el-button @click="confirmGrade(gradeId)">确认成绩</el-button>
            <el-button @click="continueReview">继续反馈</el-button>
          </p>
          <p v-else>
            <el-button @click="backReview">返回反馈详情</el-button>

            <el-input v-model="objection" placeholder="请输入成绩反馈意见" :rows="8" class="input" type="textarea"></el-input>

            <el-button @click="addObjection">提交反馈</el-button>
          </p>

        </el-dialog>
        <!-- </el-row> -->
      </el-card>
    </div>
  </div>
</template>

<script>
  import indeximg from '@/components/upimage/indeximg.vue'
  import {
    courseList,
    getStudentGrade
  } from '@/api/course'
  export default {
    name: "Senator",
    data() {
      return {
        page_type: 0,
        userData: [],
        courseData: [],
        gradeData: [],
        userInfo: [],
        userInfoDialog: false,
        subGDialog:false,
        gradeReviewData: [],
        gradeStatus: 0,
        gradeReviewStatus: 0,
        objection: '',
        inputReview: false,
        gradeData3:[],
        gradeId:"",
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
            this.userInfo['type'] = '学生';
            delete(this.userInfo['id']);
          })
          .catch((error) => {
            console.log(error);
          });
        this.userInfoDialog = true
      },
      btnCandel() {
        this.isShowDialog = false;
        this.userInfoDialog = false;
        this.subGDialog =false;
      },
      async loadcouerse() {
        var params = new URLSearchParams();
        params.append('student_id', sessionStorage.getItem('user_id'));
        let result = await getStudentGrade(params)
        console.log(result.data.data);
        this.gradeData = result.data.data;
        console.log(this.gradeData);
      },
      confirmGrade(grade_id) {
        var params = new URLSearchParams();
        params.append('grade_id', grade_id);
        this.axios.post('/grade/confirm', params)
          .then((res) => {
            console.log(res.data);
            //this.$router.go(0);
            this.subGDialog =false;
          })
          .catch((error) => {
            console.log(error);
          });
        this.$message.success("确认成功");
      },
      toUserPage() {
        this.page_type = 1
      },
      toCoursePage() {
        this.page_type = 2
      },
      back() {
        this.page_type = 0
      },
      toCourseInfo(course_id) {
        sessionStorage.setItem('course_info_id', course_id)
      },
      gradeReview(grade_id) {
        this.gradeData3=[];
        sessionStorage.setItem('grade_id', grade_id);
        var params = new URLSearchParams();
        params.append('grade_id', grade_id);
        this.axios.post('/grade/get', params)
          .then((res) => {
            console.log(res.data);
            this.gradeStatus = res.data.data.gradeStatus;
            this.gradeData3.push(res.data.data);
            console.log(this.gradeData3);
            if (this.gradeStatus === 2) {
              this.axios.post('/review/get', params)
                .then((res) => {
                  console.log(res.data);
                  this.gradeReviewData = res.data.data;
                  this.gradeReviewStatus = res.data.data.reviewStatus;
                  this.gradeId = res.data.data.gradeId;
                 
                })
                .catch((error) => {
                  console.log(error);
                })
            }
             this.subGDialog =true;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      addReview() {
      var params = new URLSearchParams();
      params.append('grade_id', sessionStorage.getItem('grade_id'))
      params.append('objection_describe', this.objection);
      this.axios.post('/review/add', params)
        .then((res) => {
          console.log(res.data);
          this.$message.success("提交反馈成功");
          //this.$router.push('/student');
           this.subGDialog =false;
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
          this.$message.success("撤销反馈成功");
           this.subGDialog =false;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    continueReview() {
      this.inputReview = true;
      
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
          this.$message.success("提交反馈成功");
           this.subGDialog =false;
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

</style>
