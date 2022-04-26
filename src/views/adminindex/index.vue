<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card class="page-tools">
        <el-button type="primary" size="medium" @click="userList">用户列表</el-button>
        <el-button type="primary" size="medium" @click="createUser">注册账号</el-button>
        <el-button type="primary" size="medium" @click="createCourse">添加课程</el-button>
        <el-divider />
        <el-table class="table-container" :data="courseData" style="width: 100%">
          <el-table-column prop="courseId" label="课程号"></el-table-column>
          <el-table-column prop="courseName" label="课程名"></el-table-column>
          <el-table-column prop="teacherId" label="教师教工号"></el-table-column>
          <el-table-column prop="capacity" label="课程容量"></el-table-column>
          <el-table-column prop="courseStatus" label="查看成绩单">
            <template slot-scope="scope">
              <el-button type="primary" @click="updateCourse(scope.row.courseId)">更新</el-button>
              <el-button type="primary" @click="addStudentpage(scope.row.courseId)">添加学生</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider />
        <!-- </el-row> -->
      </el-card>
      <el-dialog title="添加学生" :visible="addStuDialog" @close="btnCandel">
        <el-form :model="addStudentInfo">

          <el-form-item class="textarea" label="请输入需要添加的学号 或 上传学号名单" prop="student_id">
            <el-input v-model="addStudentInfo.student_id" placeholder="请输入学号" type="text"></el-input>
          </el-form-item>
          <el-button class="button" type="primary" @click="addStudent">添加学生</el-button>

          <el-upload style="display: inline" :show-file-list="false" :on-success="onSuccess" :on-error="onError"
            :before-upload="beforeUpload" action="/course/add-students">
            <el-button type="success" :disabled="!enabledUploadBtn">上传文件</el-button>
          </el-upload>

        </el-form>
      </el-dialog>
      <el-dialog title="更新课程" :visible="updateStuDialog" @close="btnCandel">
        <el-form :model="courseInfo" class="info-container">
          <el-form-item label="课程号">
            <el-input v-model="courseInfo.courseId"></el-input>
          </el-form-item>
          <el-form-item label="课程名">
            <el-input v-model="courseInfo.courseName"></el-input>
          </el-form-item>
          <el-form-item label="教师教工号">
            <el-input v-model="courseInfo.teacherId"></el-input>
          </el-form-item>
          <el-form-item label="课程容量">
            <el-input v-model="courseInfo.capacity"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitUpdate">确认更新</el-button>

        </el-form>
      </el-dialog>
      <el-dialog title="添加课程" :visible="addCourceDialog" @close="btnCandel">
        <el-form :model="courseInfo2" class="info-container">
          <el-form-item label="课程号">
            <el-input v-model="courseInfo2.courseId"></el-input>
          </el-form-item>
          <el-form-item label="课程名">
            <el-input v-model="courseInfo2.courseName"></el-input>
          </el-form-item>
          <el-form-item label="教师教工号">
            <el-input v-model="courseInfo2.teacherId"></el-input>
          </el-form-item>
          <el-form-item label="课程容量">
            <el-input v-model="courseInfo2.capacity"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleCourse">确认提交</el-button>
        </el-form>
      </el-dialog>
      <el-dialog title="用户列表" :visible="userListDialog" @close="btnCandel">
        <el-table class="table-container" :data="userData" style="width: 100%">
          <el-table-column prop="userId" label="学号"></el-table-column>
          <el-table-column prop="userName" label="姓名"></el-table-column>
          <el-table-column prop="" label="查看详情">
            <template slot-scope="scope">
              <el-button type="primary" @click="toUserInfo(scope.row.userId)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="用户详情" :visible="toUserInfoDialog" @close="btnCandel">
        <el-form :model="userInfo" class="info-container">
          <el-form-item class="textarea" label="类别 (教务员/学生/教师)" prop="type">
            <el-input v-model="userInfo.type" placeholder="请输入类别" type="text"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="账号" prop="user_id">
            <el-input v-model="userInfo.userId" placeholder="请输入学号/教工号" type="text"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="姓名" prop="password">
            <el-input v-model="userInfo.userName" type="text" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="身份证号" prop="identity_id">
            <el-input v-model="userInfo.identityId" type="text" placeholder="请输入身份证号"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="性别 (男/女)" prop="user_sex">
            <el-input v-model="userInfo.userSex" type="text" placeholder="请输入性别"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="学院" prop="college">
            <el-input v-model="userInfo.college" type="text" placeholder="请输入学院"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="邮箱" prop="email">
            <el-input v-model="userInfo.email" type="text" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitUserUpdate">确认更新</el-button>
        </el-form>

      </el-dialog>
      <el-dialog title="注册账户" :visible="addUserDialog" @close="btnCandel">
        <el-form :model="registerForm" class="info-container">
       
          <el-form-item class="textarea" label="类别 (教务员/学生/教师)" prop="type">
            </br>
            <el-radio class='m0' :disabled="disable" v-model="registerForm.type" label="教务员" >教务员</el-radio>
            <el-radio class='m0' :disabled="disable" v-model="registerForm.type" label="学生" >学生</el-radio> 
            <el-radio class='m0' :disabled="disable" v-model="registerForm.type" label="教师" >教师</el-radio> 
          </el-form-item>

          <el-form-item class="textarea" label="账号" prop="user_id">
            <el-input v-model="registerForm.user_id" placeholder="请输入学号/教工号" type="text"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="姓名" prop="password">
            <el-input v-model="registerForm.user_name" type="text" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="身份证号" prop="identity_id">
            <el-input v-model="registerForm.identity_id" type="text" placeholder="请输入身份证号"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="性别 (男/女)" prop="user_sex">
            </br>
            <el-radio class='m0' :disabled="disable" v-model="registerForm.user_sex" label="女" >女</el-radio>
            <el-radio class='m0' :disabled="disable" v-model="registerForm.user_sex" label="男" >男</el-radio> 
          </el-form-item>

          <el-form-item class="textarea" label="学院" prop="college">
            <el-input v-model="registerForm.college" type="text" placeholder="请输入学院"></el-input>
          </el-form-item>

          <el-form-item class="textarea" label="邮箱" prop="email">
            <el-input v-model="registerForm.email" type="text" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-button type="primary" class="button" @click="handleRegister">注册用户</el-button>
          <el-upload style="display: inline" :show-file-list="false" :on-success="onSuccess" :on-error="onError"
            :before-upload="beforeUpload" action="/user/import">
            <el-button type="success" :disabled="!enabledUploadBtn">上传文件</el-button>
          </el-upload>
        </el-form>

      </el-dialog>
    </div>
  </div>
</template>

<script>
  import indeximg from '@/components/upimage/indeximg.vue'
  import {
    courseList,
    getStudentGrade,
    listTeacherCourse,
    teacherGrade,
    getCourse
  } from '@/api/course'
  export default {
    name: "Senator",
    data() {
      return {
        optionsCategory: [{
            "id": 1,
            "label": "教务员"
          },
          {
            "id": 2,
            "label": "学生"
          },
          {
            "id": 3,
            "label": "教师"
          }

        ],
        addStudentInfo: {
          student_id: ''
        },
        enabledUploadBtn: true,
        page_type: 0,
        userData: [],
        courseData: [],
        gradeData: [],
        addStuDialog: false,
        updateStuDialog: false,
        courseInfo: [],
        courseInfo2: [],
        addCourceDialog: false,
        userListDialog: false,
        toUserInfoDialog: false,
        addUserDialog: false,
        userInfo: [],
        registerForm: []
      }
    },
    created() {
      this.loadcouerse();
    },
    methods: {
      createUser() {
        this.addUserDialog = true;
      },
      //分类改变后被调用
      handleCategoryChange() {
        this.registerForm.type = this.optionsValue[1];
      },
      handleRegister() {
        var params = new URLSearchParams();
        if (this.registerForm.type === '教务员')
          params.append('type', '0');
        else if (this.registerForm.type === '学生')
          params.append('type', '1');
        else
          params.append('type', '2');
        params.append('user_id', this.registerForm.user_id);
        params.append('user_name', this.registerForm.user_name);
        params.append('identity_id', this.registerForm.identity_id);
        if (this.registerForm.user_sex === '男')
          params.append('user_sex', '1');
        else
          params.append('user_sex', '2');
        params.append('college', this.registerForm.college);
        params.append('email', this.registerForm.email);
        this.axios.post('/user/register', params)
          .then((res) => {
            console.log(res.data);
            this.$message.success("注册成功");
          })
          .catch((error) => {
            console.log(error);
          });
      },
      toUserInfo(user_id) {
        var params = new URLSearchParams();
        params.append('user_id', user_id);
        this.axios.post('/user/get', params)
          .then((res) => {
            console.log(res.data.data);
            this.userInfo = res.data.data;
            if (this.userInfo['userSex'] === 1)
              this.userInfo['userSex'] = '男';
            else
              this.userInfo['userSex'] = '女';
            if (this.userInfo['type'] === 0)
              this.userInfo['type'] = '教务员';
            else if (this.userInfo['type'] === 1)
              this.userInfo['type'] = '学生';
            else
              this.userInfo['type'] = '教师';
            delete(this.userInfo['id']);
          })
          .catch((error) => {
            console.log(error);
          });
        this.toUserInfoDialog = true;
      },
      submitUserUpdate() {
        var params = new URLSearchParams();
        if (this.userInfo['userSex'] === '男')
          this.userInfo['userSex'] = 1;
        else
          this.userInfo['userSex'] = 2;
        params.append('user_id', this.userInfo.userId);
        params.append('password', this.userInfo.password);
        params.append('user_name', this.userInfo.userName);
        params.append('identity_id', this.userInfo.identityId);
        params.append('user_sex', this.userInfo.userSex);
        params.append('college', this.userInfo.college);
        params.append('email', this.userInfo.email);
        this.axios.post('/user/update', params)
          .then((res) => {
            console.log(res.data);
            this.$message.success("更新成功");
          })
          .catch((error) => {
            console.log(error);
          });
      },
      userList() {
        this.axios.post('/user/list')
          .then((res) => {
            //console.log(res.data);
            this.userData = res.data.data
          })
          .catch((error) => {
            console.log(error);
          });
        this.userListDialog = true;
      },
      createCourse() {
        this.addCourceDialog = true;
      },
      handleCourse() {
        var params = new URLSearchParams();
        params.append('course_id', this.courseInfo2.courseId);
        params.append('course_name', this.courseInfo2.courseName);
        params.append('teacher_id', this.courseInfo2.teacherId);
        params.append('capacity', this.courseInfo2.capacity);
        this.axios.post('/course/add', params)
          .then((res) => {
            console.log(res.data);
            if (res.data.code === 404) {
              this.$message.error(res.data.message);
            } else {
              this.$message.success("创建成功");
              this.loadcouerse();
              this.addCourceDialog = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      submitUpdate() {
        var params = new URLSearchParams();
        params.append('course_id', this.courseInfo.courseId);
        params.append('course_name', this.courseInfo.courseName);
        params.append('teacher_id', this.courseInfo.teacherId);
        params.append('capacity', this.courseInfo.capacity);
        this.axios.post('/course/update', params)
          .then((res) => {
            console.log(res.data);
            this.$message.success('更新成功')
            this.loadcouerse();
            this.updateStuDialog = false;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async updateCourse(course_id) {
        var params = new URLSearchParams();

        params.append('course_id', course_id);
        let result = await getCourse(params);


        this.courseInfo = result.data.data;

        console.log(this.courseInfo);
        this.updateStuDialog = true;
      },
      addStudentpage(course_id) {
        sessionStorage.setItem('course_info_id', course_id)
        this.addStuDialog = true;
      },
      addStudent() {
        var params = new URLSearchParams();
        params.append('course_id', sessionStorage.getItem('course_info_id'));
        params.append('student_id', this.addStudentInfo.student_id);
        this.axios.post('/course/add-student', params)
          .then((res) => {
            console.log(res.data);
            this.$message.success('添加成功')
            this.addStuDialog = false
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async loadcouerse() {
        let result = await courseList()
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
        this.addStuDialog = false;
        this.updateStuDialog = false;
        this.addCourceDialog = false;
        this.userListDialog = false;
        this.toUserInfoDialog = false;
        this.addUserDialog = false;
      },
      confirmGrade(grade_id) {
        var params = new URLSearchParams();
        params.append('grade_id', grade_id);
        this.axios.post('/grade/confirm', params)
          .then((res) => {
            console.log(res.data);
            this.$router.go(0);
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
            this.$router.go(0);
          })
          .catch((error) => {
            console.log(error);
          });
        this.$message.success("发布成功");
      },

      gradeReview(grade_id) {
        sessionStorage.setItem('grade_id', grade_id);
        this.$router.push('/student/grade');
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
