import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/assets/css/index.scss' // global css

import App from '@/common/App'
import router from '@/js/router'
import store from '@/js/store'
import i18n from '@/js/lang'
import '@/js/icons' // icon
import '@/js/permission' // permission control

Vue.use(ElementUI,{locale});

Vue.config.productionTip = false;

new Vue({
  el:'#app',
  router,
  store,
  i18n,
  template:'<App/>',
  components:{App}
})
