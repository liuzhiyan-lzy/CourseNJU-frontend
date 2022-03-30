<template>
  <el-table :data="courseData" style="width: 100%">
    <el-table-column prop="course_name" label="课程名称" width="180"></el-table-column>
    <el-table-column prop="course_status" label="课程状态" width="180"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      courseData: []
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
          this.courseData = res.data.data
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>
