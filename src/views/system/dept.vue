<template lang="html">
  <div id="dept">
    <el-row style="margin: 2%;background: #fff;text-align:center;">
      <el-col :span="24">
        <levelTwoHeader title="部门管理"></levelTwoHeader>
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
          <el-col :span="14">&nbsp;</el-col>
          <el-col :span="8" style="margin-top:2%">
            <b-pagination
              v-if="list.length > 0"
              v-model="currentPage"
              :total-rows="totalRow"
              :limit="5"
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
            <el-form-item prop="dept_name">
              <el-col :span="6">部门名称</el-col>
              <el-col :span="15"><el-input v-model="form.dept_name" :disabled="updateEdit"></el-input></el-col>
            </el-form-item>
            <el-form-item prop="dept_duty">
              <el-col :span="6">部门职责</el-col>
              <el-col :span="15"><el-input v-model="form.dept_duty" :disabled="updateEdit"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12" ref="right">
            <el-form-item prop="dept_tell">
              <el-col :span="6">部门电话</el-col>
              <el-col :span="15"><el-input v-model="form.dept_tell" :disabled="updateEdit"></el-input></el-col>
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
  name: 'dept',
  components: {
    levelTwoHeader,
    searchBar,
  },
  data() {
    return {
      list: [
        { id: 1, dept_name: 'name1', dept_duty: 'value1', dept_tell: 'value2' },
        { id: 2, dept_name: 'name2', dept_duty: 'value21', dept_tell: 'value22' },
        { id: 3, dept_name: 'name3', dept_duty: 'value31', dept_tell: 'value32' },
      ],
      tableProps: [], //输出字段存放位置
      currentPage: 1,
      totalRow: 1,
      searchInfo: {
        limit: 15,
        dept_name: '',
      },
      dialog: false,
      dialogTitle: '',
      updateEdit: true,
      searchProps: [],
      form: {},
      operationId: '',
      rules: {
        dept_name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        dept_duty: [{ required: true, message: '请输入部门职责', trigger: 'blur' }],
        dept_tell: [{ required: true, message: '请输入部门电话', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  created() {
    this.searchTableSetting(`dept`);
    this.toSearch();
  },
  methods: {
    ...mapActions(['deptOperation']),
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
      let newObject = { ...this.searchInfo, skip: skip };
      let { totalRow, dataList = [], rescode } = await this.deptOperation({ data: newObject, type: 'deptList' });
      console.log(dataList);
      this.$set(this, `list`, dataList);
      this.$set(this, `totalRow`, totalRow);
    },
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
      let has_id = Object.keys(this.form).filter(item => item === 'id').length;
      let type;
      has_id > 0 ? (type = 'deptEdit') : (type = 'deptSave');
      let result = await this.deptOperation({ data: this.form, type: type });
      this.toSearch();
      this.closeAlert();
    },
    async openAlert(type, item) {
      this.$set(this, `dialogTitle`, `部门${type === 'delete' ? '删除' : type === 'add' ? '添加' : '修改'}`);
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
            await this.deptOperation({ data: { id: this.operationId }, type: 'deptDelete' });
            this.toSearch();
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
