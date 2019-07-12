<template>
  <div class="sidebar-menu">
    <div class="menu-var logo">logo</div>
    <!-- <div class="menu-var div-menu"> -->
    <el-menu
      default-active="1"
      class="menu-var"
      @open="handleOpen"
      @close="handleClose"
      @select="handleselect"
    >
      <template v-for="item in menuTree">
          <el-submenu v-if="item.children && item.children.length>=1" v-bind:key='item.id' v-bind:index="'' + item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item v-for="itemTag in item.children" v-bind:key='itemTag.id' v-bind:index="''+itemTag.id" @click="goToUrl(itemTag)">
              <i :class="itemTag.icon"></i>
              <span slot="title">{{itemTag.name}}</span>
            </el-menu-item>
          </el-submenu>
      </template>
    </el-menu>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      menuTree: state => state.menuTree
    })
  },
  methods: {
    handleOpen() {
      console.log("handleopen");
    },
    handleClose() {
      console.log("handleclose");
    },
    handleselect(a, b) {
      console.log("handleselect");
    },
    goToUrl(itemTag) {
      console.log(itemTag.url);
      // 通过菜单URL跳转至指定路由
      this.$router.push("/" + itemTag.url);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-menu {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  z-index: 1020;
}
.sidebar-menu .logo {
  position: absolute;
  top: 0px;
  height: 60px;
  line-height: 60px;
  background: rgba(180, 190, 190, 0.8);
  cursor: pointer;
  text-align: center;
}
.sidebar-menu .menu-var {
  width: 200px;
}
.sidebar-menu .div-menu {
  position: absolute;
  top: 60px;
  bottom: 0px;
  text-align: left;
}
.sidebar-menu .el-menu {
  position: absolute;
  top: 60px;
  bottom: 0px;
  text-align: left;
}
</style>