import * as types from '../mutation-types'

const state = {
    type: '',
    message: '',
}

const getters = {
    alert: state => state.alert,
}

const actions = {}

const mutations = {    
    [types.SET_ALERT] (state, data) {
        state.type = data.type
        state.message = data.message
    },

    [types.RESET_ALERT] (state) {
        state = {};
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}