import {
  login,
  logout,
  getInfo,
  getVersionNumber,
  getPermissions
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'


const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  warning: '',
  notification: '',
  guid: '',
  version: '',
  pagePermission: '',
  cacheData: {},
  publicParams:{}
}

const mutations = {
  //TODO 还需要做对代理人登录信息的处理
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_WARNING: (state, warning) => {
    state.warning = warning
  },
  SET_NOTIFICATION: (state, notification) => {
    state.notification = notification
  },
  SET_USERGUID: (state, guid) => {
    state.guid = guid
  },
  SET_VERSION: (state, version) => [
    state.version = version
  ],
  SET_PAGEPERMISSION: (state, pagePermission) => {
    state.pagePermission = pagePermission
  },
  SET_CACHEDATA: (state, cacheData) => {
    state.cacheData = cacheData
  },
  SET_PUBLICPARAMS:(state,publicParams,)=>{
    state.publicParams = publicParams
  }

}

const actions = {
  // 用户登录
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({
    commit,
    state
  }, accessType) {
    if (accessType && accessType == 'cas') {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const {
            guid,
            notification,
            warning,
            name
          } = res.data
          commit('SET_ROLES', ['admin'])
          commit('SET_WARNING', warning)
          commit('SET_NOTIFICATION', notification)
          commit('SET_USERGUID', guid)
          commit('SET_NAME', name)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    } else if (accessType && accessType == 'token') {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const {
            data
          } = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const {
            roles,
            name,
            avatar,
            introduction
          } = data
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }

  },
  //获取版本信息
  getVersion({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getVersionNumber().then(res => {
        const version = res.data
        commit('SET_VERSION', version)
        resolve(version)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取页面按钮权限信息
  getPagePermission({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getPermissions().then(res => {
        if (res) {
          const pagePermission = res.data
          commit('SET_PAGEPERMISSION', pagePermission)
          resolve(pagePermission)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户登出
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // 动态修改权限，刷新路由表
  changeRoles({
    commit,
    dispatch
  }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const {
        roles
      } = await dispatch('getInfo')

      resetRouter()

      // 根据切换的角色生成路由表
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // 动态添加路由表
      router.addRoutes(accessRoutes)

      // 重置tagviews
      dispatch('tagsView/delAllViews', null, {
        root: true
      })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}