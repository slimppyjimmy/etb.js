import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import personalRouter from './modules/personalManagement'
import syncRouter from './modules/syncManagement';
import systemRouter from "./modules/systemMaintain";
import unifiedUserMnt from "./modules/unifiedUserManagement";
import unifiedAuthorityMnt from './modules/unifiedAuthorityManagement'
import unifiedAuditMnt from "./modules/unifiedAuditManagement";
//公共路由表
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/unifiedUserMnt/userMnt'
    },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]
//异步路由表，基于角色权限动态生成
export const asyncRoutes = [
  unifiedUserMnt,
  unifiedAuthorityMnt,
  unifiedAuditMnt,
  syncRouter,
  personalRouter,
  systemRouter,
  // 404必须放在最后
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router





