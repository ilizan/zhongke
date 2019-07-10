import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuTree: [],
    menuRouteLoaded: false
  },
  mutations: {
    setMenuTree(state, menuTree) {
      state.menuTree = menuTree;
    },
    menuRouteLoaded(state, menuRouteLoaded){
      state.menuRouteLoaded = menuRouteLoaded
    }
  },
  actions: {

  }
})
