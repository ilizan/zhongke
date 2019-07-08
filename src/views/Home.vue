<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <Sidebar></Sidebar>
    <!-- 头部区域 -->
    <Header></Header>
    <!-- 主内容区域 -->
    <MainContent></MainContent>
  </div>
</template>

<script>
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import MainContent from "./common/MainContent";
export default {
  components: {
    Header,
    Sidebar,
    MainContent
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  // background: rgba(224, 234, 235, 0.1);
}
</style>  