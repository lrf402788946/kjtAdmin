import Vue from 'vue';
import { Message } from 'element-ui';
import _ from 'lodash';

const getParams = () => {
  let str = location.href;
  let num = str.indexOf('?');
  const param = {};
  str = str.substr(num + 1);
  let num2 = str.indexOf('#');
  let str2 = '';
  if (num2 > 0) {
    str2 = str.substr(0, num2);
  } else {
    num2 = str.indexOf('/');
    str2 = str.substr(0, num2);
  }
  const arr = str2.split('&');
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=');
    if (num > 0) {
      const name = arr[i].substring(0, num);
      const value = arr[i].substr(num + 1);
      param[name] = decodeURI(value);
    }
  }
  return param;
};
const checkRes = (result, uri) => {
  if (process.env.VUE_APP_API_MODEL === 'test') {
    console.log(`uri:${uri}`);
    console.log(`result:`);
    console.log(result);
    console.log(`returnData:`);
    console.log(_.get(result, 'data', {}));
    console.log(`dataList:`);
    console.log(_.get(result, 'dataList', []));
  }
  if (result.rescode === 0 || result.rescode === '0') {
    if (uri.includes('login')) {
      Message.success(`登录成功`);
      return { result: true, user: result.user, userRoleList: result.userRoleList };
    } else if (filterUrl(uri)) {
      Message.success(result.msg);
      return {
        result: true,
        msg: result.msg,
        data: _.get(result, 'data', {}),
        dataList: _.get(result, 'dataList', []),
        totalRow: _.get(result, `totalRow`, 0),
      };
    }
  } else {
    Message.error(result.msg);
    return { result: false };
  }
};
let filterUrl = url => {
  if (url.includes('save')) return true;
  else if (url.includes('edit')) return true;
  else if (url.includes('delete')) return true;
  else return false;
};
export { getParams, checkRes };
