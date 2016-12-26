import * as types from './mutation-types'

export const openModal = ({ commit }, data) => {
    commit(types.OPEN_MODAL, data)
}

export const openRemoveModal = ({ commit }, data) => {
    commit(types.OPEN_REMOVE_MODAL, data)
}

export const closeModal = ({ commit }) => {
    commit(types.CLOSE_MODAL)
}

export const setAlert = ({ commit }, data) => {
    commit(types.SET_ALERT, data)
}

export const resetAlert = ({ commit }) => {
    commit(types.RESET_ALERT)
}