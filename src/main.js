import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './plugins/element.js'
import axios from "./utils/request"
import rem from "@/assets/rem"
Vue.prototype.$http=axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
