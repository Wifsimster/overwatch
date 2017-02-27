const state = {
  type: '',
  message: '',
}

const getters = {
  alert: state => state.alert,
}

const actions = {}

const mutations = {    
  setAlert (state, data) {
    state.type = data.type
    state.message = data.message
  },

  resetAlert (state) {
    state = {
      type: null,
      message: null,
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}