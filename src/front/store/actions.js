import * as types from './mutation-types'

export const openModal = ({ commit }, data) => {
    commit(types.OPEN_MODAL, data)
}

export const closeModal = ({ commit }) => {
    commit(types.CLOSE_MODAL)
}