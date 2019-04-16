export default (state = {} , action) => {

    if (action.type === 'SET_CURRENT_PRODUCT') {
        state = {...action.payload}
    }

    return state
}