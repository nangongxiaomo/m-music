import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import fastClick from 'fastclick'

Vue.config.productionTip = false
fastClick.attach(document.body)

import 'common/stylus/index.styl'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
