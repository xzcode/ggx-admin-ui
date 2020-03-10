<template>
  <div class="page-login">
    <el-card class="login-form" shadow="always">
      <div slot="header">
        <span class="form-title">卡片名称</span>
      </div>
      <el-input placeholder="请输入内容" v-model="username">
        <template slot="prepend">
          <i class="el-icon-user"></i>
        </template>
      </el-input>
      <div class="divider"></div>
      <el-input placeholder="请输入内容" v-model="password">
        <template slot="prepend">
          <i class="el-icon-lock"></i>
        </template>
      </el-input>
      <div class="divider"></div>
      <el-button type="primary" style="width: 100%;" @click="validateForm()">登陆</el-button>
      <div class="divider"></div>
      <a href="#" style="float: right;">忘记密码</a>
    </el-card>

    <p class="copyright">
      Copyright
      <i aria-hidden="true" class="fa fa-copyright"></i> {{yearString}} GG Projects 出品
      <a href="https://github.com/xzcode/ggserver">@GGServer</a>
    </p>

    <bg-anim />
  </div>
</template>

<script>
import BgAnim from "@/components/bg-anim";
export default {
  components: {
    BgAnim
  },
  mixins: [
    //localeMixin
  ],
  data() {
    return {
      username: null,
      password: null
    };
  },
  computed: {
    yearString() {
      return new Date().getFullYear();
    }
  },
  mounted() {},
  methods: {
    validateForm() {
      if (!this.username) {
        this.$message.error("用户名不能为空");
        return;
      }
      if (!this.password) {
        this.$message.error("密码不能为空");
        return;
      }
    },
    submit() {}
    
  }
};
</script>


<style scoped lang="scss">
@import "@/css/color.scss";

.page-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .copyright {
    position: absolute;
    bottom: 10px;
    color: $color-info;
  }

  a {
    color: $color-primary;
    text-decoration: none;
  }
}

.login-form {
  width: 300px;
  padding: 20px 20px 50px 20px;

  .form-title {
    font-weight: bold;
    font-size: 22px;
  }

  .divider {
    height: 20px;
  }
}
</style>

