import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMoment from 'vue-moment'
import VueResource from 'vue-resource'

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
})

Vue.use(VueMoment)
Vue.use(VueResource)