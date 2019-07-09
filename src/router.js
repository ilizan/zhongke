import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Cookies from 'js-cookie'
import api from './http/api'
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
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

console.log(router)

router.beforeEach((to, from, next) => {
  let token = Cookies.get('token')
  let userId = JSON.parse(sessionStorage.getItem('user')).userId;
  if (to.path == '/login') {
    if (token) {//已存有token，跳转首页
      next({ path: '/' })
    } else {
      next();
    }
  } else {
    if (!token) {
      next({ path: '/' })
    } else {
      //动态请求菜单
      addMentRoutes(userId, to, from);
      next();
    }
  }
});

function addMentRoutes(userId, to, from){
  api.menu.menu({'userId':userId}).then(res =>{
    console.log(res)
  }).then(res=>{
    
  });
}
export default router