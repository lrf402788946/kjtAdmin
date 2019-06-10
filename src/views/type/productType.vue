<template lang="html">
  <div id="productType">
    <el-row style="margin: 2%;background: #fff;text-align:center;">
      <el-col :span="24">
        <levelTwoHeader title="产品类别管理"></levelTwoHeader>
        <el-row>
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="14">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="openAlert('add')">添加</el-button>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
        <searchBar :prop="searchProps" @toSearch="toSearch"></searchBar>
        <!--table-->
        <el-row style="margin-top:2%;padding:0 1%">
          <el-col :span="24">
            <el-table stripe border :data="list">
              <el-table-column v-for="(item, index) in tableProps" :key="index" align="center" :prop="item.prop" :label="item.label"> </el-table-column>
              <!--按钮选加-->
              <el-table-column align="center">
                <template slot="header">
                  操作
                </template>
                <template slot-scope="scope">
                  <el-button size="mini" @click="openAlert('edit', scope.row)">编辑</el-button>
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
    <el-dialog :title="dialogTitle" center :visible.sync="dialog" :close-on-click-modal="false" :before-close="closeAlert">
      <el-form :model="form" :rules="rules" ref="form">
        <el-row>
          <!--添加和编辑共用一个dialog,根据updateEdit来改变是否可以编辑达到edit情况的效果.列表显示采用左右两侧显示方式-->
          <el-col :span="12" ref="left">
            <el-form-item prop="code">
              <el-col :span="8">产品类别编号</el-col>
              <el-col :span="14"><el-input v-model="form.code" :disabled="updateEdit"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12" ref="right">
            <el-form-item prop="name">
              <el-col :span="8">产品类别名称</el-col>
              <el-col :span="14"><el-input v-model="form.name" :disabled="updateEdit"></el-input></el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!updateEdit" @click="toOperation()">保存</el-button>
        <el-button type="primary" v-else @click="updateEdit = false">修改</el-button>
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
  name: 'productType',
  components: {
    levelTwoHeader,
    searchBar,
  },
  data() {
    return {
      list: [{ id: 1, name: 'name1', code: 'value1' }, { id: 2, name: 'name2', code: 'value21' }, { id: 3, name: 'name3', code: 'value31' }],
      tableProps: [], //输出字段存放位置
      currentPage: 1,
      totalRow: 1,
      searchInfo: {
        limit: 15,
      },
      dialog: false,
      dialogTitle: '',
      updateEdit: true,
      searchProps: [],
      form: {},
      operationId: '',
      rules: {
        code: [{ required: true, message: '请输入产品类别编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入产品类别名称', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  created() {
    this.searchTableSetting(`productType`);
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
      this.$set(this, `dialogTitle`, `产品类别${type === 'delete' ? '删除' : type === 'add' ? '添加' : '修改'}`);
      if (type === 'edit') {
        this.$set(this, `form`, JSON.parse(JSON.stringify(item)));
      } else if (type === 'add') {
        this.form = {};
        type === 'add' ? (this.updateEdit = false) : '';
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
      this.$refs.form.resetFields();
      this.operationId = '';
      this.form = {};
      this.updateEdit = true;
      this.dialog = false;
    },
  },
};
</script>

<style lang="css" scoped></style>
