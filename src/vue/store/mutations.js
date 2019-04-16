export default {
    LIST_UPDATE(state, payload) {
        state.list = payload
    },
    SET_CURRENT_PRODUCT(state, payload) {
        state.currProduct = payload
    },
    ADD_PRODUCT(state, payload) {
        state.list = state.list.filter((currValue) => (currValue.id !== payload))
    }
}