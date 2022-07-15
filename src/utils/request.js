import axios from 'axios'

const request = axios.create({
  baseURL: 'http://101.34.29.143:3000/api/',
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 检测 sessionStorage 中是否有 jwt，如果有则将其设置到请求头（登录操作除外）
  const jwt = sessionStorage.getItem('jwt');
  if (jwt && config.url != 'auth/local') {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  console.log(config.url)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request