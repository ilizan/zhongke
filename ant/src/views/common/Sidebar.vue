<template>
  <div class="sidebar-menu">
    <div class="menu-var logo">logo</div>
    <div class="menu-var div-menu">
      <!-- <a-menu
        @click="handleClick"
        mode="inline"
      >
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="mail" />
            <span>Navigation One</span>
          </span>
          <a-menu-item-group key="g1">
            <template slot="title">
              <a-icon type="qq" />
              <span>Item 1</span>
            </template>
            <a-menu-item key="1">Option 1</a-menu-item>
            <a-menu-item key="2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g2" title="Item 2">
            <a-menu-item key="3">Option 3</a-menu-item>
            <a-menu-item key="4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="appstore" />
            <span>Navigation Two</span>
          </span>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="7">Option 7</a-menu-item>
            <a-menu-item key="8">Option 8</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title">
            <a-icon type="setting" />
            <span>Navigation Three</span>
          </span>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-menu>-->
      <a-menu @click="handleClick" mode="inline">
        <template v-for="item in menuTree">
          <a-sub-menu v-if="item.children&&!item.hidden" v-bind:key="item.id">
            <span slot="title">
              <a-icon type="appstore" />
              <span>{{item.meta.title}}</span>
            </span>
            <a-menu-item
              @click="goToUrl(itemtag)"
              v-for="itemtag in item.children"
              v-bind:key="itemtag.id"
            >{{itemtag.name}}</a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
// import { mapState } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      menuTree: "",
      current: ["mail"]
      // openKeys: ['sub1'],
    };
  },
  computed: {
    // ...mapState({
    //   menuTree: state => state.menuTree
    // })
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
    },
    goToUrl(itemTag) {
      var surl = itemTag.path;
      console.log(surl);
      // 通过菜单URL跳转至指定路由
      this.$router.push("/" + surl);
    }
  },
  mounted() {
    this.menuTree = JSON.parse(Cookies.get("menuTree"));
    console.log(this.$router.options);
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
  border-right: 1px solid #ccc;
}
.div-menu .ant-menu-inline {
  border-right-color: transparent;
}
</style>