<template>
  <div class="sidebar-menu">
    <div class="menu-var logo"></div>
    <ul class="menu-var el-menu">
        菜单列表
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
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
  background: rgba(180, 190, 190, 0.8);;
  cursor: pointer;
}
.sidebar-menu .menu-var {
    width: 200px;
}
.sidebar-menu .el-menu {
    position: absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
}
</style>