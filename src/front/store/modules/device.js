const state = {
  device: {},
  modal: false,
  removeDevice: {},
  removeModal: false,
}

const getters = {
  device: state => state.device,
  modal: state => state.modal,
  removeDevice: state => state.removeDevice,
  removeModal: state => state.removeModal,
}

const actions = {}

const mutations = {    
  openModal (state, data) {
    state.device = data
    state.modal = true
  },

  openRemoveModal (state, data) {
    state.removeDevice = data
    state.removeModal = true
  },

  closeModal (state) {
    state.modal = false
    state.removeModal = false
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}