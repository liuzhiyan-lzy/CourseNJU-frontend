import request from '@/utils/request'

// 课程列表
export function courseList() {
  return request({
    url: '/course/list',
    method: 'post'
  })
}
// 课程查询
export function getCourse(params) {
  return request({
    url: '/course/get',
    method: 'post',
    params
  })
}
//根据学号查询成绩单
export function getStudentGrade(params) {
  return request({
    url: '/grade/get-student',
    method: 'post',
    params
  })
}
//根据工号查询课程
export function listTeacherCourse(params) {
  return request({
    url: '/course/list-teacher',
    method: 'post',
    params
  })
}
//根据工号查询成绩单
export function teacherGrade(params) {
  return request({
    url: '/grade/get-course',
    method: 'post',
    params
  })
}