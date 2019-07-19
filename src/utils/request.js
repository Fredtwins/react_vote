/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
// eslint-disable-next-line no-unused-vars
// import { extend } from 'umi-request';
import CONFIG from '../constants/config';
import { Toast } from 'antd-mobile';
import fetch from 'dva/fetch';
import URI from 'urijs';
import router from 'umi/router';

Toast.mask = false;

const needLogin_code = [1002, 401];
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const toastTime = 1.5; //秒

/**
 * 异常处理程序
 */
// const checkStatus = response => {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   const errorspan = codeMessage[response.status] || response.statusspan;
//   Toast.info(`请求错误 ${response.status}: ${response.url} ${errorspan}`,toastTime);
//   return null;
// };
/**
 * 配置request请求时的默认参数
 */
// const request = extend({
//   errorHandler, // 默认错误处理
//   credentials: 'include', // 默认请求是否带上cookie
//   // headers: { 'user_token': Cookie.get('token') }
// });

export default function request(url, option) {
  // console.log(url)
  // console.log(option)
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      credentials: 'include',
    };
    const newOptions = {
      ...defaultOptions,
      ...option,
    };
    let interFaceType = newOptions.interFaceType || 'jq';
    if (interFaceType !== 'normal') {
      if (interFaceType && CONFIG.obj[interFaceType]) {
        url = CONFIG.obj[interFaceType] + '/' + url;
      } else {
        url = CONFIG.obj.jq + '/' + url;
      }
    }
    let UrlParams = new URI(window.location.href).search(true);
    const token = UrlParams.token || localStorage.getItem('token');
    if (
      newOptions.method === 'post' ||
      newOptions.method === 'put' ||
      newOptions.method === 'delete'
    ) {
      if (token && option) {
        option.headers = option.headers || {};
        option.body = option.body || {};
        option.headers.userToken = token;
        option.headers.token = token;

        // option.body.token = token;
        // option.body.SSOTOKEN = token
      }
      if (newOptions.requestType === 'urlencoded') {
        newOptions.headers = {
          // Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          ...newOptions.headers,
        };
        let newobj = new URI();
        for (let key in newOptions.body) {
          newobj.addSearch(key, newOptions.body[key]);
        }
        newOptions.body = newobj.query().toString();
      } else if (newOptions.requestType === 'form') {
        const obj = new FormData();
        let key;
        for (key in newOptions.body) {
          obj.append(key, newOptions.body[key]);
        }
        newOptions.headers = {
          Accept: '*',
          'Content-Type': 'multipart/form-data',
          ...newOptions.headers,
        };
        newOptions.body = obj;
      } else {
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'X-Forward-School': 'hangjia_h5',
          clientType: 'WEB',
          ...newOptions.headers,
          userToken: token,
          token,
        };
        newOptions.body = JSON.stringify(newOptions.body);
      }
    } else {
      if (token) {
        const target = new URI(url);
        target.addSearch('token', token);
        url = target.toString();
        newOptions.headers = {
          userToken: token,
          token,
          'Content-Type': 'application/json; charset=utf-8',
          'X-Forward-School': 'hangjia_h5',
          clientType: 'WEB',
        };
      }
    }
    return fetch(url, newOptions)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          response.json().then(res => {
            if (~~res.code === 200) {
              resolve(res);
              return res;
            }
            if (res && ~~res.code !== 200) {
              if (needLogin_code.includes(~~res.code)) {
                Toast.info('token过期，请重新登录', toastTime);
                localStorage.removeItem('token');
                setTimeout(() => {
                  router.push('/loginPage');
                }, 2000);
                return reject(false);
              }
              if (res.msg) {
                if (newOptions.noCheck) {
                  return resolve(res);
                }
                Toast.info(res.msg, toastTime);
              } else if (res.message) {
                Toast.info(res.message, toastTime);
              } else {
                Toast.info('接口出错，msg没有返回', toastTime);
              }
              resolve(res);
            } else {
              return resolve(res);
            }
          });
          return response;
        }

        if (!response) {
          return null;
        }
        if (newOptions.noCheck) {
          resolve(response);
          return;
        }

        const errorspan = codeMessage[response.status] || response.statusspan;
        Toast.info(`请求错误 ${response.status}: ${response.url} ${errorspan}`, toastTime);
        reject(false);
        return null;
      })
      .catch(e => {
        Toast.info(e.message);
        reject(false);
      });
  });
}
