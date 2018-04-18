import axios from 'axios'
import {Message,MessageBox} from 'element-ui'
import store from '@/js/store'
import {getToken} from '@/js/auth'
import qs from 'qs';

// 创建axios实例
const service = axios.create({
  baseURL:process.env.BASE_API, // api的base_url
  timeout:15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (store.getters.token) {
    config.headers['X-Token'] = getToken();
  }
  config.data = qs.stringify(config.data);
  return config
},error => {
  console.log(error);
  Promise.reject(error)
});


// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // console.log('http response',response);
    if (response['success'] !== undefined) {
      //   Message({
      //     message:res.msg,
      //     type:'error',
      //     duration:5 * 1000
      //   });
      //
      //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      //   if (res.msg === 'please_relogin') {
      //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录','确定登出',{
      //       confirmButtonText:'重新登录',
      //       cancelButtonText:'取消',
      //       type:'warning'
      //     }).then(() => {
      //       store.dispatch('FedLogOut').then(() => {
      //         location.reload()// 为了重新实例化vue-router对象 避免bug
      //       })
      //     })
      //   }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error);// for debug
    Message({
      message:error.message,
      type:'error',
      duration:5 * 1000
    });
    return Promise.reject(error)
  }
);

export default service