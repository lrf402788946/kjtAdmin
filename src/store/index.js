import Vue from 'vue';
import Vuex from 'vuex';
import * as publics from '@/store/publics';
import * as system from '@/views/system/store/selfStore';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    publics: publics,
    system: system,
  },
});
