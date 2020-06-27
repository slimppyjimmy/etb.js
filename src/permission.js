import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // 顶部进度条
import 'nprogress/nprogress.css'
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({
  showSpinner: false
})
import setting from './settings'
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // 开始顶部进度条
  NProgress.start()
  // 设置页面title
  document.title = getPageTitle(to.meta.title)
  switch (setting.accessType.toLowerCase()) {
    case 'cas':
      //确定用户是否已通过getInfo获得其权限,cas下通过用户guid去确认
      const hasGuid = store.getters.guid && store.getters.guid.length > 0
      if (hasGuid) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo', setting.accessType.toLowerCase()).then(res => {
            store.dispatch('user/getVersion')
            store.dispatch('user/getPagePermission')
          })
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          router.addRoutes(accessRoutes)
          // 确保addRoutes完整的hack方法
          // 设置replace:true，这样导航就不会留下历史记录
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          //cas下不需要对vuex中的数据进行重制操作
          // Message.error(error || 'Has Error')
          // next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
      break;
    case 'token':
      // 确认用户是否已登录
      const hasToken = getToken()
      if (hasToken) {
        if (to.path === '/login') {
          // 如果访问的是登录叶，重定向到主页
          next({
            path: '/'
          })
          NProgress.done()
        } else {
          // 确定用户是否已通过getInfo获得其权限，token下通过roles去验证
          const hasRoles = store.getters.roles && store.getters.roles.length > 0
          if (hasRoles) {
            next()
          } else {
            try {
              // 获取用户信息
              const {
                roles
              } = await store.dispatch('user/getInfo', setting.accessType.toLowerCase()).then(res => {
                store.dispatch('user/getVersion')
                store.dispatch('user/getPagePermission')
              })
              // 根据当前登录的用户获取动态路由表
              const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
              // 动态添加路由表
              router.addRoutes(accessRoutes)
              // 确保addRoutes完整的hack方法
              // 设置replace:true，这样导航就不会留下历史记录
              next({
                ...to,
                replace: true
              })
            } catch (error) {
              // 移除token，重制vuex
              await store.dispatch('user/resetToken')
              Message.error(error || 'Has Error')
              next(`/login?redirect=${to.path}`)
              NProgress.done()
            }
          }
        }
      } else {
        //没有token
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else {
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
      break;
  }
})

router.afterEach(() => {
  //结束进度条
  NProgress.done()
})