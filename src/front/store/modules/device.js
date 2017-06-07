const state = {
    device: null,
    devices: null,
}

const getters = {
    device: state => state.device,
    devices: state => state.devices,
}

const mutations = {    
    setDevice (state, data) { state.device = data },
    setDevices (state, data) { state.devices = data },
}

const actions = {
    setDevice({ commit, state }, data) { commit('setDevice', data) },
    setDevices({ commit, state }, data) { commit('setDevices', data) },
}

export default {
    state,
    getters,
    actions,
    mutations
}