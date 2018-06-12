const state = {
  socket: null,
}

const getters = {
  socket: state => state.socket,
}

const mutations = {
  setSocket (state, data) { state.socket = data },
}

const actions = {
    setSocket({ commit, state }, data) { commit('setSocket', data) },
}

export default {
  state,
  getters,
  actions,
  mutations
}