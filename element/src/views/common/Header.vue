<template>
  <div class="header position-left">
    <span class="toolbar">
      <el-menu>
        <el-menu-item v-popover:popover-personal>
          <span class="hei">userName:{{user.userName}}</span>
          <el-popover
            ref="popover-personal"
            placement="top-start"
            title
            width="200"
            trigger="hover"
            content
          >
            <el-button @click="logout()">退出</el-button>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import Cookies from "js-cookie"
export default {
  name: "Header",
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user"))
    };
  },
  methods: {
    logout:function() {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("user");
          this.deleteCookie("token");
          this.$router.push("/login");
          // this.$api.login
          //   .logout()
          //   .then(res => {})
          //   .catch(function(res) {});
        })
        .catch(() => {});
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
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  background-color: rgba(180, 190, 190, 0.8);
  padding: 0 5px;
  border-left: 1px dashed #ccc;
}
.position-left {
  left: 200px;
}
.toolbar {
  float: right;
}
.el-menu {
  background-color: transparent;
}
.el-menu-item {
  line-height: 60px;
  height: 60px;
}
</style>