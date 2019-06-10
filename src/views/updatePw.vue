<template lang="html">
  <div id="updatePw">
    <el-row style="margin: 2%;background: #fff;text-align:center;">
      <el-col :span="24">
        <levelTwoHeader title="修改密码"></levelTwoHeader>
      </el-col>
      <el-col class="white_space" :span="24">&nbsp;</el-col>
      <el-col :span="24" style="margin-bottom:5%;">
        <el-form :model="form" :rules="rules" ref="form" id="update_pw_form">
          <el-row>
            <el-form-item prop="password">
              <el-col :span="8">原密码</el-col>
              <el-col :span="10">
                <el-input v-model="form.password" type="password"></el-input>
              </el-col>
              <el-col :span="3">&nbsp;</el-col>
            </el-form-item>
          </el-row>
          <el-row style="margin-top:3%;">
            <el-form-item prop="passwordNew">
              <el-col :span="8">新密码</el-col>
              <el-col :span="10">
                <el-input v-model="form.passwordNew" type="password"></el-input>
              </el-col>
              <el-col :span="3">&nbsp;</el-col>
            </el-form-item>
          </el-row>
          <el-row style="margin-top:5%;">
            <el-col :span="6">&nbsp;</el-col>
            <el-col :span="5">
              <el-button type="primary" @click="toOperation()">修&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
            </el-col>
            <el-col :span="5">
              <el-button type="info" @click="closeAlert()">重&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
            </el-col>
            <el-col :span="6">&nbsp;</el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { levelTwoHeader } from '@/components/level_two/index';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'updatePw',
  components: {
    levelTwoHeader,
  },
  data() {
    return {
      form: {},
      rules: {
        password: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        passwordNew: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions(['updatePW']),
    toOperation() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.operation();
        } else {
          return false;
        }
      });
    },
    async operation() {
      let result = await this.updatePW({ data: this.form });
      if (result) this.$router.push({ path: '/login' });
    },
    closeAlert() {
      this.$refs.form.resetFields();
      this.form = {};
    },
  },
};
</script>

<style lang="scss">
.white_space {
  margin-bottom: 10%;
}
#update_pw_form {
  .el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 13%;
  }
}
</style>
