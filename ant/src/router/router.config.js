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
    },
    {
      path: '*',
      component: () => import('@/views/404.vue')
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
          meta: { title: '表单' }
        },
        {
          path: '/data/calendar',
          name: 'calendar',
          component: () => import('@/views/data/calendar'),
          meta: { title: '日历' }
        },
        {
          path: '/data/calendar2',
          name: 'calendar2',
          component: () => import('@/views/data/calendar2'),
          meta: { title: '日历2' }
        },
        {
          path: '/data/gchars',
          name: 'gchars',
          component: () => import('@/views/data/gchars'),
          meta: { title: '流程图(未)' }
        }
      ]
    }
  ]
