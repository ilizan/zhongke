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
      meta: { title: '菜单' },
      redirect: '/',
      // component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: '',
          flShow:true,
          component: () => import('@/views/Welcome.vue'),
          meta: { title: '' }
        },
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
          path: '/data/task',
          name: 'task',
          component: () => import('@/views/data/task'),
          meta: { title: '任务' }
        },
        {
          path: '/data/echarts',
          name: 'echarts',
          component: () => import('@/views/data/echarts'),
          meta: { title: 'echarts' }
        },
        {
          path: '/data/edit',
          name: 'edit',
          component: () => import('@/views/data/edit'),
          meta: { title: '编辑器' }
        }
        // {
        //   path: '/data/gchars',
        //   name: 'gchars',
        //   component: () => import('@/views/data/gchars'),
        //   meta: { title: '流程图(未)' }
        // }
      ]
    }
  ]
