import Layout from '@/layout'
export default {
  path: '/teacherindex',
  name: 'teacherindex',
  component: Layout,
  children: [{
    path: '',
    name: 'teacherindex',
    component: () => import('@/views/teacherindex/index'),
    meta: { title: '教师课程列表', icon: 'form' }
  }]
}
