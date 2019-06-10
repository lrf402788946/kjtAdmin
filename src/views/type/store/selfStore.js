import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const api = {
  proTypeList: '/product/product_type',

  entTypeList: '/enterprisetype/enterprise_type_list',
};
export const state = () => ({});

export const mutations = {};

export const actions = {
  /**
   * 企业类别相关操作
   */
  async entTypeOperation({ commit }, { data, type }) {
    let result = await this.$axios.$post(_.get(api, type), { data: data });
    return result;
  },

  /**
   * 产品类别相关操作
   */
  async proTypeOperation({ commit }, { data, type }) {
    let result = await this.$axios.$post(_.get(api, type), { data: data });
    return result;
  },
};
