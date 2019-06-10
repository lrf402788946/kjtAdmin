import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import { Message } from 'element-ui';

Vue.use(Vuex);
const api = {
  login: '/user/login',
  updatePassword: '/user/pwd_edit',
};
export const state = () => ({
  user: {},
});

export const mutations = {
  [types.USER_LOGIN](state) {
    if (sessionStorage.getItem('user')) {
      state.user = JSON.parse(sessionStorage.getItem('user'));
      state.userRoleList = JSON.parse(sessionStorage.getItem('userRoleList'));
    }
  },
  [types.USER_LOGOUT](state) {
    state.user = '';
    state.userRoleList = [];
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userRoleList');
  },
};

export const actions = {
  async login({ commit }, payload) {
    if (sessionStorage.getItem('user')) {
      commit(types.USER_LOGIN);
      return { result: true };
    } else if (payload) {
      let { result, user, userRoleList } = await this.$axios.$post(api.login, payload);
      if (result) {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('userRoleList', JSON.stringify(userRoleList));
        return { result: true };
      }
    }
    return { result: false };
  },
  async logout({ commit }) {
    commit(types.USER_LOGOUT);
  },
  async updatePW({ commit, state }, { data }) {
    let { result } = await this.$axios.$post(api.updatePassword, { data: { login_id: state.user.login_id, ...data } });
    if (result) commit(types.USER_LOGOUT);
    return result;
  },
};
