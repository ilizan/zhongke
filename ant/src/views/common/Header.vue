<template>
  <div class="header position-left">
    <span class="toolbar">
      toolbar
    </span>
  </div>
</template>

<script>
import Cookies from "js-cookie"
export default {
  name: "Header",
  data() {
    return {
      // user: JSON.parse(sessionStorage.getItem("user"))
    };
  },
  methods: {
    logout:function() {
    },
    // 删除cookie
    deleteCookie: function(name) { 
        Cookies.remove(name)
    },
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  height: 60px;
  line-height: 60px;
  background-color: #FFF;
  padding: 0 5px;
  border-bottom: 1px solid #ccc;
}
.position-left {
  left: 256px;
}
.toolbar {
  float: right;
}
</style>