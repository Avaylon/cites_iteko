export function allAttrsReducer(state = [] , action) {

    if (action.type === 'GET_ATTRS_ALL') {
        state = [ ...action.payload ]
    }

    return state
}