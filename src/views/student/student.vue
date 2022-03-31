<template>
  <div>
    <div>
      <button @click="logOut">登出</button>
    </div>
    <div>
      <button @click="toChangePassword">修改密码</button>
    </div>
    <el-table :data="gradeData" style="width: 100%">
      <el-table-column prop="courseName" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="totalScore" label="课程成绩" width="180"></el-table-column>
      <el-table-column prop="gradeStatus" label="成绩单状态" width="180">
        <template slot-scope="scope">
          <p v-if="scope.row.gradeStatus===1">
            <el-button @click="toGradeInfo">查看详情</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>
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
    this.findPage()
  },
  methods: {
    findPage() {
      var params = new URLSearchParams();
      params.append('student_id', sessionStorage.getItem('user_id'));
      this.axios.post('/grade/get-student', params)
        .then((res) => {
          console.log(res.data);
          this.gradeData = res.data.data
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toGradeInfo() {

    },
    toChangePassword() {

    },
    logOut() {

    }
  }
}
</script>

<style scoped>

</style>
