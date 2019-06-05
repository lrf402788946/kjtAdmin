<template lang="html">
  <div id="check">
    <el-row style="margin: 2%;background: #fff;text-align:center;">
      <el-col :span="24">
        <levelTwoHeader title="企业相关"></levelTwoHeader>
        <el-row>
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="14">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="$router.push({ path: '/enterprise/add' })" icon="el-icon-plus">添加企业</el-button>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
        <searchBar :prop="searchProps" @toSearch="toSearch"></searchBar>
        <!--table-->
        <el-row style="margin-top:2%;padding:0 1%">
          <el-col :span="24">
            <el-table stripe border :data="list">
              <el-table-column v-for="(item, index) in tableProps" :key="index" align="center" :prop="item.prop" :label="item.label"> </el-table-column>
              <el-table-column align="center">
                <template slot="header">
                  审核状态
                </template>
                <template slot-scope="scope">
                  {{ scope.row.status === 0 ? '未审核' : scope.row.status === 1 ? '审核通过' : '已拒绝' }}
                </template>
              </el-table-column>
              <!--按钮选加-->
              <el-table-column align="center">
                <template slot="header">
                  操作
                </template>
                <template slot-scope="scope">
                  <el-button size="mini" v-if="scope.row.status === 0" @click="openAlert('edit', scope.row)">审核信息</el-button>
                  <el-button size="mini" v-else @click="openAlert('edit', scope.row)">查看</el-button>
                  <el-button size="mini" type="danger" @click="openAlert('delete', scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!--pages-->
        <el-row>
          <el-col :span="18">&nbsp;</el-col>
          <el-col :span="6" style="margin-top:2%">
            <b-pagination
              v-if="list.length > 0"
              v-model="currentPage"
              :total-rows="totalRow"
              :limit="searchInfo.limit"
              @change="toSearch"
              first-text="首页"
              prev-text="<"
              next-text=">"
              last-text="末页"
            ></b-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--dialog-->
    <el-dialog :title="dialogTitle" center :visible.sync="dialog" width="80%" :close-on-click-modal="false" :before-close="closeAlert">
      <el-row style="text-align:center;">
        <el-col :span="10" id="left">
          <el-col :span="24"> <img style="width:150px;height:150px;" /> </el-col>
          <el-col :span="4"> 证件照片</el-col>
          <el-col :span="18"> <img style="width:200px;height:200px;" /> </el-col>
          <el-col :span="4"> 执照</el-col>
          <el-col :span="18"> <img style="width:200px;height:200px;" /> </el-col>
        </el-col>
        <el-col :span="7" id="mid">
          <el-col :span="10">企业名称</el-col>
          <el-col :span="14">{{ form.name }}</el-col>
          <el-col :span="10">联系方式</el-col>
          <el-col :span="14">{{ form.contact ? form.contact : `&nbsp;` }}</el-col>
          <el-col :span="10">地址</el-col>
          <el-col :span="14">{{ form.addr ? form.addr : `&nbsp;` }}</el-col>
        </el-col>
        <el-col :span="7" id="right">
          <el-col :span="10">企业类别</el-col>
          <el-col :span="14"> {{ form.code ? form.code : `&nbsp;` }}</el-col>
          <el-col :span="10">企业类型</el-col>
          <el-col :span="14"> {{ form.dtype ? form.dtype : `&nbsp;` }}</el-col>
          <el-col :span="10">企业主页</el-col>
          <el-col :span="14">{{ form.homepage ? form.homepage : `&nbsp;` }}</el-col>
        </el-col>
        <el-col :span="14" style="margin-bottom:2%;">
          <el-col :span="5"> 简介</el-col>
          <el-col :span="18"> {{ form.introduction ? form.introduction : `&nbsp;` }} </el-col>
          <el-col :span="1"> &nbsp;</el-col>
        </el-col>
        <el-col :span="14">
          <el-row style="margin-bottom:10%;">
            <el-col :span="5">审核结果</el-col>
            <el-col :span="18">
              <div v-if="form.status === 0">
                <el-radio v-model="reply.status" label="1" border><font style="color: #36e236;font-weight: 600;">通过</font></el-radio>
                <el-radio v-model="reply.status" label="2" border><font style="color: rgb(244, 12, 12);font-weight: 600;">拒绝</font></el-radio>
              </div>
              <div v-else>
                <font :style="form.status === 1 ? 'color: #36e236;font-weight: 600' : 'color: rgb(244, 12, 12);font-weight: 600'">
                  {{ form.status === 1 ? '审核通过' : '已拒绝' }}
                </font>
              </div>
            </el-col>
            <el-col :span="1"> &nbsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">审核回复</el-col>
            <el-col :span="18">
              <el-input v-if="form.status === 0" type="textarea" placeholder="审核回复" v-model="reply.description" :autosize="{ minRows: 5 }"></el-input>
              <div v-else>
                {{ reply.description }}
              </div>
            </el-col>
            <el-col :span="1"> &nbsp;</el-col>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAlert()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { levelTwoHeader, searchBar } from '@/components/level_two/index';
import { mapActions, mapState } from 'vuex';
import * as tableConfig from '@/config/tableConfig';
import _ from 'lodash';
export default {
  name: 'check',
  components: {
    levelTwoHeader,
    searchBar,
  },
  data() {
    return {
      list: [
        { id: 1, name: 'name111111111111111', contact: 'name11111111111111', addr: 'value11111111111111', legal: 'value11111111111111111', status: 0 },
        { id: 2, name: 'name222222222222222', contact: 'name22222222222222', addr: 'value22222222222222', legal: 'value22222222222222222', status: 1 },
        { id: 3, name: 'name3', contact: 'name1', addr: 'value31', legal: 'value32', status: 2 },
      ],
      tableProps: [], //输出字段存放位置
      currentPage: 1,
      totalRow: 1,
      searchInfo: {
        limit: 15,
      },
      dialog: false,
      dialogTitle: '',
      reply: {},
      updateEdit: true,
      searchProps: [],
      form: {},
      operationId: '',
      rules: {
        // dept_name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        // dept_duty: [{ required: true, message: '请输入部门职责', trigger: 'blur' }],
        // dept_tell: [{ required: true, message: '请输入部门电话', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  created() {
    this.searchTableSetting(`check`);
  },
  methods: {
    searchTableSetting(type) {
      if (type !== '') {
        let tableprops = _.get(tableConfig, type, []);
        this.$set(this, `tableProps`, tableprops);
      }
    },
    async toSearch(item) {
      if (typeof item === 'object') {
        //条件查询
        // this.searchInfo.name = item.condition2;
        this.currentPage = 1;
      } else {
        this.currentPage = item ? item : 1;
      }
      let skip = (this.currentPage - 1) * this.searchInfo.limit;
      // let { returnDataList, totalRow } = await this.getMenuList(this.searchInfo);
      // this.$set(this, `list`, returnDataList);
      // this.$set(this, `totalRow`, totalRow);
    },
    async openAlert(type, item) {
      this.$set(this, `dialogTitle`, `企业${type === 'check' ? '审核' : '详情'}`);
      if (type === 'edit') {
        this.$set(this, `form`, JSON.parse(JSON.stringify(item)));
      } else {
        this.operationId = item;
        await this.$confirm('确认要删除该数据吗?', `删除提示`, {
          type: 'warning',
        })
          .then(async () => {
            //确认删除
            console.log(`delete${this.operationId}`);
          })
          .catch(() => {
            //不删除
            console.log(`cancel`);
          });
        this.closeAlert();
        return;
      }
      this.dialog = true;
    },
    closeAlert() {
      this.operationId = '';
      this.form = {};
      this.updateEdit = true;
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  #left {
    div {
      margin-bottom: 2%;
    }
  }
  #mid {
    div {
      margin-bottom: 10%;
    }
  }
  #right {
    div {
      margin-bottom: 10%;
    }
  }
}
</style>
