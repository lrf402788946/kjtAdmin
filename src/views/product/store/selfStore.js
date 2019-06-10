import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const api = {
  productList: '/product/product_list',
  productInfo: '/product/product_info',
  productEdit: '/product/product_edit',
  productDelete: '/product/product_delete',
};
export const state = () => ({});

export const mutations = {};

export const actions = {
  /**
   * 产品相关操作
   */
  async productOperation({ commit }, { data, type }) {
    let result = await this.$axios.$post(_.get(api, type), type === `productEdit` ? data : { data: data });
    return result;
  },
};
