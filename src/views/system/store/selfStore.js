import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);
const api = {
  //部门
  deptList: '/dept/dept_list', //params:skip,limit
  deptSave: '/dept/dept_save',
  deptEdit: '/dept/dept_edit',
  deptDelete: '/dept/dept_delete',
  deptInfo: '/dept/dept_info',
  //用户
  userList: '/user/user_list',
  userSave: '/user/user_save',
  userEdit: '/user/user_edit',
  userDelete: '/user/user_delete',
  userInfo: '/user/user_info',
  //权限
  roleList: '/role/role_list',
  roleSave: '/role/role_save',
  roleEdit: '/role/role_edit',
  roleDelete: '/role/role_delete',
  roleInfo: '/role/role_info',
  //用户权限分配
  userRoleSel: '/user/user_role_sel',
  userRoleEdit: '/user/user_role',
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
    return result;
  },
  /**
   * 用户相关操作
   */
  async userOperation({ commit }, { data, type }) {
    let result = await this.$axios.$post(_.get(api, type), { data: data });
    console.log(result);
    return result;
  },
  /**
   * 权限管理相关
   */
  async roleOperation({ commit }, { data, type }) {
    let result = await this.$axios.$post(_.get(api, type), { data: data });
    return result;
  },
  async userRoleOperation({ commit }, { data, type }) {
    let result = await this.$axios.$post(_.get(api, type), { data: data });
    console.log(result);
    return result;
  },
};
