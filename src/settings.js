module.exports = {
  /**
   * @type {object}
   * @description 后端服务基础地址，可配置多个，注意：界面在调用是:key/使用，例如:dasc/user/info
   */
  serviceUrl:{
    dasc:'http://vmhost:8777/dascService',
    lms:'vmhost:7951/lmsService',
  },
  /**
   * @type {sting} token / default
   * @description 权限认证类型，可选token，默认default由后端控制
   */
  accessType:'cas',
  /**
   * @type {sting}
   * @description 页面标题
   */
  title: 'DASC',
  /**
   * @type {boolean} true | false
   * @description 是否显示右侧工具栏
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否显示tagViews
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定头部导航
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否显示sidebarLogo
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
