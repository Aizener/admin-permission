import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/index.less'
import Api from './api'
import './mock'
import { MessageBox, Message } from 'element-ui'
import 'animate.css'

Vue.config.productionTip = false
Vue.prototype.$api = Api
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
