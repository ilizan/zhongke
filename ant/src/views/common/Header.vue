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
                <a href="javascript:;" @click="showModal()">个人信息</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="logout()" href="javascript:;">退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </li>
      </ul>
    </span>
    <a-modal title="个人信息" v-model="visible" @ok="handleOk">
      <a-form layout="horizontal">
        <a-form-item
          label="登录名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <span class="ant-form-text">{{user.userName}}</span>
        </a-form-item>
        <a-form-item
          label="二维码"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <div id="qrcode" ref="qrcode"></div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import Cookies from "js-cookie";
import QRCode from "qrcodejs2";

export default {
  name: "Header",
  data() {
    return {
      visible: false,
      user: JSON.parse(Cookies.get("user")),
      time: "",
      formItemLayout: { labelCol: { span: 4 }, wrapperCol: { span: 20 } }
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
    },
    showModal() {
      this.visible = true;
      setTimeout(() => {
        this.qrcode();
      }, 100);
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    qrcode() {
      document.getElementById("qrcode").innerHTML = "";
      let qrcode = new QRCode("qrcode", {
        width: 100,
        height: 100, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
        text: this.user.userName // 二维码内容
      });
      console.log(qrcode);
    }
  },
  mounted() {
    this.int();
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
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
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