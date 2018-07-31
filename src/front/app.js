import Vue from 'vue'
import App from './pages/App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import MyPlugin from './plugins/utils'
import VueWS from './plugins/vue-ws'

Vue.use(VueResource)
Vue.use(VueMoment)
Vue.use(MyPlugin)
Vue.use(VueWS, 'ws://localhost:8082', store)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
