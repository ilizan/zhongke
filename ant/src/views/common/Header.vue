<template>
  <div class="header position-left">
    <span class="toolbar">
      <ul>
        <li>{{time}}</li>
        <li>
          <a-dropdown>
            <span class="user">欢迎您，{{user.userName}}。</span>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">个人信息</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="logout()" href="javascript:;">退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
import moment from "moment";
import Cookies from "js-cookie";
export default {
  name: "Header",
  data() {
    return {
      user: JSON.parse(Cookies.get("user")),
      time: ""
    };
  },
  methods: {
    int() {
      setInterval(() => {
        this.time = moment(new Date()).format("YYYY年MM月DD日 HH:mm:ss");
      }, 1000);
    },
    logout: function() {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: "确定要退出吗",
        onOk() {
          _this.deleteCookie(["user", "menuTree", "token"]);
          window.location.reload();
        },
        onCancel() {}
      });
    },
    // 删除cookie
    deleteCookie: function(arr) {
      arr.forEach(item => {
        Cookies.remove(item);
      });
    }
  },
  mounted() {
    this.int()
  }
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
  background-color: #fff;
  padding: 0 5px;
  border-bottom: 1px solid #ccc;
}
.position-left {
  left: 256px;
}
.toolbar {
  float: right;
  ul {
    height: 60px;
    li {
      float: left;
      display: block;
      margin: 0 10px;
      .user {
        display: block;
        cursor: pointer;
      }
    }
  }
}
</style>