import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'flex.css'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
