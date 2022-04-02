<template>
  <div class="container" align="center">

    <div class="title-container">
      <h3 class="title">课程信息</h3>
    </div>

    <el-button class="button" @click="back">返回</el-button>
    <el-form :model="courseInfo" class="info-container">
      <el-col :span="12" v-for="(item,index) in courseInfo" :key="index">
        <el-form-item :label="keyMap[index]" class="input-container">
          <div v-if="index==='courseId'" class="input">
            <el-input v-model="courseInfo[index]" disabled="true"></el-input>
          </div>
          <div v-else class="input">
            <el-input v-model="courseInfo[index]"></el-input>
          </div>
        </el-form-item>
      </el-col>

      <el-button @click="addStudent">添加学生</el-button>
      <br/>
      <br/>
      <el-button @click="submitUpdate">确认更新</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "CourseInfo",
  data() {
    return {
      keyMap: {
        courseId: '课程号',
        courseName: '课程名',
        teacherId: '教师教工号',
        capacity: '课程容量'
      },
      courseInfo: []
    }
  },
  created() {
    var params = new URLSearchParams();
    params.append('course_id', sessionStorage.getItem('course_info_id'));
    this.axios.post('/course/get', params)
      .then((res) => {
        console.log(res.data);
        this.courseInfo = res.data.data;
        delete(this.courseInfo['id']);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    back() {
      this.$router.push("/senator");
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
          this.$message.info("更新成功");
          this.$router.push("/senator/course/info");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addStudent() {
      this.$router.push("/senator/course/info/add");
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  min-height: 100%;
  width: 100%;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  max-width: 100%;
  padding: 60px 35px 0;

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

  .button {
    margin: 0 auto 20px auto;
  }

  .info-container {

    .info {
      padding-left: 500px;
      font-size: 20px;
      text-align: left;
      margin: 20px 0 0 0;
    }
  }


  .input-container {
    padding: 0 300px;

    .input {
      width: 80%;
      left: 100px;
      position: absolute;
    }
  }

}

</style>
