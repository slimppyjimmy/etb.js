import store from '@/store'
import { validateExtension } from 'showdown'

export default {
  inserted(el, binding, vnode) {
    const {
      value
    } = binding
    if(value==null){
      return 
    }
    const permissionData = store.getters && store.getters.pagePermission
    if (value && value.length > 0) {
      let hasPermission = permissionCheck(value, permissionData)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }

      function permissionCheck(resourceGuid, resourceObject) {
        for (let i in resourceObject) {
          if (resourceObject[i].guid == resourceGuid) {
            return true
          }
        }
        return false
      }


    } else {
      throw new Error("请传入需要进行验证的guid")
    }
  }
}