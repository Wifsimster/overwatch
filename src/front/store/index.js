import Vue from 'vue'
import Vuex from 'vuex'
import alert from './modules/alert'
import device from './modules/device'
import message from './modules/message'
import socket from './modules/socket'
import filters from './modules/filters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        socket,
        alert,
        device,
        message,
        filters,
    },
})