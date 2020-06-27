import {
  asyncRoutes,
  constantRoutes
} from '@/router'
import Layout from '@/layout'
import {
  getSidebar
} from "../../api/user";
import {
  accessType
} from '../../settings'
const _import = require('../../router/_import_development') //转换str地址为实际组件
/**
 * 通过meta中的值确定用户权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归筛选异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    if (accessType && accessType == 'cas') {
      return new Promise((resolve, reject) => {
        getSidebar().then((res) => {
          const accessedRoutes = loadaMenu(res.data)

          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }).catch((err) => {
          reject(err)
        })
      })
    } else if (accessType && accessType == 'token') {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

        } else {
          //根据token携带的信息对异步路由表进行筛选
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
      })
    }
  }
}
//遍历后对存在子节点的对象执行递归函数
function loadaMenu(data) {
  let menuTree = [];
  data.forEach(function (item) {
    //先找到一级节点（没有parent的节点）
    if (data.filter(function (record) {
        if (record.guid === item.parentGuid)
          return true;
        return false;
      }).length === 0) {
      let node = {};
      recursiveMenuTree(node, 1, data, item);

      menuTree.push(node);
    }
  });
  return menuTree
}
//递归存在子节点的对象;
function recursiveMenuTree(node, level, allData, currentData) {
  //获得当前菜单的子菜单
  let children = allData.filter(function (item) {
    if (item.parentGuid === currentData.guid)
      return true;
    return false;
  })
  node.meta = {};
  node.name = currentData.name;
  node.meta.title = currentData.name;
  node.meta.icon = "edit";
  // TODO 临时处理，后端应该返回正确的url
    node.path = currentData.url
  if (!node.children && currentData.parentGuid == null) {
    node.redirect = '/'
  }
  if (children.length !== 0) {
    node.component = Layout;
    node.children = [];
    children.forEach(function (childData) {
      let childNode = {};
      recursiveMenuTree(childNode, level + 1, allData, childData);
      node.children.push(childNode);
    });
  } else {
    node.component = _import(node.path);
    // console.log(node.path)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}