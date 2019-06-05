import Vue from 'vue';
import Router from 'vue-router';
import _ from 'lodash';

Vue.use(Router);

const router = new Router({
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
        {
          path: '/dept',
          name: 'dept',
          component: () => import('./views/system/dept.vue'),
        },
        {
          path: '/role',
          name: 'role',
          component: () => import('./views/system/role.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('./views/system/user.vue'),
        },
        {
          path: '/user_role',
          name: 'user_role',
          component: () => import('./views/system/user_role.vue'),
        },
        {
          path: '/enterprise/check',
          name: 'check',
          component: () => import('./views/enterprise/check.vue'),
        },
        {
          path: '/enterprise/add',
          name: 'add',
          component: () => import('./views/enterprise/add.vue'),
        },
        {
          path: '/type/enterpriseType',
          name: 'enterpriseType',
          component: () => import('./views/type/enterpriseType.vue'),
        },
        {
          path: '/product/already',
          name: 'already',
          component: () => import('./views/product/already.vue'),
        },
        {
          path: '/product/addOrEdit',
          name: 'addOrEdit',
          component: () => import('./views/product/addOrEdit.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  /**
   * 检查是否存在准备进入的路由
   */
  let in_router = searchRouter(router.options.routes, to.path);
  if (!in_router) {
    next('/404');
  } else {
    next();
  }

  // const is_login = sessionStorage.getItem('userInfo');
  // if (is_login) {
  //   next();
  // } else {
  //   if (to.path.includes('login') || to.path.includes('toLogin')) {
  //     next();
  //   } else if (to.path.includes('test')) {
  //     next();
  //   } else {
  //     next({ path: '/toLogin' });
  //   }
  // }
});

const searchRouter = (routes, next) => {
  for (const item of routes) {
    //判断是不是当前路由
    if (item.path !== next) {
      //不是当前路由,看有没有子路由集
      if (_.get(item, `children`)) {
        //有子路由集,就进去查,没有,就下一个
        return searchRouter(_.get(item, `children`), next);
      }
    } else {
      //是当前路由,返回true
      return true;
    }
  }
  //没有子路由,返回false,不存在此路由,跳至404
  return false;
};

export default router;
