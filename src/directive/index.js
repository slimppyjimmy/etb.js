import permission from './v-permission/permission'
const install = function(Vue) {
  Vue.directive('permission', permission)
}

permission.install = install
export default permission
