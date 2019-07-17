/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap =
  [
    {
      path: '/',
      redirect: '/welcome',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: 'welcome',
          component: () => import('@/views/Welcome.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    }
  ]

export const navTreeData =
  [
    {
      path: '/data',
      name: 'data',
      meta: { title: '列表' },
      redirect: '/welcome',
      // component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '/data/tables',
          name: 'tables',
          component: () => import('@/views/data/tables'),
          meta: { title: '分页' }
        },
        {
          path: '/data/forms',
          name: 'forms',
          component: () => import('@/views/data/forms'),
          meta: { title: '工作台' }
        }
      ]
    }
  ]
