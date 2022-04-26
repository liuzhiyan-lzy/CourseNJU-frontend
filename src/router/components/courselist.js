import Layout from '@/layout'
export default {
  path: '/courselist',
  name: 'courselist',
  component: Layout,
  children: [{
    path: '',
    name: 'courselist',
    component: () => import('@/views/courselist/index'),
    meta: { title: '学生课程列表', icon: 'form' }
  }]
}
