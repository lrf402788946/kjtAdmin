import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);
const api = {
  deptList: '/admin/dept/dept_list', //params:skip,limit
  deptSave: '/dept/dept_save',
  deptEdit: '/dept/dept_edit',
  deptDelete: '/dept/dept_delete',
  deptInfo: '/dept/dept_info',
};
export const state = () => ({});

export const mutations = {};

export const actions = {
  /**
   * 部门相关操作
   * @param data 数据信息:save/edit情况是object;info/delete情况是id;list情况同为object但是内容和查询有关:skip,limit,condition
   * @param type 调用哪个接口
   */
  async deptOperation({ commit }, { data, type }) {
    let result = await this.$axios.$post(_.get(api, type), { data: data });
    console.log(result);
    return result;
  },
};
