import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // 全局css
import App from './App'
import store from './store'
import router from './router'
import directive from '@/directive/index.js' // 挂载指令
import install from './components/index'
import VueBus from 'vue-bus';//中央事件总线
import './icons' // 图标
import './permission' // 全局路由守卫控制
import './utils/error-log' // error log
import $ from "jquery"
import {
  mockXHR
} from '../mock'
import { fromTextArea } from 'codemirror'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.use(directive)
Vue.use(install)
Vue.use(VueBus)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})