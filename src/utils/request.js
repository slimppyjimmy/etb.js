import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import {
  serviceUrl
} from '../settings'

// 新建axios实例
const service = axios.create({
  withCredentials: true, //请求是否携带cookie
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    //请求前执行
    if (store.getters.token) {
      //使每个请求都携带token
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 请求错误触发
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 对返回状态码进行处理
    switch (res.status) {
      case 'success':
        return res
        break;
      case 'error':
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        break;
      case 'fail':
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(res.message)
        break;
      default:
        Message({
          message: "请求执行失败，status为空或非法",
          type: 'error',
          duration: 5 * 1000
        })
    }
  },
  error => {
    console.log('err:' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

class httpService {
  constructor(payload) {
    let tmp = {
      url: '',
      method: 'get',
      params: '',
      data: []
    }
    let requestData = {}
    //深拷贝
    Object.assign(requestData, tmp, payload)
    this.url = requestData.url
    this.method = requestData.method
    this.params = requestData.params
    this.data = requestData.data
    return httpService.sendRequest(this.transformUrl(this.url), this.verifyParams(this.params), this.verifyData(this.data), this.method)
  }
  //转换url
  transformUrl(url) {
    for (let i in serviceUrl) {
      if (url.startsWith(':' + i)) {
        this.url = serviceUrl[i] + url.replace(':' + i, '')
      }
    }
    return this.url
  }
  //验证参数
  verifyParams(params) {
      return params
    

  }
  //验证数据
  verifyData(data) {
    return data
  }
  //发送请求
  static sendRequest(url, params, data, method) {
    return new Promise((resolve, reject) => {
      service({
        url: url,
        params: params,
        method: method,
        data: data
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

export {
  service,
  httpService
}