<template>
  <div class="login">
    <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-width="80px">
      <el-form-item label="登录名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin",
        captcha: ""
      },
      fieldRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.$api);
          var loginData = {
            account: this.loginForm.username,
            password: this.loginForm.password,
            captcha: ""
          };
          this.$api.login
            .login(loginData)
            .then(res => {
              console.log(res);
              console.log("登录成功");
              Cookies.set("token", res.data.token);
              sessionStorage.setItem("user", JSON.stringify(res.data)); // 保存用户到本地会话
              this.$router.push("/");
            })
            .catch(res => {
              console.log(res);
              this.$message({
                message: "登录失败",
                type: "error"
              });
            });
        } else {
        }
      });
    },
    reset() {
      //   this.$refs.loginForm.resetFields()
      this.loginForm = {
        username: "",
        password: "",
        captcha: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  border-radius: 5px;
  margin: 100px auto;
  width: 350px;
  padding: 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>