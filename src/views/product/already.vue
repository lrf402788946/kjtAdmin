<template lang="html">
  <div id="already">
    <el-row style="margin: 2%;background: #fff;text-align:center;">
      <el-col :span="24">
        <levelTwoHeader title="产品管理"></levelTwoHeader>
        <el-row>
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="14">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="$router.push({ path: '/product/addOrEdit' })">添加产品</el-button>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>
        <searchBar :prop="searchProps" @toSearch="toSearch"></searchBar>
        <!--table 产品列表特殊,基本没必要配置自动输出,所以都手写-->
        <el-row style="margin-top:2%;padding:0 1%">
          <el-col :span="24">
            <el-table stripe border :data="list">
              <el-table-column align="center" label="">
                <template slot-scope="scope">
                  <img :src="scope.row.image1" style="width:150px;height:150px;" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="产品名称">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="产品分类">
                <template slot-scope="scope">
                  {{ scope.row.totaltype === 0 ? '产品' : scope.row.totaltype === 1 ? '技术' : '服务' }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="产品类型">
                <template slot-scope="scope">
                  {{ scope.row.product_type }}需要过滤出来
                </template>
              </el-table-column>
              <el-table-column align="center" label="价钱">
                <template slot-scope="scope">
                  {{ scope.row.price ? scope.row.price : '' }}元/{{ scope.row.priceunit ? scope.row.priceunit : '' }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="供需类型">
                <template slot-scope="scope">
                  {{ scope.row.gxtype === 0 ? '需求' : '供给' }}
                </template>
              </el-table-column>
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
              <el-col :span="8">企业类别编号</el-col>
              <el-col :span="14"><el-input v-model="form.code" :disabled="updateEdit"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12" ref="right">
            <el-form-item prop="name">
              <el-col :span="8">企业类别名称</el-col>
              <el-col :span="14"><el-input v-model="form.name" :disabled="updateEdit"></el-input></el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
  name: 'already',
  components: {
    levelTwoHeader,
    searchBar,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          image1: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: 'name1',
          totaltype: 0,
          product_type: 'none',
          price: '100',
          priceunit: '个',
          gxtype: 0,
        },
        {
          id: 2,
          image1: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: 'name2',
          totaltype: 1,
          product_type: 'none',
          price: '200',
          priceunit: '斤',
          gxtype: 1,
        },
        {
          id: 3,
          image1: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: 'name3',
          totaltype: 2,
          product_type: 'none',
          price: '300',
          priceunit: '辆',
          gxtype: 0,
        },
      ],
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
        code: [{ required: true, message: '请输入企业类别编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入企业类别名称', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  created() {
    this.searchTableSetting(`already`);
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
      this.$set(this, `dialogTitle`, `企业类别${type === 'delete' ? '删除' : type === 'add' ? '添加' : '修改'}`);
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
