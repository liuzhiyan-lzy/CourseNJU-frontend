<template>
  <div>
    <div v-if="page_type === 0">
      <el-button @click="toUserPage">用户管理</el-button>
      <el-button @click="toCoursePage">课程管理</el-button>
    </div>
    <div v-else-if="page_type === 1">
      <el-button @click="back">返回</el-button>
      <el-button @click="createUser">创建用户</el-button>
      <el-table :data="userData" style="width: 100%">
        <el-table-column prop="userId" label="学号" width="180"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="" label="查看详情" width="180">
          <template slot-scope="scope">
            <el-button @click="toUserInfo(scope.row.userId)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-button @click="back">返回</el-button>
      <el-button @click="createCourse">创建课程</el-button>
      <el-table :data="courseData" style="width: 100%">
        <el-table-column prop="courseId" label="课程号" width="180"></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="180"></el-table-column>
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
    createUser() {
      this.$router.push("/senator/user");
    },
    createCourse() {

    },
    toUserInfo(user_id) {
      sessionStorage.setItem('user_info_id', user_id)
      this.$router.push("/senator/user/info");
    }
  }
}
</script>

<style scoped>

</style>
