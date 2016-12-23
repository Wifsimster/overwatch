import * as types from '../mutation-types'

const state = {
    device: {},
    modal: false,
}

const getters = {
    device: state => state.device,
    modal: state => state.modal,
}

const actions = {
    //    checkout ({ commit, state }, products) {
    //        const savedCartItems = [...state.added]
    //        commit(types.CHECKOUT_REQUEST)
    //        shop.buyProducts(
    //            products,
    //            () => commit(types.CHECKOUT_SUCCESS),
    //            () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
    //        )
    //    }
}

const mutations = {    
    [types.OPEN_MODAL] (state, data) {
        state.device = data;
        state.modal = true;
    },
    
    [types.CLOSE_MODAL] (state) {
        state.modal = false;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}