import Vue from 'vue';
import _ from 'lodash';
import { Message } from 'element-ui';

const vm = new Vue({});
const Plugin = {
  install(Vue, options) {
    // 4. 添加实例方法
    Vue.prototype.$listImg = (list, domain) => {
      return list.map(item => {
        for (let [k, v] of Object.entries(item)) {
          if (typeof v === 'string') {
            if (v.includes('.jpg')) item[k] = `${domain}${v}`;
          }
        }
        return item;
      });
    };
    Vue.prototype.$objectListImg = (item, domain, itemNeed) => {
      let img = {};
      for (let [k, v] of Object.entries(item)) {
        if (typeof v === 'string') {
          if (v.includes('.jpg')) {
            itemNeed ? (item[k] = `${domain}${v}`) : '';
            img[k] = `${domain}${v}`;
          }
        }
      }
      return { data: item, img };
    };
  },
};

Vue.use(Plugin);
