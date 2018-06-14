export default {
  state: {
    socket: null
  },
  getters: {
    socket: state => state.socket
  },
  mutations: {
    setSocket(state, data) {
      state.socket = data
    }
  },
  actions: {
    setSocket: ({ commit, state }, data) => {
      commit('setSocket', data)
    }
  }
}
