import axios from 'axios';
import {
  baseUrl, //引入baseUrl 
} from "/config/env";
axios.defaults.timeout = 10000; //设置请求时间
axios.defaults.baseURL = baseUrl;//设置默认接口地址
// 添加响应拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // return config;
  //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
  if (config.url) {
    config.headers['Content-Type'] = "application/json"
    config.headers['connection'] = "keep-alive"
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
export function post(url, data = {}) {
  let params
  params = data
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
export function get(url, data = {}) {
  let params
  params = data
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}