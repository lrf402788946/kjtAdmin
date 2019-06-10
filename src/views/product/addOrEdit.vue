<template lang="html">
  <div id="dept">
    <el-row style="margin: 2%;background: #fff;text-align:center;">
      <el-col :span="24">
        <levelTwoHeader :title="getHeader()"></levelTwoHeader>
        <el-row>
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="14">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="$router.push({ path: '/product/already' })" icon="el-icon-back">返回</el-button>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
        <div class="insert">
          <el-row>
            <el-col :span="11">
              <el-form :model="input" :rules="rules">
                <el-row>
                  <el-form-item>
                    <el-col :span="8">名称</el-col>
                    <el-col :span="16"><el-input v-model="input.name" :disabled="stateInfo"></el-input> </el-col>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item>
                    <el-col :span="8">总分类</el-col>
                    <el-col :span="16">
                      <el-select v-model="input.totaltype" :disabled="stateInfo" placeholder="请选择分类">
                        <el-option :label="`产品`" :value="0"></el-option>
                        <el-option :label="`技术`" :value="1"></el-option>
                        <el-option :label="`服务`" :value="2"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item>
                    <el-col :span="8">类型</el-col>
                    <el-col :span="16">
                      <el-select v-model="input.product_type" :disabled="stateInfo" placeholder="请选择类型">
                        <el-option v-for="(item, index) in productTypeSelectList" :key="index" :label="item.name" :value="item.code"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item>
                    <el-col :span="8">单价</el-col>
                    <el-col :span="14"><el-input v-model="input.price" :disabled="stateInfo" type="number"></el-input></el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="1">元</el-col>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item>
                    <el-col :span="8">单位</el-col>
                    <el-col :span="16"><el-input v-model="input.priceunit" :disabled="stateInfo"></el-input></el-col>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item>
                    <el-col :span="8">联系人</el-col>
                    <el-col :span="16"><el-input v-model="input.contact_user" :disabled="stateInfo"></el-input></el-col>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item>
                    <el-col :span="8">联系电话</el-col>
                    <el-col :span="16"><el-input v-model="input.contact_tel" :disabled="stateInfo"></el-input></el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item>
                    <el-col :span="8">交易方式</el-col>
                    <el-col :span="16">
                      <el-radio :disabled="stateInfo" v-model="input.jyfs" label="公用"></el-radio>
                      <el-radio :disabled="stateInfo" v-model="input.jyfs" label="转让"></el-radio>
                      <el-radio :disabled="stateInfo" v-model="input.jyfs" label="竞拍"></el-radio>
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item>
                    <el-col :span="8">简介</el-col>
                    <el-col :span="16">
                      <el-input
                        type="textarea"
                        :disabled="stateInfo"
                        placeholder="请填写描述"
                        v-model="input.introduction"
                        :autosize="{ minRows: 5 }"
                      ></el-input>
                    </el-col>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item>
                    <el-col :span="8">电子合同</el-col>
                    <el-col :span="16">
                      <el-upload class="upload-demo" action="/admin/home/common/upload/" :disabled="stateInfo" multiple :on-success="fileUpload" :limit="3">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                    </el-col>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item>
                    <el-col :span="8">供需类型</el-col>
                    <el-col :span="16">
                      <el-radio :disabled="stateInfo" v-model="input.gxtype" border :label="0">需求</el-radio>
                      <el-radio :disabled="stateInfo" v-model="input.gxtype" border :label="1">供给</el-radio>
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item>
                    <el-col :span="8">描述</el-col>
                    <el-col :span="16">
                      <el-input
                        type="textarea"
                        :disabled="stateInfo"
                        placeholder="请填写描述"
                        v-model="input.description"
                        :autosize="{ minRows: 5 }"
                      ></el-input>
                    </el-col>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item>
                    <el-col :span="8">知识产权</el-col>
                    <el-col :span="16">
                      <el-upload
                        :disabled="stateInfo"
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
                        <img v-if="input.zscq" :src="imgs.zscq" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-col>
                  </el-form-item>
                </el-row>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form :model="input">
                <div v-if="input.totaltype === 0">
                  <el-row class="param_list">
                    <el-col :span="10">参数名称</el-col>
                    <el-col :span="12">参数内容</el-col>
                    <el-col :span="2">
                      <el-button type="primary" icon="el-icon-edit" circle @click="() => this.subForm.push({})"></el-button>
                    </el-col>
                  </el-row>
                  <el-row class="param_list" v-for="(item, index) in subForm" :key="index">
                    <el-col :span="10"><el-input v-model="item.name" :disabled="stateInfo"></el-input></el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="10"><el-input v-model="item.memo" :disabled="stateInfo"></el-input> </el-col>
                    <el-col :span="3">
                      <el-button type="danger" icon="el-icon-delete" circle @click="cleanLine(index)"></el-button>
                    </el-col>
                  </el-row>
                </div>

                <div v-if="input.totaltype === 1">
                  <el-row>
                    <el-form-item>
                      <el-col :span="8">应用方向</el-col>
                      <el-col :span="16"><el-input v-model="input.yyfx" :disabled="stateInfo"></el-input></el-col>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item>
                      <el-col :span="8">应用领域</el-col>
                      <el-col :span="16"><el-input v-model="input.yyly" :disabled="stateInfo"></el-input></el-col>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item>
                      <el-col :span="8">市场前景</el-col>
                      <el-col :span="16"><el-input v-model="input.scqj" :disabled="stateInfo"></el-input></el-col>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item>
                      <el-col :span="8">研发阶段</el-col>
                      <el-col :span="16"><el-input v-model="input.yfjd" :disabled="stateInfo"></el-input></el-col>
                    </el-form-item>
                  </el-row>
                  <el-row class="param_list">
                    <el-col :span="10">参数名称</el-col>
                    <el-col :span="12">参数内容</el-col>
                    <el-col :span="2">
                      <el-button type="primary" icon="el-icon-edit" circle @click="() => this.subForm.push({})"></el-button>
                    </el-col>
                  </el-row>
                  <el-row class="param_list" v-for="(item, index) in subForm" :key="index">
                    <el-col :span="10"><el-input v-model="item.name" :disabled="stateInfo"></el-input></el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="10"><el-input v-model="item.memo" :disabled="stateInfo"></el-input> </el-col>
                    <el-col :span="3">
                      <el-button v-if="stateInfo" type="danger" icon="el-icon-delete" circle @click="cleanLine(index)"></el-button>
                    </el-col>
                  </el-row>
                </div>

                <div v-if="input.totaltype === 2">
                  <el-row>
                    <el-form-item>
                      <el-col :span="8">应用领域</el-col>
                      <el-col :span="16"><el-input v-model="input.yyly" :disabled="stateInfo"></el-input></el-col>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item>
                      <el-col :span="8">服务范围</el-col>
                      <el-col :span="16"><el-input v-model="input.fwfw" :disabled="stateInfo"></el-input></el-col>
                    </el-form-item>
                  </el-row>
                </div>
              </el-form>
            </el-col>
          </el-row>
          <!--图片-->
          <el-row>
            <el-alert title="最多可以上传5张图片" type="warning" effect="light" :closable="false" show-icon center> </el-alert>
            <el-col :span="4">图片1</el-col>
            <el-col :span="7">
              <el-upload
                :disabled="stateInfo"
                list-type="picture-card"
                action="/admin/home/common/upload/"
                accept="image/jpeg,image/gif,image/png"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    return uploadSuccess(res, file, 1);
                  }
                "
              >
                <img v-if="input.image1" :src="imgs.image1" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="4" v-if="input.image1">图片2</el-col>
            <el-col :span="7" v-if="input.image1">
              <el-upload
                :disabled="stateInfo"
                list-type="picture-card"
                action="/admin/home/common/upload/"
                accept="image/jpeg,image/gif,image/png"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    return uploadSuccess(res, file, 2);
                  }
                "
              >
                <img v-if="input.image2" :src="imgs.image2" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="4" v-if="input.image2">图片3</el-col>
            <el-col :span="7" v-if="input.image2">
              <el-upload
                :disabled="stateInfo"
                list-type="picture-card"
                action="/admin/home/common/upload/"
                accept="image/jpeg,image/gif,image/png"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    return uploadSuccess(res, file, 3);
                  }
                "
              >
                <img v-if="input.image3" :src="imgs.image3" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="4" v-if="input.image3">图片4</el-col>
            <el-col :span="7" v-if="input.image3">
              <el-upload
                :disabled="stateInfo"
                list-type="picture-card"
                action="/admin/home/common/upload/"
                accept="image/jpeg,image/gif,image/png"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    return uploadSuccess(res, file, 4);
                  }
                "
              >
                <img v-if="input.image4" :src="imgs.image4" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="4" v-if="input.image4">图片5</el-col>
            <el-col :span="7" v-if="input.image4">
              <el-upload
                :disabled="stateInfo"
                list-type="picture-card"
                :multiple="true"
                action="/admin/home/common/upload/"
                accept="image/jpeg,image/gif,image/png"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    return uploadSuccess(res, file, 5);
                  }
                "
              >
                <img v-if="input.image5" :src="imgs.image5" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top:20px;">
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="5">
          <el-button type="primary" v-if="!stateInfo" style="width: 150px;font-size: 16px;">添&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加</el-button>
          <el-button type="primary" v-if="stateInfo" style="width: 150px;font-size: 16px;" @click="stateInfo = false">
            修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改
          </el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="info" style="width: 150px;font-size: 16px;">重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
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
      input: {
        jyfs: '公用',
        gxtype: 0,
      },
      imgs: {},
      title: '',
      productTypeSelectList: [],
      subForm: [],
      stateInfo: true,
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
  created() {
    this.getHeader();
  },
  methods: {
    ...mapActions(['productOperation']),
    uploadSuccess(res, file) {},
    fileUpload(res, file) {
      this.$set(this.input, `dzht`, `${res.msg}`);
    },
    getHeader() {
      let id = this.$route.query.id || '';
      if (id === '') {
        this.stateInfo = false;
        this.title = `添加产品`;
      } else {
        //查询,再返回标题
        this.toSearch();
        this.title = `修改产品`;
      }
    },
    async toSearch() {
      let { data, dataList = [], rescode } = await this.productOperation({ data: { id: this.$route.query.id || '' }, type: 'productInfo' });
      let { newData, img } = this.$objectListImg(data, this.$domain);
      this.$set(this, `input`, newData);
      this.$set(this, `imgs`, img);
    },
  },
};
</script>

<style lang="scss">
.insert {
  margin-top: 50px;
  text-align: center;
}
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
