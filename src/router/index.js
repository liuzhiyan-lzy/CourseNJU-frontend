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
import StudentGrade from "../views/student/studentGrade";
import Teacher from "../views/teacher/teacher";
import TeacherInfo from "../views/teacher/teacherInfo";
import TeacherGrade from "../views/teacher/teacherGrade";
import TeacherReview from "../views/teacher/teacherReview";

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
    },
    {
      path: '/student/grade',
      name: 'StudentGrade',
      component: StudentGrade
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher
    },
    {
      path: '/teacher/info',
      name: 'TeacherInfo',
      component: TeacherInfo
    },
    {
      path: '/teacher/grade',
      name: 'TeacherGrade',
      component: TeacherGrade
    },
    {
      path: '/teacher/review',
      name: 'TeacherReview',
      component: TeacherReview
    }
  ]
})
