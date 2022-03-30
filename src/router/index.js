import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/login/login";
import Student from "../views/student/student";

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
    }
  ]
})