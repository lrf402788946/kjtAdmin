import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/index.vue'),
      children: [
        {
          path: '/test',
          name: 'test',
          component: () => import('./views/test.vue'),
        },
        {
          path: '/404',
          name: 'notFound',
          component: () => import('./views/NotFound.vue'),
        },
      ],
    },
  ],
});
