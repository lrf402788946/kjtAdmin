// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
  {
    path: '', //菜单母路由
    name: 'Dashboard', //菜单母路由名称
    icon: 'el-icon-menu', //菜单母路由图标
    children: [
      {
        path: '/test', //子路由
        name: '测试页', //子路由名称
      },
      {
        path: '/404',
        name: '404页',
      },
      {
        path: '/workplace',
        name: '工作台',
      },
    ],
  },
  {
    path: '',
    name: '系统管理',
    icon: 'el-icon-setting',
    children: [
      {
        path: '/dept',
        name: '部门管理',
      },
      {
        path: '/user',
        name: '用户管理',
      },
      {
        path: '/role',
        name: '权限管理',
      },
      {
        path: '/user_role',
        name: '用户权限分配',
      },
    ],
  },
  {
    path: '/enterprise',
    name: '企业管理',
    icon: 'el-icon-edit-outline',
    children: [
      {
        path: '/check',
        name: '企业发布与审核',
      },
    ],
  },
  {
    path: '/product',
    name: '产品管理',
    icon: 'el-icon-present',
    children: [
      {
        path: '/already',
        name: '已发布产品',
      },
    ],
  },
  {
    path: '/type',
    name: '类别管理',
    icon: 'el-icon-tickets',
    children: [
      {
        path: '/productType',
        name: '产品类别管理',
      },
      {
        path: '/enterpriseType',
        name: '企业类别管理 ',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
