import {
  httpService
} from "../utils/request";
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function getInfo() {
  return new httpService({
    url: ':dasc/u/simpleInfo',
    method: 'get',
  })
}
export function getSidebar() {
  return new httpService({
    url: ':dasc/u/menus',
    method: 'get'
  })
}

export function getVersionNumber() {
  return new httpService({
    url: ':dasc/version',
    method: 'get'
  })
}

export function getPermissions(){
  return new httpService({
    url:':dasc/u/pagePermissions',
    method:'get'
  })
}