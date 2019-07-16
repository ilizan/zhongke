import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuRouteLoaded: false
  },
  mutations: {
    menuRouteLoaded(state, menuRouteLoaded){
      state.menuRouteLoaded = menuRouteLoaded
    }
  },
  actions: {

  }
})
