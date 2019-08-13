import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Room from './views/Room.vue'
import Main from './views/Main.vue'
import A1 from './views/a1.vue'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/room',
      component: Home,
      children: [
        {
          path: '/room',
          name: 'room',
          component: Room
        },
        {
          path: '/main',
          name: 'main',
          component: Main
        },
        // {
        //   path: '/a1',
        //   name: 'a1',
        //   component: A1
        // }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})



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