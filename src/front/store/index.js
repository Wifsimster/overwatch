import Vue from 'vue'
import Vuex from 'vuex'
import alert from './modules/alert'
import device from './modules/device'
import message from './modules/message'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        alert,
        device,
        message,
    },
})