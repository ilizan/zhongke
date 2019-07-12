import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'
import App from './App.vue'
import router from './router'
import api from './http'
import store from './store/index'

import mock from "@/mock/index"
import global_ from './global'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(api)

Vue.prototype.GLOBAL = global_;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
