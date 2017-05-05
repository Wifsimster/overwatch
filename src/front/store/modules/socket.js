const state = {
  socket: null,
}

const getters = {
  socket: state => state.socket,
}

const actions = {}

const mutations = {
  setSocket (state, data) {
    state.socket = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}