import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'

Vue.use(VueResource)
Vue.use(VueMoment)

const vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
