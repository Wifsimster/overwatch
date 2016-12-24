import * as types from '../mutation-types'

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
  [types.OPEN_MODAL] (state, data) {
    state.device = data;
    state.modal = true;
  },

  [types.OPEN_REMOVE_MODAL] (state, data) {
    state.removeDevice = data;
    state.removeModal = true;
  },

  [types.CLOSE_MODAL] (state) {
    state.modal = false;
    state.removeModal = false;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}