<template>
  <div class="senator-container">

    <div class="title-container">
      <h3 class="title">课程成绩预发布系统</h3>
    </div>

    <div v-if="page_type === 0" align="center">
      <el-button @click="logOut">登出</el-button>
      <br/>
      <br/>
      <el-button class="button-container" @click="toUserPage">用户管理</el-button>
      <br/>
      <el-button class="button-container" @click="toCoursePage">课程管理</el-button>
    </div>

    <div v-else-if="page_type === 1" align="center">
      <el-button @click="back">返回</el-button>
      <el-button @click="createUser">创建用户</el-button>
      <el-table class="table-container" :data="userData" style="width: 100%">
        <el-table-column prop="userId" label="学号" width="180"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="" label="查看详情" width="180">
          <template slot-scope="scope">
            <el-button @click="toUserInfo(scope.row.userId)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else align="center">
      <el-button @click="back">返回</el-button>
      <el-button @click="createCourse">创建课程</el-button>
      <el-table class="table-container" :data="courseData" style="width: 100%">
        <el-table-column prop="courseId" label="课程号" width="180"></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="180"></el-table-column>
        <el-table-column prop="" label="查看详情" width="180">
          <template slot-scope="scope">
            <el-button @click="toCourseInfo(scope.row.courseId)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Senator",
  data() {
    return {
      page_type: 0,
      userData: [],
      courseData: []
    }
  },
  created() {
    this.axios.post('/user/list')
      .then((res) => {
        console.log(res.data);
        this.userData = res.data.data
      })
      .catch((error) => {
        console.log(error);
      });
    this.axios.post('/course/list')
      .then((res) => {
        console.log(res.data);
        this.courseData = res.data.data
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    toUserPage() {
      this.page_type = 1
    },
    toCoursePage() {
      this.page_type = 2
    },
    back() {
      this.page_type = 0
    },
    logOut() {
      this.$router.push("/");
    },
    createUser() {
      this.$router.push("/senator/user");
    },
    createCourse() {
      this.$router.push("/senator/course")
    },
    toUserInfo(user_id) {
      sessionStorage.setItem('user_info_id', user_id)
      this.$router.push("/senator/user/info");
    },
    toCourseInfo(course_id) {
      sessionStorage.setItem('course_info_id', course_id)
      this.$router.push("/senator/course/info");
    }
  }
}
</script>

<style lang="scss" scoped>

.senator-container {
  min-height: 100%;
  width: 100%;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  max-width: 100%;
  padding: 100px 35px 0;
  margin: 0 auto;

  .button-container {
    position: relative;
    width: 15%;
    margin: 2em 0 30px;
    height: 70px;
    font-size: 16px !important;
  }

  .table-container {
    position: relative;
    margin: 2em 0 30px;
  }

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

}

</style>
