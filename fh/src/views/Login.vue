<template>
  <div class="loginMain">
    <div class="login">
      <div class="loginForm">
        <div class="logoD">
          <img src="../assets/logo.png" alt />
        </div>
        <h2 class="title">品牌峰会住宿登记系统</h2>
        <a-form :form="form" @submit="loginSubmit">
          <a-form-item>
            <a-input
              maxlength="16"
              size="large"
              type="text"
              placeholder="登录名"
              v-decorator="[
             'username',
             {
               rules:[{required:true,message:'请输入登录名'}]}]"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              maxlength="16"
              size="large"
              type="password"
              placeholder="密码"
              v-decorator="[
             'password',
             {rules:[{required:true,message:'请输入密码'}]}]"
            />
          </a-form-item>
          <a-form-item>
            <a-button :loading="loading" htmlType="submit" block size="large" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { loginApi } from "../api/index";
export default {
  name: "login",
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this)
    };
  },
  methods: {
    loginSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          //验证通过
          const loginData = { ...values };
          loginData.type = "Login";
          loginApi(loginData)
            .then(res => {
              if (res.code == 0) {
                this.loading = false;
                Cookies.set("user", res.data);
                this.$router.push({ path: "/" });
                setTimeout(() => {
                  this.$notification.success({
                    message: "登录成功",
                    description: `${loginData.username}，欢迎登录`
                  });
                }, 500);
              } else {
                this.loading = false;
                this.$message.error(res.message);
              }
            })
            .catch(res => {
              console.log(res);
              this.$message.error("登录失败");
              this.loading = false;
            });
        }
      });
    }
  },
  mounted() {
    // this.form.setFieldsValue({ username: "01", password: "00000" });
  }
};
</script>

<style lang="scss" scoped>
body {
  height: 100%;
}
.logoD {
  text-align: center;
}
.logoD img {
  height: 90px;
  margin: 0 auto;
}
.loginMain {
  position: relative;
  height: 100%;
  background-color: #f0f2f5;
  .login {
    padding-top: 100px;
    .loginForm {
      width: 350px;
      margin: 0 auto;
      .title {
        text-align: center;
        padding-bottom: 20px;
        font-size: 26px;
      }
    }
  }
}
</style>