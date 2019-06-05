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
      <el-transfer
        id="transfer"
        style="text-align: left; display: inline-block;padding-left:8%;"
        v-model="form"
        :data="roleList"
        :titles="titles"
        :button-texts="['移除', '添加']"
      >
        <!-- <template slot-scope="scope">
          <span>{{ scope.option.label }}</span>
        </template> -->
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!updateEdit" @click="dialog = false">保存</el-button>
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
      roleList: [{ key: 1, label: '权限1111' }, { key: 2, label: '权限22' }, { key: 3, label: '权限3' }],
      titles: ['权限列表', '用户权限'],
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
      form: [],
      operationId: '',
    };
  },
  computed: {},
  created() {
    this.searchTableSetting(`user_role`);
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
      this.$set(this, `dialogTitle`, `用户权限管理`);
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

<style lang="scss">
#transfer .el-checkbox-group.el-transfer-panel__list {
  width: min-content;
}
</style>
