import Layout from '@/layout'
export default {
  path: '/adminindex',
  name: 'adminindex',
  component: Layout,
  children: [{
    path: '',
    name: 'adminindex',
    component: () => import('@/views/adminindex/index'),
    meta: { title: '所有课程列表', icon: 'form' }
  }]
}
