export default {
  state: {
    message: null,
    type: 'error',
    show: false,
    delay: null
  },
  getters: {
    alert: state => state
  },
  mutations: {
    setAlert(state, data) {
      state.show = true
      if (data.type) {
        state.type = data.type
      }
      if (data.message) {
        state.message = data.message
      }
      if (data.delay) {
        state.delay = data.delay
      }
    },
    resetAlert(state) {
      state.show = false
      state.message = null
      state.type = null
      state.delay = null
    }
  },
  actions: {
    setAlert: ({ commit, state }, data) => commit('setAlert', data),
    resetAlert: ({ commit }) => commit('resetAlert')
  }
}
