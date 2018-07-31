export default {
  state: {
    health: null
  },
  getters: {
    webSocket: state => state
  },
  mutations: {
    setWebSocketHealth(state, data) {
      state.health = data
    }
  },
  actions: {
    setWebSocketHealth: ({ commit, state }, data) => {
      commit('setWebSocketHealth', data)
    }
  }
}
