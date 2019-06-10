import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import '@/plugins/element';
import '@/plugins/axios';
import '@/plugins/meta';
import '@/plugins/filters';
import '@/plugins/methods_util';
import 'normalize.css/normalize.css';
import '@/styles/index.scss';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
