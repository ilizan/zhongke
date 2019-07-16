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
          path: '/welcome',
          name: 'welcome',
          component: () => import('@/views/Welcome.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue')
    }
  ]

export const navTreeData =
  [
    {
      path: '/data',
      name: 'data',
      redirect: '/data/tables',
      meta: { title: '列表' },
      children: [
        {
          path: '/data/tables',
          name: 'Tables',
          component: () => import('@/views/data/tables'),
          meta: { title: '分页' }
        },
        {
          path: '/data/forms',
          name: 'Forms',
          component: () => import('@/views/data/forms'),
          meta: { title: '工作台' }
        }
      ]
    }
  ]
