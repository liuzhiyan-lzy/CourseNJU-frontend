<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card class="page-tools">
        <el-row type="flex">
          <el-col>
            <!--el-button
              type="primary"
              size="medium"
              @click="isShowDialog = true"
            >添加课程</el-button-->
            <el-button
              type="primary"
              size="medium"
              @click="showAllData"
            >查看全部</el-button>
          </el-col>
        </el-row>
        <el-divider />
        <el-table class="table-container" :data="courseData" style="width: 100%">
        <el-table-column prop="courseId" label="课程号" width="180"></el-table-column>
        <el-table-column prop="courseName" label="课程名" width="180"></el-table-column>
        <el-table-column prop="" label="查看详情" width="180">
          <template slot-scope="scope">
            <el-button @click="toCourseInfo(scope.row.courseId)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-divider />
       
        <div class="block">
          <el-row type="flex" justify="center" align="middle" style="height:60px">
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :page-size="page._limit"
              @current-change="changePage"
            />
          </el-row>
        </div>
        <!-- </el-row> -->
      </el-card>
      <el-dialog
        title="确认成绩"
        :visible="isShowDialog"
        @close="btnCandel">
        <el-form
          ref=""
          :model="formData"
          :rules="rules"
          label-width="80px"
          >
          <el-form-item label="课程名称" prop="coursename">
            <el-input v-model="formData.coursename" />
          </el-form-item>
          <el-form-item label="上课时间" prop="coursetime">
            <el-input v-model="formData.coursetime" />
          </el-form-item>
          <el-form-item label="授课教师" prop="teacher">
            <el-input v-model="formData.teacher" />
          </el-form-item>
          <el-form-item label="课程状态" prop="status">
            <el-input v-model="formData.status" />
          </el-form-item>
          <el-form-item label="成绩" prop="grade">
            <el-input v-model="formData.grade" />
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="wuyy">无异议</el-button>
            <el-button type="primary" @click="youyy">有异议</el-button>
            <el-button @click="btnCandel">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import indeximg from '@/components/upimage/indeximg.vue'
 import {
    courseList
  } from '@/api/course'
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
