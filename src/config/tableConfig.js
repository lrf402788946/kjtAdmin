//只有显示的字段放这里面,像不显示id的时候,不写这里面,如果需要用id,在自定义列中可以调用
//变量名称以路由名称命名,如果涉及共用,手写(现阶段都是手写,之后改成提取路由作为参数筛选列表)
const dept = [
  {
    prop: 'dept_name',
    label: '部门名称',
  },
  {
    prop: 'dept_duty',
    label: '部门职责',
  },
  {
    prop: 'dept_tell',
    label: '部门电话',
  },
];
const role = [
  {
    prop: 'role_code',
    label: '权限代码',
  },
  {
    prop: 'role_name',
    label: '权限名称',
  },
];
const user = [
  {
    prop: 'login_id',
    label: '登录ID',
  },
  {
    prop: 'user_name',
    label: '用户名',
  },
  {
    prop: 'phone',
    label: '电话号码',
  },
  {
    prop: 'addr',
    label: '地址',
  },
  /**
   * 所属部门需要筛选处理,在该视图中筛选,不作为直接输出项显示
   * {
      prop: 'dept_id',
      label: '所属部门',
     },
   */
];

const user_role = [
  {
    prop: 'user_name',
    label: '用户名',
  },
  /**
 * 所属部门需要筛选处理,在该视图中筛选,不作为直接输出项显示
 * {
    prop: 'dept_id',
    label: '所属部门',
   },
 */
];

const check = [
  {
    prop: 'name',
    label: '企业名称',
  },
  {
    prop: 'contact',
    label: '联系方式',
  },
  {
    prop: 'addr',
    label: '地址',
  },
];

const enterpriseType = [
  {
    prop: 'code',
    label: '企业类别代码',
  },
  {
    prop: 'name',
    label: '企业类别名称',
  },
];

const productType = [
  {
    prop: 'code',
    label: '产品类别代码',
  },
  {
    prop: 'name',
    label: '产品类别名称',
  },
];

export { dept, role, user, user_role, check, enterpriseType, productType };
