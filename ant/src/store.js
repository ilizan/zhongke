import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuRouteLoaded: false,
    arr: [1, 2, 5, 3]
  },
  getters: {
    arrSort(state) {
      let arr = [];
      state.arr.forEach(item => {
        arr.push(parseInt(item));
      });
      let com = function (a, b) {
        return a - b
      }
      return arr.sort(com);
    }
  },
  mutations: {
    menuRouteLoaded(state, menuRouteLoaded) {
      state.menuRouteLoaded = menuRouteLoaded
    },
    setArr(state, arrData) {
      state.arr.push(arrData);
    },
    delArr(state) {
      state.arr = [];
    }
  },

  actions: {

  }
})
