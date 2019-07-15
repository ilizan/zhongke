/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap =
  [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    // {
    //   path: '/404',
    //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
    // }
  ]
  // [
  // {
  //   path: '/user',
  //   component: UserLayout,
  //   redirect: '/user/login',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'login',
  //       name: 'login',
  //       component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
  //     }
  //   ]
  // },
  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // }

  // ]
