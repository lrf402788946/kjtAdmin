<template lang="html">
  <div id="user_role">
    <el-row style="margin: 2%;background: #fff;text-align:center;">
      <el-col :span="24">
        <levelTwoHeader title="用户权限管理"></levelTwoHeader>
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
                  <el-button size="mini" @click="openAlert(scope.row.id)">编辑权限</el-button>
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
      <el-transfer
        id="transfer"
        style="text-align: left; display: inline-block;padding-left:8%;"
        v-model="subForm"
        :data="roleList"
        :titles="titles"
        :button-texts="['移除', '添加']"
      >
        <!-- <template slot-scope="scope">
          <span>{{ scope }}</span>
        </template> -->
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toOperation()">保存</el-button>
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
  name: 'user_role',
  components: {
    levelTwoHeader,
  },
  data() {
    return {
      list: [
        { id: 1, user_name: 'name1', role_code: 'value1' },
        { id: 2, user_name: 'name2', role_code: 'value21' },
        { id: 3, user_name: 'name3', role_code: 'value31' },
      ],
      roleList: [],
      titles: ['权限列表', '用户权限'],
      tableProps: [], //输出字段存放位置
      currentPage: 1,
      totalRow: 1,
      searchInfo: {
        limit: 15,
      },
      form: {},
      subForm: [],
      dialog: false,
      dialogTitle: '',
      searchProps: [],

      operationId: '',
    };
  },
  computed: {},
  async created() {
    this.searchTableSetting(`user_role`);
    let { dataList } = await this.roleOperation({ data: { skip: `0`, limit: `10000` }, type: 'roleList' });
    dataList = dataList.map(item => {
      let newObject = { label: item.role_name, key: item.id };
      return newObject;
    });
    this.$set(this, `roleList`, dataList);
    this.toSearch();
  },
  methods: {
    ...mapActions(['userOperation', 'roleOperation', 'userRoleOperation']),
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
      let { totalRow, data, dataList = [], rescode } = await this.userOperation({ data: newObject, type: 'userList' });
      this.$set(this, `list`, dataList);
      this.$set(this, 'form', data);
      this.$set(this, `totalRow`, totalRow);
    },
    toOperation() {
      this.operation();
    },
    async operation() {
      let result = await this.userOperation({ data: { id: this.form.id, role_id: this.subForm }, type: 'userRoleEdit' });
      this.toSearch();
      this.closeAlert();
      if (result.result) this.$message.success('分配成功');
    },
    async openAlert(item) {
      this.$set(this, `dialogTitle`, `用户权限管理`);
      let { data, dataList } = await this.userRoleOperation({ data: { id: item }, type: 'userRoleSel' });
      this.$set(this, `form`, data);
      let roleList = [];
      dataList = dataList.map(item => {
        roleList.push(item.id);
      });
      this.$set(this, `subForm`, roleList);
      this.dialog = true;
    },
    closeAlert() {
      this.operationId = '';
      this.form = {};
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss">
#transfer .el-checkbox-group.el-transfer-panel__list {
  width: min-content;
}
</style>
