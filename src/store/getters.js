const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  guid: state => state.user.guid,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  version: state => state.user.version,
  pagePermission:state=>state.user.pagePermission,
  warning:state=>state.user.warning,
  cacheData:state=>state.user.cacheData
  
}
export default getters