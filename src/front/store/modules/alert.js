const state = {
    type: null,
    message: null,
}

const getters = {
    type: state => state.type,
    message: state => state.message,
}

const actions = {
    setAlert({ commit, state }, data) { commit('setAlert', data) },
    resetAlert({ commit, state }) { commit('resetAlert') }
}

const mutations = {    
    setAlert (state, data) {
        state.type = data.type
        state.message = data.message
    },
    resetAlert (state) {
        state.type = null
        state.message = null
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}