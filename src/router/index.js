import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/login/login";
import Student from "../views/student/student";
import Senator from "../views/senator/senator";
import CreateUser from "../views/senator/createUser";
import userInfo from "../views/senator/userInfo";

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
      name: 'Info',
      component: userInfo
    }
  ]
})
