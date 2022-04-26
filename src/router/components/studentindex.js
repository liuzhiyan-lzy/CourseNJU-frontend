import Layout from '@/layout'
export default {
  path: '/studentindex',
  name: 'studentindex',
  component: Layout,
  children: [{
    path: '',
    name: 'studentindex',
    component: () => import('@/views/studentindex/index'),
    meta: { title: '学生课程列表', icon: 'form' }
  }]
}
