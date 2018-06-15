import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import alert from './modules/alert'
import device from './modules/device'
import message from './modules/message'
import webSocket from './modules/webSocket'
import filters from './modules/filters'
import notification from './modules/notification'

const state = {}
const mutations = {}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  modules: {
    alert,
    device,
    message,
    filters,
    notification,
    webSocket
  }
})
