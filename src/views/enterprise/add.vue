<template lang="html">
  <div id="dept">
    <el-row style="margin: 2%;background: #fff;text-align:center;">
      <el-col :span="24">
        <levelTwoHeader title="添加企业"></levelTwoHeader>
        <el-row>
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="14">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="$router.push({ path: '/enterprise/check' })" icon="el-icon-back">返回</el-button>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
        <el-form :model="form" :rules="rules" id="form" ref="form">
          <el-row style="text-align:center;margin-top:5%;">
            <el-col :span="9" id="left">
              <el-col :span="4"> logo</el-col>
              <el-col :span="18" style="text-align:center;">
                <el-upload
                  list-type="picture-card"
                  action="/admin/home/common/upload/"
                  accept="image/jpeg,image/gif,image/png"
                  :show-file-list="false"
                  :on-success="
                    (res, file) => {
                      return uploadSuccess(res, file, 0);
                    }
                  "
                >
                  <img v-if="form.logo" :src="imgs.logo" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :span="4"> 证件照片</el-col>
              <el-col :span="18">
                <el-upload
                  list-type="picture-card"
                  action="/admin/home/common/upload/"
                  accept="image/jpeg,image/gif,image/png"
                  :show-file-list="false"
                  :on-success="
                    (res, file) => {
                      return uploadSuccess(res, file, 0);
                    }
                  "
                >
                  <img v-if="form.file_path" :src="imgs.file_path" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :span="4"> 执照</el-col>
              <el-col :span="18">
                <el-upload
                  list-type="picture-card"
                  action="/admin/home/common/upload/"
                  accept="image/jpeg,image/gif,image/png"
                  :show-file-list="false"
                  :on-success="
                    (res, file) => {
                      return uploadSuccess(res, file, 0);
                    }
                  "
                >
                  <img v-if="form.license" :src="imgs.license" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-col>
            <el-col :span="14" id="mid">
              <el-form-item prop="name">
                <el-col :span="8">企业名称</el-col>
                <el-col :span="15"><el-input v-model="form.name"></el-input></el-col>
                <el-col :span="1"> &nbsp;</el-col>
              </el-form-item>
              <el-form-item prop="contact">
                <el-col :span="8">联系方式</el-col>
                <el-col :span="15"><el-input v-model="form.contact"></el-input></el-col>
                <el-col :span="1"> &nbsp;</el-col>
              </el-form-item>
              <el-form-item prop="addr">
                <el-col :span="8">地址</el-col>
                <el-col :span="15"><el-input v-model="form.addr"></el-input></el-col>
                <el-col :span="1"> &nbsp;</el-col>
              </el-form-item>
              <el-form-item prop="code">
                <el-col :span="8">企业类别</el-col>
                <el-col :span="15">
                  <el-select v-model="form.code" placeholder="请选择企业类别">
                    <el-option :label="`产品`" :value="0"></el-option>
                    <el-option :label="`技术`" :value="1"></el-option>
                    <el-option :label="`服务`" :value="2"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1"> &nbsp;</el-col>
              </el-form-item>
              <el-form-item prop="dtype">
                <el-col :span="8">企业类型</el-col>
                <el-col :span="15">
                  <el-select v-model="form.dtype" placeholder="请选择企业类型">
                    <el-option :label="`产品`" :value="0"></el-option>
                    <el-option :label="`技术`" :value="1"></el-option>
                    <el-option :label="`服务`" :value="2"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1"> &nbsp;</el-col>
              </el-form-item>
              <el-form-item prop="homepage">
                <el-col :span="8">企业主页</el-col>
                <el-col :span="15"><el-input v-model="form.homepage"></el-input></el-col>
                <el-col :span="1"> &nbsp;</el-col>
              </el-form-item>
            </el-col>
            <el-col :span="14" style="margin-bottom:2%;">
              <el-col :span="5"> 简介</el-col>
              <el-col :span="18">
                <el-input type="textarea" placeholder="请填写企业简介" v-model="form.introduction" :autosize="{ minRows: 5 }"></el-input>
              </el-col>
              <el-col :span="1"> &nbsp;</el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24" style="margin-top:20px;">
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="5">
          <el-button type="primary" style="width: 150px;font-size: 16px;">添&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="info" style="width: 150px;font-size: 16px;">保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
        </el-col>
        <el-col :span="8">&nbsp;</el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { levelTwoHeader, searchBar } from '@/components/level_two/index';
import { mapActions, mapState } from 'vuex';
import _ from 'lodash';
export default {
  name: 'dept',
  components: {
    levelTwoHeader,
  },
  data() {
    return {
      form: {},
      imgs: {},
      rules: {
        name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        contact: [{ required: true, message: '请填写联系方式', trigger: 'blur' }],
        addr: [{ required: true, message: '请填写地址', trigger: 'blur' }],
        code: [{ required: true, message: '请选择企业类别', trigger: 'blur' }],
        dtype: [{ required: true, message: '请选择企业类型', trigger: 'blur' }],
        homepage: [{ required: true, message: '请填写企业主页', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  created() {},
  methods: {
    uploadSuccess(res, file) {},
  },
};
</script>

<style lang="scss">
#form .el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: -45%;
  left: 55%;
}
.el-row {
  #left {
    margin-left: 1%;
    div {
      margin-bottom: 2%;
    }
  }
  #mid {
    div {
      margin-bottom: 2%;
    }
  }
}
</style>
