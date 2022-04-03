import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/login/login";
import Student from "../views/student/student";
import Senator from "../views/senator/senator";
import CreateUser from "../views/senator/createUser";
import userInfo from "../views/senator/userInfo";
import courseInfo from "../views/senator/courseInfo";
import CreateCourse from "../views/senator/createCourse";
import AddStudent from "../views/senator/addStudent";
import StudentInfo from "../views/student/studentInfo";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/student/',
      name: 'Student',
      component: Student
    },
    {
      path: '/senator/',
      name: 'Senator',
      component: Senator
    },
    {
      path: '/senator/user',
      name: 'CreateUser',
      component: CreateUser
    },
    {
      path: '/senator/user/info',
      name: 'UserInfo',
      component: userInfo
    },
    {
      path: '/senator/course/info',
      name: 'CourseInfo',
      component: courseInfo
    },
    {
      path: '/senator/course',
      name: 'CreateCourse',
      component: CreateCourse
    },
    {
      path: '/senator/course/info/add',
      name: 'AddStudent',
      component: AddStudent
    },
    {
      path: '/student/info',
      name: 'StudentInfo',
      component: StudentInfo
    }
  ]
})
