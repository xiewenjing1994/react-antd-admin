import Logger from './Logger';
import axios from 'axios';
import globalConfig from '../config';

const logger = new Logger('MyAxios');

const instance = axios.create({
  baseURL: globalConfig.api.host, // 公共接口url
  timeout: globalConfig.api.timeout, // 请求超时
});

/**
 * 添加请求拦截器 ，请求接口之前，发起加载一个loading.如果不想每个接口都加载loading ，就注释掉请求前拦截器,在Axios这个类中处理
 */

instance.interceptors.request.use(
  config => {
    // loading的逻辑代码
    // isShowLoading(true);
    // 获取token，配置请求头
    // const TOKEN = localStorage.getItem('Token')
    // 演示的token（注意配置请求头，需要后端做cros跨域处理，我这里自己前端配的跨域）
    const TOKEN = '1fd399bdd9774831baf555ae5979c66b';
    if(TOKEN){
      // 配置请求头 token
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.headers['Access-Control-Allow-Origin'] = 'http://www.baidu.com';
      config.headers['Authorization'] = TOKEN;
    }
    return config;
  },
  error => {
    // 请求错误处理

    // 可以直接处理或者展示出去,toast show()
    console.warn(error);

    return Promise.reject(error);
  }
);

/**
 *处理加载loding 和关闭loading，loading的加载与否，根据外部传入的布尔值来决定，默认是false:不展示
 * */

instance.interceptors.response.use(
  function(response) {
    // isShowLoading(false);
    console.log(response);
    // 根据后端定义请求过期后返回的参数，处理token过期问题
    // 判断
    const {status} = response.data;
    // 判断状态码401或者其它条件
    if(Object.is(status,401)){
      // token过期后处理
      // 1.删除你本地存储的那个过期的token

      // 2. 跳转到登陆页（因为没有装路由，不写了，重新登陆赋值）

      //  todo...
    }

    return response;
  },
  function(error) {
    // 对响应错误做点什么
    // isShowLoading(false);
    return Promise.reject(error);
  }
);

/**
 * 是否开启loading
 * @param {*} payload { type:Boolean }
 */

function isShowLoading(payload) {
// 获取dom节点
  const loading = document.getElementById('loading');
  payload ? loading.style.display = 'block' : loading.style.display = 'none';
}

/**
 * 请求方法封装
 */

class http {
  // 使用async ... await
  static async get(url, params) {
    return await instance.get(url, {params})
  }
  static async post(url, params) {
    return await instance.post(url, params);
  }
}

export default http;
