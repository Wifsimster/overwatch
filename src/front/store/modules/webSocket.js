export default {
  state: {
    ws: null
  },
  getters: {
    ws: state => state.ws
  },
  mutations: {
    setWebSocket(state, data) {
      state.ws = data
    }
  },
  actions: {
    setWebSocket: ({ commit, state }, data) => {
      commit('setWebSocket', data)
    }
  }
}
