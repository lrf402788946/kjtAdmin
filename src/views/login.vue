<template lang="html">
  <div id="login">
    <body :style="'overflow-y: auto;background-image: url(' + img.bg + '); background-repeat:no-repeat; background-size:auto;'">
      <div class="page-container">
        <div>
          <h1 style="letter-spacing:4px; padding-bottom:20px; font-weight:bold; color:#fff;">科技厅中台系统</h1>
        </div>
        <el-form :model="form" :rules="rules" ref="form" style="background:#ffffff;padding:5% 2%;" class="row">
          <el-row>
            <el-col :span="24" style="margin-top:3%;">
              <el-form-item prop="login_id">
                <el-col :span="6" style="font-weight: 600;font-size: 18px;">用户名</el-col>
                <el-col :span="15"><el-input v-model="form.login_id"></el-input></el-col>
              </el-form-item>
              <el-form-item prop="password">
                <el-col :span="6" style="font-weight: 600;font-size: 18px;">密码</el-col>
                <el-col :span="15"><el-input v-model="form.password" type="password" @keyup.enter.native="toLogin()"></el-input></el-col>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="margin-bottom:5%;">
              <el-col :span="4">&nbsp;</el-col>
              <el-col :span="16">
                <el-button type="primary" style="width:300px;font-size:16px;" @click="toLogin()">
                  登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
                </el-button>
              </el-col>
              <el-col :span="4">&nbsp;</el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom:5%;">
              <el-col :span="4">&nbsp;</el-col>
              <el-col :span="16">
                <el-button type="info" style="width:300px;font-size:16px;" @click="closeAlert()">重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
              </el-col>
              <el-col :span="4">&nbsp;</el-col>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </body>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'login',
  components: {},
  data() {
    return {
      img: {
        bg: require('@/assets/timg.jpg'),
      },
      form: {},
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pw: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions(['login']),
    async toLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.operation();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async operation() {
      let { result } = await this.login({ data: this.form });
      console.log(result);
      if (result) this.$router.push({ path: '/' });
    },
    closeAlert() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="scss">
body {
  width: 100vw;
  height: 100vh;
}
.page-container {
  /* logn-圆角	 */
  margin: 0 auto;
  width: 500px;
  height: 450px;
  text-align: center;
  margin-top: 220px;
}
.row {
  border-radius: 15px;
  .el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    left: 7%;
  }
}
</style>
