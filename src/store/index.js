import Vue from 'vue';
import Vuex from 'vuex';
import * as publics from '@/store/publics';
import * as enterprise from '@/views/enterprise/store/selfStore';
import * as system from '@/views/system/store/selfStore';
import * as product from '@/views/product/store/selfStore';
import * as type from '@/views/type/store/selfStore';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    publics: publics,
    system: system,
    enterprise: enterprise,
    product: product,
    type: type,
  },
});
