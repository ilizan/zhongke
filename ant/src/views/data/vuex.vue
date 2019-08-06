<template>
  <div>
    vuex
    <br />
    <a-button @click="butFn()">添加</a-button>&nbsp;<a-button type="danger" @click="delFn()">清空</a-button>
    <hr />
    排序前：
    {{arr}}
    <br />

    排序后：
    {{butSort}}
  </div>
</template>

<script>
import store from "../../store";
export default {
  name: "vuex",
  data() {
    return {
      // arr:store.arr
    };
  },
  computed: {
    arr() {
      return store.state.arr;
    },
    butSort() {
      return store.getters.arrSort;
    }
  },
  methods: {
    butFn() {
      store.commit("setArr", Math.round(Math.random() * 100));
    },
    delFn(){
      store.commit('delArr',[]);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>