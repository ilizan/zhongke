<template>
  <div style="height:100%;">
    <a-row class="topMain">
      <a-col class="topAll" :span="24">
        <div class="top">
          <ul>
            <li>
                <a href="#/room">办理</a>
            </li>
            <li>
                <a href="#/main">总览</a>
            </li>
            <li class="hands">
              <a-dropdown>
                <span class="userTop">{{user.loginusername}}，欢迎您</span>
                <a-menu slot="overlay">
                  <a-menu-item @click="logOut()">退出</a-menu-item>
                </a-menu>
              </a-dropdown>
            </li>
          </ul>
        </div>
      </a-col>
    </a-row>
    <div class="homeMain">
      <router-view />
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "home",
  data() {
    return {
      user: JSON.parse(Cookies.get("user"))
    };
  },
  methods: {
    logOut() {
      console.log("退出");
      this.$confirm({
        title: "提示",
        content: "您确定要退出吗?",
        okText: "退出",
        cancelText: "取消",
        onOk() {
          Cookies.remove("user");
          window.location.reload();
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.topMain {
  height: 50px;
  .topAll {
    position: fixed;
    z-index: 10;
    background-color: #fff;
    height: 50px;
    .top {
      height: 50px;
      line-height: 50px;
      text-align: right;
      border-bottom: 1px solid #ccc;
      padding-right: 10px;
      ul {
        float: right;
        li {
          float: left;
          margin: 0 10px;
        }
      }
      .hands {
        cursor: pointer;
      }
      .userTop {
        display: inline-block;
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
.homeMain {
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>