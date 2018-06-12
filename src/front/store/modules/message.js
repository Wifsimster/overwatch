const state = {
    message: null,
    messages: null,
}

const getters = {
    message: state => state.message,
    messages: state => state.messages,
}

const mutations = {    
    setMessage (state, data) { state.message = data },
    setMessages (state, data) { state.messages = data },
}

const actions = {
    setMessage({ commit, state }, data) { commit('setMessage', data) },
    setMessages({ commit, state }, data) { commit('setMessages', data) },
}

export default {
    state,
    getters,
    mutations,
    actions,
}