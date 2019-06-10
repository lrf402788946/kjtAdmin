import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const api = {
  enterpriseList: '/enterprise/enterprise_list',
  enterpriseInfo: '/enterprise/enterprise_info',
  enterpriseSave: '/enterprise/enterprise_save',
  enterpriseEdit: '/enterprise/enterprise_edit',
  enterpriseReview: '/enterprise/enterprise_review',
  enterpriseDelete: '/enterprise/enterprise_delete',
};

export const state = () => ({});

export const mutations = {};

export const actions = {
  /**
   * 企业相关操作
   */
  async enterpriseOperation({ commit }, { data, type }) {
    let result = await this.$axios.$post(_.get(api, type), { data: data });
    return result;
  },
};
