<template>
  <div class="loginMain">
    <div class="login">
      <div class="loginForm">
        <h2 class="title">xx系统登录</h2>
        <a-form :form="form" @submit="loginSubmit">
          <a-form-item>
            <a-input
              maxlength="16"
              size="large"
              type="text"
              placeholder="登录名"
              v-decorator="[
             'userName',
             {rules:[{required:true,message:'请输入登录名'}]}]"
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
            <a-checkbox>自动登录</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button htmlType="submit" block size="large" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    loginSubmit(e) {
      e.preventDefault();
      console.log("提交");
      this.form.validateFields((err, values) => {
        if (!err) {
          //验证通过
          const data = { ...values };
          this.$api.login.login(data)
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
        padding-bottom: 30px;
        font-size: 26px;
      }
    }
  }
}
</style>