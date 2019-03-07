export function regionsReducer(state = [], action) {

    if (action.type === 'GET_REGIONS') {
        state = [ ...action.payload ]

    }

    return state
}