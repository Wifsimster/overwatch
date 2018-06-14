import Vue from 'vue'
export default {
  state: {
    notifications: []
  },
  getters: {
    notifications: state => state.notifications
  },
  mutations: {
    addNotification(state, data) {
      data.id = Vue.getUUID()
      state.notifications.push(data)
    },
    removeNotification(state, index) {
      state.notifications.splice(index, 1)
    }
  },
  actions: {
    addNotification: ({ commit, state }, data) => {
      commit('addNotification', data)
      setTimeout(() => {
        commit('removeNotification', data.id)
      }, data.timeout ? data.timeout : 3000)
    },
    removeNotification: ({ commit, state }, data) => commit('removeNotification', data)
  }
}
