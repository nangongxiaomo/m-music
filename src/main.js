import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

import 'common/stylus/index.styl'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
