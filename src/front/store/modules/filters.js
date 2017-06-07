const state = {
  type: null,
}

const getters = {
  filters: state => state,
}

const mutations = {    
  setType (state, data) { state.type = data },
}

const actions = {
    setType({ commit, state }, data) { commit('setType', data) },
}

export default {
  state,
  getters,
  mutations,
  actions,
}