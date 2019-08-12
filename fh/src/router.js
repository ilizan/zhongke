import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
//     }
//   ]
// })



router.beforeEach((to, from, next) => {
  const user = Cookies.get('user');
  if (to.path == '/login') {
    if (user) {
      next({ path: '/' })
    } else {
      next();
    }
  } else {
    if (!user) {
      next({ path: '/login' })
    } else {
        next();
    }
  }
})



export default router;